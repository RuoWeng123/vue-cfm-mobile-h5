import Vue from 'vue'
import confirm from './index.vue'

class Confirm {

  constructor () {
    this.instance = null
  }

  show (...args) {
    if (!this.instance) {
      const ConfirmConstructor = Vue.extend(confirm)
      this.instance = new ConfirmConstructor({ el: document.createElement('div') })
      document.body.appendChild(this.instance.$el)
    }
    Vue.nextTick(() => {
      this.instance.show(...args)
    })
  }
}

export default new Confirm()
