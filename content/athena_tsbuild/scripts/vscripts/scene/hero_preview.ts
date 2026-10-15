/** @noSelfInFile **/
// @ts-nocheck

declare let thisEntity: CBaseEntity;
declare var entities: Record<string, CBaseEntity>;
declare var auraParticle: ParticleID;
declare var footParticle: ParticleID;
declare var currentFootParticle: string | undefined;
declare var currentAuraParticle: string | undefined;

let data = Client.GetSceneEntityData("hero_preview");
let heroName = data?.heroName ?? "npc_dota_hero_vexis";
let bodyGroup = data?.bodyGroup;
let bodyGroupChoice = data?.bodyGroupChoice;
let heroKV = KeyValues.heroes[heroName];
let heroID = heroKV.HeroID;
let heroCosmeticType = [
	COSMETIC_TYPE.HEAD,
	COSMETIC_TYPE.SHOULDER,
	COSMETIC_TYPE.BACK,
	COSMETIC_TYPE.TAIL,
	COSMETIC_TYPE.WING,
	COSMETIC_TYPE.MISC,
];

function Spawn(params: any) {
	entities = {};
	let ent = thisEntity;
	for (let i = 0; i < 19; i++) {
		entities[ent.GetName()] = ent;
		ent = Entities.Next(ent) as CBaseEntity;
	}

	// 英雄主体
	const hero = SpawnEntityFromTableSynchronous("prop_dynamic_clientside", {
		parentname: "root",
		targetname: heroName,
		origin: "0 0 0",
		angles: "0 0 0",
		scales: "1 1 1",
		model: heroKV.Model,
		IdleAnim: "ACT_DOTA_IDLE",
		add_modifier: "",
		bodygroups: `{${bodyGroup} = ${bodyGroupChoice}}`
	});
	entities[heroName] = hero

	// 穿上武器
	// const equipWeaponID = CustomNetTables.GetPlayerServiceNetTable("player_heroes")?.[tostring(heroID)]?.equip_weapon;
	// if (equipWeaponID != undefined) {
	// 	const weaponKv = KeyValues.weapon[tostring(equipWeaponID)];
	// 	SpawnEntityFromTableSynchronous("prop_dynamic_clientside", {
	// 		origin: "0 0 0",
	// 		classname: "prop_dynamic_clientside",
	// 		targetname: tostring(equipWeaponID),
	// 		model: weaponKv.model,
	// 		StartingAnim: "ACT_DOTA_IDLE",
	// 		StartingAnimationLoopMode: "ANIM_LOOP_MODE_USE_SEQUENCE_SETTINGS",
	// 		parentname: heroName,
	// 		parentAttachmentName: "!bonemerge"
	// 	});
	// }

	// 预先创建所有武器
	let cosmeticList: any[] = [];
	for (const [cid, cosmeticData] of pairs(KeyValues.weapon)) {
		if (
			cosmeticData.model != undefined &&
			(cosmeticData.hero == undefined || tostring(cosmeticData.hero) == tostring(heroID))
		) {
			cosmeticList.push({
				origin: "0 0 0",
				classname: "prop_dynamic_clientside",
				targetname: cid,
				angles: "0 0 0",
				model: cosmeticData.model,
				scales: "1 1 1",
				StartingAnim: (cosmeticData.animate && cosmeticData.animate != "") ? cosmeticData.animate : "ACT_DOTA_IDLE",
				StartingAnimationLoopMode: "ANIM_LOOP_MODE_USE_SEQUENCE_SETTINGS",
				parentname: heroName,
				parentAttachmentName: "!bonemerge"
			});
		}
	}
	// 预先创建所有饰品
	for (const [cid, cosmeticData] of pairs(KeyValues.info_item_cosmetic)) {
		if (
			heroCosmeticType.includes(cosmeticData.type) &&
			cosmeticData.model != undefined &&
			(cosmeticData.hero_id == undefined || tostring(cosmeticData.hero_id) == tostring(heroID))
		) {
			cosmeticList.push({
				origin: "0 0 0",
				classname: "prop_dynamic_clientside",
				targetname: cid,
				angles: "0 0 0",
				model: cosmeticData.model,
				scales: "1 1 1",
				StartingAnim: (cosmeticData.animate && cosmeticData.animate != "") ? cosmeticData.animate : "ACT_DOTA_IDLE",
				StartingAnimationLoopMode: "ANIM_LOOP_MODE_USE_SEQUENCE_SETTINGS",
				parentname: heroName,
				parentAttachmentName: "!bonemerge"
			});
		}
	}
	SpawnEntityListFromTableSynchronous(cosmeticList);

	// ParticleManager.CreateParticle("models/eom/hero/dazzle_1/particles/dazzle_1_idle.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, hero)
}

function Clear() {
	currentFootParticle = undefined;
	currentAuraParticle = undefined;
	ParticleManager.DestroyParticle(auraParticle ?? (-1 as ParticleID), true);
	ParticleManager.DestroyParticle(footParticle ?? (-1 as ParticleID), true);
}
function SwitchToFoot(particle: string) {
	if (particle == undefined) {
		currentFootParticle = undefined;
		ParticleManager.DestroyParticle(footParticle ?? (-1 as ParticleID), true);
	} else if (particle != currentFootParticle) {
		currentFootParticle = particle;
		ParticleManager.DestroyParticle(footParticle ?? (-1 as ParticleID), true);
		footParticle = ParticleManager.CreateParticle(particle, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, entities["runner"])
	}
}

function SwitchToAura(particle?: string) {
	if (particle == undefined) {
		currentAuraParticle = undefined;
		ParticleManager.DestroyParticle(auraParticle ?? (-1 as ParticleID), true);
	} else if (particle != currentAuraParticle) {
		currentAuraParticle = particle;
		ParticleManager.DestroyParticle(auraParticle ?? (-1 as ParticleID), true);
		auraParticle = ParticleManager.CreateParticle(particle, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, thisEntity)
	}
}

function PlayAttack(cosmetic: string) {
	const cooldown = 1;
	const animList = ["vespera_attack_1", "vespera_attack_2", "vespera_attack_3", "vespera_attack_4"]
	let index = 0
	thisEntity.SetContextThink("attack", () => {
		if (index >= animList.length) {
			index = 0;
		}
		FireInputString(entities[heroName], "SetAnimationNotLooping", animList[index])
		index++
		return cooldown;
	}, cooldown);
}
function StopAttack() {
	thisEntity.StopThink("attack");
}