/*
 * @Date: 2023-01-10 16:25:39
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-12 17:44:10
 * @FilePath: \gD_Design\chdvue\server\db\index.js
 */
let mysql = require('mysql')

let db = mysql.createPool({
    host: '127.0.0.1', //数据库IP地址
    user: 'root', //数据库登录账号
    password: 'chd990429', //数据库登录密码
    database: 'gamecenter' //要操作的数据库
})

module.exports = db