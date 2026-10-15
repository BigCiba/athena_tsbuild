local __TSTL_FILE_PATH__ = "class/round_runner"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayEvery = ____lualib.__TS__ArrayEvery
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 11,["12"] = 11,["13"] = 11,["14"] = 18,["15"] = 18,["16"] = 18,["17"] = 12,["18"] = 13,["19"] = 14,["20"] = 15,["21"] = 16,["22"] = 17,["23"] = 18,["24"] = 19,["25"] = 19,["26"] = 19,["27"] = 19,["28"] = 19,["29"] = 20,["30"] = 20,["31"] = 20,["32"] = 21,["33"] = 22,["34"] = 23,["35"] = 23,["36"] = 23,["39"] = 24,["40"] = 24,["41"] = 24,["42"] = 25,["43"] = 25,["44"] = 25,["45"] = 25,["46"] = 26,["47"] = 21,["48"] = 28,["49"] = 29,["52"] = 30,["53"] = 31,["54"] = 31,["55"] = 31,["58"] = 32,["59"] = 33,["62"] = 34,["63"] = 34,["64"] = 35,["66"] = 37,["68"] = 38,["69"] = 38,["71"] = 39,["72"] = 39,["73"] = 40,["74"] = 40,["76"] = 41,["78"] = 42,["79"] = 42,["80"] = 42,["81"] = 42,["82"] = 42,["85"] = 43,["86"] = 43,["89"] = 38,["92"] = 45,["93"] = 45,["94"] = 45,["95"] = 45,["96"] = 46,["97"] = 46,["98"] = 46,["99"] = 46,["100"] = 47,["102"] = 48,["103"] = 48,["105"] = 48,["106"] = 48,["107"] = 48,["108"] = 48,["110"] = 49,["111"] = 49,["113"] = 28});
local ____exports = {}
--- 每局一个波次实例。调用方持有调度计时器，Stop 后绝不继续刷怪。
____exports.RoundRunner = __TS__Class()
local RoundRunner = ____exports.RoundRunner
RoundRunner.name = "RoundRunner"
function RoundRunner.prototype.____constructor(self, waves, host)
    self.waves = waves
    self.host = host
    self.index = 0
    self.stage = "prepare"
    self.deadline = 0
    self.active = false
    self.enemies = {}
    self.spawnState = {}
end
function RoundRunner.prototype.Start(self, now)
    self.active = true
    self.index = 0
    self:Prepare(now)
end
function RoundRunner.prototype.Stop(self)
    self.active = false
end
function RoundRunner.prototype.Prepare(self, now)
    local wave = self.waves[self.index + 1]
    if not wave then
        self.active = false
        self.host:Complete()
        return
    end
    self.stage = "prepare"
    self.deadline = now + wave.prepare
    self.enemies = {}
    self.spawnState = __TS__ArrayMap(
        wave.spawners,
        function(____, spawner) return {spawned = 0, next = self.deadline + spawner.wait} end
    )
    self.host:Publish(wave.number, self.stage, self.deadline)
end
function RoundRunner.prototype.Tick(self, now)
    if not self.active then
        return
    end
    local wave = self.waves[self.index + 1]
    if self.stage == "end" then
        self.index = self.index + 1
        self:Prepare(now)
        return
    end
    if self.stage == "prepare" then
        if now < self.deadline then
            return
        end
        self.stage = "battle"
        self.deadline = wave.duration == nil and 0 or now + wave.duration
        self.host:Publish(wave.number, self.stage, self.deadline or nil)
    end
    local expired = self.deadline > 0 and now >= self.deadline
    do
        local i = 0
        while not expired and i < #wave.spawners do
            do
                local spawner = wave.spawners[i + 1]
                local progress = self.spawnState[i + 1]
                if progress.spawned >= spawner.total or now < progress.next then
                    goto __continue14
                end
                local count = math.min(spawner.batch, spawner.total - progress.spawned)
                do
                    local n = 0
                    while n < count do
                        local ____self_enemies_0 = self.enemies
                        ____self_enemies_0[#____self_enemies_0 + 1] = self.host:Spawn(spawner)
                        n = n + 1
                    end
                end
                progress.spawned = progress.spawned + count
                progress.next = now + spawner.interval
            end
            ::__continue14::
            i = i + 1
        end
    end
    self.enemies = __TS__ArrayFilter(
        self.enemies,
        function(____, entity) return self.host:IsAlive(entity) end
    )
    local finishedSpawning = __TS__ArrayEvery(
        wave.spawners,
        function(____, spawner, i) return self.spawnState[i + 1].spawned >= spawner.total end
    )
    if expired or finishedSpawning and #self.enemies == 0 then
        local ____this_2
        ____this_2 = self.host
        local ____opt_1 = ____this_2.Clear
        if ____opt_1 ~= nil then
            ____opt_1(
                ____this_2,
                __TS__ArraySlice(self.enemies)
            )
        end
        self.stage = "end"
        self.host:Publish(wave.number, self.stage)
    end
end
return ____exports
