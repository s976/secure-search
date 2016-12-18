var express = require('express');
var router = express.Router();
var User = require('../libs/user');

router.post('/login',function (req,res,next) {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({errMessage:'Provide username and password!'});
        return false;
    }
    User.findOne({username:req.body.username},function (err,user) {
        if (err) {
            res.status(400).json({errMessage:err.message});
            console.log(err);
        } else {
            if(!user){
                res.status(400).json({errMessage:'User does not exist!'});
            } else {
                var rightPwd = user.checkPwd(req.body.password);
                if(!rightPwd){
                    res.status(400).json({errMessage:'Invalid password'});
                } else{
                    res.json({message:'ok'});
                }
            }
        }
    });
});


/* GET list of users */
router.get('/users', function(req, res, next) {
    console.log('req.user'); //TODO remove
    console.log(req.user);   //TODO remove
    User.find({},{password:0,__v:0},function(err,users){
        if (err) {
            res.status(400).json({errMessage:err.message});
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//GET user by id
router.get('/users/id/:id',function(req,res,next){
    User.find({_id:req.params.id},{password:0,__v:0},function (err,user) {
        if (err) {
            res.status(400).json({errMessage:err.message});
            console.error(err);
        } else {
            res.json(user);
        }
    });
});

/* Add new users */
router.put('/users', function(req, res, next) {
    User.addUser({
        username : req.body.username,
        password : req.body.password,
        email    : req.body.email,
        name     : req.body.name, //can be undefined
        role     : req.body.role
    },function(err,user){
        if (err){
            res.status(400).json({errMessage:err.message});
            console.error(err);
        } else {
            res.json(user);
        }
    })
});

/* Update user */
router.post('/users/:id', function(req, res, next) {
    User.findById(
        req.params.id,
        function(err,user){
            if (err) {
                res.status(400).json({errMessage:err.message});
                console.error(err);
            } else {
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.updatePwd(req.body.password);
                if (req.body.email) user.email = req.body.email;
                if (req.body.role) user.role = req.body.role;

                user.save(function(err,user){
                    if (err){
                        res.status(400).json({errMessage:err.message});
                        console.error(err);
                    } else {
                        res.json(user);
                    }
                })
            }
        })
});

//DELETE user by id
router.delete('/users/:id',function(req,res,next){
    User.findByIdAndRemove(req.params.id,function (err) {
        if (err) {
            res.status(400).json({errMessage:err.message});
            console.error(err);
        } else {
            res.json({message:'User successfully deleted!'});
        }
    });
});


module.exports = router;
