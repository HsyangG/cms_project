// 这里统一定义一些使用频率较高的函数
import BScroll from 'better-scroll'
export function initScroll (scroll, wrapper) {
  if (!scroll) {
    scroll = new BScroll(wrapper, {
      click: true
    })
  } else {
    scroll.refresh()
  }
}
