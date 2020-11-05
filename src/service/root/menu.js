import storage from 'good-storage'
import { Observable, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { SystemMenu } from '@/config'

const menu$$ = new BehaviorSubject([])

const menu$ = new Observable(observe => {
  const defaultMenus = [
    {
      title: '最近使用',
      children: []
    },
    {
      title: '智慧安监',
      children: [
        {
          img: require('@/assets/安全监控@3x.png'),
          text: '安全监控',
          selected: true
        },
        {
          img: require('@/assets/视频@3x.png'),
          text: '视频监控',
          selected: true
        }
      ]
    },
    {
      title: '智能生产',
      children: [
        {
          img: require('@/assets/风机@3x.png'),
          text: '风机监控',
          selected: true
        },
        {
          img: require('@/assets/瓦斯抽采@3x.png'),
          text: '瓦斯抽采',
          selected: true
        },
        {
          img: require('@/assets/皮带@3x.png'),
          text: '皮带集控',
          selected: true
        },
        {
          img: require('@/assets/电力监控@3x.png'),
          text: '智能供电',
          selected: true
        },
        {
          img: require('@/assets/排水@3x.png'),
          text: '智能排水',
          selected: true
        }
      ]
    }
  ]
  const menus = storage.get(SystemMenu) || defaultMenus
  observe.next(menus)
}).subscribe(menu$$)

const updateMenu = (newMenus) => {
  storage.set(SystemMenu, newMenus)
  menu$.next(newMenus)
}

const curMenu$ = menu$$.pipe(
  map(val => {
    return val.map(item => {
      const children = item.children.filter(v => v.selected)
      return { ...item, children }
    })
  })
)

export {
  menu$,
  updateMenu,
  menu$$,
  curMenu$
}
