var express = require('express');
var router = express.Router();

var usuariosModel = require('../../modelos/usuariosModel');

router.get('/', function (req, res, next) {
  res.render('./admin/login', );
});


// ------ Controlador para autenticar usuario --------------- //

router.post('/', async(req, res, next) => {
  try {
    var usuario = req.body.user;
    var password = req.body.password;

    var data=await usuariosModel.getUsuariosLogin(usuario, password);

    if (data != undefined)
    {
      console.log("login - getUsuariosLogin - logueo OK, id:" + data.id);
      req.session.id_usuario = data.id;
      req.session.nombre = data.nombre + ' ' + data.apellido;
      req.session.mail = data.mail;
      req.session.perfil = data.perfil;
      res.redirect('/admin/home');
    }
    else
    {
      console.log("login - getUsuariosLogin - logueo NO OK");
      res.render('./admin/login', {error:true});
    }

  } catch (error) {
      console.log(error);
  }

})


//------------ Controlador que realiza el logout de un usuario --------

router.get('/logout', function (req,res,next) {
  console.log("login - Logout - Deslogueo OK");
  req.session.destroy();
  res.render('admin/login',);
})



module.exports = router;
