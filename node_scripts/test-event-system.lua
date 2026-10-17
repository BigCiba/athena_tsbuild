-- 验证实际生成的 Lua，尤其覆盖 JavaScript 与 Lua 对数值 0 的真假差异。
package.path = "game/athena_tsbuild/scripts/vscripts/?.lua;" .. package.path
local lib = require("lualib_bundle")
package.preload["lib.tstl-utils"] = function() return { reloadable = function(_, value) return value end } end
CModule = lib.__TS__Class()
function CModule.prototype.____constructor() end
function CModule.prototype.print() end
function IsValid(value) return value ~= nil and value.valid ~= false end
function traceback(message) return message end
local log = print
print = function() end -- Once 的预期错误由返回值断言，避免输出伪故障。
local passed = 0
local function fresh()
	Event = nil; package.loaded["framework.event"] = nil; require("framework.event"); return Event
end
local function test(name, fn) fn(); passed = passed + 1; log("PASS Lua " .. name) end
local function equal(actual, expected) assert(actual == expected, tostring(actual) .. " ~= " .. tostring(expected)) end
test("mixed priorities and equal-priority reverse registration", function()
	local e, order = fresh(), {}
	e:RegisterWithPriority("game_init", function() order[#order+1] = "high" end, 200)
	e:Register("game_init", function() order[#order+1] = "first" end)
	e:RegisterWithPriority("game_init", function() order[#order+1] = "zero" end, 0)
	e:Register("game_init", function() order[#order+1] = "last" end)
	e:Fire("game_init", {}); equal(table.concat(order, ","), "high,last,first,zero")
end)
test("removal during dispatch and newly registered listeners", function()
	local e, order = fresh(), {}
	local old = e:Register("game_init", function() order[#order+1] = "removed" end)
	e:Register("game_init", function() order[#order+1] = "middle" end)
	e:Register("game_init", function() order[#order+1] = "new"; e:Unregister(old); e:Register("game_init", function() order[#order+1] = "next" end) end)
	e:Fire("game_init", {}); equal(table.concat(order, ","), "new,middle")
end)
test("Once throws and recursively fires only once", function()
	local e, calls = fresh(), 0
	e:Once("game_init", function() calls = calls + 1; if calls < 3 then e:Fire("game_init", {}) end; error("expected") end)
	local errors = e:Fire("game_init", {}); e:Fire("game_init", {})
	equal(calls, 1); equal(#errors, 1); equal(e:GetListenerCount("game_init"), 0)
end)
test("source then target then global, exact entity matching", function()
	local e, source, target, sibling, order = fresh(), {}, {}, {}, {}
	e:RegisterUnit("cleave", function() order[#order+1] = "global" end, "global")
	e:RegisterUnit("cleave", function() order[#order+1] = "target" end, "target", target)
	e:RegisterUnit("cleave", function() order[#order+1] = "source1" end, "source", source)
	e:RegisterUnit("cleave", function() order[#order+1] = "source2" end, "source", source)
	e:RegisterUnit("cleave", function() error("wrong source") end, "source", sibling)
	equal(e:FireUnit("cleave", {}, source, target), nil)
	equal(table.concat(order, ","), "source2,source1,target,global")
end)
test("declarative unit listeners preserve instance context and unsubscribe", function()
	local e, owner, context = fresh(), {}, { count = 0 }
	local ids = e:RegisterUnitListeners({ reborn = { source = function(self, data) equal(self, context); equal(data.unit, owner); self.count = self.count + 1 end } }, owner, context)
	equal(#ids, 1); e:FireUnit("reborn", { unit = owner }, owner); equal(context.count, 1)
	e:UnregisterContext(context); e:FireUnit("reborn", { unit = owner }, owner); equal(context.count, 1)
end)
log(tostring(passed) .. " generated Lua event checks passed")
