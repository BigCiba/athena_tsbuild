/** @noSelfInFile */
// @ts-nocheck

declare let thisEntity: CBaseEntity;

const entityName = "cosmetic_3d_preview";
const data = Client.GetSceneEntityData(entityName);
const cosmeticID = tostring(data?.cosmetic_id ?? "");
const cosmeticData = KeyValues.info_item_cosmetic[cosmeticID];
const camera = "camera_1";

interface CosmeticCameraConfig {
	distance: number;
	height: number;
	fov: number;
}

// 穿戴模型沿用英雄骨骼空间原点，按装备部位对准其常见骨骼高度。
const defaultCameraConfig: CosmeticCameraConfig = { distance: 800, height: 90, fov: 20 };
const cameraConfigByType: Record<string, CosmeticCameraConfig> = {
	[COSMETIC_TYPE.HEAD]: { distance: 650, height: 175, fov: 18 },
	[COSMETIC_TYPE.SHOULDER]: { distance: 750, height: 125, fov: 20 },
	[COSMETIC_TYPE.BACK]: { distance: 900, height: 105, fov: 24 },
	[COSMETIC_TYPE.TAIL]: { distance: 800, height: 65, fov: 22 },
	[COSMETIC_TYPE.WING]: { distance: 1000, height: 115, fov: 26 },
	[COSMETIC_TYPE.MISC]: defaultCameraConfig,
};

function Spawn(entityKeyValues: CScriptKeyValues) {
	if (cosmeticData?.model == undefined) return;

	SpawnEntityFromTableSynchronous("prop_dynamic_clientside", {
		parentname: "root",
		targetname: cosmeticID,
		origin: "0 0 0",
		angles: "0 0 0",
		scales: "1 1 1",
		model: cosmeticData.model,
		StartingAnim: "ACT_DOTA_IDLE",
		StartingAnimationLoopMode: "ANIM_LOOP_MODE_LOOPING",
	});

	// Scene VScript 中的 prop_dynamic_clientside 不提供包围盒 API，因此按饰品类型使用构图预设。
	const cameraConfig = cameraConfigByType[tostring(cosmeticData.type)] ?? defaultCameraConfig;
	const defaultLight = KeyValues.portraits_weapon.default;

	const entities: any = {};
	table.insert(entities, {
		classname: "point_camera",
		targetname: camera,
		origin: `${cameraConfig.distance} 0 ${cameraConfig.height}`,
		angles: "0 180 0",
		fov: cameraConfig.fov,
		ZFar: math.max(1600, cameraConfig.distance + 800),
		ZNear: 4,
		UseScreenAspectRatio: 0,
		aspectRatio: 0,
		fogEnable: 0,
		dof_enabled: 0,
	});

	const specularDirection = StringToVector(defaultLight.PortraitSpecularDirection) ?? vec3_zero;
	const ambientDirection = StringToVector(defaultLight.PortraitAmbientDirection) ?? vec3_zero;
	table.insert(entities, {
		classname: "env_global_light",
		targetname: "portrait_light",
		origin: defaultLight.PortraitLightPosition,
		angles: defaultLight.PortraitLightAngles,
		fov: defaultLight.PortraitLightFOV,
		nearz: defaultLight.PortraitLightDistance,
		Color: defaultLight.PortraitLightColor,
		ambientcolor2: defaultLight.PortraitShadowColor,
		ambientscale2: defaultLight.PortraitShadowScale,
		ambientcolor1: defaultLight.PortraitAmbientColor,
		ambientscale1: defaultLight.PortraitAmbientScale,
		specularcolor: defaultLight.PortraitSpecularColor,
		specularpower: defaultLight.PortraitSpecularPower,
		specularangles: VectorToAngles(specularDirection),
		lightscale: defaultLight.PortraitLightScale,
		groundscale: defaultLight.PortraitGroundShadowScale,
		ambientangles: VectorToAngles(ambientDirection),
	});
	SpawnEntityListFromTableSynchronous(entities);
}
