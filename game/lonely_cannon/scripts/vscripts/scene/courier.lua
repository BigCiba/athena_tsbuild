local __TSTL_FILE_PATH__ = "scene/courier"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 5,["5"] = 6,["6"] = 6,["7"] = 6,["8"] = 6,["10"] = 6,["11"] = 7,["12"] = 8,["13"] = 10,["14"] = 11,["15"] = 12,["18"] = 13,["19"] = 14,["20"] = 15,["21"] = 15,["22"] = 15,["24"] = 15,["25"] = 16,["28"] = 17,["29"] = 17,["30"] = 17,["32"] = 17,["33"] = 17,["34"] = 17,["36"] = 17,["37"] = 18,["40"] = 20,["41"] = 21,["42"] = 21,["43"] = 21,["44"] = 21,["45"] = 21,["46"] = 21,["47"] = 21,["48"] = 21,["49"] = 21,["50"] = 21,["51"] = 21,["52"] = 21,["53"] = 21,["54"] = 21,["55"] = 21,["56"] = 37,["57"] = 40,["58"] = 40,["59"] = 44,["60"] = 45,["61"] = 46,["62"] = 47,["63"] = 47,["64"] = 47,["66"] = 40,["67"] = 40,["68"] = 40,["69"] = 40,["70"] = 40,["71"] = 40,["72"] = 40,["73"] = 40,["74"] = 40,["75"] = 40,["76"] = 40,["77"] = 40,["78"] = 40,["79"] = 40,["80"] = 40,["81"] = 40,["82"] = 40,["83"] = 40,["84"] = 40,["85"] = 40,["86"] = 40,["87"] = 40,["88"] = 40,["89"] = 40,["90"] = 66,["91"] = 66,["92"] = 66,["93"] = 66,["95"] = 66,["96"] = 67,["97"] = 68,["98"] = 68,["99"] = 68,["100"] = 68,["102"] = 68,["103"] = 69,["104"] = 70,["105"] = 70,["106"] = 74,["107"] = 74,["108"] = 74,["110"] = 75,["111"] = 75,["112"] = 75,["114"] = 76,["115"] = 76,["116"] = 76,["118"] = 77,["119"] = 77,["120"] = 77,["122"] = 78,["123"] = 78,["124"] = 78,["126"] = 79,["127"] = 79,["128"] = 79,["130"] = 80,["131"] = 80,["132"] = 80,["134"] = 81,["135"] = 81,["136"] = 81,["138"] = 82,["139"] = 82,["140"] = 82,["142"] = 83,["143"] = 83,["144"] = 83,["146"] = 84,["147"] = 84,["148"] = 84,["150"] = 85,["151"] = 86,["152"] = 86,["153"] = 86,["155"] = 87,["156"] = 87,["157"] = 87,["159"] = 70,["160"] = 70,["161"] = 70,["162"] = 70,["163"] = 70,["164"] = 70,["165"] = 70,["166"] = 70,["167"] = 70,["168"] = 70,["169"] = 70,["170"] = 70,["171"] = 70,["172"] = 70,["173"] = 70,["174"] = 70,["175"] = 70,["176"] = 70,["177"] = 70,["178"] = 90,["179"] = 10});
data = Client:GetSceneEntityData("courier")
local ____tostring_3 = tostring
local ____temp_2 = data and data.id
if ____temp_2 == nil then
    ____temp_2 = ""
end
courierID = ____tostring_3(____temp_2)
scale = toFiniteNumber(data and data.scale, 1)
camera = "camera_1"
function Spawn(self, entityKeyValues)
    local tKV = KeyValues.units[courierID]
    if tKV == nil then
        return
    end
    local model = tKV.Model
    local defaultData = KeyValues.portrait_full_body_loadout.default_courier
    local ____KeyValues_portrait_full_body_loadout_model_6 = KeyValues.portrait_full_body_loadout[model]
    if ____KeyValues_portrait_full_body_loadout_model_6 == nil then
        ____KeyValues_portrait_full_body_loadout_model_6 = defaultData
    end
    local tPortraitData = ____KeyValues_portrait_full_body_loadout_model_6
    if tPortraitData == nil then
        return
    end
    local ____tPortraitData_cameras_camera_7 = tPortraitData.cameras[camera]
    if ____tPortraitData_cameras_camera_7 == nil then
        ____tPortraitData_cameras_camera_7 = tPortraitData.cameras.default
    end
    local ____tPortraitData_cameras_camera_7_8 = ____tPortraitData_cameras_camera_7
    if ____tPortraitData_cameras_camera_7_8 == nil then
        ____tPortraitData_cameras_camera_7_8 = tPortraitData.cameras.Default
    end
    local tCameraData = ____tPortraitData_cameras_camera_7_8
    if not tCameraData then
        return
    end
    local t = {}
    local tData = {
        parentname = "root",
        targetname = "courier",
        classname = "prop_dynamic",
        origin = "0 0 0",
        angles = "0 0 0",
        scales = (((tostring(scale) .. " ") .. tostring(scale)) .. " ") .. tostring(scale),
        model = model,
        rendertocubemaps = "1",
        lightmapstatic = "1",
        skin = tostring(tKV.Skin),
        add_modifier = "",
        StartingAnim = "ACT_DOTA_IDLE",
        StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING"
    }
    table.insert(t, tData)
    local ____table_insert_14 = table.insert
    local ____t_13 = t
    local ____tCameraData_PortraitPosition_10 = tCameraData.PortraitPosition
    local ____tCameraData_PortraitAngles_11 = tCameraData.PortraitAngles
    local ____tCameraData_PortraitFOV_12 = tCameraData.PortraitFOV
    local ____tCameraData_PortraitFar_9 = tCameraData.PortraitFar
    if ____tCameraData_PortraitFar_9 == nil then
        ____tCameraData_PortraitFar_9 = defaultData.cameras.default.PortraitFar
    end
    ____table_insert_14(____t_13, {
        classname = "point_camera",
        targetname = camera,
        origin = ____tCameraData_PortraitPosition_10,
        angles = ____tCameraData_PortraitAngles_11,
        fov = ____tCameraData_PortraitFOV_12,
        ZFar = ____tCameraData_PortraitFar_9,
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
    local ____StringToVector_16 = StringToVector
    local ____tPortraitData_PortraitSpecularDirection_15 = tPortraitData.PortraitSpecularDirection
    if ____tPortraitData_PortraitSpecularDirection_15 == nil then
        ____tPortraitData_PortraitSpecularDirection_15 = defaultData.PortraitSpecularDirection
    end
    local vSpecularDirection = ____StringToVector_16(____tPortraitData_PortraitSpecularDirection_15) or vec3_zero
    local aSpecularAngles = VectorToAngles(vSpecularDirection)
    local ____StringToVector_18 = StringToVector
    local ____tPortraitData_PortraitAmbientDirection_17 = tPortraitData.PortraitAmbientDirection
    if ____tPortraitData_PortraitAmbientDirection_17 == nil then
        ____tPortraitData_PortraitAmbientDirection_17 = defaultData.PortraitAmbientDirection
    end
    local vAmbientDirection = ____StringToVector_18(____tPortraitData_PortraitAmbientDirection_17) or vec3_zero
    local aAmbientAngles = VectorToAngles(vAmbientDirection)
    local ____table_insert_34 = table.insert
    local ____t_33 = t
    local ____tPortraitData_PortraitLightPosition_19 = tPortraitData.PortraitLightPosition
    if ____tPortraitData_PortraitLightPosition_19 == nil then
        ____tPortraitData_PortraitLightPosition_19 = defaultData.PortraitLightPosition
    end
    local ____tPortraitData_PortraitLightAngles_20 = tPortraitData.PortraitLightAngles
    if ____tPortraitData_PortraitLightAngles_20 == nil then
        ____tPortraitData_PortraitLightAngles_20 = defaultData.PortraitLightAngles
    end
    local ____tPortraitData_PortraitLightFOV_21 = tPortraitData.PortraitLightFOV
    if ____tPortraitData_PortraitLightFOV_21 == nil then
        ____tPortraitData_PortraitLightFOV_21 = defaultData.PortraitLightFOV
    end
    local ____tPortraitData_PortraitLightDistance_22 = tPortraitData.PortraitLightDistance
    if ____tPortraitData_PortraitLightDistance_22 == nil then
        ____tPortraitData_PortraitLightDistance_22 = defaultData.PortraitLightDistance
    end
    local ____tPortraitData_PortraitLightColor_23 = tPortraitData.PortraitLightColor
    if ____tPortraitData_PortraitLightColor_23 == nil then
        ____tPortraitData_PortraitLightColor_23 = defaultData.PortraitLightColor
    end
    local ____tPortraitData_PortraitShadowColor_24 = tPortraitData.PortraitShadowColor
    if ____tPortraitData_PortraitShadowColor_24 == nil then
        ____tPortraitData_PortraitShadowColor_24 = defaultData.PortraitShadowColor
    end
    local ____tPortraitData_PortraitShadowScale_25 = tPortraitData.PortraitShadowScale
    if ____tPortraitData_PortraitShadowScale_25 == nil then
        ____tPortraitData_PortraitShadowScale_25 = defaultData.PortraitShadowScale
    end
    local ____tPortraitData_PortraitAmbientColor_26 = tPortraitData.PortraitAmbientColor
    if ____tPortraitData_PortraitAmbientColor_26 == nil then
        ____tPortraitData_PortraitAmbientColor_26 = defaultData.PortraitAmbientColor
    end
    local ____tPortraitData_PortraitAmbientScale_27 = tPortraitData.PortraitAmbientScale
    if ____tPortraitData_PortraitAmbientScale_27 == nil then
        ____tPortraitData_PortraitAmbientScale_27 = defaultData.PortraitAmbientScale
    end
    local ____tPortraitData_PortraitSpecularColor_28 = tPortraitData.PortraitSpecularColor
    if ____tPortraitData_PortraitSpecularColor_28 == nil then
        ____tPortraitData_PortraitSpecularColor_28 = defaultData.PortraitSpecularColor
    end
    local ____tPortraitData_PortraitSpecularPower_29 = tPortraitData.PortraitSpecularPower
    if ____tPortraitData_PortraitSpecularPower_29 == nil then
        ____tPortraitData_PortraitSpecularPower_29 = defaultData.PortraitSpecularPower
    end
    local ____aSpecularAngles_32 = aSpecularAngles
    local ____tPortraitData_PortraitLightScale_30 = tPortraitData.PortraitLightScale
    if ____tPortraitData_PortraitLightScale_30 == nil then
        ____tPortraitData_PortraitLightScale_30 = defaultData.PortraitLightScale
    end
    local ____tPortraitData_PortraitGroundShadowScale_31 = tPortraitData.PortraitGroundShadowScale
    if ____tPortraitData_PortraitGroundShadowScale_31 == nil then
        ____tPortraitData_PortraitGroundShadowScale_31 = defaultData.PortraitGroundShadowScale
    end
    ____table_insert_34(____t_33, {
        classname = "env_global_light",
        targetname = "portrait_light",
        origin = ____tPortraitData_PortraitLightPosition_19,
        angles = ____tPortraitData_PortraitLightAngles_20,
        fov = ____tPortraitData_PortraitLightFOV_21,
        nearz = ____tPortraitData_PortraitLightDistance_22,
        Color = ____tPortraitData_PortraitLightColor_23,
        ambientcolor2 = ____tPortraitData_PortraitShadowColor_24,
        ambientscale2 = ____tPortraitData_PortraitShadowScale_25,
        ambientcolor1 = ____tPortraitData_PortraitAmbientColor_26,
        ambientscale1 = ____tPortraitData_PortraitAmbientScale_27,
        specularcolor = ____tPortraitData_PortraitSpecularColor_28,
        specularpower = ____tPortraitData_PortraitSpecularPower_29,
        specularangles = ____aSpecularAngles_32,
        lightscale = ____tPortraitData_PortraitLightScale_30,
        groundscale = ____tPortraitData_PortraitGroundShadowScale_31,
        ambientangles = aAmbientAngles
    })
    SpawnEntityListFromTableSynchronous(t)
end
