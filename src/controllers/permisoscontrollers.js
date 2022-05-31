const pool = require('../database');
const helpers = require('../lib/helpers');


const permisoscontrollers = {};

permisoscontrollers.listperm = async (req, res) => {
  const respuesta = await pool.query('SELECT p.idpermisos, p.per_crear, p.per_editar, p.per_eliminar, m.men_nombre, m.men_categoria, r.rol_nombre FROM permisos p INNER JOIN menus m ON p.menus_idmenus=m.idmenus INNER JOIN roles r ON p.roles_idroles =r.idroles');

  res.json(respuesta.rows)

}

// permisos por id
permisoscontrollers.getipermyid = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT p.idpermisos, p.per_crear, p.per_editar, p.per_eliminar, m.men_nombre, m.men_categoria, p.menus_idmenus, p.roles_idroles, r.rol_nombre FROM permisos p INNER JOIN menus m ON p.menus_idmenus=m.idmenus INNER JOIN roles r ON p.roles_idroles =r.idroles WHERE p.idpermisos =$1', [id]);

  res.json(respuesta.rows)


}

// permisos por rol
permisoscontrollers.getpermpr = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT p.idpermisos, p.per_crear, p.per_editar, p.per_eliminar, m.men_nombre, m.men_categoria, m.men_ruta, r.rol_nombre, men_ordenc FROM permisos p INNER JOIN menus m ON p.menus_idmenus=m.idmenus INNER JOIN roles r ON p.roles_idroles =r.idroles WHERE r.idroles =$1 ORDER BY men_ordenc, men_orden ', [id]);
  res.json(respuesta.rows)
}

// permisos por menu
permisoscontrollers.getperpm = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT p.idpermisos, p.per_crear, p.per_editar, p.per_eliminar, m.men_nombre, m.men_categoria, r.rol_nombre FROM permisos p INNER JOIN menus m ON p.menus_idmenus=m.idmenus INNER JOIN roles r ON p.roles_idroles =r.idroles WHERE m.idmenus=$1', [id]);
  res.json(respuesta.rows)


}

//

// depende del producto y categoria

permisoscontrollers.createperm = async (req, res) => {
  const { per_crear, per_editar, per_eliminar, menus_idmenus, roles_idroles } = req.body;
  try {
    await pool.query('INSERT INTO permisos (per_crear, per_editar, per_eliminar, menus_idmenus, roles_idroles) VALUES($1, $2, $3, $4, $5)', [per_crear, per_editar, per_eliminar, menus_idmenus, roles_idroles]);

    res.json({ mensaje: 'permiso registrado' })
  }
  catch (error) {
    console.log(error)
    res.json({ mensaje: "CAMPOS NO VALIDOS" })
  }

};

permisoscontrollers.editperm = async (req, res) => {
  const id = parseInt(req.params.id);
  const { per_crear, per_editar, per_eliminar, menus_idmenus, roles_idroles } = req.body;
  try {
    await pool.query('UPDATE permisos set per_crear=$1, per_editar=$2, per_eliminar=$3, menus_idmenus=$4, roles_idroles=$5 WHERE idpermisos=$6', [per_crear, per_editar, per_eliminar, menus_idmenus, roles_idroles, id]);
    res.json({ mensaje: 'permiso editado' })

  } catch (error) {
    console.log(error)
    res.jason({ mensaje: "CAMPOS NO VALIDOS" })
  }

}

permisoscontrollers.deleteperm = async (req, res) => {
  const id = parseInt(req.params.id);


  await pool.query('DELETE FROM permisos  WHERE idpermisos =$1', [id]);
  console.log(req.params.id)

  res.json({ mensaje: 'permiso eliminado' })


}
module.exports = permisoscontrollers;