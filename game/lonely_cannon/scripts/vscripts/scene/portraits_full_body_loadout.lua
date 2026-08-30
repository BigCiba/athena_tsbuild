local __TSTL_FILE_PATH__ = "scene/portraits_full_body_loadout"
local ____lualib = require("lualib_bundle")
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 5,["7"] = 6,["8"] = 6,["9"] = 6,["11"] = 6,["12"] = 7,["13"] = 7,["14"] = 7,["16"] = 7,["17"] = 9,["18"] = 10,["19"] = 11,["20"] = 12,["21"] = 12,["22"] = 12,["24"] = 12,["25"] = 13,["28"] = 14,["31"] = 15,["32"] = 16,["33"] = 16,["34"] = 16,["36"] = 16,["37"] = 17,["40"] = 18,["41"] = 18,["42"] = 18,["44"] = 18,["45"] = 18,["46"] = 18,["48"] = 18,["49"] = 19,["52"] = 20,["55"] = 22,["56"] = 29,["57"] = 29,["58"] = 29,["60"] = 23,["61"] = 23,["62"] = 23,["63"] = 23,["64"] = 23,["65"] = 23,["66"] = 23,["67"] = 23,["68"] = 23,["69"] = 23,["70"] = 33,["71"] = 34,["72"] = 34,["73"] = 34,["74"] = 34,["75"] = 34,["76"] = 34,["77"] = 34,["78"] = 34,["79"] = 34,["80"] = 34,["81"] = 34,["82"] = 34,["83"] = 34,["84"] = 34,["85"] = 34,["86"] = 34,["87"] = 34,["88"] = 34,["89"] = 34,["90"] = 34,["91"] = 34,["92"] = 34,["93"] = 34,["94"] = 34,["95"] = 34,["96"] = 34,["97"] = 34,["98"] = 34,["99"] = 34,["100"] = 34,["101"] = 34,["102"] = 34,["103"] = 34,["104"] = 34,["105"] = 34,["107"] = 69,["108"] = 69,["112"] = 69,["114"] = 69,["115"] = 70,["116"] = 71,["117"] = 72,["118"] = 72,["119"] = 72,["120"] = 73,["121"] = 74,["122"] = 75,["123"] = 72,["124"] = 72,["125"] = 77,["127"] = 78,["128"] = 78,["130"] = 79,["131"] = 80,["132"] = 81,["134"] = 83,["135"] = 84,["136"] = 85,["138"] = 87,["139"] = 88,["142"] = 78,["147"] = 93,["148"] = 96,["149"] = 96,["150"] = 100,["151"] = 101,["152"] = 102,["153"] = 103,["154"] = 103,["155"] = 103,["157"] = 96,["158"] = 96,["159"] = 96,["160"] = 96,["161"] = 96,["162"] = 96,["163"] = 96,["164"] = 96,["165"] = 96,["166"] = 96,["167"] = 96,["168"] = 96,["169"] = 96,["170"] = 96,["171"] = 96,["172"] = 96,["173"] = 96,["174"] = 96,["175"] = 96,["176"] = 96,["177"] = 96,["178"] = 96,["179"] = 96,["180"] = 96,["181"] = 122,["182"] = 122,["183"] = 122,["184"] = 122,["186"] = 122,["187"] = 123,["188"] = 124,["189"] = 124,["190"] = 124,["191"] = 124,["193"] = 124,["194"] = 125,["195"] = 126,["196"] = 126,["197"] = 130,["198"] = 130,["199"] = 130,["201"] = 131,["202"] = 131,["203"] = 131,["205"] = 132,["206"] = 132,["207"] = 132,["209"] = 133,["210"] = 133,["211"] = 133,["213"] = 134,["214"] = 134,["215"] = 134,["217"] = 135,["218"] = 135,["219"] = 135,["221"] = 136,["222"] = 136,["223"] = 136,["225"] = 137,["226"] = 137,["227"] = 137,["229"] = 138,["230"] = 138,["231"] = 138,["233"] = 139,["234"] = 139,["235"] = 139,["237"] = 140,["238"] = 140,["239"] = 140,["241"] = 141,["242"] = 142,["243"] = 142,["244"] = 142,["246"] = 143,["247"] = 143,["248"] = 143,["250"] = 126,["251"] = 126,["252"] = 126,["253"] = 126,["254"] = 126,["255"] = 126,["256"] = 126,["257"] = 126,["258"] = 126,["259"] = 126,["260"] = 126,["261"] = 126,["262"] = 126,["263"] = 126,["264"] = 126,["265"] = 126,["266"] = 126,["267"] = 126,["268"] = 126,["269"] = 146,["270"] = 9});
data = Client:GetSceneEntityData("portraits_full_body_loadout")
local ____temp_2 = data and data.unitname
if ____temp_2 == nil then
    ____temp_2 = ""
end
unitName = ____temp_2
local ____temp_5 = data and data.camera
if ____temp_5 == nil then
    ____temp_5 = "camera_1"
end
camera = ____temp_5
function Spawn(self, entityKeyValues)
    local isUnit = KeyValues.units[unitName] ~= nil
    local isHero = KeyValues.heroes[unitName] ~= nil
    local ____KeyValues_units_unitName_6 = KeyValues.units[unitName]
    if ____KeyValues_units_unitName_6 == nil then
        ____KeyValues_units_unitName_6 = KeyValues.heroes[unitName]
    end
    local tKV = ____KeyValues_units_unitName_6
    if tKV == nil then
        return
    end
    if isUnit == false and isHero == false then
        return
    end
    local defaultData = KeyValues.portrait_full_body_loadout.default_entity_replacement
    local ____KeyValues_portrait_full_body_loadout_unitName_7 = KeyValues.portrait_full_body_loadout[unitName]
    if ____KeyValues_portrait_full_body_loadout_unitName_7 == nil then
        ____KeyValues_portrait_full_body_loadout_unitName_7 = defaultData
    end
    local tPortraitData = ____KeyValues_portrait_full_body_loadout_unitName_7
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
    if tKV.Model2D == nil and tKV.Model == nil then
        return
    end
    local t = {}
    local ____tKV_Model2D_10 = tKV.Model2D
    if ____tKV_Model2D_10 == nil then
        ____tKV_Model2D_10 = tKV.Model
    end
    local tData = {
        parentname = "root",
        classname = "prop_dynamic",
        origin = "0 0 0",
        angles = "0 0 0",
        scales = "1 1 1",
        model = ____tKV_Model2D_10,
        StartingAnim = KeyValues.portrait_full_body_loadout.DefaultActivity,
        add_modifier = ""
    }
    if isUnit then
        tData = {
            parentname = "root",
            classname = "portrait_world_unit",
            origin = "0 0 0",
            angles = "0 0 0",
            scales = "1 1 1",
            model = tKV.Model,
            EnableAutoStyles = 0,
            suppress_intro_effects = 1,
            spawn_background_models = 0,
            rare_loadout_anim_chance = -1,
            suppress_anim_event_sounds = 0,
            skip_pet_spawn = 0,
            flying_courier = 0,
            spawn_wearable_item_defs = 1,
            activity = "ACT_DOTA_CAPTURE",
            activity_modifier = "",
            item_def0 = 0,
            style_index0 = 0,
            item_def1 = 0,
            style_index1 = 0,
            item_def2 = 0,
            style_index2 = 0,
            item_def3 = 0,
            style_index3 = 0,
            item_def4 = 0,
            style_index4 = 0,
            item_def5 = 0,
            style_index5 = 0,
            item_def6 = 0,
            style_index6 = 0,
            item_def7 = 0,
            style_index7 = 0,
            rendercolor = "255 255 255"
        }
        local ____opt_result_15
        if tKV ~= nil then
            ____opt_result_15 = tKV.Creature
        end
        local ____opt_result_16
        if ____opt_result_15 ~= nil then
            ____opt_result_16 = ____opt_result_15.AttachWearables
        end
        local attachWearables = ____opt_result_16
        if attachWearables ~= nil then
            local wearableKeys = __TS__ObjectKeys(attachWearables)
            __TS__ArraySort(
                wearableKeys,
                function(____, left, right)
                    local leftIndex = toFiniteNumber(left, 0)
                    local rightIndex = toFiniteNumber(right, 0)
                    return leftIndex - rightIndex
                end
            )
            local wearableIndex = 0
            do
                local i = 0
                while i < #wearableKeys do
                    do
                        local wearableData = attachWearables[wearableKeys[i + 1]]
                        if wearableData == nil then
                            goto __continue12
                        end
                        local itemDef = wearableData.ItemDef
                        if itemDef == nil or itemDef == "" then
                            goto __continue12
                        end
                        tData["item_def" .. tostring(wearableIndex)] = tostring(itemDef)
                        wearableIndex = wearableIndex + 1
                    end
                    ::__continue12::
                    i = i + 1
                end
            end
        end
    end
    table.insert(t, tData)
    local ____table_insert_22 = table.insert
    local ____t_21 = t
    local ____tCameraData_PortraitPosition_18 = tCameraData.PortraitPosition
    local ____tCameraData_PortraitAngles_19 = tCameraData.PortraitAngles
    local ____tCameraData_PortraitFOV_20 = tCameraData.PortraitFOV
    local ____tCameraData_PortraitFar_17 = tCameraData.PortraitFar
    if ____tCameraData_PortraitFar_17 == nil then
        ____tCameraData_PortraitFar_17 = defaultData.cameras.default.PortraitFar
    end
    ____table_insert_22(____t_21, {
        classname = "point_camera",
        targetname = camera,
        origin = ____tCameraData_PortraitPosition_18,
        angles = ____tCameraData_PortraitAngles_19,
        fov = ____tCameraData_PortraitFOV_20,
        ZFar = ____tCameraData_PortraitFar_17,
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
    local ____StringToVector_24 = StringToVector
    local ____tPortraitData_PortraitSpecularDirection_23 = tPortraitData.PortraitSpecularDirection
    if ____tPortraitData_PortraitSpecularDirection_23 == nil then
        ____tPortraitData_PortraitSpecularDirection_23 = defaultData.PortraitSpecularDirection
    end
    local vSpecularDirection = ____StringToVector_24(____tPortraitData_PortraitSpecularDirection_23) or vec3_zero
    local aSpecularAngles = VectorToAngles(vSpecularDirection)
    local ____StringToVector_26 = StringToVector
    local ____tPortraitData_PortraitAmbientDirection_25 = tPortraitData.PortraitAmbientDirection
    if ____tPortraitData_PortraitAmbientDirection_25 == nil then
        ____tPortraitData_PortraitAmbientDirection_25 = defaultData.PortraitAmbientDirection
    end
    local vAmbientDirection = ____StringToVector_26(____tPortraitData_PortraitAmbientDirection_25) or vec3_zero
    local aAmbientAngles = VectorToAngles(vAmbientDirection)
    local ____table_insert_42 = table.insert
    local ____t_41 = t
    local ____tPortraitData_PortraitLightPosition_27 = tPortraitData.PortraitLightPosition
    if ____tPortraitData_PortraitLightPosition_27 == nil then
        ____tPortraitData_PortraitLightPosition_27 = defaultData.PortraitLightPosition
    end
    local ____tPortraitData_PortraitLightAngles_28 = tPortraitData.PortraitLightAngles
    if ____tPortraitData_PortraitLightAngles_28 == nil then
        ____tPortraitData_PortraitLightAngles_28 = defaultData.PortraitLightAngles
    end
    local ____tPortraitData_PortraitLightFOV_29 = tPortraitData.PortraitLightFOV
    if ____tPortraitData_PortraitLightFOV_29 == nil then
        ____tPortraitData_PortraitLightFOV_29 = defaultData.PortraitLightFOV
    end
    local ____tPortraitData_PortraitLightDistance_30 = tPortraitData.PortraitLightDistance
    if ____tPortraitData_PortraitLightDistance_30 == nil then
        ____tPortraitData_PortraitLightDistance_30 = defaultData.PortraitLightDistance
    end
    local ____tPortraitData_PortraitLightColor_31 = tPortraitData.PortraitLightColor
    if ____tPortraitData_PortraitLightColor_31 == nil then
        ____tPortraitData_PortraitLightColor_31 = defaultData.PortraitLightColor
    end
    local ____tPortraitData_PortraitShadowColor_32 = tPortraitData.PortraitShadowColor
    if ____tPortraitData_PortraitShadowColor_32 == nil then
        ____tPortraitData_PortraitShadowColor_32 = defaultData.PortraitShadowColor
    end
    local ____tPortraitData_PortraitShadowScale_33 = tPortraitData.PortraitShadowScale
    if ____tPortraitData_PortraitShadowScale_33 == nil then
        ____tPortraitData_PortraitShadowScale_33 = defaultData.PortraitShadowScale
    end
    local ____tPortraitData_PortraitAmbientColor_34 = tPortraitData.PortraitAmbientColor
    if ____tPortraitData_PortraitAmbientColor_34 == nil then
        ____tPortraitData_PortraitAmbientColor_34 = defaultData.PortraitAmbientColor
    end
    local ____tPortraitData_PortraitAmbientScale_35 = tPortraitData.PortraitAmbientScale
    if ____tPortraitData_PortraitAmbientScale_35 == nil then
        ____tPortraitData_PortraitAmbientScale_35 = defaultData.PortraitAmbientScale
    end
    local ____tPortraitData_PortraitSpecularColor_36 = tPortraitData.PortraitSpecularColor
    if ____tPortraitData_PortraitSpecularColor_36 == nil then
        ____tPortraitData_PortraitSpecularColor_36 = defaultData.PortraitSpecularColor
    end
    local ____tPortraitData_PortraitSpecularPower_37 = tPortraitData.PortraitSpecularPower
    if ____tPortraitData_PortraitSpecularPower_37 == nil then
        ____tPortraitData_PortraitSpecularPower_37 = defaultData.PortraitSpecularPower
    end
    local ____aSpecularAngles_40 = aSpecularAngles
    local ____tPortraitData_PortraitLightScale_38 = tPortraitData.PortraitLightScale
    if ____tPortraitData_PortraitLightScale_38 == nil then
        ____tPortraitData_PortraitLightScale_38 = defaultData.PortraitLightScale
    end
    local ____tPortraitData_PortraitGroundShadowScale_39 = tPortraitData.PortraitGroundShadowScale
    if ____tPortraitData_PortraitGroundShadowScale_39 == nil then
        ____tPortraitData_PortraitGroundShadowScale_39 = defaultData.PortraitGroundShadowScale
    end
    ____table_insert_42(____t_41, {
        classname = "env_global_light",
        targetname = "portrait_light",
        origin = ____tPortraitData_PortraitLightPosition_27,
        angles = ____tPortraitData_PortraitLightAngles_28,
        fov = ____tPortraitData_PortraitLightFOV_29,
        nearz = ____tPortraitData_PortraitLightDistance_30,
        Color = ____tPortraitData_PortraitLightColor_31,
        ambientcolor2 = ____tPortraitData_PortraitShadowColor_32,
        ambientscale2 = ____tPortraitData_PortraitShadowScale_33,
        ambientcolor1 = ____tPortraitData_PortraitAmbientColor_34,
        ambientscale1 = ____tPortraitData_PortraitAmbientScale_35,
        specularcolor = ____tPortraitData_PortraitSpecularColor_36,
        specularpower = ____tPortraitData_PortraitSpecularPower_37,
        specularangles = ____aSpecularAngles_40,
        lightscale = ____tPortraitData_PortraitLightScale_38,
        groundscale = ____tPortraitData_PortraitGroundShadowScale_39,
        ambientangles = aAmbientAngles
    })
    SpawnEntityListFromTableSynchronous(t)
end
