import _ from 'lodash'
import getRule from '../utils/getRule.js'

class FormConfig {

  constructor({ layout, rules = {}, panels, isFixed = true, confirm = true }, columns) {
    this.layout = layout
    this.confirm = confirm
    this.isFixed = isFixed
    this.panels = this.getPanels(panels, columns)
    this.rules = this.getRules(rules, columns)
  }

  getPanels(panels, columns) {
    if (!panels) {
      return [{ columns }]
    } else {
      return panels.map(panel => {
        if (typeof panel === 'string' || Array.isArray(panel)) {
          panel = { columns: panel }
        }
        if (typeof panel.columns === 'string') {
          const [start, end] = panel.columns.split('-')
          const startIndex = columns.findIndex(v => v.field === start)
          const endIndex = columns.findIndex(v => v.field === end)
          const results = columns.slice(startIndex, endIndex + 1)
          return { ...panel, columns: results }
        } else {
          
          const results = panel.columns.reduce((results, item) => {
            const obj = columns.find(v => v.field === item)
            obj && results.push(obj)
            return results
          }, [])
          return { ...panel, columns: results }
        }
      })
    }
  }

  getRules(rules = {}, columns = []) {

    const fn = (message) => ({ required: true, message, trigger: 'blur' })
    const result = {}
    _.forIn(rules, (v, k) => {
      let validator = v
      if (typeof v === 'boolean') {
        const column = columns.find(n => n.field === k)
        validator = column ? fn(`请填写${ column.label }`) : null
      } else if (typeof v === 'number') {
        validator = getRule(v)
     
      } else if (typeof v === 'string') {
        validator = fn(v)
      }
      validator && (result[k] = validator)
    })
    return result
  }
}

export default FormConfig
