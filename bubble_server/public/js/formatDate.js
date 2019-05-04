export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    /* 用正则表达式匹配fmt参数，下面的RegExp.$1存放的就是yyyy，date.getFullYear()获取当前
     * 年份，将其转换成字符串类型 。
     * substr()表示从第几个开始，这里从第一个元素开始转换 */
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份从0开始算，需要+1
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    // 使用RegExp()构造正则表达式
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  // 如果传进来是一位，则从第一个0后面开始截取
  return ('00' + str).substr(str.length);
}
