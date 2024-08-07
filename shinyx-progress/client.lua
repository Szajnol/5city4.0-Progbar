local ProgbarActive = false

function startProgress()
    if ProgbarActive then return nil end
    ProgbarActive = true
    SendNUIMessage({action = "startProgressbar"})
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
    local progbar = exports['shinyx-progress']:startProgress('test')
    if progbar then
        print('test')
    end
end)
