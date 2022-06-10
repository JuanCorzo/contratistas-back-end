const pool = require('../database');
const macrozonascontrollers = {};

macrozonascontrollers.listmacr = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT idmacrozonas, mac_nombre FROM macrozonas ORDER BY mac_nombre ');
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}
macrozonascontrollers.getmacrbyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idmacrozonas, mac_nombre FROM macrozonas WHERE idmacrozonas=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}
macrozonascontrollers.editmacr = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const { mac_nombre } = req.body;
    await pool.query('UPDATE macrozonas SET mac_nombre=$1 WHERE idmacrozonas=$2', [mac_nombre, id]);
    res.json({ mensaje: 'El rol ha sido actualizado' })
  }catch(error){
    console.log(error)
    res.json({mensaje: "CAMPOS NO VALIDOS"})
  }
}
macrozonascontrollers.createmacr = async (req, res) => {
  try {
    const { mac_nombre } = req.body;
    await pool.query('INSERT INTO macrozonas (mac_nombre)  VALUES ($1)', [mac_nombre]);
    res.json({ mensaje: 'rol registrado' })
  } catch (error) {
    res.json({ mensaje: "CAMPOS NO VALIDOS!" })
  }
}
macrozonascontrollers.deletemacr = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    let nulo= null
    await pool.query('DELETE FROM macrozonas WHERE idmacrozonas = $1', [id]);
    res.json({ mensaje: 'rol eliminado' })
  } catch (error) {
    res.json({ mensaje: "CAMPOS NO VALIDOS!" })
  }
}
module.exports = macrozonascontrollers;