/*
 * @Date: 2023-01-13 13:11:35
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-17 13:12:46
 * @FilePath: \gD_Design\chdvue\server\API\game.js
 */
let db = require('../db/index.js')

exports.all = (req, res) => {        //获取game表全部数据
    var sql = 'select * from game'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.get = (req, res) => {        //通过id查询数据
    var sql = 'select * from game where id = ?'    //？用于占位
    db.query(sql, [req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.del = (req, res) => {        //通过id删除数据
    var sql = 'delete from game where id = ?'
    db.query(sql, [req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        if(data.affectedRows > 0) {
            res.send({
              status: 200,
              message: '删除成功'
            })
        }else{
            res.send({
              status: 202,
              message: '删除失败'
            })
        }
    })
}

exports.add = (req, res) => {        //向info表添加数据
    var sql = 'insert into game (id,gname,img,gamelink,introduction,date,hotvalue) values (?,?,?,?,?,?)'
    db.query(sql, [req.query.id, req.query.gname, req.query.img, req.query.gamelink, req.query.introduction, req.query.date, req.query.hotvalue], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        if(data.affectedRows > 0) {
            res.send({
              status: 200,
              message: 'success'
            })
        }else{
            res.send({
              status: 202,
              message: 'error'
            })
        }
    })
}

exports.update = (req, res) => {        //通过id更新数据
    var sql = 'update game set gname = ?, img = ?, gamelink = ?,introduction = ?, date = ?,hotvalue = ?  where id = ?'
    db.query(sql, [req.query.gname, req.query.img, req.query.gamelink,introduction, req.query.date, req.query.hotvalue, req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        if(data.changedRows > 0) {
          res.send({
            status: 200,
            message: 'success'
          })
        }else{
          res.send({
            status: 202,
            message: 'error'
          })
        }
    })
}