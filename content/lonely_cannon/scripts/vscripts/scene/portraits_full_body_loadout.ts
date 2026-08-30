/** @noSelfInFile */
// @ts-nocheck

declare let thisEntity: CBaseEntity & { unitname: string; };
let data = Client.GetSceneEntityData("portraits_full_body_loadout");
let unitName = data?.unitname ?? "";
let camera = data?.camera ?? "camera_1";

function Spawn(entityKeyValues: CScriptKeyValues) {
	let isUnit = KeyValues.units[unitName] !== undefined;
	let isHero = KeyValues.heroes[unitName] !== undefined;
	let tKV = KeyValues.units[unitName] ?? KeyValues.heroes[unitName];
	if (tKV == null) return;
	if (isUnit === false && isHero === false) return;
	let defaultData = KeyValues.portrait_full_body_loadout.default_entity_replacement;
	let tPortraitData = KeyValues.portrait_full_body_loadout[unitName] ?? defaultData;
	if (tPortraitData == null) return;
	let tCameraData = tPortraitData.cameras[camera] ?? tPortraitData.cameras.default ?? tPortraitData.cameras.Default;
	if (!tCameraData) return;
	if (tKV.Model2D == null && tKV.Model == null) return;

	let t: any = {};
	let tData: Record<string, string | number> = {
		parentname: "root",
		classname: "prop_dynamic",
		origin: "0 0 0",
		angles: "0 0 0",
		scales: "1 1 1",
		model: tKV.Model2D ?? tKV.Model,
		StartingAnim: KeyValues.portrait_full_body_loadout.DefaultActivity,
		add_modifier: "",
	};
	if (isUnit) {
		tData = {
			parentname: "root",
			classname: "portrait_world_unit",
			origin: "0 0 0",
			angles: "0 0 0",
			scales: "1 1 1",
			model: tKV.Model,
			EnableAutoStyles: 0,
			suppress_intro_effects: 1,
			spawn_background_models: 0,
			rare_loadout_anim_chance: -1,
			suppress_anim_event_sounds: 0,
			skip_pet_spawn: 0,
			flying_courier: 0,
			spawn_wearable_item_defs: 1,
			activity: "ACT_DOTA_CAPTURE",
			activity_modifier: "",
			item_def0: 0,
			style_index0: 0,
			item_def1: 0,
			style_index1: 0,
			item_def2: 0,
			style_index2: 0,
			item_def3: 0,
			style_index3: 0,
			item_def4: 0,
			style_index4: 0,
			item_def5: 0,
			style_index5: 0,
			item_def6: 0,
			style_index6: 0,
			item_def7: 0,
			style_index7: 0,
			rendercolor: "255 255 255",
		};
		const attachWearables = tKV?.Creature?.AttachWearables as Record<string, any> | undefined;
		if (attachWearables !== undefined) {
			const wearableKeys = Object.keys(attachWearables);
			wearableKeys.sort((left, right) => {
				const leftIndex = toFiniteNumber(left, 0);
				const rightIndex = toFiniteNumber(right, 0);
				return leftIndex - rightIndex;
			});
			let wearableIndex = 0;
			for (let i = 0; i < wearableKeys.length; i++) {
				const wearableData = attachWearables[wearableKeys[i]];
				if (wearableData === undefined) {
					continue;
				}
				const itemDef = wearableData.ItemDef;
				if (itemDef === undefined || itemDef === "") {
					continue;
				}
				tData["item_def" + wearableIndex] = tostring(itemDef);
				wearableIndex++;
			}
		}
	}

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