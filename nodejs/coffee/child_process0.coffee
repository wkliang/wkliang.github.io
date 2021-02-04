
// http://blog.argteam.com/coding/hardening-nodejs-production-process-supervisor/

{_} = require 'underscore'
child_process = require 'child_process'
 
healthCheckInterval = 60 * 1000
 
delayTimeout = (ms, func) -> setTimeout func, ms #make setTimeout drink coffee
exports.spawnMonitoredChild = (script, port, healthCheck, environmentVariables) ->
  respawn = ->
    child = child_process.spawn process.execPath, [script],
      env: _.extend(environmentVariables, process.env)
 
    console.log "Started child, port=#{port}, pid=#{child.pid}"
    child.stdout.pipe process.stdout
    child.stderr.pipe process.stderr
 
    healthCheckTimeout = null
 
    delayedHealthCheck = ->
      healthCheckTimeout = delayTimeout healthCheckInterval, ->
        start = new Date()
        healthCheck port, (healthy) ->
          if healthy
            console.log "#{port} is healthy - ping time #{new Date() - start}ms"
            delayedHealthCheck()
          else
            console.error "#{port} did not respond in time - killing it"
            child.kill()
 
    child.on 'exit', (code, signal) ->
      clearTimeout healthCheckTimeout
      console.error "Child exited with code #{code}, signal #{signal}, respawning"
      respawn()
 
    delayedHealthCheck()
  respawn()
