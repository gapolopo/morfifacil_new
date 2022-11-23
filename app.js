var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var pool = require('./modelos/db');

var app = express();

app.use(session({
    name : 'morfifacil',
    secret : '123j12j3ñ12j3j12ñj3ñ21j3ñjkñj3ñ1',
    resave :false,
    saveUninitialized: true,
    cookie : {
            maxAge:(1000 * 60 * 100)
    }
}));


// ---------------- Middleware Secured -------------------------
// Se encarga de controlar el acceso a paginas de usuarios logueados.


secured = async(req,res,next) => {
  try
  {
    if(req.session.id_usuario) {
      console.log("app - secured - usuario logueado");
      next();
    } else {
      console.log("app - secured - usuario NO logueado");
      res.redirect('/admin/login');
    }
  }
  catch(error)
  {
    console.log(error);
  }
}


admin = async(req,res,next) => {
  try
  {
    if(req.session.perfil == 'admin')
    {
      console.log("app - middleware admin - usuario con perfil admin");
      next();
    }
    else
    {
      console.log("app - middleware admin - El usuario no es admin");
      //res.redirect('/admin/login');
      res.render('admin/login', {
        layout:'admin/layout',
        alert:true,
        message: 'Para ingresar debe ser administrador',
     })
    }
  }
  catch(error)
  {
    console.log(error);
  }
}


cheff = async(req,res,next) => {
  try
  {
    if(req.session.perfil == 'cheff' || req.session.perfil == 'admin')
    {
      console.log("app - middleware cheff - usuario con perfil cheff");
      next();
    }
    else
    {
      console.log("app - middleware cheff - El usuario no es cheff");
      //res.redirect('/admin/login');
      res.render('admin/login', {
        layout:'admin/layout',
        alert:true,
        message: 'Para ingresar debe ser cheff o administrador',
     })
    }
  }
  catch(error)
  {
    console.log(error);
  }
}

cocinero = async(req,res,next) => {
  try
  {
    if(req.session.perfil == 'cocinero' || req.session.perfil == 'cheff' || req.session.perfil == 'admin')
    {
      console.log("app - middleware cocinero - usuario con perfil cocinero");
      next();
    }
    else
    {
      console.log("app - middleware cocinero - El usuario no es cocinero");
      //res.redirect('/admin/login');
      res.render('admin/login', {
        layout:'admin/layout',
        alert:true,
        message: 'Para ingresar debe ser cocinero, cheff o administrador',
     })
    }
  }
  catch(error)
  {
    console.log(error);
  }
}

// --------------------------------------------------


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//-----------------    Rutas    ---------------------

var homeRouter = require('./routes/admin/home');
var loginRouter = require('./routes/admin/login');
var usuariosRouter = require('./routes/admin/usuarios');
var recetasRouter = require('./routes/recetas');
var contactosRouter = require('./routes/contactos');
var comprasRouter = require('./routes/compras');

app.use('/', homeRouter);
app.use('/contactos', contactosRouter);

app.use('/admin/home', secured, homeRouter);
app.use('/admin/login', loginRouter);

app.use('/admin/AltaUsuarios', secured, admin, usuariosRouter);
app.use('/recetas', cheff, recetasRouter);

app.use('/compras', cocinero, comprasRouter);


// POST method route
// Access the parse results as request.body
/*
app.post('/admin/AltaUsuarios', function(request, response){
    console.log(request.body.nombre);
    console.log(request.body.mail);
});
*/
//app.use('/admin/usuarios/nuevo', secured, usuariosRouter);



//----------------------------------------------------

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
