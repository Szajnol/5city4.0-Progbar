local ProgbarActive = false

function startProgress(duration, desc)
    if ProgbarActive then return nil end
    ProgbarActive = true
    SendNUIMessage({action = "startProgressbar", duration = duration, desc = desc})
    local promise = promise.new()

    RegisterNUICallback('finish', function(data, cb)
        ProgbarActive = false
        cb('ok')
        promise:resolve(true)
    end)

    return Citizen.Await(promise)
end

exports('startProgress', startProgress)

RegisterCommand('testProgress', function()
    local progbar = exports['shinyx-progress']:startProgress(5000, test)
    if progbar then
        print('test')
    end
end)
