var pool = require('./db');
var md5 = require('md5');


async function getConsultas()
{
    try
    {
      var query = "SELECT * FROM consultas ORDER BY id_com";
      var rows = await pool.query(query);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}


async function insertConsulta(obj)
{
    try
    {
      var values = [[obj.nombre, obj.mail, obj.tipo, obj.consulta]];
      var query = "INSERT INTO consultas (nombre, mail, tipo, consulta)  VALUES ?";
      var rows = await pool.query(query, [values]);
      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}


module.exports = {getConsultas, insertConsulta}
