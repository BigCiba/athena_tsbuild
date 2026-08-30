local __TSTL_FILE_PATH__ = "scene/fish_rod_preview"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 5,["5"] = 6,["6"] = 6,["7"] = 6,["9"] = 6,["10"] = 7,["11"] = 7,["12"] = 7,["14"] = 7,["15"] = 8,["16"] = 10,["17"] = 11,["18"] = 11,["19"] = 11,["21"] = 11,["22"] = 12,["23"] = 12,["24"] = 12,["26"] = 12,["27"] = 13,["30"] = 14,["31"] = 14,["32"] = 14,["34"] = 14,["35"] = 14,["36"] = 14,["38"] = 14,["39"] = 15,["42"] = 17,["43"] = 18,["44"] = 18,["45"] = 18,["46"] = 18,["47"] = 18,["48"] = 18,["49"] = 18,["50"] = 18,["51"] = 18,["52"] = 18,["53"] = 29,["54"] = 32,["55"] = 32,["56"] = 36,["57"] = 37,["58"] = 38,["59"] = 39,["60"] = 39,["61"] = 39,["63"] = 32,["64"] = 32,["65"] = 32,["66"] = 32,["67"] = 32,["68"] = 32,["69"] = 32,["70"] = 32,["71"] = 32,["72"] = 32,["73"] = 32,["74"] = 32,["75"] = 32,["76"] = 32,["77"] = 32,["78"] = 32,["79"] = 32,["80"] = 32,["81"] = 32,["82"] = 32,["83"] = 32,["84"] = 32,["85"] = 32,["86"] = 32,["87"] = 58,["88"] = 58,["89"] = 58,["90"] = 58,["92"] = 58,["93"] = 59,["94"] = 60,["95"] = 60,["96"] = 60,["97"] = 60,["99"] = 60,["100"] = 61,["101"] = 62,["102"] = 62,["103"] = 65,["104"] = 65,["105"] = 65,["107"] = 66,["108"] = 66,["109"] = 66,["111"] = 67,["112"] = 67,["113"] = 67,["115"] = 68,["116"] = 68,["117"] = 68,["119"] = 69,["120"] = 69,["121"] = 69,["123"] = 70,["124"] = 70,["125"] = 70,["127"] = 71,["128"] = 71,["129"] = 71,["131"] = 72,["132"] = 72,["133"] = 72,["135"] = 73,["136"] = 73,["137"] = 73,["139"] = 74,["140"] = 74,["141"] = 74,["143"] = 75,["144"] = 75,["145"] = 75,["147"] = 76,["148"] = 77,["149"] = 77,["150"] = 77,["152"] = 78,["153"] = 78,["154"] = 78,["156"] = 62,["157"] = 62,["158"] = 62,["159"] = 62,["160"] = 62,["161"] = 62,["162"] = 62,["163"] = 62,["164"] = 62,["165"] = 62,["166"] = 62,["167"] = 62,["168"] = 62,["169"] = 62,["170"] = 62,["171"] = 62,["172"] = 62,["173"] = 62,["174"] = 62,["175"] = 81,["176"] = 10});
data = Client:GetSceneEntityData("fish_rod_preview")
local ____temp_2 = data and data.model
if ____temp_2 == nil then
    ____temp_2 = ""
end
model = ____temp_2
local ____temp_5 = data and data.default_config
if ____temp_5 == nil then
    ____temp_5 = ""
end
default_config = ____temp_5
camera = "camera_1"
function Spawn(self, entityKeyValues)
    local ____KeyValues_portraits_pod_default_config_6 = KeyValues.portraits_pod[default_config]
    if ____KeyValues_portraits_pod_default_config_6 == nil then
        ____KeyValues_portraits_pod_default_config_6 = KeyValues.portraits_pod.default
    end
    local defaultData = ____KeyValues_portraits_pod_default_config_6
    local ____KeyValues_portraits_pod_model_7 = KeyValues.portraits_pod[model]
    if ____KeyValues_portraits_pod_model_7 == nil then
        ____KeyValues_portraits_pod_model_7 = defaultData
    end
    local tPortraitData = ____KeyValues_portraits_pod_model_7
    if tPortraitData == nil then
        return
    end
    local ____tPortraitData_cameras_camera_8 = tPortraitData.cameras[camera]
    if ____tPortraitData_cameras_camera_8 == nil then
        ____tPortraitData_cameras_camera_8 = tPortraitData.cameras.default
    end
    local ____tPortraitData_cameras_camera_8_9 = ____tPortraitData_cameras_camera_8
    if ____tPortraitData_cameras_camera_8_9 == nil then
        ____tPortraitData_cameras_camera_8_9 = tPortraitData.cameras.Default
    end
    local tCameraData = ____tPortraitData_cameras_camera_8_9
    if not tCameraData then
        return
    end
    local t = {}
    local tData = {
        parentname = "root",
        classname = "prop_dynamic",
        origin = "0 0 0",
        angles = "0 0 0",
        scales = "1 1 1",
        model = model,
        StartingAnim = "ACT_DOTA_LOADOUT",
        add_modifier = ""
    }
    table.insert(t, tData)
    local ____table_insert_15 = table.insert
    local ____t_14 = t
    local ____tCameraData_PortraitPosition_11 = tCameraData.PortraitPosition
    local ____tCameraData_PortraitAngles_12 = tCameraData.PortraitAngles
    local ____tCameraData_PortraitFOV_13 = tCameraData.PortraitFOV
    local ____tCameraData_PortraitFar_10 = tCameraData.PortraitFar
    if ____tCameraData_PortraitFar_10 == nil then
        ____tCameraData_PortraitFar_10 = defaultData.cameras.default.PortraitFar
    end
    ____table_insert_15(____t_14, {
        classname = "point_camera",
        targetname = camera,
        origin = ____tCameraData_PortraitPosition_11,
        angles = ____tCameraData_PortraitAngles_12,
        fov = ____tCameraData_PortraitFOV_13,
        ZFar = ____tCameraData_PortraitFar_10,
        ZNear = 4,
        UseScreenAspectRatio = 0,
        aspectRatio = 0,
        fogEnable = 0,
        fogColor = "0 0 0",
        fogStart = 2048,
        fogEnd = 4096,
        fogMaxDensity = 1,
        rendercolor = "128 128 128",
        override_shadow_farz = 0,
        dof_enabled = 0,
        dof_near_blurry = 250,
        dof_near_crisp = 550,
        dac_dof_far_crisp = 1200,
        dac_dof_far_blurry = 1600,
        dac_dof_tilt_to_ground = 0.75
    })
    local ____StringToVector_17 = StringToVector
    local ____tPortraitData_PortraitSpecularDirection_16 = tPortraitData.PortraitSpecularDirection
    if ____tPortraitData_PortraitSpecularDirection_16 == nil then
        ____tPortraitData_PortraitSpecularDirection_16 = defaultData.PortraitSpecularDirection
    end
    local vSpecularDirection = ____StringToVector_17(____tPortraitData_PortraitSpecularDirection_16) or vec3_zero
    local aSpecularAngles = VectorToAngles(vSpecularDirection)
    local ____StringToVector_19 = StringToVector
    local ____tPortraitData_PortraitAmbientDirection_18 = tPortraitData.PortraitAmbientDirection
    if ____tPortraitData_PortraitAmbientDirection_18 == nil then
        ____tPortraitData_PortraitAmbientDirection_18 = defaultData.PortraitAmbientDirection
    end
    local vAmbientDirection = ____StringToVector_19(____tPortraitData_PortraitAmbientDirection_18) or vec3_zero
    local aAmbientAngles = VectorToAngles(vAmbientDirection)
    local ____table_insert_35 = table.insert
    local ____t_34 = t
    local ____tPortraitData_PortraitLightPosition_20 = tPortraitData.PortraitLightPosition
    if ____tPortraitData_PortraitLightPosition_20 == nil then
        ____tPortraitData_PortraitLightPosition_20 = defaultData.PortraitLightPosition
    end
    local ____tPortraitData_PortraitLightAngles_21 = tPortraitData.PortraitLightAngles
    if ____tPortraitData_PortraitLightAngles_21 == nil then
        ____tPortraitData_PortraitLightAngles_21 = defaultData.PortraitLightAngles
    end
    local ____tPortraitData_PortraitLightFOV_22 = tPortraitData.PortraitLightFOV
    if ____tPortraitData_PortraitLightFOV_22 == nil then
        ____tPortraitData_PortraitLightFOV_22 = defaultData.PortraitLightFOV
    end
    local ____tPortraitData_PortraitLightDistance_23 = tPortraitData.PortraitLightDistance
    if ____tPortraitData_PortraitLightDistance_23 == nil then
        ____tPortraitData_PortraitLightDistance_23 = defaultData.PortraitLightDistance
    end
    local ____tPortraitData_PortraitLightColor_24 = tPortraitData.PortraitLightColor
    if ____tPortraitData_PortraitLightColor_24 == nil then
        ____tPortraitData_PortraitLightColor_24 = defaultData.PortraitLightColor
    end
    local ____tPortraitData_PortraitShadowColor_25 = tPortraitData.PortraitShadowColor
    if ____tPortraitData_PortraitShadowColor_25 == nil then
        ____tPortraitData_PortraitShadowColor_25 = defaultData.PortraitShadowColor
    end
    local ____tPortraitData_PortraitShadowScale_26 = tPortraitData.PortraitShadowScale
    if ____tPortraitData_PortraitShadowScale_26 == nil then
        ____tPortraitData_PortraitShadowScale_26 = defaultData.PortraitShadowScale
    end
    local ____tPortraitData_PortraitAmbientColor_27 = tPortraitData.PortraitAmbientColor
    if ____tPortraitData_PortraitAmbientColor_27 == nil then
        ____tPortraitData_PortraitAmbientColor_27 = defaultData.PortraitAmbientColor
    end
    local ____tPortraitData_PortraitAmbientScale_28 = tPortraitData.PortraitAmbientScale
    if ____tPortraitData_PortraitAmbientScale_28 == nil then
        ____tPortraitData_PortraitAmbientScale_28 = defaultData.PortraitAmbientScale
    end
    local ____tPortraitData_PortraitSpecularColor_29 = tPortraitData.PortraitSpecularColor
    if ____tPortraitData_PortraitSpecularColor_29 == nil then
        ____tPortraitData_PortraitSpecularColor_29 = defaultData.PortraitSpecularColor
    end
    local ____tPortraitData_PortraitSpecularPower_30 = tPortraitData.PortraitSpecularPower
    if ____tPortraitData_PortraitSpecularPower_30 == nil then
        ____tPortraitData_PortraitSpecularPower_30 = defaultData.PortraitSpecularPower
    end
    local ____aSpecularAngles_33 = aSpecularAngles
    local ____tPortraitData_PortraitLightScale_31 = tPortraitData.PortraitLightScale
    if ____tPortraitData_PortraitLightScale_31 == nil then
        ____tPortraitData_PortraitLightScale_31 = defaultData.PortraitLightScale
    end
    local ____tPortraitData_PortraitGroundShadowScale_32 = tPortraitData.PortraitGroundShadowScale
    if ____tPortraitData_PortraitGroundShadowScale_32 == nil then
        ____tPortraitData_PortraitGroundShadowScale_32 = defaultData.PortraitGroundShadowScale
    end
    ____table_insert_35(____t_34, {
        classname = "env_global_light",
        targetname = "portrait_light",
        origin = ____tPortraitData_PortraitLightPosition_20,
        angles = ____tPortraitData_PortraitLightAngles_21,
        fov = ____tPortraitData_PortraitLightFOV_22,
        nearz = ____tPortraitData_PortraitLightDistance_23,
        Color = ____tPortraitData_PortraitLightColor_24,
        ambientcolor2 = ____tPortraitData_PortraitShadowColor_25,
        ambientscale2 = ____tPortraitData_PortraitShadowScale_26,
        ambientcolor1 = ____tPortraitData_PortraitAmbientColor_27,
        ambientscale1 = ____tPortraitData_PortraitAmbientScale_28,
        specularcolor = ____tPortraitData_PortraitSpecularColor_29,
        specularpower = ____tPortraitData_PortraitSpecularPower_30,
        specularangles = ____aSpecularAngles_33,
        lightscale = ____tPortraitData_PortraitLightScale_31,
        groundscale = ____tPortraitData_PortraitGroundShadowScale_32,
        ambientangles = aAmbientAngles
    })
    SpawnEntityListFromTableSynchronous(t)
end
