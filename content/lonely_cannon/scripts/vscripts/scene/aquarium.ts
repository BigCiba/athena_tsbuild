// @ts-nocheck

const particleIDList = [] as ParticleID[];
const entList: Record<string, EntityIndex> = {};
function Spawn(params: any) {
	for (const [k, v] of pairs(KeyValues.collection)) {
		if (((v.type ?? "") as string) == "fish") {
			const ent = SpawnEntityFromTableSynchronous("prop_dynamic", {
				targetname: "portraitUnit",
				origin: "10000 0 0",
				model: v.model,
			});
			entList[k] = ent.entindex();
		}
	}
	RequestEvent("get_fish_ent", () => {
		return { entindex: thisEntity.entindex(), fishEntList: entList };
	});
}
function UpdateOnRemove(params: any) {
	particleIDList.forEach((particleID) => {
		ParticleManager.DestroyParticle(particleID, false);
	});
	for (const [name, entindex] of pairs(entList)) {
		const ent = EntIndexToHScript(entindex);
		if (IsValid(ent)) {
			ent.RemoveSelf();
		}
	}
}