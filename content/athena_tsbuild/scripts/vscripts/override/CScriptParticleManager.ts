declare interface CScriptParticleManager {
	CreateParticle_Engine: typeof CScriptParticleManager.CreateParticle;
	CreateParticleForce: typeof CScriptParticleManager.CreateParticle;
}
if (CScriptParticleManager.CreateParticle_Engine == undefined) {
	CScriptParticleManager.CreateParticle_Engine = CScriptParticleManager.CreateParticle;
}


/**
 * 减少客户端特效
 * @param particleName 粒子名称
 * @param attachment 附着点
 * @param owner 所有者
 */
CScriptParticleManager.CreateParticle = function (particleName: string, attachment: number, owner: CBaseEntity | undefined) {
	let playerID = IsServer() ? -1 : GetLocalPlayerID();
	if (IsServer() && IsValid(owner) && (owner as CDOTA_BaseNPC).GetPlayerOwnerID != undefined) {
		let _playerID = (owner as CDOTA_BaseNPC).GetPlayerOwnerID();
		if (PlayerResource.IsValidPlayerID(_playerID)) {
			playerID = _playerID;
		}
	}
	if (ParticleClear.CanCreate(playerID)) {
		ParticleClear.Record(playerID);
		// if (Cosmetic != undefined) {
		// 	particleName = Cosmetic.GetParticleReplacement(owner, particleName);
		// }
		return ParticleManager.CreateParticle_Engine(particleName, attachment, owner);
	}
	return -1 as ParticleID;
};
CScriptParticleManager.CreateParticleForce = function (particleName: string, attachment: number, owner: CBaseEntity | undefined) {
	// if (Cosmetic != undefined) {
	// 	particleName = Cosmetic.GetParticleReplacement(owner, particleName);
	// }
	return ParticleManager.CreateParticle_Engine(particleName, attachment, owner);
};
