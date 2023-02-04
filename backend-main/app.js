var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()
var session = require('express-session')

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var principalRouter = require('./routes/principal');
var contactoRouter = require('./routes/contacto');
var novedadesRouter = require('./routes/admin/novedades')
var loginRouter = require('./routes/admin/login');
var usuarioModelsRouter = require('./modelos/usuarioModels')
var mysqlRouter = require('./modelos/bd');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: aaaa,
  cookie: {maxAge : null},
  resave: false,
  saveUninitialized: true
}))

secured = async(req, res, next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    }else{
      res.redirect('/admin/login');
    }
  }catch(error){
      console.log(error);
  }
}

app.get('/principal', function(req,res){
  res.send('Pagina principal');
})

app.get('/contacto', function(req,res){
  res.send('Contacto');
})

app.get('/nosotros', function(req,res){
  res.send('Nosotros');
})

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/principal', principalRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/novedades',secured, novedadesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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