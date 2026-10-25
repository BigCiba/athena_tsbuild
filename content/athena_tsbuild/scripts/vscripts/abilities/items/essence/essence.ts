import { EOMItem } from "../../eom_ability";
import { registerAbility } from "../../../lib/dota_ts_adapter";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";

/** 精华掉落与原版精髓：首次拾取生成力量精髓，后续充能升级，可主动循环三种偏向。 */
class Essence extends EOMItem {
	GetIntrinsicModifierName() { return "modifier_essence"; }
	OnSpellStart() {
		const hero = this.GetCaster() as CDOTA_BaseNPC_Hero;
		if (!Items.Owns(hero, this)) return;
		const parts = this.GetAbilityName().split("_"), modes: Record<string, string> = { str: "agi", agi: "int", int: "str" };
		if (modes[parts[2]]) Items.Replace(hero, this, `item_essence_${modes[parts[2]]}_${parts[3]}`, this.GetCurrentCharges());
	}
	AddCharges(amount: number) {
		const hero = this.GetCaster() as CDOTA_BaseNPC_Hero;
		if (!Items.Owns(hero, this)) return;
		const required = this.GetSpecialValueFor("require_count"), level = this.GetLevel();
		const total = this.GetCurrentCharges() + amount;
		if (required > 0 && total >= required && level < 15) {
			const parts = this.GetAbilityName().split("_");
			Items.Replace(hero, this, `item_essence_${parts[2]}_${level + 1}`, total - required);
		} else this.SetCurrentCharges(total);
	}
}
for (const mode of ["str", "agi", "int"]) for (let level = 1; level <= 15; level++) registerAbility(`item_essence_${mode}_${level}`)(Essence);
registerAbility("item_essence_core")(Essence);
class EssenceDrop extends EOMItem {
	OnSpellStart() {
		Items.UsePickup(this, hero => {
		for (let slot = 0; slot < 6; slot++) {
			const item = hero.GetItemInSlot(slot);
			if (IsValid(item) && item !== this && item.GetAbilityName().startsWith("item_essence_") && item.GetLevel() < 15 && (item as Essence).AddCharges !== undefined) {
				(item as Essence).AddCharges(this.GetSpecialValueFor("charges")); Items.Destroy(this); return;
			}
		}
		// 沿用旧版：首次生成精髓，不把这一枚掉落的 charges 再加到新精髓。
		if (Items.Grant(hero.GetPlayerOwnerID(), "item_essence_str_1", 1, this.__itemRunId!)) Items.Destroy(this);
		});
	}
}
@registerAbility() export class item_essence_small extends EssenceDrop { }
@registerAbility() export class item_essence_medium extends EssenceDrop { }
@registerAbility() export class item_essence_big extends EssenceDrop { }
@registerEOMModifier({ IsHidden: true, IsPurgable: false, RemoveOnDeath: false, GetAttributes: DOTAModifierAttribute_t.MODIFIER_ATTRIBUTE_MULTIPLE })
export class modifier_essence extends EOMModifier {
	DynamicProperty() {
		const value = (field: string) => {
			const ability = this.GetAbility(), hero = this.GetParent();
			if (!IsValid(ability)) return 0;
			for (let slot = 0; slot < 6; slot++) if (hero.GetItemInSlot(slot) === ability) return ability.GetSpecialValueFor(field);
			return 0;
		};
		return { [PropertyFunction.STATS_STRENGTH_BONUS]: () => value("str"), [PropertyFunction.STATS_AGILITY_BONUS]: () => value("agi"),
			[PropertyFunction.STATS_INTELLECT_BONUS]: () => value("int"), [PropertyFunction.HEALTH]: () => value("hp"), [PropertyFunction.MANA]: () => value("mp"),
			[PropertyFunction.HEALTH_REGEN_CONSTANT]: () => value("hp_regen"), [PropertyFunction.MANA_REGEN_CONSTANT]: () => value("mp_regen") };
	}
}
