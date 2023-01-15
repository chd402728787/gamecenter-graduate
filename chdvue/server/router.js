const express = require('express');
let router = express.Router();
let user = require('./API/user.js')
let game = require('./API/game.js')

router.get('/user', user.get);
router.get('/game/all',game.all);
router.get('/game/get',game.get);
router.get('/game/add',game.add);
router.get('/game/update',game.update);
router.get('/game/del',game.del);

module.exports = router
