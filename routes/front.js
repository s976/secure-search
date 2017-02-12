var express = require('express');
var router = express.Router();

/* GET. Front pages - routing processed  by Angular */
router.get(
    [
        '/',
        '/users',
        '/manage-docs'
    ],
    function(req, res, next) {
        res.render('index', { title: 'Talmud' });
    });

module.exports = router;
