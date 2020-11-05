import _ from 'lodash'

class Super {

  constructor ({ options = {}, events = {}, sources = {}, value = {} }) {
    this._options = options
    this._sources = sources
    this._events = events
    this._value = value
  }

  getOptions () {
    return this._options
  }

  setOptions (options) {
    this._options = options
  }

  getValue (name) {
    return name ? _.get(this._value, name) : this._value
  }

  setValue (name, value) {
    if (typeof name === 'string') {
      this._value = _.assign({}, _.set(this._value, name, value))
    } else {
      this._value = _.assign({}, this._value, name)
    }
  }

  getSource (name) {
    return name ? _.get(this._sources, name) : this._sources
  }

  setSource (name, value) {
    const obj = typeof name === 'string' ? { [name]: value } : name
    this._sources = Object.assign({}, this._sources, obj)
  }

  emitEvent (name, ...args) {
    const callback = _.get(this._events, name)
    return callback && callback.call(this, ...args)
  }
}

export default Super
