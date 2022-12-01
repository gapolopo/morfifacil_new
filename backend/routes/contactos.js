var express = require('express');
var router = express.Router();
var consultasModel = require('./../modelos/consultasModel');
var nodemailer = require('nodemailer');

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


          const mail = {
            to: 'galoruy@gmail.com',
            subject: 'Contacto WEB de MorfiFacil',
            html: req.body.nombre + "se contactó a través de la web y quiere más información al correo: " + req.body.mail + "<br> Además hizo la siguiente consulta: <br> Tipo -> " + req.body.tipo + " <br> Mensaje: " + req.body.consulta
          }

          const enviomail = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user:process.env.SMTP_USER,
              pass:process.env.SMTP_PASSWORD,
            }
          });

          await enviomail.sendMail(mail);

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
