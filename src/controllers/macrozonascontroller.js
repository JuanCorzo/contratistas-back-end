const pool = require('../database');
const macrozonascontrollers = {};

macrozonascontrollers.listmacr = async (req, res) => {
  const respuesta = await pool.query('SELECT idmacrozonas, mac_nombre FROM macrozonas ORDER BY mac_nombre ');
  res.json(respuesta.rows)
}
macrozonascontrollers.getmacrbyid = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT idmacrozonas, mac_nombre FROM macrozonas WHERE idmacrozonas=$1', [id]);
  res.json( respuesta.rows)
}
macrozonascontrollers.editmacr = async (req, res) => {
  const id = parseInt(req.params.id);
  const { mac_nombre } = req.body;
  try{
    await pool.query('UPDATE macrozonas SET mac_nombre=$1 WHERE idmacrozonas=$2', [mac_nombre, id]);
    res.json({ mensaje: 'El rol ha sido actualizado' })
  }catch(error){
    console.log(error)
    res.json({mensaje: "CAMPOS NO VALIDOS"})
  }
}
macrozonascontrollers.createmacr = async (req, res) => {
  const { mac_nombre } = req.body;
  try {
    await pool.query('INSERT INTO macrozonas (mac_nombre)  VALUES ($1)', [mac_nombre]);
    res.json({ mensaje: 'rol registrado' })
  } catch (error) {
    res.json({ mensaje: "CAMPOS NO VALIDOS!" })
  }
}
macrozonascontrollers.deletemacr = async (req, res) => {
  const id = parseInt(req.params.id);
  let nulo= null
  await pool.query('DELETE FROM macrozonas WHERE idmacrozonas = $1', [id]);
  res.json({ mensaje: 'rol eliminado' })
}
module.exports = macrozonascontrollers;