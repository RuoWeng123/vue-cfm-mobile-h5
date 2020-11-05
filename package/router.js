import VueRouter from 'vue-router'

class Router extends VueRouter {

  constructor (props) {
    super(props)
    this.isBack = false
  }

  push (location, onComplete, onAbort) {
    this.isBack = false
    super.push(location, onComplete, onAbort)
  }

  back () {
    this.isBack = true
    super.back()
  }
}

export default Router
