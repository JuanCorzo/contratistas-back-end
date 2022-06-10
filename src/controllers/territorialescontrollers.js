const pool = require('../database');

const territorialescontrollers = {};

territorialescontrollers.editterr = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const { ter_cod, ter_nombre, ter_macrozona, paises_idpaises} = req.body;
    await pool.query('UPDATE territorial set ter_cod=$1, ter_nombre=$2, ter_macrozona=$3, paises_idpaises=$4 WHERE idterritorial=$5',
    [ter_cod, ter_nombre, ter_macrozona, paises_idpaises, id]);
    res.json({ mensaje: 'departamento editado' })
  } catch (error) {
    console.log(error)
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}

territorialescontrollers.deleteter = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM territorial WHERE idterritorial=$1', [id]);
    res.json({ mensaje: 'rol eliminado' })
  } catch (error) {
    console.log(error)
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}

module.exports = territorialescontrollers;
