local __TSTL_FILE_PATH__ = "framework/debug"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 2,["5"] = 2,["7"] = 3,["8"] = 4,["9"] = 5,["10"] = 6,["11"] = 6,["12"] = 6,["13"] = 6,["14"] = 7,["15"] = 8,["16"] = 9,["18"] = 11,["19"] = 12,["20"] = 13,["21"] = 14,["22"] = 15,["23"] = 16,["24"] = 16,["25"] = 16,["26"] = 16,["27"] = 17,["28"] = 18,["29"] = 19,["30"] = 19,["31"] = 19,["32"] = 19,["33"] = 18,["35"] = 7,["36"] = 23,["37"] = 4,["39"] = 28});
if old_debug_traceback == nil then
    old_debug_traceback = debug.traceback
end
if old_debug_traceback ~= nil then
    debug.traceback = function(____error, ...)
        local a = old_debug_traceback(____error, ...)
        print(
            IsServer() and "[Server Error]" or "[Client Error]",
            a
        )
        pcall(function()
            if IsServer() then
                CommonService:CallAction("/v1/log/report", 0, {level = "Server", message = a})
            else
                local params = {level = "Client", message = a}
                local address = "http://150.158.155.234:8003/v1/log/report"
                local handle = CreateHTTPRequestScriptVM("POST", address)
                handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
                handle:SetHTTPRequestHeaderValue("Accept-Encoding", "gzip")
                handle:SetHTTPRequestRawPostBody(
                    "application/json",
                    json.encode(params)
                )
                handle:SetHTTPRequestAbsoluteTimeoutMS(30000)
                handle:Send(function(response)
                    PrintLongStr(
                        (("[Client Error]\tStatusCode: " .. tostring(response.StatusCode)) .. "\tBody: ") .. response.Body,
                        address
                    )
                end)
            end
        end)
        return a
    end
end
if IsClient() then
end
