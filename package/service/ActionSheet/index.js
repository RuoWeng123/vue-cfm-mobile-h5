import Vue from 'vue'
import actionSheet from './index.vue'

class ActionSheet {

  constructor () {
    this.instance = null
  }

  show (...args) {
    if (!this.instance) {
      const ActionSheetConstructor = Vue.extend(actionSheet)
      this.instance = new ActionSheetConstructor({ el: document.createElement('div') })
      document.body.appendChild(this.instance.$el)
    }
    Vue.nextTick(() => {
      this.instance.show(...args)
    })
  }
}

export default new ActionSheet()
