var express = require('express');
var router = express.Router();
var recetasModel = require('./../modelos/recetasModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);


var recetaSel = [[id_rec=>"", denominacion=>"", receta="", fecha=""]];

router.get('/', async function(req,res,next) {
  var recetas = await recetasModel.getRecetas();
  res.render('recetas', {
    layout:'admin/layout',
    recetas,
    recetaSel,
    nombre: req.session.nombre,
    perfil: req.session.perfil,
  });
});

/*
router.get('/vista/:id_rec', async function(req,res,next) {
  let id_rec = req.params.id_rec;
  var recetas = await recetasModel.getRecetas();
  var recetaSel = [[id_rec=>"", denominacion=>"", receta="", fecha=""]];
  console.log("Recetas. vista de receta: " + id_rec);

  if  (id_rec != "" && id_rec != undefined)
  {
      recetaSel = await recetasModel.getRecetaSel(id_rec);
  }

  res.render('recetasView', {
    layout:'admin/layout',
    recetas,
    recetaSel,
    nombre: req.session.nombre,
    perfil: req.session.perfil,
    id_rec_Sel: id_rec,
  });
});
*/

router.get('/vista', async function(req,res,next) {
  let id_rec = req.query.id_rec;
  var recetas = await recetasModel.getRecetas();
  var recetaSel = [[id_rec=>"", denominacion=>"", receta="", fecha="", id_img=""]];

  if  (id_rec != "" && id_rec != undefined)
  {
      console.log("encontro id de receta");
      recetaSel = await recetasModel.getRecetaSel(id_rec);

      console.log(JSON.stringify(recetaSel));

      recetaSel = recetaSel.map(receta => {
        if (receta.id_img)
        {
          console.log("encontro id de imagen");
          const imagen = cloudinary.image(receta.id_img, {
            width:250,
            heigth:250,
            crop:'fill'
          });

          return { ...receta, imagen }
        }
        else
        {
            console.log("NO encontro id de imagen");
            return { ...receta, imagen:''}
        }
      });
  }

  res.render('recetasView', {
    layout:'admin/layout',
    recetas,
    recetaSel,
    nombre: req.session.nombre,
    perfil: req.session.perfil,
    id_rec_Sel: id_rec,
  });
});


router.post('/nuevo', async(req, res, next) => {

  try {

    var recetas =  await recetasModel.getRecetas();
    var recetaSel = [[id_rec=>"", denominacion=>"", receta="", fecha=""]];

    var id_img='';
    if(req.files && Object.keys(req.files).length > 0)
    {
       imagen = req.files.imagen
       id_img = (await uploader(imagen.tempFilePath)).public_id;
    }

    //console.log(JSON.stringify(usuarioSel));

    // --------------------- Se inserta el usuario ------------------------
    if (req.body.denominacion != "" && req.body.receta != "")
    {
        if  (req.body.id_rec != "")
        {
          console.log("Recetas. Modificación de receta: " + req.body.id_rec);
          await recetasModel.updateReceta(req.body, id_img);
          var recetas = await recetasModel.getRecetas();
          var recetaSel = [[id_rec=>"", denominacion=>"", receta="", fecha=""]];
          //res.redirect('/recetas');
          res.render('recetas', {
            layout:'admin/layout',
            error:true,
            message: 'Se modificó la receta',
            recetaSel,
            recetas,
            nombre: req.session.nombre,
            perfil: req.session.perfil,
         })
        }
        else
        {
          console.log("Recetas. Alta de receta: " + req.body.denominacion);
          await recetasModel.insertReceta(req.body, id_img);
          var recetas = await recetasModel.getRecetas();
          var recetaSel = [[id_rec=>"", denominacion=>"", receta="", fecha=""]];
          //res.redirect('/recetas');
          res.render('recetas', {
                layout:'admin/layout',
                error:true,
                message: 'Receta guardada',
                recetaSel,
                recetas,
                nombre: req.session.nombre,
                perfil: req.session.perfil,
          })
        }
    }
    else
    {
      var recetas = await recetasModel.getRecetas();
      var recetaSel = [[id_rec=>"", denominacion=>"", receta="", fecha=""]];
      res.render('recetas', {
            layout:'admin/layout',
            error:true,
            message: 'Todos los campos son requeridos',
            recetaSel,
            recetas,
            nombre: req.session.nombre,
            perfil: req.session.perfil,
      })
    }

  } catch (error) {
    console.log(error)
    res.render('recetas', {
      layout:'admin/layout',
      error: true,
      message: 'Error inesperado, no se cargó la receta',
      recetaSel,
      recetas,
      nombre: req.session.nombre,
      perfil: req.session.perfil,
    });
  }
});


router.post('/bm', async(req, res, next) => {
  try
  {
    if (req.body.boton == "modificar")
    {
      console.log("Recetas. Ingreso a modificar " + req.body.rseleccion);
      var id_rec = req.body.rseleccion;
      var recetaSel = await recetasModel.getRecetaSel(id_rec);
      var recetas = await recetasModel.getRecetas();

      res.render('recetas', {
        layout:'admin/layout',
        recetas,
        recetaSel,
        nombre: req.session.nombre,
        perfil: req.session.perfil,
      })
    }
    else
    {
      console.log("Recetas. Ingreso a borrar " + req.body.rseleccion);
      await recetasModel.borraReceta(req.body.rseleccion);
      var recetas = await recetasModel.getRecetas();
      var recetaSel = [[id_rec=>"", denominacion=>"", receta="", fecha=""]];
      //res.redirect('/recetas');
      res.render('recetas', {
            layout:'admin/layout',
            error:true,
            message: 'Receta Borrada',
            recetaSel,
            recetas,
            nombre: req.session.nombre,
            perfil: req.session.perfil,
      })
    }

  }
  catch (error)
  {
    console.log(error)
    res.render('recetas',
    {
      layout:'admin/layout',
      error: true,
      message: 'Error inesperado, no se modificó la receta',
      recetas,
      nombre: req.session.nombre,
      perfil: req.session.perfil,
    });
  }

});


module.exports = router;
