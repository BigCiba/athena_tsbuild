local __TSTL_FILE_PATH__ = "mechanics/task"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayEvery = ____lualib.__TS__ArrayEvery
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 1,["19"] = 1,["20"] = 3,["21"] = 3,["22"] = 3,["23"] = 3,["24"] = 3,["25"] = 3,["26"] = 3,["27"] = 3,["28"] = 3,["29"] = 3,["30"] = 3,["31"] = 6,["32"] = 6,["33"] = 6,["34"] = 6,["35"] = 6,["36"] = 6,["37"] = 6,["39"] = 13,["40"] = 14,["41"] = 13,["42"] = 14,["44"] = 14,["45"] = 15,["46"] = 16,["47"] = 17,["48"] = 18,["49"] = 19,["50"] = 20,["51"] = 21,["52"] = 22,["53"] = 23,["54"] = 24,["55"] = 13,["56"] = 25,["57"] = 26,["58"] = 27,["59"] = 28,["60"] = 28,["61"] = 28,["62"] = 28,["63"] = 28,["65"] = 28,["66"] = 28,["67"] = 28,["68"] = 29,["69"] = 29,["70"] = 29,["71"] = 29,["72"] = 29,["74"] = 29,["75"] = 29,["76"] = 29,["77"] = 30,["78"] = 31,["79"] = 31,["80"] = 31,["81"] = 31,["82"] = 31,["83"] = 31,["84"] = 31,["85"] = 31,["86"] = 31,["87"] = 32,["88"] = 32,["89"] = 32,["90"] = 33,["91"] = 33,["92"] = 33,["93"] = 33,["94"] = 33,["95"] = 33,["97"] = 32,["98"] = 32,["99"] = 32,["100"] = 35,["101"] = 36,["102"] = 36,["103"] = 36,["104"] = 37,["105"] = 38,["106"] = 38,["107"] = 38,["108"] = 38,["109"] = 38,["110"] = 38,["111"] = 38,["112"] = 38,["113"] = 38,["115"] = 36,["116"] = 36,["117"] = 36,["118"] = 40,["119"] = 40,["120"] = 40,["121"] = 40,["122"] = 40,["124"] = 40,["125"] = 40,["126"] = 40,["127"] = 41,["128"] = 41,["129"] = 41,["130"] = 42,["133"] = 43,["134"] = 45,["137"] = 46,["138"] = 46,["139"] = 41,["140"] = 41,["141"] = 41,["142"] = 48,["143"] = 48,["144"] = 48,["145"] = 49,["146"] = 50,["147"] = 50,["149"] = 48,["150"] = 48,["151"] = 48,["152"] = 52,["153"] = 52,["154"] = 52,["155"] = 53,["157"] = 53,["158"] = 53,["160"] = 53,["162"] = 53,["163"] = 53,["164"] = 53,["166"] = 53,["167"] = 53,["169"] = 52,["170"] = 52,["171"] = 52,["172"] = 25,["173"] = 56,["174"] = 57,["175"] = 58,["176"] = 56,["177"] = 60,["178"] = 60,["179"] = 60,["180"] = 60,["181"] = 60,["182"] = 60,["183"] = 60,["184"] = 61,["185"] = 61,["186"] = 61,["187"] = 62,["188"] = 63,["189"] = 64,["190"] = 64,["192"] = 65,["193"] = 66,["194"] = 66,["196"] = 67,["197"] = 62,["198"] = 69,["199"] = 70,["200"] = 71,["203"] = 72,["204"] = 72,["205"] = 73,["206"] = 74,["209"] = 94,["210"] = 94,["211"] = 94,["212"] = 94,["213"] = 94,["214"] = 94,["217"] = 76,["218"] = 77,["219"] = 78,["220"] = 78,["222"] = 79,["223"] = 79,["224"] = 79,["227"] = 80,["228"] = 80,["231"] = 82,["233"] = 83,["234"] = 84,["235"] = 84,["237"] = 85,["238"] = 85,["239"] = 85,["240"] = 85,["241"] = 85,["242"] = 85,["243"] = 86,["244"] = 86,["245"] = 87,["246"] = 87,["247"] = 87,["252"] = 89,["253"] = 89,["255"] = 90,["256"] = 91,["257"] = 92,["258"] = 92,["260"] = 93,["266"] = 69,["267"] = 96,["268"] = 96,["269"] = 96,["271"] = 97,["274"] = 98,["275"] = 98,["276"] = 99,["277"] = 100,["278"] = 100,["279"] = 100,["280"] = 100,["281"] = 100,["282"] = 101,["285"] = 102,["286"] = 103,["287"] = 103,["289"] = 104,["290"] = 105,["291"] = 105,["293"] = 106,["294"] = 106,["295"] = 96,["296"] = 108,["297"] = 109,["300"] = 110,["301"] = 111,["302"] = 112,["304"] = 113,["305"] = 114,["306"] = 114,["307"] = 114,["308"] = 115,["309"] = 115,["310"] = 116,["311"] = 116,["312"] = 116,["314"] = 117,["320"] = 120,["321"] = 121,["322"] = 121,["323"] = 121,["324"] = 121,["325"] = 121,["326"] = 121,["327"] = 121,["328"] = 121,["329"] = 121,["330"] = 121,["332"] = 122,["333"] = 122,["334"] = 122,["335"] = 122,["336"] = 122,["337"] = 108,["338"] = 124,["339"] = 125,["342"] = 126,["343"] = 127,["346"] = 129,["347"] = 129,["348"] = 129,["349"] = 129,["350"] = 129,["351"] = 129,["352"] = 130,["353"] = 130,["354"] = 130,["355"] = 130,["356"] = 130,["357"] = 124,["358"] = 132,["359"] = 133,["362"] = 134,["363"] = 135,["365"] = 136,["366"] = 136,["367"] = 137,["368"] = 138,["369"] = 139,["370"] = 140,["371"] = 141,["372"] = 141,["373"] = 141,["374"] = 141,["375"] = 141,["378"] = 144,["379"] = 144,["381"] = 145,["382"] = 145,["383"] = 145,["384"] = 145,["385"] = 146,["386"] = 146,["387"] = 147,["388"] = 148,["389"] = 149,["390"] = 150,["391"] = 150,["392"] = 150,["393"] = 150,["394"] = 150,["395"] = 150,["397"] = 150,["398"] = 150,["404"] = 154,["405"] = 132,["406"] = 156,["407"] = 157,["408"] = 158,["409"] = 159,["410"] = 160,["411"] = 160,["412"] = 160,["413"] = 160,["414"] = 160,["415"] = 161,["416"] = 161,["417"] = 161,["418"] = 161,["419"] = 161,["422"] = 164,["423"] = 156,["424"] = 167,["425"] = 168,["426"] = 168,["427"] = 169,["430"] = 170,["433"] = 185,["434"] = 185,["435"] = 185,["438"] = 172,["439"] = 173,["440"] = 173,["442"] = 174,["444"] = 175,["445"] = 175,["446"] = 176,["447"] = 177,["448"] = 178,["449"] = 178,["451"] = 179,["452"] = 179,["453"] = 179,["454"] = 179,["455"] = 179,["457"] = 180,["458"] = 175,["461"] = 182,["462"] = 182,["463"] = 182,["464"] = 183,["465"] = 184,["466"] = 184,["476"] = 186,["482"] = 171,["485"] = 167,["486"] = 188,["487"] = 189,["488"] = 190,["490"] = 188,["491"] = 193,["492"] = 194,["493"] = 194,["495"] = 195,["496"] = 195,["498"] = 196,["499"] = 196,["500"] = 196,["501"] = 196,["502"] = 197,["503"] = 198,["504"] = 198,["505"] = 198,["506"] = 198,["507"] = 199,["508"] = 199,["510"] = 200,["511"] = 200,["512"] = 200,["513"] = 200,["514"] = 200,["515"] = 200,["516"] = 200,["517"] = 201,["518"] = 202,["519"] = 203,["520"] = 204,["521"] = 204,["522"] = 204,["523"] = 204,["524"] = 204,["525"] = 204,["526"] = 204,["531"] = 193,["532"] = 208,["533"] = 208,["534"] = 208,["535"] = 209,["536"] = 209,["537"] = 209,["538"] = 209,["540"] = 209,["541"] = 209,["542"] = 210,["543"] = 211,["544"] = 212,["545"] = 212,["546"] = 212,["548"] = 213,["549"] = 213,["550"] = 213,["551"] = 213,["552"] = 213,["553"] = 213,["554"] = 213,["555"] = 210,["556"] = 13,["557"] = 14,["558"] = 217,["559"] = 217});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
____exports.TaskState = ____exports.TaskState or ({})
____exports.TaskState.None = 0
____exports.TaskState[____exports.TaskState.None] = "None"
____exports.TaskState.Progress = 1
____exports.TaskState[____exports.TaskState.Progress] = "Progress"
____exports.TaskState.Finish = 2
____exports.TaskState[____exports.TaskState.Finish] = "Finish"
____exports.TaskState.Received = 3
____exports.TaskState[____exports.TaskState.Received] = "Received"
____exports.TaskState.Locked = 4
____exports.TaskState[____exports.TaskState.Locked] = "Locked"
local NPC_TASKS = {
    bounty_hunter = {"KillKoboldLord", "KillHellBeast", "KillAcientGolem"},
    cuihua = {"KillFireDemon"},
    bajie = {"Trial"},
    bearzky = {"Bearzky_Zombie", "Bearzky_SandKing"},
    beaverknight = {"Beaverknight_Ogre"}
}
--- Athena 局内任务：配置、自动触发、NPC 流程、进度、领奖与重开均由本模块持有。
____exports.CTask = __TS__Class()
local CTask = ____exports.CTask
CTask.name = "CTask"
__TS__ClassExtends(CTask, CModule)
function CTask.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.runId = 0
    self.running = false
    self.definitions = {}
    self.players = {}
    self.npcs = {}
    self.npcParticles = {}
    self.timers = {}
    self.rewardProgress = {}
    self.claiming = {}
    self.killed = {}
end
function CTask.prototype.init(self, reload)
    Event:UnregisterContext(self)
    Event:Register("game_start", self.OnGameStart, self)
    Event:Register(
        "game_end",
        function(____, event)
            if event.run_id == self.runId then
                self:Stop()
            end
        end,
        self
    )
    Event:Register(
        "game_reset",
        function(____, event)
            if event.runId == self.runId then
                self:reset()
            end
        end,
        self
    )
    Event:Register("entity_killed", self.OnKilled, self)
    Event:Register(
        "item_added",
        function(____, event) return self:Progress(
            event.unit:GetPlayerOwnerID(),
            "TASK_STAGE_TYPE_ITEM",
            event.item:GetAbilityName()
        ) end,
        self
    )
    Event:Register(
        "hero_level_up",
        function(____, event)
            if event.unit:IsRealHero() and event.level > 0 and event.level < 500 and event.level % 100 == 0 then
                self:Start(
                    event.unit:GetPlayerOwnerID(),
                    "Reborn",
                    true
                )
            end
        end,
        self
    )
    Event:Register("npc_interact", self.OnNPCInteract, self)
    Event:Register(
        "collision_trigger",
        function(____, event)
            local unit = event.activator
            if event.type == 1 and event.name == "hero_reborn" and IsValid(unit) and unit:IsRealHero() and self:Active(unit:GetPlayerOwnerID()) and self:GetPlayerTaskState(
                unit:GetPlayerOwnerID(),
                "Reborn"
            ) == ____exports.TaskState.Progress then
                FindClearSpaceForUnit(
                    unit,
                    Vector(6080, 6920, 384),
                    true
                )
            end
        end,
        self
    )
    Event:Register(
        "task_debug_start",
        function(____, event)
            if IsInToolsMode() then
                self:Start(event.playerID, event.taskName, true)
            end
        end,
        self
    )
    CustomUIEvent(
        "task_remove",
        function(____, data)
            if data.runId ~= self.runId or not self:Active(data.PlayerID) or not self.definitions[data.taskname] or self:HasTag(data.taskname, "TASK_TAG_CANT_ABANDONED") then
                return
            end
            local player = self.players[data.PlayerID]
            if not player.tInProgress[data.taskname] then
                return
            end
            __TS__Delete(player.tInProgress, data.taskname)
            self:Publish()
        end,
        self
    )
    CustomUIEvent(
        "task_mark",
        function(____, data)
            local state = self:GetPlayerTaskState(data.PlayerID, data.taskname)
            if data.runId == self.runId and self:Active(data.PlayerID) and (state == ____exports.TaskState.Progress or state == ____exports.TaskState.Finish) then
                self:Mark(data.PlayerID, data.taskname)
            end
        end,
        self
    )
    CustomUIEvent(
        "task_claim",
        function(____, data)
            local ____temp_2 = data.runId == self.runId and self:Active(data.PlayerID)
            if ____temp_2 then
                local ____opt_0 = self.players[data.PlayerID]
                ____temp_2 = ____opt_0 and ____opt_0.rewardErrors[data.taskname]
            end
            local ____temp_2_6 = ____temp_2
            if ____temp_2_6 then
                local ____tonumber_5 = tonumber
                local ____opt_3 = self.definitions[data.taskname]
                ____temp_2_6 = ____tonumber_5(____opt_3 and ____opt_3.AutoComplete) == 1
            end
            if ____temp_2_6 then
                self:Claim(data.PlayerID, data.taskname)
            end
        end,
        self
    )
end
function CTask.prototype.Active(self, playerID)
    local session = GameState:GetSession()
    return self.running and session.runId == self.runId and session.state == "GameState_Battle" and __TS__ArrayIncludes(session.participants, playerID) and self.players[playerID] ~= nil
end
function CTask.prototype.HasTag(self, name, tag)
    local ____opt_7 = self.definitions[name]
    return __TS__ArrayIncludes(
        __TS__StringSplit(____opt_7 and ____opt_7.TaskTag or "", ","),
        tag
    )
end
function CTask.prototype.GetTaskInfo(self, name)
    return self.definitions[name]
end
function CTask.prototype.GetPlayerTaskState(self, playerID, name)
    local definition = self.definitions[name]
    if not definition then
        return ____exports.TaskState.Locked
    end
    local player = self.players[playerID]
    if definition.UnlockType == "TASK_UNLOCK_TYPE_TASK" and (player and player.tComplete[definition.UnlockName]) ~= ____exports.TaskState.Received then
        return ____exports.TaskState.Locked
    end
    return player and player.tComplete[name] or (player and player.tInProgress[name] and ____exports.TaskState.Progress or ____exports.TaskState.None)
end
function CTask.prototype.OnGameStart(self, event)
    local session = GameState:GetSession()
    if event.runId ~= session.runId or session.state ~= "GameState_Battle" or self.running and self.runId == event.runId then
        return
    end
    self:reset()
    self.runId = session.runId
    self.definitions = LoadKeyValues("scripts/npc/kv/gameplay/tasks.kv")
    local npcKV = LoadKeyValues("scripts/npc/kv/units/npc_quest.kv")
    do
        local function ____catch(____error)
            self:Stop()
            GameState:FinishRun(
                self.runId,
                "error",
                tostring(____error)
            )
        end
        local ____try, ____hasReturned = pcall(function()
            for ____, name in ipairs(__TS__ObjectKeys(self.definitions)) do
                local definition = self.definitions[name]
                if not definition.TaskStage or #__TS__ObjectKeys(definition.TaskStage) == 0 then
                    error("任务缺少阶段：" .. name, 0)
                end
                for ____, stage in ipairs(__TS__ObjectValues(definition.TaskStage)) do
                    if (tonumber(stage.TaskStageCount) or 0) <= 0 then
                        error("任务阶段数量无效：" .. name, 0)
                    end
                end
                if definition.UnlockName and not self.definitions[definition.UnlockName] then
                    error((("任务前置不存在：" .. name) .. "/") .. definition.UnlockName, 0)
                end
            end
            for ____, name in ipairs(__TS__ObjectKeys(npcKV)) do
                do
                    local anchor = Entities:FindByName(nil, "npc_" .. name)
                    if not IsValid(anchor) then
                        goto __continue37
                    end
                    local npc = NPC:CreateNPC(
                        name,
                        anchor:GetAbsOrigin(),
                        anchor:GetForwardVector(),
                        self.runId
                    )
                    local ____self_npcs_15 = self.npcs
                    ____self_npcs_15[#____self_npcs_15 + 1] = npc
                    if NPC_TASKS[name] then
                        local ____self_npcParticles_16 = self.npcParticles
                        ____self_npcParticles_16[#____self_npcParticles_16 + 1] = ParticleManager:CreateParticle("particles/map/quest.vpcf", PATTACH_OVERHEAD_FOLLOW, npc)
                    end
                end
                ::__continue37::
            end
            for ____, playerID in ipairs(session.participants) do
                self.players[playerID] = {tInProgress = {}, tComplete = {}, rewardErrors = {}}
            end
            self.running = true
            CustomNetTables:SetTableValue("common", "task_definitions", self.definitions)
            for ____, playerID in ipairs(session.participants) do
                self:Start(playerID, "KillPracticer")
            end
            self:Publish()
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function CTask.prototype.Start(self, playerID, name, ____repeat)
    if ____repeat == nil then
        ____repeat = false
    end
    if not self:Active(playerID) or not self.definitions[name] then
        return
    end
    local player = self.players[playerID]
    local state = self:GetPlayerTaskState(playerID, name)
    if state == ____exports.TaskState.Received and (____repeat or self:HasTag(name, "TASK_TAG_REPEAT")) then
        __TS__Delete(player.tComplete, name)
        __TS__Delete(
            self.rewardProgress,
            (tostring(playerID) .. ":") .. name
        )
    elseif state ~= ____exports.TaskState.None then
        return
    end
    local task = {tStageProgress = {}}
    for ____, key in ipairs(__TS__ObjectKeys(self.definitions[name].TaskStage)) do
        task.tStageProgress[key] = 0
    end
    player.tInProgress[name] = task
    if tonumber(self.definitions[name].AutoComplete) ~= 1 then
        Notification:CombatToPlayer(playerID, {message = "Combat_StartTask", string_taskname = "TaskTitle_" .. name})
    end
    self:Mark(playerID, name)
    self:Publish()
end
function CTask.prototype.OnNPCInteract(self, event)
    if event.runId ~= self.runId or not self:Active(event.playerID) or not __TS__ArrayIncludes(self.npcs, event.npc) then
        return
    end
    local player = self.players[event.playerID]
    local text = "TaskDialog_NoTask"
    for ____, name in ipairs(NPC_TASKS[event.npc:GetUnitName()] or ({})) do
        do
            local state = self:GetPlayerTaskState(event.playerID, name)
            if state == ____exports.TaskState.None or state == ____exports.TaskState.Received and self:HasTag(name, "TASK_TAG_REPEAT") then
                self:Start(event.playerID, name)
                text = ("TaskDialog_" .. name) .. "_Accept"
            elseif state == ____exports.TaskState.Progress then
                text = ("TaskDialog_" .. name) .. "_Inprogress"
            elseif state == ____exports.TaskState.Finish then
                self:Claim(event.playerID, name)
                text = player.rewardErrors[name] or ("TaskDialog_" .. name) .. "_Finish"
            else
                goto __continue55
            end
            break
        end
        ::__continue55::
    end
    local client = PlayerResource:GetPlayer(event.playerID)
    if IsValid(client) then
        CustomGameEventManager:Send_ServerToPlayer(
            client,
            "task_dialog",
            {
                npc = event.npc:entindex(),
                text = text,
                runId = self.runId
            }
        )
    end
    self:Progress(
        event.playerID,
        "TASK_STAGE_TYPE_TALK",
        event.npc:GetUnitName()
    )
end
function CTask.prototype.OnKilled(self, event)
    if not self.running or not IsValid(event.victim) or not IsValid(event.attacker) or event.victim:GetTeamNumber() == event.attacker:GetTeamNumber() or __TS__ArrayIncludes(self.killed, event.victim) then
        return
    end
    local playerID = event.attacker:GetPlayerOwnerID()
    if not self:Active(playerID) then
        return
    end
    self.killed = __TS__ArrayFilter(
        self.killed,
        function(____, unit) return IsValid(unit) end
    )
    local ____self_killed_17 = self.killed
    ____self_killed_17[#____self_killed_17 + 1] = event.victim
    self:Progress(
        playerID,
        "TASK_STAGE_TYPE_KILL",
        event.victim:GetUnitName()
    )
end
function CTask.prototype.Progress(self, playerID, ____type, target)
    if not self:Active(playerID) then
        return
    end
    local player = self.players[playerID]
    for ____, name in ipairs(__TS__ObjectKeys(player.tInProgress)) do
        do
            local task = player.tInProgress[name]
            local definition = self.definitions[name]
            local changed = false
            for ____, key in ipairs(__TS__ObjectKeys(definition.TaskStage)) do
                local stage = definition.TaskStage[key]
                if stage.TaskStageType == ____type and (string.find(target, stage.TaskStageTarget)) ~= nil then
                    task.tStageProgress[key] = math.min(
                        tonumber(stage.TaskStageCount),
                        task.tStageProgress[key] + 1
                    )
                    changed = true
                end
            end
            if not changed then
                goto __continue68
            end
            if __TS__ArrayEvery(
                __TS__ObjectKeys(definition.TaskStage),
                function(____, key) return task.tStageProgress[key] >= tonumber(definition.TaskStage[key].TaskStageCount) end
            ) then
                __TS__Delete(player.tInProgress, name)
                player.tComplete[name] = ____exports.TaskState.Finish
                Event:Fire("task_completed", {playerID = playerID, taskName = name, runId = self.runId})
                if tonumber(definition.AutoComplete) == 1 then
                    local runId = self.runId
                    local ____self_timers_18 = self.timers
                    ____self_timers_18[#____self_timers_18 + 1] = Timer:GameTimer(
                        2,
                        function()
                            if self.runId == runId and self.players[playerID] == player and self:Active(playerID) then
                                self:Claim(playerID, name)
                            end
                        end
                    )
                end
            end
        end
        ::__continue68::
    end
    self:Publish()
end
function CTask.prototype.Rewards(self, name)
    local rewards = {}
    for ____, reward in ipairs(__TS__ObjectValues(self.definitions[name].TaskReward or ({}))) do
        for ____, part in ipairs(__TS__StringSplit((string.gsub(reward.TaskRewardName or "", "%s", "")), "|")) do
            local target, amount = unpack(
                __TS__StringSplit(part, ","),
                1,
                2
            )
            rewards[#rewards + 1] = {
                type = reward.TaskRewardType,
                name = target,
                amount = tonumber(amount) or 1
            }
        end
    end
    return rewards
end
function CTask.prototype.Claim(self, playerID, name)
    local key = (tostring(playerID) .. ":") .. name
    local player = self.players[playerID]
    if not self:Active(playerID) or not player or player.tComplete[name] ~= ____exports.TaskState.Finish or self.claiming[key] then
        return
    end
    self.claiming[key] = true
    do
        local function ____catch(____error)
            player.rewardErrors[name] = "TaskRewardFailed"
            self:error("任务奖励发放失败", name, ____error)
            self:Publish()
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local hero = PlayerResource:GetSelectedHeroEntity(playerID)
            if not IsValid(hero) then
                return true
            end
            local rewards = self:Rewards(name)
            do
                local index = self.rewardProgress[key] or 0
                while index < #rewards do
                    local event = __TS__ObjectAssign({}, rewards[index + 1], {playerID = playerID, taskName = name, runId = self.runId, handled = false})
                    Event:Fire("task_reward", event)
                    if not event.handled then
                        self:GrantAvailableReward(hero, event)
                    end
                    if not event.handled then
                        player.rewardErrors[name] = "TaskRewardUnavailable"
                        self:error("任务奖励尚未接入", name, event.type, event.name)
                        self:Publish()
                        return true
                    end
                    self.rewardProgress[key] = index + 1
                    index = index + 1
                end
            end
            __TS__Delete(player.rewardErrors, name)
            player.tComplete[name] = ____exports.TaskState.Received
            self:Publish()
            Event:Fire("task_reward_received", {playerID = playerID, taskName = name, runId = self.runId})
            if name == "KillPracticer" then
                self:Start(playerID, name, true)
            end
        end)
        local ____rethrow
        if not ____try then
            ____try, ____rethrow = pcall(function()
                ____hasReturned, ____returnValue = ____catch(____hasReturned)
            end)
        end
        do
            __TS__Delete(self.claiming, key)
        end
        if not ____try then
            error(____rethrow, 0)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function CTask.prototype.GrantAvailableReward(self, hero, reward)
    if reward.type == "TASK_REWARD_TYPE_MODIFIER" and _G[reward.name] ~= nil then
        reward.handled = IsValid(hero:AddNewModifier(hero, nil, reward.name, {}))
    end
end
function CTask.prototype.Mark(self, playerID, name)
    local ____opt_19 = self.definitions[name]
    for ____, stage in ipairs(__TS__ObjectValues(____opt_19 and ____opt_19.TaskStage or ({}))) do
        do
            if not stage.TaskPosition then
                goto __continue98
            end
            local parts = __TS__ArrayMap(
                __TS__StringSplit(stage.TaskPosition, ","),
                function(____, value) return tonumber(value) end
            )
            local anchor = Entities:FindByName(nil, stage.TaskPosition)
            local position = IsValid(anchor) and anchor:GetAbsOrigin() or (#parts == 3 and __TS__ArrayEvery(
                parts,
                function(____, value) return value ~= nil end
            ) and Vector(parts[1], parts[2], parts[3]) or nil)
            if not position then
                goto __continue98
            end
            GameRules:ExecuteTeamPing(
                DOTA_TEAM_GOODGUYS,
                position.x,
                position.y,
                nil,
                0
            )
            local client = PlayerResource:GetPlayer(playerID)
            if IsValid(client) then
                local particle = ParticleManager:CreateParticleForPlayer("particles/ui_mouseactions/international2020/ping_world_questionmarks.vpcf", PATTACH_CUSTOMORIGIN, nil, client)
                ParticleManager:SetParticleControl(particle, 0, position)
                ParticleManager:SetParticleControl(
                    particle,
                    7,
                    Vector(1, 0.7, 0)
                )
                ParticleManager:ReleaseParticleIndex(particle)
            end
        end
        ::__continue98::
    end
end
function CTask.prototype.Publish(self)
    CustomNetTables:SetTableValue("common", "player_tasks", self.players)
end
function CTask.prototype.Stop(self)
    self.running = false
    for ____, timer in ipairs(self.timers) do
        Timer:StopTimer(timer)
    end
    self.timers = {}
end
function CTask.prototype.reset(self)
    self:Stop()
    for ____, particle in ipairs(self.npcParticles) do
        ParticleManager:DestroyParticle(particle, false)
        ParticleManager:ReleaseParticleIndex(particle)
    end
    self.npcParticles = {}
    self.players = {}
    self.npcs = {}
    self.killed = {}
    self.rewardProgress = {}
    self.claiming = {}
    self:Publish()
end
CTask = __TS__DecorateLegacy({reloadable}, CTask)
____exports.CTask = CTask
if Task == nil then
    Task = __TS__New(____exports.CTask)
end
return ____exports
