class Request {

  constructor({ name, payload, callback }) {
    this.name = name
    this.payload = payload
    this.callback = callback
  }

  string() {
    return JSON.stringify({
      name: this.name,
      payload: this.payload,
      callback: this.callback
    })
  }
}

class Response {

  constructor({ payload, callback }) {
    this.payload = payload
    this.callback = callback
  }

  string() {
    return JSON.stringify({
      payload: this.payload,
      callback: this.callback
    })
  }
}

class Callback {
  static id = 0

  static callbacks = {}

  static register(callback) {
    Callback.id++
    Callback.callbacks[Callback.id] = callback
    return Callback.id
  }

  static get(id) {
    return Callback.callbacks[id]
  }
}

class Super {

  constructor() {
    this.callback = {}
  }

  define(name, callback) {
    if (!this.callback[name]) this.callback[name] = []
    this.callback[name].unshift(callback)
    return () => {
      const index = this.callback[name].indexOf(callback)
      index > -1 && (this.callback[name].splice(index, 1))
    }
  }

  post({ name, payload, callback }, send) {
    const message = new Request({ name, payload, callback: Callback.register(callback) })
    send(message)
  }

  message(msg, send) {
    msg = JSON.parse(msg)
    if (msg.name) {
      const message = new Request(msg)
      const callbacks = this.callback[message.name] || []
      for (let i = 0; i < callbacks.length; i++) {
        const callback = callbacks[i]
        const flag = callback(message.payload, (payload) => {
          send(new Response({ payload, callback: message.callback }))
        })
        if (flag === true) break
      }
    } else {
      const message = new Response(msg)
      const callback = Callback.get(message.callback)
      callback && callback(message.payload)
    }
  }
}

export class Native extends Super {

  constructor(webview) {
    super()
    this.webview = webview
  }

  message(msg) {
    super.message(msg, this.send.bind(this))
  }

  post(options) {
    super.post(options, this.send.bind(this))
  }

  send(message) {
    this.webview.sendToBridge(message.string())
  }
}

export class Browser extends Super {

  constructor() {
    super()
  }

  init() {
    setTimeout(() => window.WebViewBridge && (window.WebViewBridge.onMessage = this.message.bind(this)), 0)
  }

  message(msg) {
    super.message(msg, this.send.bind(this))
  }

  post(options) {
    super.post(options, this.send.bind(this))
  }

  send(message) {
    window.WebViewBridge && window.WebViewBridge.send(message.string())
  }
}
