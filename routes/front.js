var express = require('express');
var router = express.Router();

/* GET. Front pages - routing processed  by Angular */
router.get(
    [
        '/',
        '/users',
        '/login'
    ],
    function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

module.exports = router;
