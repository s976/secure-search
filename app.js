var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var ensureLogin = require('connect-ensure-login');

var User = require('./libs/user');

var front = require('./routes/front');
var api = require('./routes/api');

passport.use(new Strategy(
    function(username, password, cb) {
        User.findOne({username:username}, function(err, user) {
            if (err) { return cb(err); }
            if (!user) {
                return cb(null, false, { message: 'Incorrect username.' });
            }
            if (!user.checkPwd(password)) {
                return cb(null, false, { message: 'Incorrect password.' });
            }
            return cb(null, user);
        });
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/login',function(req,res,next){
    res.render('login', {title:'Login',messages: req.flash('error') } );
});

app.post('/login',
    passport.authenticate('local', {
        successReturnToOrRedirect: '/', //Redirecting depends on connect-ensure-login module
        failureRedirect: '/login',
        failureFlash: true
    }));

app.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    });

app.use('/api',api);

//Front URLs
app.use('/',
    ensureLogin.ensureLoggedIn(),
    front);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
