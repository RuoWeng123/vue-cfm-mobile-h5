import Vue from 'vue'
import prompt from './index.vue'

class Prompt {

  constructor () {
    this.instance = null
  }

  show (...args) {
    if (!this.instance) {
      const PromptConstructor = Vue.extend(prompt)
      this.instance = new PromptConstructor({ el: document.createElement('div') })
      document.body.appendChild(this.instance.$el)
    }
    Vue.nextTick(() => {
      this.instance.show(...args)
    })
  }
}

export default new Prompt()
