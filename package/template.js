import Login from './template/Login/index.vue'
import Menu from './template/Menu/index.vue'
import MenuEdit from './template/MenuEdit/index.vue'
import Form from './template/Form/index.vue'

const components = [
  Login,
  Menu,
  MenuEdit,
  Form
]

export default {
  install (Vue) {
    components.forEach(item => Vue.component(item.name, item))
  }
}
