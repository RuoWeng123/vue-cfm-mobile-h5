import component from './component.js'
import template from './template.js'
import service from './service'
import Router from './router'
import model from './model'
import browser from './browser.js'

export {
  service,
  Router,
  model,
  browser
}

export default {
  install(Vue) {
    Vue.use(component)
    Vue.use(template)
  }
}
