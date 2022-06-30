/*Script : contiene todas las funciones que se ejecutan dentro de las 
rutas relacionadas con el manejo de los usuarios por parte 
de los roles autorizados (listar usuarios, borrar, buscar un usuario)
*/

const pool = require('../database');
const helpers = require('../lib/helpers');
const jwt = require('jsonwebtoken');
const keys = require('../keys');

const userscontrollers = {};

userscontrollers.listuser = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT u.idusuarios, u.usu_nombre, u.usu_email, u.usu_celular, u.usu_fecha, u.usu_usuario, r.rol_nombre, u.roles_idroles, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial FROM usuarios u JOIN roles r ON u.roles_idroles = r.idroles');
    res.json(respuesta.rows )
  } catch (error) {
    console.log(error)
    res.json([]);
  }
}

userscontrollers.getuserbyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT u.idusuarios, u.usu_nombre, u.usu_email ,u.usu_celular, u.usu_fecha, u.usu_usuario, r.rol_nombre, u.roles_idroles, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial FROM usuarios u JOIN roles r ON u.roles_idroles = r.idroles AND u.idusuarios=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.log(error)
    res.json([]);
  }
}

userscontrollers.listuserpr = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT u.idusuarios, u.usu_nombre, u.usu_email, u.usu_celular, u.usu_fecha, u.usu_usuario, r.rol_nombre, u.roles_idroles, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial FROM usuarios u JOIN roles r ON u.roles_idroles = r.idroles AND r.idroles=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.log(error)
    res.json([]);
  }
}

userscontrollers.edituser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { roles_idroles, usu_nombre, usu_email, usu_celular,  usu_usuario, usu_password, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial } = req.body;
    const editeduser = { roles_idroles, usu_nombre, usu_email, usu_celular,  usu_usuario, usu_password, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial};
    const consul="";
    var date = new Date();
    var usu_fecha= date.getFullYear() + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + " " + ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
    // comprobando si usuario existe
    const rows = await pool.query('SELECT roles_idroles,usu_nombre, usu_email, usu_usuario FROM usuarios WHERE idusuarios=$1', [id]);
    if (rows.rows.length > 0) {
      editeduser.usu_password = await helpers.encryptPassword(usu_password);
      if (editeduser.roles_idroles) {
       consul="UPDATE usuarios SET roles_idroles=$1, usu_nombre=$2, usu_email=$3, usu_celular=$4, usu_usuario=$5, usu_password=$6, usu_fechainicio=$7, usu_fechafin=$8, usu_idmacrozona=$9, usu_idterritorial=$10 WHERE idusuarios=$11'";
       const result = await pool.query('UPDATE usuarios SET roles_idroles=$1, usu_nombre=$2, usu_email=$3, usu_celular=$4, usu_usuario=$5, usu_password=$6, usu_fechainicio=$7, usu_fechafin=$8, usu_idmacrozona=$9, usu_idterritorial=$10 WHERE idusuarios=$11', [roles_idroles, usu_nombre, usu_email, usu_celular, usu_usuario, usu_password, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial, id]);
        editeduser.id = result.insertId;
        const usertkn = {
          id: editeduser.id,
          rol: roles_idroles,
          nombre: usu_nombre
        }
        const token = jwt.sign(usertkn, keys.SECRET, { expiresIn: 86400 })
        await pool.query('UPDATE usuarios set usu_token=$1 WHERE idusuarios=$2', [token, editeduser.id])
        res.json({ mensaje:"usuario editado" })
      }
      else {
        editeduser.roles_idroles = 1;
        const result = await pool.query('UPDATE usuarios SET roles_idroles=$1, usu_nombre=$2, usu_email=$3, usu_celular=$4, usu_fecha=$5, usu_usuario=$6, usu_password=$7, usu_fechainicio=$8, usu_fechafin=$9, usu_idsede=$10  WHERE idusuarios=$11', [roles_idroles, usu_nombre, usu_email, usu_celular, usu_fecha, usu_usuario, usu_password, usu_fechainicio, usu_fechafin, usu_idsede, id]);
      
        editeduser.id = result.insertId;
        const token = jwt.sign({ id: newuser.id }, keys.SECRET, { expiresIn: 86400 })
        console.log(token)
        await pool.query('UPDATE usuarios set usu_token=$1 WHERE idusuarios=$2', [token, editeduser.id])
        res.json({ mensaje:"usuario editado" })
      }
    } else {
      res.json({ mensaje: 'El usuario que quiere editar no existe' })
    };
  } catch (error) {
    console.log(error)
    res.json({ mensaje: 'campos no validos. No se pudo realizar la edición del usuario '+error + ' ' + consul })
  }
}


userscontrollers.editamiusuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { usu_nombre, usu_email, usu_celular, usu_usuario, usu_password } = req.body;
    const editeduser = { usu_nombre, usu_email, usu_celular,  usu_usuario, usu_password};
    const consul="";
    var date = new Date();
    var usu_fecha= date.getFullYear() + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + " " + ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
    // comprobando si usuario existe
    const rows = await pool.query('SELECT roles_idroles,usu_nombre, usu_email, usu_usuario FROM usuarios WHERE idusuarios='+id);
    if (rows.rows.length > 0) {
      editeduser.usu_password = await helpers.encryptPassword(usu_password);
      if (editeduser.roles_idroles) {
       consul="UPDATE usuarios SET usu_nombre=$1, usu_email=$2, usu_celular=$3, usu_usuario=$4, usu_password=$5 WHERE idusuarios="+id;
       const result = await pool.query('UPDATE usuarios SET usu_nombre=$1, usu_email=$2, usu_celular=$3, usu_usuario=$4, usu_password=$5 WHERE idusuarios='+id, [usu_nombre, usu_email, usu_celular, usu_usuario, usu_password]);
        editeduser.id = result.insertId;
        const usertkn = {
          id: editeduser.id,
          rol: roles_idroles,
          nombre: usu_nombre
        }
        const token = jwt.sign(usertkn, keys.SECRET, { expiresIn: 86400 })
        await pool.query('UPDATE usuarios set usu_token=$1 WHERE idusuarios=$2', [token, editeduser.id])
        res.json({ mensaje:"usuario editado" })
      }
      else {
        editeduser.roles_idroles = 1;
        const result = await pool.query('UPDATE usuarios SET usu_nombre=$1, usu_email=$2, usu_celular=$3, usu_usuario=$4, usu_password=$5 WHERE idusuarios='+id, [usu_nombre, usu_email, usu_celular, usu_usuario, usu_password]);
      
        editeduser.id = result.insertId;
        const token = jwt.sign({ id: newuser.id }, keys.SECRET, { expiresIn: 86400 })
        console.log(token)
        await pool.query('UPDATE usuarios set usu_token=$1 WHERE idusuarios=$2', [token, editeduser.id])
        res.json({ mensaje:"usuario editado" })
      }
    } else {
      res.json({ mensaje: 'El usuario que quiere editar no existe' })
    };
  } catch (error) {
    console.log(error)
    res.json({ mensaje: 'campos no validos. No se pudo realizar la edición del usuario '+error + ' ' + consul })
  }
}


userscontrollers.edituser1 = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {usu_nombre, usu_email, usu_password } = req.body;
    const editeduser = { usu_nombre, usu_email, usu_password };
    const rows = await pool.query('SELECT idusuarios FROM usuarios WHERE idusuarios=$1', [id]);
    if (rows.rows.length > 0) {
      const passw=editeduser.usu_password = await helpers.encryptPassword(usu_password);
      const result = await pool.query('UPDATE usuarios SET usu_nombre=$1, usu_email=$2, usu_password=$3 WHERE idusuarios=$4', [usu_nombre, usu_email, passw, id]);
        res.json({ mensaje:"usuario editado" })
    }
  } catch (error) {
    console.log(error)
    res.json({ mensaje: 'campos no validos. No se pudo realizar la edición del usuario' })
  }
}

userscontrollers.deleteuser = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM usuarios  WHERE idusuarios =$1', [id]);
    res.json({ mensaje: 'usuario eliminado' })
  } catch (error) {
    console.log(error)
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}

module.exports = userscontrollers;