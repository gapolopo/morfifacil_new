var express = require('express');
var router = express.Router();
var consultasModel = require('./../modelos/consultasModel');


router.get('/', async function(req,res,next) {
  var consultas =  await consultasModel.getConsultas();
  res.render('contactos', {
    layout:'admin/layout',
    consultas,
    nombre: req.session.nombre,
    perfil: req.session.perfil,
  });
});


router.post('/nuevo', async(req, res, next) => {

  try {

    var contactos =  await consultasModel.getConsultas();

    //console.log(JSON.stringify(usuarioSel));

    // --------------------- Se inserta el usuario ------------------------
    if (req.body.nombre != "" && req.body.mail != "" && req.body.tipo != "" && req.body.consulta != "")
    {

          console.log("Contactos. Alta de Contactos:" + req.body.mail);
          await consultasModel.insertConsulta(req.body);
          res.redirect('/contactos');

    }
    else
    {
      res.render('contactos', {
            layout:'admin/layout',
            error:true,
            message: 'Todos los campos son requeridos',
            consultas,
            nombre: req.session.nombre,
            perfil: req.session.perfil,
      })
    }

  } catch (error) {
    console.log(error)
    res.redirect('/contactos');
  }
});


module.exports = router;
