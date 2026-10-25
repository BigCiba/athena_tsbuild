local __TSTL_FILE_PATH__ = "mechanics/items"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__New = ____lualib.__TS__New
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__StringTrim = ____lualib.__TS__StringTrim
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 1,["17"] = 1,["18"] = 2,["19"] = 2,["21"] = 5,["22"] = 6,["23"] = 5,["24"] = 6,["26"] = 6,["27"] = 7,["28"] = 8,["29"] = 10,["30"] = 11,["31"] = 12,["32"] = 13,["33"] = 14,["34"] = 15,["35"] = 5,["36"] = 16,["37"] = 17,["38"] = 18,["39"] = 18,["40"] = 18,["41"] = 18,["42"] = 18,["43"] = 19,["48"] = 20,["49"] = 20,["50"] = 20,["51"] = 20,["52"] = 20,["53"] = 20,["56"] = 20,["62"] = 18,["63"] = 18,["64"] = 18,["65"] = 18,["66"] = 22,["67"] = 22,["68"] = 22,["69"] = 22,["70"] = 22,["72"] = 22,["73"] = 22,["74"] = 22,["75"] = 23,["76"] = 23,["77"] = 23,["78"] = 23,["79"] = 23,["81"] = 23,["82"] = 23,["83"] = 23,["84"] = 24,["85"] = 25,["86"] = 25,["87"] = 25,["88"] = 26,["91"] = 27,["92"] = 28,["93"] = 29,["94"] = 30,["95"] = 31,["96"] = 31,["97"] = 31,["98"] = 31,["99"] = 31,["100"] = 32,["101"] = 32,["102"] = 32,["103"] = 32,["104"] = 32,["105"] = 32,["106"] = 32,["107"] = 32,["108"] = 32,["111"] = 25,["112"] = 25,["113"] = 25,["114"] = 35,["115"] = 35,["116"] = 35,["117"] = 35,["118"] = 35,["119"] = 35,["120"] = 35,["121"] = 36,["122"] = 36,["123"] = 36,["124"] = 36,["127"] = 37,["128"] = 37,["129"] = 35,["130"] = 35,["131"] = 35,["132"] = 39,["133"] = 39,["134"] = 39,["135"] = 39,["136"] = 39,["137"] = 40,["138"] = 40,["139"] = 40,["140"] = 41,["143"] = 42,["144"] = 43,["147"] = 44,["148"] = 45,["149"] = 40,["150"] = 40,["151"] = 40,["152"] = 16,["153"] = 48,["154"] = 49,["155"] = 49,["156"] = 50,["157"] = 48,["158"] = 54,["159"] = 56,["160"] = 56,["162"] = 57,["163"] = 58,["164"] = 54,["165"] = 60,["166"] = 61,["167"] = 62,["170"] = 63,["171"] = 63,["172"] = 64,["173"] = 65,["174"] = 66,["176"] = 67,["177"] = 67,["179"] = 68,["180"] = 69,["181"] = 69,["186"] = 71,["187"] = 72,["188"] = 73,["189"] = 73,["190"] = 73,["191"] = 74,["194"] = 75,["195"] = 75,["196"] = 73,["197"] = 73,["198"] = 77,["199"] = 60,["200"] = 79,["201"] = 80,["202"] = 81,["203"] = 81,["205"] = 82,["206"] = 83,["208"] = 84,["209"] = 84,["211"] = 85,["212"] = 86,["213"] = 87,["214"] = 88,["215"] = 88,["216"] = 88,["217"] = 88,["218"] = 88,["221"] = 90,["225"] = 92,["226"] = 79,["227"] = 94,["228"] = 95,["229"] = 95,["231"] = 96,["232"] = 97,["233"] = 97,["234"] = 97,["235"] = 97,["236"] = 97,["237"] = 97,["238"] = 97,["239"] = 97,["240"] = 97,["242"] = 98,["243"] = 94,["244"] = 100,["245"] = 101,["247"] = 102,["248"] = 102,["249"] = 102,["250"] = 102,["251"] = 102,["253"] = 102,["256"] = 103,["257"] = 100,["258"] = 105,["259"] = 106,["260"] = 106,["261"] = 106,["262"] = 106,["263"] = 106,["264"] = 106,["265"] = 106,["266"] = 105,["267"] = 108,["268"] = 109,["269"] = 110,["270"] = 110,["272"] = 111,["273"] = 112,["274"] = 113,["275"] = 113,["276"] = 113,["277"] = 113,["279"] = 113,["281"] = 113,["283"] = 113,["285"] = 113,["286"] = 113,["287"] = 113,["288"] = 113,["291"] = 115,["292"] = 108,["293"] = 117,["294"] = 118,["295"] = 119,["298"] = 120,["299"] = 120,["300"] = 120,["301"] = 120,["302"] = 120,["303"] = 121,["306"] = 122,["307"] = 123,["308"] = 124,["309"] = 124,["311"] = 125,["312"] = 125,["315"] = 126,["316"] = 117,["317"] = 128,["318"] = 129,["319"] = 129,["320"] = 129,["321"] = 129,["322"] = 129,["324"] = 130,["325"] = 130,["327"] = 130,["329"] = 130,["330"] = 130,["331"] = 131,["332"] = 131,["333"] = 131,["334"] = 131,["335"] = 131,["336"] = 131,["337"] = 131,["338"] = 131,["340"] = 132,["341"] = 133,["342"] = 134,["343"] = 134,["344"] = 134,["345"] = 134,["346"] = 135,["347"] = 135,["349"] = 136,["350"] = 128,["351"] = 139,["352"] = 140,["353"] = 140,["354"] = 141,["355"] = 142,["358"] = 144,["359"] = 139,["360"] = 146,["361"] = 147,["362"] = 148,["363"] = 148,["364"] = 148,["365"] = 148,["366"] = 148,["368"] = 149,["369"] = 149,["371"] = 150,["373"] = 151,["374"] = 151,["375"] = 146,["376"] = 154,["377"] = 155,["380"] = 156,["381"] = 157,["382"] = 157,["383"] = 157,["384"] = 157,["387"] = 158,["390"] = 159,["393"] = 159,["394"] = 159,["401"] = 154,["402"] = 162,["403"] = 163,["406"] = 164,["407"] = 164,["408"] = 164,["409"] = 164,["410"] = 164,["411"] = 165,["414"] = 166,["415"] = 166,["416"] = 166,["417"] = 166,["418"] = 166,["419"] = 166,["422"] = 167,["423"] = 167,["424"] = 167,["425"] = 167,["426"] = 168,["427"] = 169,["428"] = 170,["429"] = 170,["430"] = 170,["433"] = 171,["434"] = 171,["435"] = 171,["436"] = 171,["437"] = 172,["438"] = 172,["440"] = 173,["441"] = 173,["442"] = 173,["443"] = 173,["444"] = 162,["445"] = 175,["446"] = 176,["447"] = 176,["449"] = 177,["450"] = 178,["451"] = 179,["452"] = 179,["453"] = 179,["454"] = 179,["455"] = 179,["458"] = 181,["459"] = 182,["460"] = 182,["462"] = 183,["464"] = 184,["465"] = 184,["467"] = 185,["468"] = 185,["469"] = 185,["470"] = 185,["471"] = 186,["472"] = 175,["473"] = 188,["474"] = 189,["475"] = 189,["476"] = 189,["477"] = 189,["478"] = 190,["479"] = 191,["480"] = 192,["481"] = 192,["483"] = 193,["484"] = 193,["485"] = 193,["486"] = 193,["487"] = 193,["489"] = 194,["490"] = 194,["493"] = 196,["494"] = 196,["496"] = 197,["497"] = 197,["498"] = 197,["499"] = 197,["500"] = 188,["501"] = 200,["502"] = 201,["503"] = 202,["504"] = 202,["506"] = 203,["509"] = 213,["510"] = 213,["512"] = 213,["513"] = 213,["517"] = 205,["518"] = 205,["519"] = 206,["520"] = 207,["521"] = 207,["523"] = 208,["524"] = 209,["525"] = 209,["526"] = 209,["527"] = 209,["528"] = 209,["529"] = 209,["531"] = 205,["534"] = 211,["535"] = 211,["537"] = 212,["538"] = 212,["544"] = 204,["547"] = 200,["548"] = 215,["549"] = 215,["550"] = 215,["552"] = 216,["555"] = 217,["556"] = 217,["558"] = 218,["559"] = 219,["560"] = 220,["561"] = 220,["562"] = 220,["564"] = 220,["566"] = 220,["567"] = 215,["568"] = 222,["569"] = 223,["572"] = 224,["573"] = 224,["574"] = 224,["576"] = 224,["578"] = 225,["579"] = 225,["581"] = 226,["582"] = 226,["583"] = 226,["585"] = 227,["586"] = 227,["587"] = 227,["588"] = 227,["589"] = 227,["590"] = 227,["591"] = 227,["592"] = 227,["593"] = 228,["594"] = 228,["595"] = 228,["596"] = 228,["597"] = 229,["598"] = 229,["600"] = 230,["601"] = 231,["602"] = 231,["604"] = 232,["605"] = 233,["606"] = 233,["607"] = 233,["609"] = 234,["610"] = 234,["611"] = 234,["612"] = 234,["613"] = 234,["614"] = 234,["618"] = 225,["621"] = 222,["622"] = 238,["623"] = 239,["624"] = 239,["625"] = 239,["627"] = 239,["628"] = 240,["629"] = 241,["630"] = 241,["631"] = 241,["632"] = 241,["633"] = 242,["634"] = 242,["635"] = 242,["636"] = 242,["637"] = 238,["638"] = 244,["639"] = 245,["640"] = 246,["642"] = 247,["643"] = 247,["644"] = 247,["646"] = 248,["647"] = 249,["648"] = 249,["650"] = 250,["651"] = 251,["653"] = 252,["654"] = 252,["656"] = 252,["657"] = 253,["659"] = 253,["661"] = 253,["662"] = 254,["663"] = 254,["664"] = 254,["665"] = 254,["666"] = 254,["667"] = 254,["669"] = 255,["670"] = 256,["671"] = 256,["672"] = 256,["673"] = 256,["674"] = 256,["675"] = 257,["676"] = 258,["677"] = 259,["678"] = 259,["679"] = 260,["680"] = 260,["681"] = 260,["682"] = 260,["683"] = 260,["684"] = 260,["685"] = 260,["687"] = 261,["690"] = 262,["693"] = 262,["701"] = 264,["703"] = 264,["704"] = 264,["706"] = 264,["707"] = 265,["713"] = 268,["717"] = 270,["718"] = 270,["719"] = 270,["722"] = 271,["723"] = 271,["724"] = 271,["725"] = 271,["726"] = 272,["727"] = 244,["728"] = 274,["729"] = 275,["730"] = 276,["732"] = 277,["733"] = 277,["734"] = 277,["736"] = 278,["737"] = 278,["738"] = 278,["739"] = 278,["740"] = 278,["741"] = 278,["742"] = 278,["743"] = 278,["744"] = 278,["745"] = 278,["746"] = 279,["747"] = 279,["748"] = 279,["750"] = 279,["752"] = 278,["753"] = 278,["754"] = 278,["755"] = 278,["756"] = 278,["757"] = 278,["758"] = 278,["759"] = 278,["760"] = 278,["761"] = 278,["765"] = 281,["766"] = 281,["767"] = 282,["768"] = 282,["769"] = 282,["771"] = 274,["772"] = 284,["773"] = 284,["774"] = 284,["775"] = 284,["776"] = 284,["778"] = 284,["779"] = 284,["780"] = 285,["781"] = 286,["782"] = 287,["783"] = 288,["784"] = 288,["786"] = 289,["787"] = 290,["788"] = 285,["789"] = 5,["790"] = 6,["791"] = 294,["792"] = 294});
local ____exports = {}
local ____weight_pool = require("class.weight_pool")
local CWeightPool = ____weight_pool.CWeightPool
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 实体物品、掉落池、拾取和物品奖励；只持有本局创建或接纳的物品及其地面容器。
____exports.CItems = __TS__Class()
local CItems = ____exports.CItems
CItems.name = "CItems"
__TS__ClassExtends(CItems, CModule)
function CItems.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.runId = 0
    self.running = false
    self.generation = 0
    self.records = {}
    self.pools = {}
    self.reservoirs = {}
    self.published = ""
    self.merges = {}
end
function CItems.prototype.init(self)
    Event:UnregisterContext(self)
    Event:RegisterWithPriority(
        "game_start",
        function(____, ____bindingPattern0)
            local runId
            runId = ____bindingPattern0.runId
            if runId == nil then
                return
            end
            do
                local function ____catch(____error)
                    self:Stop()
                    GameState:FinishRun(
                        runId,
                        "error",
                        tostring(____error)
                    )
                end
                local ____try, ____hasReturned = pcall(function()
                    self:Start(runId)
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
        end,
        250,
        self
    )
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
    Event:Register("unit_bounty", self.OnBounty, self)
    Event:Register(
        "inventory_filter",
        function(____, event)
            if not event.allowed or not IsValid(event.item) or not KeyValues.items[event.item:GetAbilityName()] then
                return
            end
            local id = event.unit:GetPlayerOwnerID()
            event.allowed = self:Hero(id, self.runId) == event.unit and self:CanAccept(event.unit, event.item) and self:Track(event.item)
            if event.allowed and tonumber(KeyValues.items[event.item:GetAbilityName()].ItemStackable) == 1 then
                self:FlushMerges()
                local ____opt_0 = __TS__ArrayFind(
                    self:Inventory(event.unit),
                    function(____, entry) return entry.slot < 9 and entry.item ~= event.item and entry.item:GetAbilityName() == event.item:GetAbilityName() end
                )
                local target = ____opt_0 and ____opt_0.item
                if target then
                    local ____self_merges_2 = self.merges
                    ____self_merges_2[#____self_merges_2 + 1] = {
                        target = target,
                        incoming = event.item,
                        before = target:GetCurrentCharges(),
                        charges = event.item:GetCurrentCharges(),
                        value = self:SellGold(target) + self:SellGold(event.item)
                    }
                end
            end
        end,
        self
    )
    Event:Register(
        "item_added",
        function(____, ____bindingPattern0)
            local item
            local unit
            unit = ____bindingPattern0.unit
            item = ____bindingPattern0.item
            if self:Hero(
                unit:GetPlayerOwnerID(),
                self.runId
            ) ~= unit then
                return
            end
            self:Track(item)
            self:Publish()
        end,
        self
    )
    Event:Register(
        "item_removed",
        function() return self:Publish() end,
        self
    )
    Event:Register(
        "task_reward",
        function(____, reward)
            if reward.handled or reward.type ~= "TASK_REWARD_TYPE_ITEM" and reward.type ~= "TASK_REWARD_TYPE_SCEPTER" then
                return
            end
            local hero = self:Hero(reward.playerID, reward.runId)
            if not hero then
                return
            end
            local name = reward.type == "TASK_REWARD_TYPE_SCEPTER" and "item_" .. hero:GetUnitName() or reward.name
            reward.handled = self:Grant(reward.playerID, name, reward.amount, reward.runId)
        end,
        self
    )
end
function CItems.prototype.Hero(self, playerID, runId)
    local session = GameState:GetSession()
    local hero = PlayerResource:GetSelectedHeroEntity(playerID)
    return self.running and session.state == "GameState_Battle" and runId == self.runId and session.runId == runId and __TS__ArrayIncludes(session.participants, playerID) and IsValid(hero) and hero:IsRealHero() and hero.__resourceRunId == runId and hero or nil
end
function CItems.prototype.Supported(self, name)
    if name == "item_ring_shop" or name == "item_ronghe" then
        return false
    end
    local kv = KeyValues.items[name]
    return type(kv) == "table" and (kv.BaseClass ~= "item_lua" or _G[name] ~= nil)
end
function CItems.prototype.Start(self, runId)
    local session = GameState:GetSession()
    if runId ~= session.runId or session.state ~= "GameState_Battle" or self.runId == runId then
        return
    end
    self:reset()
    self.runId = runId
    self.pools = self:LoadPools("scripts/npc/kv/pools.kv")
    self.reservoirs = self:LoadPools("scripts/npc/kv/reservoirs.kv")
    for name, kv in pairs(KeyValues.items) do
        do
            if type(kv) ~= "table" or kv.Rarity == nil then
                goto __continue27
            end
            local kind = kv.CustomItemType == "CUSTOM_ITEM_TYPE_EQUIPMENT" and "item_equipment_level_" or (kv.CustomItemType == "CUSTOM_ITEM_TYPE_ABILITY_BOOK" and "item_ability_book_level_" or "")
            if kind ~= "" and self.pools[kind .. tostring(kv.Rarity)] then
                self.pools[kind .. tostring(kv.Rarity)]:Add(name, 1)
            end
        end
        ::__continue27::
    end
    self.running = true
    local generation = self.generation
    self.timer = Timer:GameTimer(
        0.2,
        function()
            if not self.running or self.generation ~= generation or GameState:GetSession().runId ~= runId then
                return
            end
            self:Sweep()
            return 0.2
        end
    )
    self:Publish()
end
function CItems.prototype.LoadPools(self, file)
    local data = LoadKeyValues(file)
    if not data then
        error("掉落配置不存在：" .. file, 0)
    end
    local result = {}
    for name, values in pairs(data) do
        do
            if type(values) ~= "table" then
                goto __continue34
            end
            local pool = __TS__New(CWeightPool)
            for entry, weight in pairs(values) do
                local value = tonumber(weight)
                if value ~= nil and value >= 0 and value < math.huge then
                    pool:Add(
                        tostring(entry),
                        value
                    )
                end
            end
            result[name] = pool
        end
        ::__continue34::
    end
    return result
end
function CItems.prototype.Track(self, item)
    if not IsValid(item) or item.__itemRunId ~= nil and item.__itemRunId ~= self.runId then
        return false
    end
    item.__itemRunId = self.runId
    if not __TS__ArraySome(
        self.records,
        function(____, record) return record.item == item end
    ) then
        local ____self_records_3 = self.records
        ____self_records_3[#____self_records_3 + 1] = {
            item = item,
            container = item:GetContainer()
        }
    end
    return true
end
function CItems.prototype.Inventory(self, hero)
    local result = {}
    do
        local slot = 0
        while slot <= 16 do
            local item = hero:GetItemInSlot(slot)
            if IsValid(item) then
                result[#result + 1] = {item = item, slot = slot}
            end
            slot = slot + 1
        end
    end
    return result
end
function CItems.prototype.Owns(self, hero, item)
    return IsValid(item) and item.__itemRunId == self.runId and __TS__ArraySome(
        self.records,
        function(____, record) return record.item == item end
    ) and __TS__ArraySome(
        self:Inventory(hero),
        function(____, entry) return entry.item == item end
    )
end
function CItems.prototype.CanAccept(self, hero, item)
    local kv = KeyValues.items[item:GetAbilityName()]
    if not kv or not self:Supported(item:GetAbilityName()) or item.__itemRunId ~= nil and item.__itemRunId ~= self.runId then
        return false
    end
    local ____type = kv.CustomItemType
    if ____type == "CUSTOM_ITEM_TYPE_MAIN_WEAPON" or ____type == "CUSTOM_ITEM_TYPE_DEPUTY" then
        if __TS__ArraySome(
            self:Inventory(hero),
            function(____, entry)
                local ____temp_6 = entry.slot < 9 and entry.item ~= item
                if ____temp_6 then
                    local ____opt_4 = KeyValues.items[entry.item:GetAbilityName()]
                    if ____opt_4 ~= nil then
                        ____opt_4 = ____opt_4.CustomItemType
                    end
                    ____temp_6 = ____opt_4 == ____type
                end
                return ____temp_6
            end
        ) then
            return false
        end
    end
    return true
end
function CItems.prototype.Create(self, playerID, name, runId)
    local hero = self:Hero(playerID, runId)
    if not hero or not self:Supported(name) then
        return
    end
    local item = CreateItem(
        name,
        PlayerResource:GetPlayer(playerID),
        hero
    )
    if not IsValid(item) then
        return
    end
    item:SetCombineLocked(true)
    local level = tonumber(KeyValues.items[name].ItemBaseLevel) or 1
    if level > 1 then
        item:SetLevel(level, false)
    end
    if not self:Track(item) then
        UTIL_Remove(item)
        return
    end
    return item
end
function CItems.prototype.TryGive(self, hero, item, runId)
    if self:Hero(
        hero:GetPlayerOwnerID(),
        runId
    ) ~= hero or not self:CanAccept(hero, item) then
        return false
    end
    local ____tonumber_9 = tonumber
    local ____opt_7 = KeyValues.items[item:GetAbilityName()]
    if ____opt_7 ~= nil then
        ____opt_7 = ____opt_7.ItemStackable
    end
    local inventory = self:Inventory(hero)
    local stackable = ____tonumber_9(____opt_7) == 1
    if not __TS__ArraySome(
        inventory,
        function(____, entry) return entry.slot < 9 and (entry.item == item or stackable and entry.item:GetAbilityName() == item:GetAbilityName()) end
    ) and #__TS__ArrayFilter(
        inventory,
        function(____, entry) return entry.slot < 9 end
    ) >= 9 then
        return false
    end
    local added = hero:AddItem(item)
    self:FlushMerges()
    local held = __TS__ArraySome(
        self:Inventory(hero),
        function(____, entry) return entry.item == item or entry.item == added end
    )
    if held then
        self:Track(IsValid(added) and added or item)
    end
    return held
end
function CItems.prototype.FlushMerges(self)
    for ____, merge in ipairs(self.merges) do
        if IsValid(merge.target) and merge.target:GetCurrentCharges() > merge.before then
            merge.target.__saleGoldValue = merge.value
            merge.target.__saleChargeCount = merge.before + merge.charges
        end
    end
    self.merges = {}
end
function CItems.prototype.SpendCharge(self, item)
    local owner = item:GetCaster()
    if not IsValid(owner) or self:Hero(
        owner:GetPlayerOwnerID(),
        self.runId
    ) ~= owner or not self:Owns(owner, item) then
        return false
    end
    if item:GetCurrentCharges() > 1 then
        item:SetCurrentCharges(item:GetCurrentCharges() - 1)
    else
        self:Destroy(item)
    end
    self:Publish()
    return true
end
function CItems.prototype.UsePickup(self, item, apply)
    if not IsValid(item) or item.__pickupRunning then
        return
    end
    local hero = item:GetCaster()
    if not IsValid(hero) or self:Hero(
        hero:GetPlayerOwnerID(),
        self.runId
    ) ~= hero or not self:Owns(hero, item) then
        return
    end
    item.__pickupRunning = true
    do
        local ____try, ____error = pcall(function()
            apply(nil, hero)
        end)
        do
            if IsValid(item) then
                item.__pickupRunning = false
            end
        end
        if not ____try then
            error(____error, 0)
        end
    end
end
function CItems.prototype.Replace(self, hero, old, name, charges)
    if not self:Owns(hero, old) then
        return
    end
    local next = self:Create(
        hero:GetPlayerOwnerID(),
        name,
        self.runId
    )
    if not next then
        return
    end
    if not self:Drop(
        next,
        hero:GetAbsOrigin(),
        self.runId
    ) then
        self:Destroy(next)
        return
    end
    local slot = __TS__ArrayFind(
        self:Inventory(hero),
        function(____, entry) return entry.item == old end
    ).slot
    next:SetCurrentCharges(charges)
    hero:TakeItem(old)
    if not self:TryGive(hero, next, self.runId) then
        self:Destroy(next)
        self:TryGive(hero, old, self.runId)
        return
    end
    local placed = __TS__ArrayFind(
        self:Inventory(hero),
        function(____, entry) return entry.item == next end
    ).slot
    if placed ~= slot then
        hero:SwapItems(placed, slot)
    end
    self:Destroy(old)
    UnitAttributes:RefreshItems(hero)
    self:Publish()
    return next
end
function CItems.prototype.Drop(self, item, position, runId)
    if not self.running or runId ~= self.runId or GameState:GetSession().runId ~= runId or not self:Track(item) then
        return false
    end
    for ____, id in ipairs(GameState:GetSession().participants) do
        local hero = PlayerResource:GetSelectedHeroEntity(id)
        if IsValid(hero) and __TS__ArraySome(
            self:Inventory(hero),
            function(____, entry) return entry.item == item end
        ) then
            hero:TakeItem(item)
        end
    end
    local container = item:GetContainer()
    if IsValid(container) then
        container:SetAbsOrigin(position)
    else
        container = CreateItemOnPositionSync(position, item)
    end
    if not IsValid(container) then
        return false
    end
    __TS__ArrayFind(
        self.records,
        function(____, record) return record.item == item end
    ).container = container
    return true
end
function CItems.prototype.Destroy(self, item)
    local record = __TS__ArrayFind(
        self.records,
        function(____, entry) return entry.item == item end
    )
    if IsValid(item) then
        local owner = item.__inventoryOwner
        if IsValid(owner) then
            owner:SyncInventory(false)
        end
        if IsValid(owner) and __TS__ArraySome(
            self:Inventory(owner),
            function(____, entry) return entry.item == item end
        ) then
            owner:RemoveItem(item)
        else
            Event:UnregisterContext(item)
            UTIL_Remove(item)
        end
    end
    if IsValid(record and record.container) then
        UTIL_Remove(record.container)
    end
    self.records = __TS__ArrayFilter(
        self.records,
        function(____, entry) return entry.item ~= item end
    )
end
function CItems.prototype.Grant(self, playerID, name, amount, runId)
    local hero = self:Hero(playerID, runId)
    if not hero or not self:Supported(name) or amount < 1 or amount > 100 or amount ~= math.floor(amount) then
        return false
    end
    local created = {}
    do
        local function ____catch(____error)
            for ____, item in ipairs(created) do
                self:Destroy(item)
            end
            self:error(name, ____error)
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            do
                local i = 0
                while i < amount do
                    local item = self:Create(playerID, name, runId)
                    if not item then
                        error("物品创建失败", 0)
                    end
                    created[#created + 1] = item
                    if not self:Drop(
                        item,
                        hero:GetAbsOrigin(),
                        runId
                    ) then
                        error("物品落地失败", 0)
                    end
                    i = i + 1
                end
            end
            for ____, item in ipairs(created) do
                self:TryGive(hero, item, runId)
            end
            self:Sweep()
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function CItems.prototype.Resolve(self, name, depth)
    if depth == nil then
        depth = 0
    end
    if depth > 12 then
        return
    end
    if KeyValues.items[name] then
        return name
    end
    local pool = self.reservoirs[name] or self.pools[name]
    local selected = pool and pool:Random()
    local ____selected_14
    if selected then
        ____selected_14 = self:Resolve(selected, depth + 1)
    else
        ____selected_14 = nil
    end
    return ____selected_14
end
function CItems.prototype.OnBounty(self, event)
    if not self:Hero(event.playerID, event.runId) then
        return
    end
    local ____KeyValues_units_index_15 = KeyValues.units[event.victim:GetUnitName()]
    if ____KeyValues_units_index_15 == nil then
        ____KeyValues_units_index_15 = {}
    end
    local kv = ____KeyValues_units_index_15
    do
        local i = 1
        while i <= 10 do
            do
                local field = kv["DropItem" .. tostring(i)]
                if type(field) ~= "string" then
                    goto __continue125
                end
                local raw, pool, bonus = unpack(
                    __TS__ArrayMap(
                        __TS__StringSplit(field, ","),
                        function(____, part) return __TS__StringTrim(part) end
                    ),
                    1,
                    3
                )
                local chance = (tonumber(raw) or 0) * (bonus == "false" and 1 or math.max(
                    0,
                    1 + GetPlayerDropChancePercentage(event.playerID) * 0.01
                ))
                if chance <= 0 or RandomFloat(0, 100) > chance then
                    goto __continue125
                end
                local name = self:Resolve(pool)
                if not name then
                    goto __continue125
                end
                local item = self:Create(event.playerID, name, event.runId)
                if not item then
                    self:error("掉落道具尚不可创建", name)
                    goto __continue125
                end
                if not self:Drop(
                    item,
                    event.victim:GetAbsOrigin(),
                    event.runId
                ) then
                    self:Destroy(item)
                end
            end
            ::__continue125::
            i = i + 1
        end
    end
end
function CItems.prototype.SellGold(self, item)
    local ____KeyValues_items_index_16 = KeyValues.items[item:GetAbilityName()]
    if ____KeyValues_items_index_16 == nil then
        ____KeyValues_items_index_16 = {}
    end
    local kv = ____KeyValues_items_index_16
    local price = item.__saleGoldValue or tonumber(kv.ItemCost) or 0
    local initial = item.__saleChargeCount or math.max(
        1,
        tonumber(kv.ItemInitialCharges) or 1
    )
    return math.max(
        0,
        math.floor(price * (tonumber(kv.ItemStackable) == 1 and item:GetCurrentCharges() / initial or 1))
    )
end
function CItems.prototype.Sweep(self)
    self:FlushMerges()
    for ____, id in ipairs(GameState:GetSession().participants) do
        do
            local hero = self:Hero(id, self.runId)
            if not hero then
                goto __continue134
            end
            hero:SyncInventory(false)
            for ____, ____value in ipairs(self:Inventory(hero)) do
                local item = ____value.item
                do
                    self:Track(item)
                    local kv = KeyValues.items[item:GetAbilityName()]
                    local ____opt_result_19
                    if kv ~= nil then
                        ____opt_result_19 = kv.CustomItemType
                    end
                    if ____opt_result_19 == "CUSTOM_ITEM_TYPE_ATTRIBUTE_BOOK" then
                        local ____opt_20 = kv.AbilityValues
                        if ____opt_20 ~= nil then
                            ____opt_20 = ____opt_20.value
                        end
                        local value = ____opt_20
                        if type(value) == "table" and UnitAttributes:AddPermanent(
                            hero,
                            value.type,
                            tonumber(value.value) or 0
                        ) then
                            self:Destroy(item)
                        end
                    elseif item:GetAbilityName() == "item_salve1_pack" or item:GetAbilityName() == "item_clarity1_pack" then
                        local potion = self:Create(
                            id,
                            item:GetAbilityName() == "item_salve1_pack" and "item_salve1" or "item_clarity1",
                            self.runId
                        )
                        if potion then
                            potion:SetCurrentCharges(item:GetSpecialValueFor("count"))
                            potion.__saleGoldValue = self:SellGold(item)
                            potion.__saleChargeCount = potion:GetCurrentCharges()
                            if not self:Drop(
                                potion,
                                hero:GetAbsOrigin(),
                                self.runId
                            ) then
                                self:Destroy(potion)
                                goto __continue136
                            end
                            self:Destroy(item)
                            do
                                local function ____catch(____error)
                                    self:error("药水保留在地面", ____error)
                                end
                                local ____try, ____hasReturned = pcall(function()
                                    self:TryGive(hero, potion, self.runId)
                                end)
                                if not ____try then
                                    ____catch(____hasReturned)
                                end
                            end
                        end
                    else
                        local ____tonumber_25 = tonumber
                        local ____opt_result_24
                        if kv ~= nil then
                            ____opt_result_24 = kv.ItemCastOnPickup
                        end
                        if ____tonumber_25(____opt_result_24) == 1 and not item.__pickupRunning and item.OnSpellStart ~= nil then
                            item:OnSpellStart()
                        end
                    end
                end
                ::__continue136::
            end
            UnitAttributes:RefreshItems(hero)
        end
        ::__continue134::
    end
    for ____, record in ipairs(self.records) do
        if IsValid(record.item) then
            record.container = record.item:GetContainer() or record.container
        end
    end
    self.records = __TS__ArrayFilter(
        self.records,
        function(____, record) return IsValid(record.item) or IsValid(record.container) end
    )
    self:Publish()
end
function CItems.prototype.Publish(self)
    local players = {}
    for ____, id in ipairs(GameState:GetSession().participants) do
        do
            local hero = PlayerResource:GetSelectedHeroEntity(id)
            if not IsValid(hero) then
                goto __continue152
            end
            players[tostring(id)] = __TS__ArrayMap(
                self:Inventory(hero),
                function(____, ____bindingPattern0)
                    local slot
                    local item
                    item = ____bindingPattern0.item
                    slot = ____bindingPattern0.slot
                    local ____temp_29 = item:entindex()
                    local ____temp_30 = item:GetAbilityName()
                    local ____slot_31 = slot
                    local ____temp_32 = item:GetCurrentCharges()
                    local ____tonumber_28 = tonumber
                    local ____opt_26 = KeyValues.items[item:GetAbilityName()]
                    if ____opt_26 ~= nil then
                        ____opt_26 = ____opt_26.ItemSellable
                    end
                    return {
                        entity = ____temp_29,
                        name = ____temp_30,
                        slot = ____slot_31,
                        charges = ____temp_32,
                        sellable = ____tonumber_28(____opt_26) ~= 0,
                        sell_gold = self:SellGold(item)
                    }
                end
            )
        end
        ::__continue152::
    end
    local data = {run_id = self.runId, players = players}
    local encoded = json.encode(data)
    if encoded ~= self.published then
        self.published = encoded
        CustomNetTables:SetTableValue("common", "item_inventory", data)
    end
end
function CItems.prototype.Stop(self)
    self.running = false
    self.generation = self.generation + 1
    if self.timer then
        Timer:StopTimer(self.timer)
    end
    self.timer = nil
end
function CItems.prototype.reset(self)
    self:Stop()
    self.merges = {}
    while #self.records > 0 do
        self:Destroy(self.records[#self.records].item)
    end
    self.published = ""
    CustomNetTables:SetTableValue("common", "item_inventory", {run_id = self.runId, players = {}})
end
CItems = __TS__DecorateLegacy({reloadable}, CItems)
____exports.CItems = CItems
if Items == nil then
    Items = __TS__New(____exports.CItems)
end
return ____exports
