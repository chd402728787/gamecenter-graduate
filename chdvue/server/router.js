/*
 * @Date: 2023-01-10 16:31:30
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-11 21:21:31
 * @FilePath: \gD_Design\chdvue\server\router.js
 */
const express = require('express');
let router = express.Router();
let user = require('./API/user.js')
let game = require('./API/game.js')
let evaluate = require('./API/evaluate.js')

router.get('/user', user.get);

router.get('/game/all',game.all);
router.get('/game/get',game.get);
router.get('/game/add',game.add);
router.get('/game/update',game.update);
router.get('/game/del',game.del);

router.get('/evaluate/all',evaluate.all);
router.get('/evaluate/get',evaluate.get);
router.get('/evaluate/add',evaluate.add);
router.get('/evaluate/update',evaluate.update);
router.get('/evaluate/del',evaluate.del);

module.exports = router
