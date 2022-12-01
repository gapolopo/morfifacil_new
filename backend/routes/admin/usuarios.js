var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../modelos/usuariosModel');


router.get('/', async function(req,res,next) {
  var usuarios = await usuariosModel.getUsuarios();
  var usuarioSel = [[usuario=>undefined, nombre=>undefined, apellido=undefined, mail=>undefined, perfil=>undefined]];
  res.render('admin/AltaUsuarios', {
    layout:'admin/layout',
    usuarios,
    usuarioSel
  });
});


router.post('/nuevo', async(req, res, next) => {

  try {

    var user = req.body.usuario;
    var usuarios =  await usuariosModel.getUsuarios();
    var usuarioSel =  await usuariosModel.getUsuarioSel(user);

    console.log(JSON.stringify(usuarioSel));

    // --------------------- Se inserta el usuario ------------------------
    if (req.body.usuario != "" && req.body.nombre != "" && req.body.apellido != "" && req.body.mail != "" && req.body.password != "" && req.body.password1 != "" && req.body.perfil != "" && req.body.password == req.body.password1)
    {
        if  (usuarioSel != "")
        {
          console.log("Usuarios. Modificación de usuario: " + usuarioSel[0].usuario);
          await usuariosModel.updateUsuario(req.body);
          res.redirect('/admin/AltaUsuarios');
        }
        else
        {
          console.log("Usuarios. Alta de usuario: " + req.body.usuario);
          await usuariosModel.insertUsuarios(req.body);
          res.redirect('/admin/AltaUsuarios');
        }
    }
    else
    {
        if (req.body.password != req.body.password2)
        {
          res.render('admin/AltaUsuarios', {
            layout:'admin/layout',
            error:true,
            message: 'Las password introducidas, no son iguales',
            usuarios
          })
        }
        else
        {
          res.render('admin/AltaUsuarios', {
            layout:'admin/layout',
            error:true,
            message: 'Todos los campos son requeridos',
            usuarios
          })
        }
    }


  } catch (error) {
    console.log(error)
    res.render('admin/AltaUsuarios', {
      layout:'admin/layout',
      error: true,
      message: 'Error inesperado, no se generó el nuevo usuario',
      usuarios
    });
  }
});


router.post('/bm', async(req, res, next) => {
  try
  {
    console.log("modificar usuario, Boton " + req.body.boton);

    if (req.body.boton == "modificar")
    {
      console.log("/bm. Ingreso a modificar " + req.body.rseleccion);
      var user = req.body.rseleccion;
      var usuarioSel = await usuariosModel.getUsuarioSel(user);
      var usuarios = await usuariosModel.getUsuarios();

      res.render('admin/AltaUsuarios', {
        layout:'admin/layout',
        usuarios,
        usuarioSel,
      })
    }
    else
    {
      console.log("Ingreso a borrar " + req.body.rseleccion);
      await usuariosModel.borraUsuario(req.body.rseleccion);
      res.redirect('/admin/AltaUsuarios');
    }

  }
  catch (error)
  {
    console.log(error)
    res.render('admin/AltaUsuarios',
    {
      layout:'admin/layout',
      error: true,
      message: 'Error inesperado, no se modificó el usuario',
      usuarios
    });
  }

});


//------------ Controlador que realiza el logout de un usuario --------

router.post('/borrar', async function (req,res,next) {
  console.log("Boton borrar" + req.body.boton);
  //await usuariosModel.borraUsuario(req.body.rseleccion);
  res.redirect('/admin/AltaUsuarios');
})

module.exports = router;
