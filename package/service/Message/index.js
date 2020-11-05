import Vue from 'vue'
import message from './index.vue'

class Message {

  constructor () {
    this.instance = null
  }

  open (callback) {
    if (!this.instance) {
      const MessageConstructor = Vue.extend(message)
      this.instance = new MessageConstructor({ el: document.createElement('div') })
      document.body.appendChild(this.instance.$el)
    }
    Vue.nextTick(callback)
  }

  show (...args) {
    this.open(() => this.instance.show(...args))
  }

  success (...args) {
    this.open(() => this.instance.success(...args))
  }

  error (...args) {
    this.open(() => this.instance.error(...args))
  }

  tool (...args) {
    this.open(() => this.instance.tool(...args))
  }
}

export default new Message()
