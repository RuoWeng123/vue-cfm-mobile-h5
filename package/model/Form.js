import FormColumn from './FormColumn.js'
import FormAdapter from './FormAdapter.js'
import FormConfig from './FormConfig.js'

class Form {

  static Events = {
    submit: 'submit'
  }

  constructor ({ config = {}, columns = [], adapter }) {
    this.initAdapter(adapter)
    this.initColumns(columns)
    this.initConfig(config)
  }

  initAdapter (adapter) {
    if (adapter instanceof Object) adapter = new FormAdapter(adapter)
    adapter.setOptions(this)
    this.adapter = adapter
  }

  initConfig (config) {
    this.config = new FormConfig(config, this.columns)
  }

  initColumns (columns) {
    this.columns = columns.map(column => new FormColumn(column, this.adapter.emitEvent.bind(this.adapter)))
  }

  initContext (context) {
    this.context = context
  }

  initDefault (...args) {
    this.adapter.setValue(...args)
  }
}

export default Form
