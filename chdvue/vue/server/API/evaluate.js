/*
 * @Date: 2023-02-11 13:44:46
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-12 17:42:30
 * @FilePath: \gD_Design\chdvue\server\API\evaluate.js
 */
let db = require('../db/index.js')

exports.all = (req, res) => {        //获取evaluate表全部数据
    var sql = 'select * from evaluate'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.get = (req, res) => {        //通过id查询数据
    var sql = 'select * from evaluate where id = ?'    //？用于占位
    db.query(sql, [req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.del = (req, res) => {        //通过id删除数据
    var sql = 'delete from evaluate where id = ?'
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

exports.add = (req, res) => {        //向evaluate表添加数据
    var sql = 'insert into evaluate (id,gname,evaluation) values (?,?,?)'
    db.query(sql, [req.query.id, req.query.gname, req.query.evaluation], (err, data) => {
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
              message: '添加失败'
            })
        }
    })
}

exports.update = (req, res) => {        //通过id更新数据
    var sql = 'update evaluate set gname = ?, evaluation = ? where id = ?'
    db.query(sql, [req.query.gname, req.query.evaluation, req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        if(data.changedRows > 0) {
          res.send({
            status: 200,
            message: '修改成功'
          })
        }else{
          res.send({
            status: 202,
            message: '修改失败'
          })
        }
    })
}