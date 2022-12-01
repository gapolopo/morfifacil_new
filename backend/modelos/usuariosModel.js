var pool = require('./db');
var md5 = require('md5');


async function getUsuariosLogin(user, password)
{
    try
    {
      var query = "SELECT * FROM usuarios WHERE usuario = ? AND password = ? LIMIT 1";
      var rows = await pool.query(query, [user, md5(password)]);
      return rows[0];
    }
    catch (error)
    {
      throw error;
    }
}

async function getUsuarioSel(user)
{
    try
    {
      var query = "SELECT * FROM usuarios WHERE usuario = ? LIMIT 1";
      var rows = await pool.query(query, user);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}



async function borraUsuario(user)
{
    try
    {
      var query = "DELETE FROM usuarios WHERE usuario = ?";
      var rows = await pool.query(query, user);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}

async function getUsuarios()
{
    try
    {
      var query = "SELECT * FROM usuarios ORDER BY id";
      var rows = await pool.query(query);
      return rows;
    }
    catch (error)
    {
      throw error;
    }
}



async function insertUsuarios(obj)
{
    try
    {
      var values = [[obj.usuario, obj.nombre, obj.apellido, obj.mail, md5(obj.password), obj.perfil]];
      var query = "INSERT INTO usuarios (usuario, nombre, apellido, mail, password, perfil)  VALUES ?";
      var rows = await pool.query(query, [values]);
      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}


async function updateUsuario(obj)
{
    try
    {
      console.log("Query. Usuario a modificar: " + obj.usuario);
      var values = [obj.usuario, obj.nombre, obj.apellido, obj.mail, md5(obj.password), obj.perfil, obj.usuario];
      var query = "UPDATE usuarios SET usuario = ?, nombre = ?, apellido = ?, mail = ?, password = ?, perfil = ? WHERE usuario = ?";
      var rows = await pool.query(query, values);
      //connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {

      return rows;
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }
}



module.exports = { getUsuariosLogin, getUsuarios, getUsuarioSel, insertUsuarios, updateUsuario, borraUsuario,}
