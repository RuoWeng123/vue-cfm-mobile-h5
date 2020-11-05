import moment from 'moment'

moment.locale('zh-cn')

export function calendarTime(date, calendar = true) {
  if (!calendar) return date
  return moment(date).calendar(null, {
    sameDay: '[今天]',
    nextDay: '[明天]',
    nextWeek: 'dddd',
    lastDay: '[昨天]',
    lastWeek: 'dddd',
    sameElse: 'LL'
  })
}
