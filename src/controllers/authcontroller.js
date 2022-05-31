
/*Script : contiene todas las funciones que se ejecutan dentro de las 
rutas relacionadas con la autenticación de usuarios (login, registo)
*/
const pool = require('../database');
const helpers = require('../lib/helpers');
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const authcontroller = {};

authcontroller.login = async (req,res) => {
  const {usu_email, usu_password} =req.body;  
  const user =  {usu_email, usu_password}

  // comprobando si usuario existe  
  const rows = await pool.query('SELECT idusuarios, roles_idroles, usu_email, usu_password, usu_nombre, usu_idmacrozona, usu_idterritorial  FROM usuarios WHERE usu_email=$1',[user.usu_email] );
  if (rows.rows.length > 0) {
    const user = rows.rows[0];
    const validPassword = await helpers.matchPassword(usu_password, user.usu_password)
    if (validPassword) {
      const usertkn = {
        id:user.idusuarios,
        rol:user.roles_idroles,
        nombre:user.usu_nombre
      }
      const token = jwt.sign(usertkn, keys.SECRET , {expiresIn: 86400})
      await pool.query('UPDATE usuarios SET usu_token=$1 WHERE idusuarios=$2', [token, rows.rows[0].id])
      const result ={
        usu_nombre: user.usu_nombre,
        idusuarios: user.idusuarios,
        iroles: user.roles_idroles,
        token: token,
        usu_idmacrozona : user.usu_idmacrozona,
        usu_idterritorial : user.usu_idterritorial,
        aute:"Ok"
      }
      res.json({result});
    }
    else {
      const result ={ aute:"Mal" }
      res.json({result});
    }
  } else {
    const result ={ aute:"Mal" }
    res.json({result});
  };
 };

  authcontroller.registro = async (req,res) => {
    var date = new Date();
    var usu_fecha= date.getFullYear() + "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    console.log(usu_fecha);
    // requiriendo datos del registro de usuario
    const {roles_idroles, usu_nombre, usu_email, usu_celular, usu_usuario, usu_password, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial} =req.body;
    try{
      // comprobando si usuario existe
      const rows = await pool.query('SELECT usu_email FROM usuarios WHERE usu_email=$1',[usu_email] );
      console.log(rows.rows.length )
      if (rows.rows.length > 0) {
        res.json({mensaje: 'El usuario ya existe'});
      }else {
        const encpass= await helpers.encryptPassword(usu_password);
        if (roles_idroles){
          const result= await pool.query('INSERT INTO usuarios (roles_idroles, usu_nombre, usu_email, usu_celular, usu_fecha, usu_usuario, usu_password, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial)  VALUES ($1, $2 , $3, $4, $5, $6, $7, $8, $9, $10, $11)', [roles_idroles, usu_nombre, usu_email, usu_celular, usu_fecha, usu_usuario, encpass, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial]);
          const usertkn = {
            id:result.insertId,
            rol:roles_idroles,
            nombre:usu_nombre
          }
          const token = jwt.sign(usertkn, keys.SECRET , {expiresIn: 86400})
          await pool.query('UPDATE usuarios SET usu_token=$1 WHERE idusuarios=$2', [token, result.insertId])
          res.json({mensaje: "usuario registrado"});
      }
      else{
        const rolusu = 1;
        const result= await pool.query('INSERT INTO usuarios (roles_idroles, usu_nombre, usu_email, usu_celular, usu_fecha, usu_usuario, usu_password, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial)  VALUES ($1, $2 , $3, $4, $5, $6, $7, $8, $9, $10, $11) ',[rolusu, usu_nombre, usu_email, usu_celular, usu_fecha, usu_usuario, encpass, usu_fechainicio, usu_fechafin, usu_idmacrozona, usu_idterritorial]);
        const token = jwt.sign({id:result.insertId}, keys.SECRET , {expiresIn: 86400})
        await pool.query('UPDATE usuarios SET usu_token=$1 WHERE idusuarios=$2', [token, result.insertId])
        res.json({mensaje: "usuario registrado"});
      }
    };
    }
    catch(error){
      console.log(error)
      res.json({mensaje: 'campos no validos. No se pudo realizar el registro'})
    } 
  };


module.exports = authcontroller;