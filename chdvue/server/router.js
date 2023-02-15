/*
 * @Date: 2023-01-10 16:31:30
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-15 16:33:15
 * @FilePath: \gD_Design\chdvue\server\router.js
 */
const express = require('express');
let router = express.Router();
let gameuser = require('./API/gameuser.js')
let adminuser = require('./API/adminuser.js')
let gamerlogin = require('./API/gamerlogin.js')
let game = require('./API/game.js')
let evaluate = require('./API/evaluate.js')
//gameuser数据表增删改查
router.get('/gameuser/all',gameuser.all);
router.get('/gameuser/get',gameuser.get);
router.get('/gameuser/add',gameuser.add);
router.get('/gameuser/update',gameuser.update);
router.get('/gameuser/del',gameuser.del);
//adminuser数据表增删改查
router.get('/adminuser/all',adminuser.all);
router.get('/adminuser/get',adminuser.get);
router.get('/adminuser/add',adminuser.add);
router.get('/adminuser/update',adminuser.update);
router.get('/adminuser/del',adminuser.del);
//登陆和注册
router.get('/login', gamerlogin.login)
router.post('/register', gamerlogin.register)
//game数据表增删改查
router.get('/game/all',game.all);
router.get('/game/get',game.get);
router.get('/game/add',game.add);
router.get('/game/update',game.update);
router.get('/game/del',game.del);
//evaluate数据表增删改查
router.get('/evaluate/all',evaluate.all);
router.get('/evaluate/get',evaluate.get);
router.get('/evaluate/add',evaluate.add);
router.get('/evaluate/update',evaluate.update);
router.get('/evaluate/del',evaluate.del);

module.exports = router
