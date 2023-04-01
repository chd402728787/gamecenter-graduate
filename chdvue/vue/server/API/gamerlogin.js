/*
 * @Date: 2023-02-15 16:28:53
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-15 17:02:09
 * @FilePath: \gD_Design\chdvue\server\API\gamerlogin.js
 */
let db = require('../db/index.js')

exports.login = (req, res) => {
  var sql = 'select * from gameuser where username = ? and password = ?'
  db.query(sql, [req.query.username, req.query.password], (err, data) => {
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }

      if(data.length > 0) {
        res.send({
          status: 200,
          message: "登录成功"
        })
      }else{
        res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}

exports.register = (req, res) => {
  const sql1 = 'select * from gameuser where username = ?'
  const sql2 = 'insert into gameuser (username, password) value (?, ?)'
  db.query(sql1, [req.body.username], (err, data) => {
    if(err) {
      return res.send({
        status: 400,
        message: "操作失败"
      })
    }
    if(data.length > 0) {
      return res.send({
        status: 202,
        message: '用户名已存在'
      })
    }else{
      db.query(sql2, [req.body.username, req.body.password], (err, data) => {
        if(err) {
            return res.send({
              status: 400,
              message: "注册失败"
            })
        }
        res.send({
          status: 200,
          message: "注册成功"
        })
      })
    }
  })
}

