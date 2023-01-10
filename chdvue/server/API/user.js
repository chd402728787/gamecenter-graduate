let db = require('../db/index.js')

exports.get = (req, res) => {
    var sql = 'select * from user'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}