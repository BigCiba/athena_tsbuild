/** @noSelfInFile */
// @ts-nocheck

declare let thisEntity: CBaseEntity & { unitname: string; };
let data = Client.GetSceneEntityData("weapon_3d_preview");
let model = data?.model ?? "";
let default_config = data?.default_config ?? "";
let camera = "camera_1";

function Spawn(entityKeyValues: CScriptKeyValues) {
	let defaultData = KeyValues.portraits_weapon[default_config] ?? KeyValues.portraits_weapon.default;
	let tPortraitData = KeyValues.portraits_weapon[model] ?? defaultData;
	if (tPortraitData == null) return;
	let tCameraData = tPortraitData.cameras[camera] ?? tPortraitData.cameras.default ?? tPortraitData.cameras.Default;
	if (!tCameraData) return;

	let t: any = {};
	let tData: Record<string, string | number> = {
		parentname: "root",
		classname: "prop_dynamic",
		origin: "0 0 0",
		angles: "0 0 0",
		scales: "1 1 1",
		model: model,
		StartingAnim: "ACT_DOTA_LOADOUT",
		StartingAnimationLoopMode: "ANIM_LOOP_MODE_LOOPING",
		add_modifier: "",
	};

	table.insert(t, tData);

	// 摄像头
	table.insert(t, {
		// parentname: "root",
		classname: "point_camera",
		targetname: camera,
		origin: tCameraData.PortraitPosition,
		angles: tCameraData.PortraitAngles,
		fov: tCameraData.PortraitFOV,
		ZFar: tCameraData.PortraitFar ?? defaultData.cameras.default.PortraitFar,
		ZNear: 4,
		UseScreenAspectRatio: 0,
		aspectRatio: 0,
		fogEnable: 0,
		fogColor: "0 0 0",
		fogStart: 2048,
		fogEnd: 4096,
		fogMaxDensity: 1,
		rendercolor: "128 128 128",
		override_shadow_farz: 0,
		dof_enabled: 0,
		dof_near_blurry: 250,
		dof_near_crisp: 550,
		dac_dof_far_crisp: 1200,
		dac_dof_far_blurry: 1600,
		dac_dof_tilt_to_ground: 0.75,
	});
	// 光源
	let vSpecularDirection = StringToVector(tPortraitData.PortraitSpecularDirection ?? defaultData.PortraitSpecularDirection) ?? vec3_zero;
	let aSpecularAngles = VectorToAngles(vSpecularDirection);
	let vAmbientDirection = StringToVector(tPortraitData.PortraitAmbientDirection ?? defaultData.PortraitAmbientDirection) ?? vec3_zero;
	let aAmbientAngles = VectorToAngles(vAmbientDirection);
	table.insert(t, {
		// parentname: "root",
		classname: "env_global_light",
		targetname: "portrait_light",
		origin: tPortraitData.PortraitLightPosition ?? defaultData.PortraitLightPosition,
		angles: tPortraitData.PortraitLightAngles ?? defaultData.PortraitLightAngles,
		fov: tPortraitData.PortraitLightFOV ?? defaultData.PortraitLightFOV,
		nearz: tPortraitData.PortraitLightDistance ?? defaultData.PortraitLightDistance,
		Color: tPortraitData.PortraitLightColor ?? defaultData.PortraitLightColor,
		ambientcolor2: tPortraitData.PortraitShadowColor ?? defaultData.PortraitShadowColor,
		ambientscale2: tPortraitData.PortraitShadowScale ?? defaultData.PortraitShadowScale,
		ambientcolor1: tPortraitData.PortraitAmbientColor ?? defaultData.PortraitAmbientColor,
		ambientscale1: tPortraitData.PortraitAmbientScale ?? defaultData.PortraitAmbientScale,
		specularcolor: tPortraitData.PortraitSpecularColor ?? defaultData.PortraitSpecularColor,
		specularpower: tPortraitData.PortraitSpecularPower ?? defaultData.PortraitSpecularPower,
		specularangles: aSpecularAngles,
		lightscale: tPortraitData.PortraitLightScale ?? defaultData.PortraitLightScale,
		groundscale: tPortraitData.PortraitGroundShadowScale ?? defaultData.PortraitGroundShadowScale,
		ambientangles: aAmbientAngles,
	});
	SpawnEntityListFromTableSynchronous(t);
}