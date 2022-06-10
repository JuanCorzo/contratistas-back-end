const pool = require('../database');
const sectorescontrollers = {};

sectorescontrollers.listcat = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT idsectores, sec_codigo, sec_nombre, idsectores value, sec_nombre label  FROM sectores ORDER BY sec_codigo');
    res.json(respuesta.rows)
  } catch (error) {
    console.log(error)
    res.json([]);
  }
}

sectorescontrollers.geticatbyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idsectores, sec_codigo , sec_nombre  FROM sectores WHERE idsectores=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.log(error)
    res.json([]);
  }
}

sectorescontrollers.createcat = async (req, res) => {
  try{
    const {sec_codigo , sec_nombre  } = req.body;
    console.log(req.body)
    await pool.query('INSERT INTO sectores (sec_codigo , sec_nombre ) VALUES($1, $2)', [sec_codigo , sec_nombre]);
    res.json({ mensaje: 'Sector Registrado' })
  } catch (error) {
    console.log(error)
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}

sectorescontrollers.editcat = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const { sec_codigo , sec_nombre } = req.body;
    await pool.query('UPDATE sectores set sec_codigo=$1, sec_nombre=$2  WHERE idsectores=$3', [sec_codigo , sec_nombre , id]);
    res.json({ mensaje: 'Sector editado' })
  } catch (error) {
    console.log(error)
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}

sectorescontrollers.delete = async (req,res) => {
  try{
    const id = parseInt(req.params.id);
    let nulo= null
    await pool.query('UPDATE aportantes  SET sectores_idsectores =$1 WHERE sectores_idsectores = $2', [nulo,id]);
    await pool.query('UPDATE responsables  SET aportantes_idaportantes =$1 FROM aportantes  WHERE responsables.aportantes_idaportantes=aportantes.idaportantes AND aportantes.sectores_idsectores IS NULL', [nulo]);
    await pool.query('DELETE FROM sectores WHERE idsectores=$1', [id]);
    res.json({mensaje:'sector eliminado'})
  } catch (error) {
    console.log(error)
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}
module.exports = sectorescontrollers;
