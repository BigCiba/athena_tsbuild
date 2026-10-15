local __TSTL_FILE_PATH__ = "scene/cosmetic_3d_preview"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 6,["5"] = 7,["6"] = 8,["7"] = 8,["8"] = 8,["9"] = 8,["11"] = 8,["12"] = 9,["13"] = 10,["14"] = 19,["15"] = 20,["16"] = 20,["17"] = 20,["18"] = 20,["19"] = 20,["20"] = 20,["21"] = 20,["22"] = 20,["23"] = 29,["25"] = 30,["26"] = 30,["28"] = 30,["31"] = 32,["32"] = 32,["33"] = 32,["34"] = 32,["35"] = 32,["36"] = 32,["37"] = 32,["38"] = 32,["39"] = 32,["40"] = 32,["41"] = 44,["42"] = 45,["43"] = 47,["44"] = 48,["45"] = 48,["46"] = 48,["47"] = 48,["48"] = 48,["49"] = 48,["50"] = 48,["51"] = 48,["52"] = 48,["53"] = 48,["54"] = 48,["55"] = 48,["56"] = 48,["57"] = 48,["58"] = 48,["59"] = 48,["60"] = 62,["61"] = 63,["62"] = 64,["63"] = 64,["64"] = 64,["65"] = 64,["66"] = 64,["67"] = 64,["68"] = 64,["69"] = 64,["70"] = 64,["71"] = 64,["72"] = 64,["73"] = 64,["74"] = 64,["75"] = 64,["76"] = 64,["77"] = 64,["78"] = 64,["79"] = 64,["80"] = 64,["81"] = 64,["82"] = 64,["83"] = 64,["84"] = 83,["85"] = 29});
entityName = "cosmetic_3d_preview"
data = Client:GetSceneEntityData(entityName)
local ____tostring_3 = tostring
local ____temp_2 = data and data.cosmetic_id
if ____temp_2 == nil then
    ____temp_2 = ""
end
cosmeticID = ____tostring_3(____temp_2)
cosmeticData = KeyValues.info_item_cosmetic[cosmeticID]
camera = "camera_1"
defaultCameraConfig = {distance = 800, height = 90, fov = 20}
cameraConfigByType = {
    [COSMETIC_TYPE.HEAD] = {distance = 650, height = 175, fov = 18},
    [COSMETIC_TYPE.SHOULDER] = {distance = 750, height = 125, fov = 20},
    [COSMETIC_TYPE.BACK] = {distance = 900, height = 105, fov = 24},
    [COSMETIC_TYPE.TAIL] = {distance = 800, height = 65, fov = 22},
    [COSMETIC_TYPE.WING] = {distance = 1000, height = 115, fov = 26},
    [COSMETIC_TYPE.MISC] = defaultCameraConfig
}
function Spawn(self, entityKeyValues)
    local ____opt_result_6
    if cosmeticData ~= nil then
        ____opt_result_6 = cosmeticData.model
    end
    if ____opt_result_6 == nil then
        return
    end
    SpawnEntityFromTableSynchronous("prop_dynamic_clientside", {
        parentname = "root",
        targetname = cosmeticID,
        origin = "0 0 0",
        angles = "0 0 0",
        scales = "1 1 1",
        model = cosmeticData.model,
        StartingAnim = "ACT_DOTA_IDLE",
        StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING"
    })
    local cameraConfig = cameraConfigByType[tostring(cosmeticData.type)] or defaultCameraConfig
    local defaultLight = KeyValues.portraits_weapon.default
    local entities = {}
    table.insert(
        entities,
        {
            classname = "point_camera",
            targetname = camera,
            origin = (tostring(cameraConfig.distance) .. " 0 ") .. tostring(cameraConfig.height),
            angles = "0 180 0",
            fov = cameraConfig.fov,
            ZFar = math.max(1600, cameraConfig.distance + 800),
            ZNear = 4,
            UseScreenAspectRatio = 0,
            aspectRatio = 0,
            fogEnable = 0,
            dof_enabled = 0
        }
    )
    local specularDirection = StringToVector(defaultLight.PortraitSpecularDirection) or vec3_zero
    local ambientDirection = StringToVector(defaultLight.PortraitAmbientDirection) or vec3_zero
    table.insert(
        entities,
        {
            classname = "env_global_light",
            targetname = "portrait_light",
            origin = defaultLight.PortraitLightPosition,
            angles = defaultLight.PortraitLightAngles,
            fov = defaultLight.PortraitLightFOV,
            nearz = defaultLight.PortraitLightDistance,
            Color = defaultLight.PortraitLightColor,
            ambientcolor2 = defaultLight.PortraitShadowColor,
            ambientscale2 = defaultLight.PortraitShadowScale,
            ambientcolor1 = defaultLight.PortraitAmbientColor,
            ambientscale1 = defaultLight.PortraitAmbientScale,
            specularcolor = defaultLight.PortraitSpecularColor,
            specularpower = defaultLight.PortraitSpecularPower,
            specularangles = VectorToAngles(specularDirection),
            lightscale = defaultLight.PortraitLightScale,
            groundscale = defaultLight.PortraitGroundShadowScale,
            ambientangles = VectorToAngles(ambientDirection)
        }
    )
    SpawnEntityListFromTableSynchronous(entities)
end
