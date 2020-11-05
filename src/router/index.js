import Vue from 'vue'
import { Router } from 'trust'
import basic from './basic.js'

Vue.use(Router)

const routes = [].concat(basic)

export default new Router({ routes: routes })
