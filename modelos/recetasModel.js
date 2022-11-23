var pool = require('./db');
var md5 = require('md5');


async function getRecetas()
{
    try
    {
      var query = "SELECT * FROM recetas ORDER BY id_rec";
      var rows = await pool.query(query);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}


async function getRecetaSel(id_rec)
{
    try
    {
      var query = "SELECT * FROM recetas WHERE id_rec = ? LIMIT 1";
      var rows = await pool.query(query, id_rec);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}


async function insertReceta(obj)
{
    try
    {
      var values = [[obj.denominacion, obj.receta]];
      var query = "INSERT INTO recetas (denominacion, receta)  VALUES ?";
      var rows = await pool.query(query, [values]);
      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}


async function updateReceta(obj)
{
    try
    {
      var values = [obj.denominacion, obj.receta, obj.id_rec];
      var query = "UPDATE recetas SET denominacion = ?, receta = ? WHERE id_rec = ?";
      var rows = await pool.query(query, values);
      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}

async function borraReceta(id_rec)
{
    try
    {
      var query = "DELETE FROM recetas WHERE id_rec = ?";
      var rows = await pool.query(query, id_rec);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}

module.exports = {getRecetas, getRecetaSel, insertReceta, updateReceta, borraReceta}
