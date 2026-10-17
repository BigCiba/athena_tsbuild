-- 验证实际生成 Lua 的动态同步与原子状态刷新，使用真实 lualib 和模块。
package.path = "game/athena_tsbuild/scripts/vscripts/?.lua;" .. package.path
unpack = table.unpack -- 测试运行时为 Lua 5.3，游戏提供 Lua 5.1 的全局 unpack。
local lib = require("lualib_bundle")
package.preload["lib.tstl-utils"] = function() return { reloadable = function(_, value) return value end } end
package.preload["framework.property_system.properties_tool"] = function() return {} end
CModule = lib.__TS__Class()
function CModule.prototype.____constructor() end
function CModule.prototype.print() end
function IsServer() return true end
function IsClient() return false end
function IsValid(value) return value ~= nil and value.valid ~= false end
function traceback(message) return message end
GameRules = { GetGameTime = function() return 0 end, GetDOTATime = function() return 0 end }
local tables, writes, unit = {}, 0, { IsRealHero = function() return true end }
function EntIndexToHScript() return unit end
CustomNetTables = {
	SetTableValue = function(_, name, key, value) tables[name .. ":" .. key] = value; writes = writes + 1 end,
	GetTableValue = function(_, name, key) return tables[name .. ":" .. key] end,
}
require("framework.event")
require("framework.property_system.property_system")
require("framework.state_system.state_system")
PropertySystem:InitializeCore(); StateSystem:InitializeCore()
local passed = 0
local function equal(actual, expected) assert(actual == expected, tostring(actual) .. " ~= " .. tostring(expected)) end
local function test(name, fn) fn(); passed = passed + 1; print("PASS Lua " .. name) end
test("uncached dynamic sync, live updates and contextual isolation", function()
	PropertySystem:RegisterProperty({ id = "strength", scope = PropertyScope.UNIT, valueType = PropertyValueType.NUMBER, aggregation = AggregationStrategy.SUM, enableCache = false, syncToClient = true, notify = true })
	local value, changes = 10, 0
	Event:Register("property_changed", function(_, data) if data.propertyId == "strength" then changes = changes + 1 end end)
	PropertySystem:RegisterDynamicProperty(1, "strength", "buff", function(_, params) return params and params.amount or value end)
	equal(PropertySystem:GetPropertyValue(1, "strength", { amount = 70 }), 70)
	PropertySystem:ForceSyncAllDirty(); equal(tables["property_system:0_1"].strength, 10)
	local count = writes
	PropertySystem:ForceSyncAllDirty(); equal(writes, count); equal(changes, 1)
	value = 20; PropertySystem:ForceSyncAllDirty(); equal(tables["property_system:0_1"].strength, 20); equal(changes, 2)
	PropertySystem:UnregisterDynamicProperty(1, "buff", "strength"); PropertySystem:ForceSyncAllDirty()
	equal(tables["property_system:0_1"].strength, 0); equal(changes, 3)
end)
test("state kind transition retains order and emits no transient false", function()
	local changes = 0
	Event:Register("state_changed", function() changes = changes + 1 end)
	StateSystem:ReplaceSourceStates(1, "buff", { flag = true }, {}, 0); equal(changes, 1)
	StateSystem:ReplaceSourceStates(1, "buff", {}, { flag = function() return true end }, 0); equal(changes, 1)
	StateSystem:AddStaticState(1, "flag", "later", false, 0); equal(changes, 2)
	StateSystem:ReplaceSourceStates(1, "buff", { flag = true }, {}, 0); equal(changes, 2); equal(StateSystem:GetStateValue(1, "flag"), false)
end)
test("all state fields commit before the first change callback", function()
	StateSystem:ReplaceSourceStates(2, "batch", { first = true, second = true }, {}, 0)
	local changes = 0
	Event:Register("state_changed", function(_, data)
		if data.key == 2 then
			changes = changes + 1
			equal(StateSystem:GetStateValue(2, "first"), false); equal(StateSystem:GetStateValue(2, "second"), false)
		end
	end)
	StateSystem:ReplaceSourceStates(2, "batch", { first = false, second = false }, {}, 0); equal(changes, 2)
end)
print(tostring(passed) .. " generated Lua migration checks passed")
