const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'bubble_mall',
  port: 3306
})

/**
 * 接收一个 sql 语句，以及所需 value
 * 这里第二个参数使用 value 是因为可以使用占位符 ?
 * 例如：query(`slect * from bubble_mall where id = ?`, [1])
 * @param {*} sql
 * @param {*} value
 */
let query = function(sql, value) {
  // console.log(value)
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, value, (err, rows) => {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            // console.log(rows)
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports = query
