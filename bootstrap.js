// This file loads config.js and frame.js.
// You don't need to touch this file.

let {classes: Cc, interfaces: Ci, utils: Cu} = Components
function startup() {
  Cu.import('resource://gre/modules/Services.jsm')
  Cu.import('resource://gre/modules/devtools/Console.jsm')
  let apiPref = 'extensions.VimFx.api_url'
  let apiUrl = Services.prefs.getComplexValue(apiPref, Ci.nsISupportsString).data
  Cu.import(apiUrl, {}).getAPI(vimfx => {
    let path = __SCRIPT_URI_SPEC__.replace('bootstrap.js', 'config.js')
    let scope = {Cc, Ci, Cu, vimfx}
    Services.scriptloader.loadSubScript(path, scope, 'UTF-8')
  })
  Cc['@mozilla.org/globalmessagemanager;1']
    .getService(Ci.nsIMessageListenerManager)
    .loadFrameScript('chrome://vimfx-config/content/frame.js', true)
}
function shutdown() {
  Cc['@mozilla.org/globalmessagemanager;1']
    .getService(Ci.nsIMessageListenerManager)
    .removeDelayedFrameScript('chrome://vimfx-config/content/frame.js')
}
function install() {}
function uninstall() {}
