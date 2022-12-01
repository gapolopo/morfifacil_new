var express = require('express');
var router = express.Router();
var consultasModel = require('./../modelos/consultasModel');
var nodemailer = require('nodemailer');

router.get('/consultas', async function(req,res,next) {
  let consultas = await consultasModel.getConsultas();
  res.json (consultas);
});

router.post('/contacto', async(req, res) => {

    const mail = {
      to: 'galoruy@gmail.com',
      subject: 'Contacto WEB',
      html: `${req.body.nombre} se contactó a través de la web y quiere más información al correo: ${req.body.mail} <br> Además hizo la siguiente consulta: <br> Tipo -> ${req.body.tipo} <br> mensaje: ${req.body.consulta}`
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

  res.status(201).json({error:false, message:'Mensaje enviado'});

});






module.exports=router;
