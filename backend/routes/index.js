var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Nosotros', function(req, res, next) {
  res.render('Nosotros', {
      title: 'Nosotros',
      nombre:req.query.nombre
    });
});

router.get('/Contactos', function(req, res, next) {
  res.render('Contactos', { title: 'la pagina de contactos' });
});


router.get('/Visitas', function(req, res, next) {
  res.render('Visitas', { title: 'la pagina de visitas' });
});

router.post('/Visitas', function(req, res, next) {
  res.render('Visitas', { title: 'la pagina de visitas' });
});


router.get('/Atexto', function(req, res, next) {
  res.send('Este metodo muestra un texto');
});


router.get('/Archivo', function(req, res, next) {
  const file = `${__dirname}/users.js`;
  res.download(file);
})


module.exports = router;
