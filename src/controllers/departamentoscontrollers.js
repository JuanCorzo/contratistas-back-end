const pool = require('../database');

const departamentoscontrollers = {};

departamentoscontrollers.listdep = async (req, res) => {
  const respuesta = await pool.query('SELECT dep.iddepartamentos, dep.dep_codigo, dep.dep_nombre,  terr.idterritorial, terr.ter_cod, terr.ter_nombre FROM territorial terr  INNER JOIN departamentos dep ON dep.territorial_idterritorial=terr.idterritorial');
  res.json(respuesta.rows)
}

departamentoscontrollers.getidepbyid = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT dep.iddepartamentos, dep.dep_codigo, dep.dep_nombre,  terr.idterritorial, terr.ter_cod, terr.ter_nombre FROM territorial terr INNER JOIN departamentos dep ON dep.territorial_idterritorial=terr.idterritorial WHERE dep.iddepartamentos=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    res.json({ mensaje: "CAMPOS NO VALIDOS" });
  }
}

departamentoscontrollers.getidepbyterr = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT dep.iddepartamentos, dep.dep_codigo, dep.dep_nombre,  terr.idterritorial, terr.ter_cod, terr.ter_nombre FROM territorial terr  INNER JOIN departamentos dep ON dep.territorial_idterritorial=terr.idterritorial WHERE terr.idterritorial=$1', [id]);
  res.json(respuesta.rows)
}

departamentoscontrollers.createdep= async (req, res) => {
  try {
      console.log(req.body);
      const { dep_codigo, dep_nombre, territorial_idterritorial } = req.body;
      await pool.query('INSERT INTO departamentos (dep_codigo, dep_nombre, territorial_idterritorial) VALUES($1, $2, $3)', [dep_codigo, dep_nombre, territorial_idterritorial]);
      res.json({ mensaje: 'Departamento Registrado' })
  } catch (error) {
      console.log(error);
      res.json({ mensaje: "CAMPOS NO VALIDOS" })
  }
}

departamentoscontrollers.editterr = async (req, res) => {
  const id = parseInt(req.params.id);
  const { ter_cod, ter_nombre, ter_macrozona, paises_idpaises} = req.body;
  await pool.query('UPDATE territorial set ter_cod=$1, ter_nombre=$2, ter_macrozona=$3, paises_idpaises=$4 WHERE iddepartamentos=$5',
  [ter_cod, ter_nombre, ter_macrozona, paises_idpaises, id]);
  res.json({ mensaje: 'departamento editado' })
}

departamentoscontrollers.editdep = async (req, res) => {
  const id = parseInt(req.params.id);
  const { dep_codigo, dep_nombre, territorial_idterritorial } = req.body;
  await pool.query('UPDATE departamentos set dep_codigo=$1, dep_nombre=$2, territorial_idterritorial=$3 WHERE iddepartamentos=$4', [dep_codigo, dep_nombre, territorial_idterritorial, id]);
  res.json({ mensaje: 'departamento editado' })
}

departamentoscontrollers.deletedep = async (req, res) => {
  const id = parseInt(req.params.id);
  let nulo = null
  await pool.query('DELETE FROM departamentos WHERE iddepartamentos=$1', [id]);
  res.json({ mensaje: 'rol eliminado' })
}


module.exports = departamentoscontrollers;
