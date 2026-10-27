import { EOMModifier, registerEOMModifier } from "../eom_modifier/eom_modifier";

/** 眩晕由状态系统持有，modifier_common 统一桥接引擎状态。 */
@registerEOMModifier()
export class modifier_athena_stunned extends EOMModifier {
	IsHidden() { return false; }
	IsDebuff() { return true; }
	IsPurgable() { return false; }
	IsPurgeException() { return true; }
	IsStunDebuff() { return true; }
	IgnoreTenacity() { return true; }
	EventListener(): Partial<EventListenerMap> { return { game_reset: ({ runId }) => { if (runId === GameState.GetSession().runId) this.Destroy(); } }; }
	StaticState() { return { [StateEnum.STUNNED]: true }; }
	GetEffectName() { return "particles/generic_gameplay/generic_stunned.vpcf"; }
	GetEffectAttachType() { return ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW; }
}
