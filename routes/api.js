var express = require('express');
var router = express.Router();
const settings = require('../settings');

var multer  = require('multer');

var User = require('../libs/user');
var Doc = require('../libs/doc');


/* Закомментировал на время разработки
router.use(function(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).json({errMessage:'Please, log in!'});
    }
});
*/

/* GET list of users */
router.get('/users', function(req, res, next) {
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
    User.findByIdAndRemove(req.params.id,function (err,user) {
        console.log(user);
        if(err){
            res.status(400).json({errMessage:err.message});
            console.error(err);
            return false;
        }
        if(!user){
            res.status(400).json({errMessage:'User not found'});
            return false;
        }        
        res.json({message:'User successfully deleted!'});
    });
});


//Upload files
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, settings.PROJECT_DIR + '/docs')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});

var fileFilter = function(req, file, cb){
    if( 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' != file.mimetype ){
        cb(new Error('Invalid file type. Only .docx are accepted.'));
        return;
    }
    cb(null,true);
};

var upload = multer({
    storage: storage,
    fileFilter : fileFilter
}).single('file');


router.post('/file', upload, function(req,res,next){
    Doc.addFile(req.file,function(err,doc){
        if(err) {
            res.status(400).json({errMessage:err.message});
        } else {
            res.json({message:'File successfully accepted!'});
            //TODO: добавить объект doc
        }
    });
});

/*     DOCS API    */
/* GET full list of docs */
router.get('/docs',function (req,res,next) {
    Doc.find({},{
        path:0,
        html:0,
        html_formatted :0,
        __v:0
        },function(err,docs){
            if (err) {
                res.status(400).json({errMessage:err.message});
                console.log(err);
            } else {
                res.json(docs);
            }
    })

});

/* Get one Doc by id */
router.get('/docs/id/:id',function(req,res,next){
    Doc.findById(req.params.id,function (err,doc) {
        if(err){
            res.status(400).json({errMessage:err.message});
            return false;
        }
        if(!doc){
            res.status(400).json({errMessage:'Document not found'});
            return false;
        }
        res.json(doc);
    });
});


/* Update Doc */
router.post('/docs/:id',function(req,res,next){
   Doc.findById(
       req.params.id,
       function(err,doc){
           if(err){
               res.status(400).json({errMessage:err.message});
               return false;
           }
           if(!doc){
               res.status(400).json({errMessage:'Document not found'});
               return false;
           }
           //Fields that can be formatted
           const docKeys = ['html','html_formatted','author','revisor','editor','remarks','masechet','daf','username'];
           docKeys.forEach(function(key){
               if (req.body[key]){
                   doc[key] = req.body[key];
               }
           });
           doc.updated_at = Date.now();
           doc.save(function(err,doc){
               if (err){
                   res.status(400).json({errMessage:err.message});
                   console.error(err);
               } else {
                   res.json(doc);
               }
           });

   });
});

module.exports = router;
