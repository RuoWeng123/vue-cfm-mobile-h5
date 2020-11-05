class FormColumn {

  constructor ({ field, layout, source, events = [], ...props }, callback) {
    this.field = field
    this.layout = layout
    this.source = source
    this.props = props
    this.events = events.reduce((results, item) => {
      const [event] = item.split(':')
      results[event] = (...args) => callback(item, ...args)
      return results
    }, {})
  }
}

export default FormColumn
