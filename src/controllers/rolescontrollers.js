const pool = require('../database');
const rolescontrollers = {};

rolescontrollers.listrole = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT "idroles", "rol_nombre" FROM roles ');
    res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }
}

rolescontrollers.getrolebyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idroles, rol_nombre FROM roles WHERE idroles=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }
}

rolescontrollers.editrole = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { rol_nombre } = req.body;
    await pool.query('UPDATE roles SET rol_nombre = $1 WHERE idroles = $2', [
      rol_nombre,
      id
    ]);
    res.json({ mensaje: 'El rol ha sido actualizado' })
  } catch (error) {
    console.log(error)
    res.json({ mensaje: "CAMPOS NO VALIDOS" })
  }
}

rolescontrollers.createrole = async (req, res) => {
  try {
    const { rol_nombre } = req.body;
    await pool.query('INSERT INTO roles (rol_nombre)  VALUES ($1)', [rol_nombre]);
    res.json({ mensaje: 'rol registrado' })
  } catch (error) {
    console.log(error)
    res.json({ mensaje: "CAMPOS NO VALIDOS!" })
  }
}

rolescontrollers.deleterole = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    let nulo = null
    await pool.query('UPDATE usuarios  SET roles_idroles =$1 WHERE roles_idroles = $2', [nulo,
      id
    ]);
    await pool.query('DELETE FROM roles WHERE idroles = $1', [id]);
    res.json({ mensaje: 'rol eliminado' })
  } catch (error) {
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}
module.exports = rolescontrollers;
