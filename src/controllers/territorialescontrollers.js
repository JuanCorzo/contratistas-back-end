const pool = require('../database');

const territorialescontrollers = {};

territorialescontrollers.editterr = async (req, res) => {
  const id = parseInt(req.params.id);
  const { ter_cod, ter_nombre, ter_macrozona, paises_idpaises} = req.body;
  await pool.query('UPDATE territorial set ter_cod=$1, ter_nombre=$2, ter_macrozona=$3, paises_idpaises=$4 WHERE idterritorial=$5',
  [ter_cod, ter_nombre, ter_macrozona, paises_idpaises, id]);
  res.json({ mensaje: 'departamento editado' })
}

territorialescontrollers.deleteter = async (req, res) => {
  const id = parseInt(req.params.id);
  let nulo = null
  await pool.query('DELETE FROM territorial WHERE idterritorial=$1', [id]);
  res.json({ mensaje: 'rol eliminado' })
}


module.exports = territorialescontrollers;
