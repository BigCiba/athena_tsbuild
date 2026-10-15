local __TSTL_FILE_PATH__ = "override/CScriptParticleManager"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 5,["5"] = 6,["7"] = 16,["8"] = 17,["9"] = 18,["10"] = 19,["11"] = 20,["12"] = 21,["15"] = 24,["16"] = 25,["17"] = 29,["19"] = 31,["20"] = 16,["21"] = 33,["22"] = 37,["23"] = 33});
if CScriptParticleManager.CreateParticle_Engine == nil then
    CScriptParticleManager.CreateParticle_Engine = CScriptParticleManager.CreateParticle
end
CScriptParticleManager.CreateParticle = function(self, particleName, attachment, owner)
    local playerID = IsServer() and -1 or GetLocalPlayerID()
    if IsServer() and IsValid(owner) and owner.GetPlayerOwnerID ~= nil then
        local _playerID = owner:GetPlayerOwnerID()
        if PlayerResource:IsValidPlayerID(_playerID) then
            playerID = _playerID
        end
    end
    if ParticleClear:CanCreate(playerID) then
        ParticleClear:Record(playerID)
        return ParticleManager:CreateParticle_Engine(particleName, attachment, owner)
    end
    return -1
end
CScriptParticleManager.CreateParticleForce = function(self, particleName, attachment, owner)
    return ParticleManager:CreateParticle_Engine(particleName, attachment, owner)
end
