var express = require('express');
var router = express.Router();
var comprasModel = require('./../modelos/comprasModel');


router.get('/', async function(req,res,next) {
  var compras = await comprasModel.getCompras();
  res.render('comprasView', {
    layout:'admin/layout',
    compras,
    nombre: req.session.nombre,
    perfil: req.session.perfil,
  });
});

router.get('/new', async function(req,res,next) {
  res.render('compras', {
    layout:'admin/layout',
    nombre: req.session.nombre,
    perfil: req.session.perfil,
  });
});


router.post('/bd', async(req, res, next) => {

  try {

    var compras =  await comprasModel.getCompras();

    //console.log(JSON.stringify(usuarioSel));

    // --------------------- Se inserta el usuario ------------------------
    if (req.body.rseleccion != "")
    {
        if  (req.body.boton == "compra realizada")
        {
          console.log("Compras. Compra realizada: " + req.body.rseleccion);
          await comprasModel.updateCompra(req.body.rseleccion, 'comprado');
          var compras = await comprasModel.getCompras();
          //res.redirect('/compras');
          res.render('comprasView', {
            layout:'admin/layout',
            error:true,
            message: 'Item cerrado como comprado',
            compras,
            nombre: req.session.nombre,
            perfil: req.session.perfil,
         })
        }
        else
        {
          console.log("Compras. Eliminar ítem: " + req.body.rseleccion);
          await comprasModel.updateCompra(req.body.rseleccion, 'eliminado');
          var compras = await comprasModel.getCompras();
          //res.redirect('/compras');
          res.render('comprasView', {
            layout:'admin/layout',
            error:true,
            message: 'Item eliminado de la lista de compras',
            compras,
            nombre: req.session.nombre,
            perfil: req.session.perfil,
         })
        }
    }
    else
    {
      var compras = await comprasModel.getCompras();
      res.render('comprasView', {
            layout:'admin/layout',
            error:true,
            message: 'Antes de continuar seleccione la compra',
            compras,
            nombre: req.session.nombre,
            perfil: req.session.perfil,
      })
    }

  } catch (error) {
    console.log(error)
    res.render('comprasView', {
      layout:'admin/layout',
      error: true,
      message: 'Error inesperado, no se realizó la acción',
      compras,
      nombre: req.session.nombre,
      perfil: req.session.perfil,
    });
  }
});


router.post('/new', async(req, res, next) => {

  try {

    var compras =  await comprasModel.getCompras();

    //console.log(JSON.stringify(usuarioSel));

    // --------------------- insert ------------------------
    if (req.body.item != "" && req.body.cantidad != "" && req.body.medida != "")
    {
       console.log("Compras. Alta de compra: " + req.body.item);
       await comprasModel.insertCompra(req.body, 'comprar', req.session.nombre);
       res.render('compras', {
         layout:'admin/layout',
         error:true,
         message: 'Item agregado',
         nombre: req.session.nombre,
         perfil: req.session.perfil,
      })
    }
    else
    {
       res.render('compras', {
         layout:'admin/layout',
         error:true,
         message: 'Item, cantidad y medida son requeridos',
         compras,
         nombre: req.session.nombre,
         perfil: req.session.perfil,
      })
    }

  } catch (error) {
    console.log(error)
    res.render('compras', {
      layout:'admin/layout',
      error: true,
      message: 'Error inesperado, no se cargó el ítem',
      compras,
      nombre: req.session.nombre,
      perfil: req.session.perfil,
    });
  }
});


module.exports = router;
