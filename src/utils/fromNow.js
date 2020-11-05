import moment from 'moment'

moment.locale('zh-cn')

export function fromNow (date) {
  return moment(date).fromNow()
}
