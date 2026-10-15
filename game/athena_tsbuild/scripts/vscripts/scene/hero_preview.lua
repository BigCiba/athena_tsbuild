local __TSTL_FILE_PATH__ = "scene/hero_preview"
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 11,["6"] = 12,["7"] = 12,["8"] = 12,["10"] = 12,["11"] = 13,["12"] = 14,["13"] = 15,["14"] = 16,["15"] = 17,["16"] = 17,["17"] = 17,["18"] = 17,["19"] = 17,["20"] = 17,["21"] = 17,["22"] = 17,["23"] = 26,["24"] = 27,["25"] = 28,["27"] = 29,["28"] = 29,["29"] = 30,["30"] = 31,["31"] = 29,["34"] = 35,["35"] = 35,["36"] = 35,["37"] = 35,["38"] = 35,["39"] = 35,["40"] = 35,["41"] = 35,["42"] = 35,["43"] = 35,["44"] = 35,["45"] = 35,["46"] = 35,["47"] = 35,["48"] = 46,["49"] = 65,["50"] = 66,["51"] = 68,["52"] = 71,["53"] = 74,["54"] = 76,["55"] = 78,["56"] = 78,["57"] = 78,["59"] = 78,["61"] = 71,["62"] = 71,["63"] = 71,["64"] = 71,["65"] = 71,["66"] = 71,["67"] = 71,["68"] = 71,["69"] = 71,["70"] = 71,["71"] = 71,["72"] = 71,["75"] = 86,["76"] = 88,["77"] = 92,["78"] = 95,["79"] = 97,["80"] = 99,["81"] = 99,["82"] = 99,["84"] = 99,["86"] = 92,["87"] = 92,["88"] = 92,["89"] = 92,["90"] = 92,["91"] = 92,["92"] = 92,["93"] = 92,["94"] = 92,["95"] = 92,["96"] = 92,["97"] = 92,["100"] = 106,["101"] = 26,["102"] = 111,["103"] = 112,["104"] = 113,["105"] = 114,["106"] = 115,["107"] = 111,["108"] = 117,["109"] = 118,["110"] = 119,["111"] = 120,["112"] = 121,["113"] = 122,["114"] = 123,["115"] = 124,["117"] = 117,["118"] = 128,["119"] = 129,["120"] = 130,["121"] = 131,["122"] = 132,["123"] = 133,["124"] = 134,["125"] = 135,["127"] = 128,["128"] = 139,["129"] = 140,["130"] = 141,["131"] = 142,["132"] = 143,["133"] = 143,["134"] = 143,["135"] = 144,["136"] = 145,["138"] = 147,["139"] = 148,["140"] = 149,["141"] = 143,["142"] = 143,["143"] = 143,["144"] = 139,["145"] = 152,["146"] = 153,["147"] = 152});
data = Client:GetSceneEntityData("hero_preview")
local ____temp_2 = data and data.heroName
if ____temp_2 == nil then
    ____temp_2 = "npc_dota_hero_vexis"
end
heroName = ____temp_2
bodyGroup = data and data.bodyGroup
bodyGroupChoice = data and data.bodyGroupChoice
heroKV = KeyValues.heroes[heroName]
heroID = heroKV.HeroID
heroCosmeticType = {
    COSMETIC_TYPE.HEAD,
    COSMETIC_TYPE.SHOULDER,
    COSMETIC_TYPE.BACK,
    COSMETIC_TYPE.TAIL,
    COSMETIC_TYPE.WING,
    COSMETIC_TYPE.MISC
}
function Spawn(self, params)
    entities = {}
    local ent = thisEntity
    do
        local i = 0
        while i < 19 do
            entities[ent:GetName()] = ent
            ent = Entities:Next(ent)
            i = i + 1
        end
    end
    local hero = SpawnEntityFromTableSynchronous(
        "prop_dynamic_clientside",
        {
            parentname = "root",
            targetname = heroName,
            origin = "0 0 0",
            angles = "0 0 0",
            scales = "1 1 1",
            model = heroKV.Model,
            IdleAnim = "ACT_DOTA_IDLE",
            add_modifier = "",
            bodygroups = ((("{" .. tostring(bodyGroup)) .. " = ") .. tostring(bodyGroupChoice)) .. "}"
        }
    )
    entities[heroName] = hero
    local cosmeticList = {}
    for cid, cosmeticData in pairs(KeyValues.weapon) do
        if cosmeticData.model ~= nil and (cosmeticData.hero == nil or tostring(cosmeticData.hero) == tostring(heroID)) then
            local ____cosmeticList_10 = cosmeticList
            local ____cid_8 = cid
            local ____cosmeticData_model_9 = cosmeticData.model
            local ____temp_7
            if cosmeticData.animate and cosmeticData.animate ~= "" then
                ____temp_7 = cosmeticData.animate
            else
                ____temp_7 = "ACT_DOTA_IDLE"
            end
            ____cosmeticList_10[#____cosmeticList_10 + 1] = {
                origin = "0 0 0",
                classname = "prop_dynamic_clientside",
                targetname = ____cid_8,
                angles = "0 0 0",
                model = ____cosmeticData_model_9,
                scales = "1 1 1",
                StartingAnim = ____temp_7,
                StartingAnimationLoopMode = "ANIM_LOOP_MODE_USE_SEQUENCE_SETTINGS",
                parentname = heroName,
                parentAttachmentName = "!bonemerge"
            }
        end
    end
    for cid, cosmeticData in pairs(KeyValues.info_item_cosmetic) do
        if __TS__ArrayIncludes(heroCosmeticType, cosmeticData.type) and cosmeticData.model ~= nil and (cosmeticData.hero_id == nil or tostring(cosmeticData.hero_id) == tostring(heroID)) then
            local ____cosmeticList_14 = cosmeticList
            local ____cid_12 = cid
            local ____cosmeticData_model_13 = cosmeticData.model
            local ____temp_11
            if cosmeticData.animate and cosmeticData.animate ~= "" then
                ____temp_11 = cosmeticData.animate
            else
                ____temp_11 = "ACT_DOTA_IDLE"
            end
            ____cosmeticList_14[#____cosmeticList_14 + 1] = {
                origin = "0 0 0",
                classname = "prop_dynamic_clientside",
                targetname = ____cid_12,
                angles = "0 0 0",
                model = ____cosmeticData_model_13,
                scales = "1 1 1",
                StartingAnim = ____temp_11,
                StartingAnimationLoopMode = "ANIM_LOOP_MODE_USE_SEQUENCE_SETTINGS",
                parentname = heroName,
                parentAttachmentName = "!bonemerge"
            }
        end
    end
    SpawnEntityListFromTableSynchronous(cosmeticList)
end
function Clear()
    currentFootParticle = nil
    currentAuraParticle = nil
    ParticleManager:DestroyParticle(auraParticle or -1, true)
    ParticleManager:DestroyParticle(footParticle or -1, true)
end
function SwitchToFoot(particle)
    if particle == nil then
        currentFootParticle = nil
        ParticleManager:DestroyParticle(footParticle or -1, true)
    elseif particle ~= currentFootParticle then
        currentFootParticle = particle
        ParticleManager:DestroyParticle(footParticle or -1, true)
        footParticle = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, entities.runner)
    end
end
function SwitchToAura(particle)
    if particle == nil then
        currentAuraParticle = nil
        ParticleManager:DestroyParticle(auraParticle or -1, true)
    elseif particle ~= currentAuraParticle then
        currentAuraParticle = particle
        ParticleManager:DestroyParticle(auraParticle or -1, true)
        auraParticle = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, thisEntity)
    end
end
function PlayAttack(cosmetic)
    local cooldown = 1
    local animList = {"vespera_attack_1", "vespera_attack_2", "vespera_attack_3", "vespera_attack_4"}
    local index = 0
    thisEntity:SetContextThink(
        "attack",
        function()
            if index >= #animList then
                index = 0
            end
            FireInputString(entities[heroName], "SetAnimationNotLooping", animList[index + 1])
            index = index + 1
            return cooldown
        end,
        cooldown
    )
end
function StopAttack()
    thisEntity:StopThink("attack")
end
