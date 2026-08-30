local __TSTL_FILE_PATH__ = "scene/fish_3d_preview"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 5,["5"] = 6,["6"] = 6,["7"] = 6,["9"] = 6,["10"] = 7,["12"] = 7,["14"] = 7,["15"] = 7,["16"] = 7,["18"] = 7,["19"] = 8,["20"] = 8,["21"] = 8,["23"] = 8,["24"] = 9,["25"] = 11,["26"] = 12,["27"] = 12,["28"] = 12,["30"] = 12,["31"] = 13,["32"] = 13,["33"] = 13,["35"] = 13,["36"] = 14,["39"] = 15,["40"] = 15,["41"] = 15,["43"] = 15,["44"] = 15,["45"] = 15,["47"] = 15,["48"] = 16,["51"] = 18,["52"] = 19,["53"] = 19,["54"] = 19,["55"] = 19,["56"] = 19,["57"] = 19,["58"] = 19,["59"] = 19,["60"] = 19,["61"] = 19,["62"] = 30,["63"] = 33,["64"] = 33,["65"] = 37,["66"] = 38,["67"] = 39,["68"] = 40,["69"] = 40,["70"] = 40,["72"] = 33,["73"] = 33,["74"] = 33,["75"] = 33,["76"] = 33,["77"] = 33,["78"] = 33,["79"] = 33,["80"] = 33,["81"] = 33,["82"] = 33,["83"] = 33,["84"] = 33,["85"] = 33,["86"] = 33,["87"] = 33,["88"] = 33,["89"] = 33,["90"] = 33,["91"] = 33,["92"] = 33,["93"] = 33,["94"] = 33,["95"] = 33,["96"] = 59,["97"] = 59,["98"] = 59,["99"] = 59,["101"] = 59,["102"] = 60,["103"] = 61,["104"] = 61,["105"] = 61,["106"] = 61,["108"] = 61,["109"] = 62,["110"] = 63,["111"] = 63,["112"] = 67,["113"] = 67,["114"] = 67,["116"] = 68,["117"] = 68,["118"] = 68,["120"] = 69,["121"] = 69,["122"] = 69,["124"] = 70,["125"] = 70,["126"] = 70,["128"] = 71,["129"] = 71,["130"] = 71,["132"] = 72,["133"] = 72,["134"] = 72,["136"] = 73,["137"] = 73,["138"] = 73,["140"] = 74,["141"] = 74,["142"] = 74,["144"] = 75,["145"] = 75,["146"] = 75,["148"] = 76,["149"] = 76,["150"] = 76,["152"] = 77,["153"] = 77,["154"] = 77,["156"] = 78,["157"] = 79,["158"] = 79,["159"] = 79,["161"] = 80,["162"] = 80,["163"] = 80,["165"] = 63,["166"] = 63,["167"] = 63,["168"] = 63,["169"] = 63,["170"] = 63,["171"] = 63,["172"] = 63,["173"] = 63,["174"] = 63,["175"] = 63,["176"] = 63,["177"] = 63,["178"] = 63,["179"] = 63,["180"] = 63,["181"] = 63,["182"] = 63,["183"] = 63,["184"] = 83,["185"] = 11});
data = Client:GetSceneEntityData("fish_3d_preview")
local ____temp_2 = data and data.fishID
if ____temp_2 == nil then
    ____temp_2 = ""
end
fishID = ____temp_2
local ____opt_3 = KeyValues.collection[fishID]
if ____opt_3 ~= nil then
    ____opt_3 = ____opt_3.model
end
local ____opt_3_5 = ____opt_3
if ____opt_3_5 == nil then
    ____opt_3_5 = ""
end
model = ____opt_3_5
local ____temp_8 = data and data.default_config
if ____temp_8 == nil then
    ____temp_8 = ""
end
default_config = ____temp_8
camera = "camera_1"
function Spawn(self, entityKeyValues)
    local ____KeyValues_portraits_fish_default_config_9 = KeyValues.portraits_fish[default_config]
    if ____KeyValues_portraits_fish_default_config_9 == nil then
        ____KeyValues_portraits_fish_default_config_9 = KeyValues.portraits_fish.default
    end
    local defaultData = ____KeyValues_portraits_fish_default_config_9
    local ____KeyValues_portraits_fish_model_10 = KeyValues.portraits_fish[model]
    if ____KeyValues_portraits_fish_model_10 == nil then
        ____KeyValues_portraits_fish_model_10 = defaultData
    end
    local tPortraitData = ____KeyValues_portraits_fish_model_10
    if tPortraitData == nil then
        return
    end
    local ____tPortraitData_cameras_camera_11 = tPortraitData.cameras[camera]
    if ____tPortraitData_cameras_camera_11 == nil then
        ____tPortraitData_cameras_camera_11 = tPortraitData.cameras.default
    end
    local ____tPortraitData_cameras_camera_11_12 = ____tPortraitData_cameras_camera_11
    if ____tPortraitData_cameras_camera_11_12 == nil then
        ____tPortraitData_cameras_camera_11_12 = tPortraitData.cameras.Default
    end
    local tCameraData = ____tPortraitData_cameras_camera_11_12
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
    local ____table_insert_18 = table.insert
    local ____t_17 = t
    local ____tCameraData_PortraitPosition_14 = tCameraData.PortraitPosition
    local ____tCameraData_PortraitAngles_15 = tCameraData.PortraitAngles
    local ____tCameraData_PortraitFOV_16 = tCameraData.PortraitFOV
    local ____tCameraData_PortraitFar_13 = tCameraData.PortraitFar
    if ____tCameraData_PortraitFar_13 == nil then
        ____tCameraData_PortraitFar_13 = defaultData.cameras.default.PortraitFar
    end
    ____table_insert_18(____t_17, {
        classname = "point_camera",
        targetname = camera,
        origin = ____tCameraData_PortraitPosition_14,
        angles = ____tCameraData_PortraitAngles_15,
        fov = ____tCameraData_PortraitFOV_16,
        ZFar = ____tCameraData_PortraitFar_13,
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
    local ____StringToVector_20 = StringToVector
    local ____tPortraitData_PortraitSpecularDirection_19 = tPortraitData.PortraitSpecularDirection
    if ____tPortraitData_PortraitSpecularDirection_19 == nil then
        ____tPortraitData_PortraitSpecularDirection_19 = defaultData.PortraitSpecularDirection
    end
    local vSpecularDirection = ____StringToVector_20(____tPortraitData_PortraitSpecularDirection_19) or vec3_zero
    local aSpecularAngles = VectorToAngles(vSpecularDirection)
    local ____StringToVector_22 = StringToVector
    local ____tPortraitData_PortraitAmbientDirection_21 = tPortraitData.PortraitAmbientDirection
    if ____tPortraitData_PortraitAmbientDirection_21 == nil then
        ____tPortraitData_PortraitAmbientDirection_21 = defaultData.PortraitAmbientDirection
    end
    local vAmbientDirection = ____StringToVector_22(____tPortraitData_PortraitAmbientDirection_21) or vec3_zero
    local aAmbientAngles = VectorToAngles(vAmbientDirection)
    local ____table_insert_38 = table.insert
    local ____t_37 = t
    local ____tPortraitData_PortraitLightPosition_23 = tPortraitData.PortraitLightPosition
    if ____tPortraitData_PortraitLightPosition_23 == nil then
        ____tPortraitData_PortraitLightPosition_23 = defaultData.PortraitLightPosition
    end
    local ____tPortraitData_PortraitLightAngles_24 = tPortraitData.PortraitLightAngles
    if ____tPortraitData_PortraitLightAngles_24 == nil then
        ____tPortraitData_PortraitLightAngles_24 = defaultData.PortraitLightAngles
    end
    local ____tPortraitData_PortraitLightFOV_25 = tPortraitData.PortraitLightFOV
    if ____tPortraitData_PortraitLightFOV_25 == nil then
        ____tPortraitData_PortraitLightFOV_25 = defaultData.PortraitLightFOV
    end
    local ____tPortraitData_PortraitLightDistance_26 = tPortraitData.PortraitLightDistance
    if ____tPortraitData_PortraitLightDistance_26 == nil then
        ____tPortraitData_PortraitLightDistance_26 = defaultData.PortraitLightDistance
    end
    local ____tPortraitData_PortraitLightColor_27 = tPortraitData.PortraitLightColor
    if ____tPortraitData_PortraitLightColor_27 == nil then
        ____tPortraitData_PortraitLightColor_27 = defaultData.PortraitLightColor
    end
    local ____tPortraitData_PortraitShadowColor_28 = tPortraitData.PortraitShadowColor
    if ____tPortraitData_PortraitShadowColor_28 == nil then
        ____tPortraitData_PortraitShadowColor_28 = defaultData.PortraitShadowColor
    end
    local ____tPortraitData_PortraitShadowScale_29 = tPortraitData.PortraitShadowScale
    if ____tPortraitData_PortraitShadowScale_29 == nil then
        ____tPortraitData_PortraitShadowScale_29 = defaultData.PortraitShadowScale
    end
    local ____tPortraitData_PortraitAmbientColor_30 = tPortraitData.PortraitAmbientColor
    if ____tPortraitData_PortraitAmbientColor_30 == nil then
        ____tPortraitData_PortraitAmbientColor_30 = defaultData.PortraitAmbientColor
    end
    local ____tPortraitData_PortraitAmbientScale_31 = tPortraitData.PortraitAmbientScale
    if ____tPortraitData_PortraitAmbientScale_31 == nil then
        ____tPortraitData_PortraitAmbientScale_31 = defaultData.PortraitAmbientScale
    end
    local ____tPortraitData_PortraitSpecularColor_32 = tPortraitData.PortraitSpecularColor
    if ____tPortraitData_PortraitSpecularColor_32 == nil then
        ____tPortraitData_PortraitSpecularColor_32 = defaultData.PortraitSpecularColor
    end
    local ____tPortraitData_PortraitSpecularPower_33 = tPortraitData.PortraitSpecularPower
    if ____tPortraitData_PortraitSpecularPower_33 == nil then
        ____tPortraitData_PortraitSpecularPower_33 = defaultData.PortraitSpecularPower
    end
    local ____aSpecularAngles_36 = aSpecularAngles
    local ____tPortraitData_PortraitLightScale_34 = tPortraitData.PortraitLightScale
    if ____tPortraitData_PortraitLightScale_34 == nil then
        ____tPortraitData_PortraitLightScale_34 = defaultData.PortraitLightScale
    end
    local ____tPortraitData_PortraitGroundShadowScale_35 = tPortraitData.PortraitGroundShadowScale
    if ____tPortraitData_PortraitGroundShadowScale_35 == nil then
        ____tPortraitData_PortraitGroundShadowScale_35 = defaultData.PortraitGroundShadowScale
    end
    ____table_insert_38(____t_37, {
        classname = "env_global_light",
        targetname = "portrait_light",
        origin = ____tPortraitData_PortraitLightPosition_23,
        angles = ____tPortraitData_PortraitLightAngles_24,
        fov = ____tPortraitData_PortraitLightFOV_25,
        nearz = ____tPortraitData_PortraitLightDistance_26,
        Color = ____tPortraitData_PortraitLightColor_27,
        ambientcolor2 = ____tPortraitData_PortraitShadowColor_28,
        ambientscale2 = ____tPortraitData_PortraitShadowScale_29,
        ambientcolor1 = ____tPortraitData_PortraitAmbientColor_30,
        ambientscale1 = ____tPortraitData_PortraitAmbientScale_31,
        specularcolor = ____tPortraitData_PortraitSpecularColor_32,
        specularpower = ____tPortraitData_PortraitSpecularPower_33,
        specularangles = ____aSpecularAngles_36,
        lightscale = ____tPortraitData_PortraitLightScale_34,
        groundscale = ____tPortraitData_PortraitGroundShadowScale_35,
        ambientangles = aAmbientAngles
    })
    SpawnEntityListFromTableSynchronous(t)
end
