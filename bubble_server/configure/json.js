/**
 * json.js
 * 封装 json 模块
 */
let json = function (response, result) {
  if (typeof result == 'undefined') {
    response.json({
      code: '1',
      msg: '操作失败！'
    })
  } else if (result == 'add') {
    response.json({
      code: '0',
      msg: '添加成功！'
    })
  } else if (result == 'delete') {
    response.json({
      code: '0',
      msg: '删除成功！'
    })
  } else if (result == 'update') {
    response.json({
      code: '0',
      msg: '更新成功！'
    })
  } else if (result.result != 'undefined' && result.result == 'select') {
    response.json({
      code: '0',
      msg: '查找成功！',
      data: result.data
    })
  } else if (result.result != 'undefined' && result.result == 'selectall') {
    response.json({
      code: '0',
      msg: '全部查找成功',
      data: result.data
    })
  } else {
    response.json(result)
  }
}
module.exports = json
