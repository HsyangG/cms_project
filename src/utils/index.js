// 这里统一定义一些使用频率较高的函数
import BScroll from 'better-scroll'
export function initScroll (scroll, wrapper) {
  // better-scroll 在浏览器的手机模式下是要手动刷新页面才能产滚动的
  // 在手机端不会有这样的问题
  if (!scroll) {
    scroll = new BScroll(wrapper, {
      click: true
    })
    scroll.refresh()
  } else {
    scroll.refresh()
  }
}

/**
 * 传入 ref，去除点击穿透现象
 * @param dom
 */
export function toStopPrevent (dom) {
  dom.addEventListener('touchmove', (event) => {
    event.preventDefault() // 阻止默认行为
    event.stopPropagation() // 阻止事件冒泡
  }, false)
}
