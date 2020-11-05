import { Browser } from "./core.js"

const browser = new Browser()

export default {
  init() {
    browser.init()
  },
  defineBack(callback) {
    return browser.define('back', callback)
  },
  setAlias(alias, callback) {
    browser.post({ name: "SetAlias", payload: alias, callback })
  },
  setTags(tags, callback) {
    browser.post({ name: "SetTags", payload: tags, callback })
  },
  clearCookie() {
    browser.post({ name: "ClearCookie" })
  }
}
