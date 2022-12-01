var pool = require('./db');
var md5 = require('md5');


async function getCompras()
{
    try
    {
      var query = "SELECT * FROM compras WHERE status='comprar' ORDER BY id_cpra";
      var rows = await pool.query(query);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}

async function updateCompra(id, status)
{
    try
    {

      var query = "UPDATE compras SET status = ? WHERE id_cpra = ?";
      var rows = await pool.query(query, [status, id]);
      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}


async function insertCompra(obj, status, usuario)
{
    try
    {
      var values = [[obj.item, obj.cantidad, obj.medida, obj.nota, status, usuario ]];
      var query = "INSERT INTO compras (item, cantidad, medida, nota, status, usuario)  VALUES ?";
      var rows = await pool.query(query, [values]);
      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}




/*

async function getCompraSel(id_cpra)
{
    try
    {
      var query = "SELECT * FROM compras WHERE id_cpra = ? LIMIT 1";
      var rows = await pool.query(query, id_cpra);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}


async function insertCompra(obj)
{
    try
    {
      var values = [[obj.denominacion, obj.receta]];
      var query = "INSERT INTO compras (denominacion, receta)  VALUES ?";
      var rows = await pool.query(query, [values]);
      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}


async function updateCompra(obj)
{
    try
    {
      var values = [obj.denominacion, obj.receta, obj.id_cpra];
      var query = "UPDATE compras SET denominacion = ?, receta = ? WHERE id_cpra = ?";
      var rows = await pool.query(query, values);
      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}

async function borraCompra(id_cpra)
{
    try
    {
      var query = "DELETE FROM compras WHERE id_cpra = ?";
      var rows = await pool.query(query, id_cpra);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}

*/
module.exports = {getCompras, updateCompra, insertCompra}
