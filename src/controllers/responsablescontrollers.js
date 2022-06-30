const pool = require('../database');


const responsablescontrollers = {};

responsablescontrollers.listcat = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT res.idresponsables, res.res_nombre, res.res_identificacion, res.res_cargo, res.res_email, res.res_telefono, apo.idaportantes, apo.apo_nombre, res_fecha FROM responsables res INNER JOIN aportantes apo ON res.aportantes_idaportantes=apo.idaportantes');
    res.json(respuesta.rows);
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

responsablescontrollers.geticatbyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idresponsables, res_nombre, res_identificacion, res_cargo, res_email, res_telefono, res_fecha, res_documento FROM responsables WHERE idresponsables=$1', [id]);
    res.json(respuesta.rows);
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

responsablescontrollers.geticatbyads = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idresponsables, res_nombre, res_identificacion, res_cargo, res_email, res_telefono, apo_nombre, res_fecha FROM responsables INNER JOIN aportantes ON aportantes_idaportantes=idaportantes AND idaportantes=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

responsablescontrollers.createcat = async (req, res) => {
  try{
    const {res_nombre, res_identificacion, res_cargo, res_email, res_telefono, aportantes_idaportantes, res_fecha} = req.body;
    await pool.query('INSERT INTO responsables (res_nombre, res_identificacion, res_cargo, res_email, res_telefono, aportantes_idaportantes, res_fecha) VALUES($1, $2, $3, $4, $5, $6, $7)', [res_nombre, res_identificacion, res_cargo, res_email, res_telefono, aportantes_idaportantes, res_fecha]);
    res.json({ mensaje: 'Responsable Registrado' })
  }catch(error){
    console.log(error);
    res.json({mensaje:"CAMPOS NO VALIDOS"})
  }
}

responsablescontrollers.editcat = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const {res_nombre, res_identificacion, res_cargo, res_email, res_telefono, aportantes_idaportantes, res_fecha} = req.body;
    await pool.query('UPDATE responsables set res_nombre=$1, res_identificacion=$2, res_cargo=$3, res_email=$4, res_telefono=$5, aportantes_idaportantes=$6, res_fecha=$7 WHERE idresponsables=$8', [res_nombre, res_identificacion, res_cargo, res_email, res_telefono, aportantes_idaportantes, res_fecha, id]);
    res.json({ mensaje: 'Responsable Editado' })
  }catch(error){
    console.log(error);
    res.json({mensaje:"CAMPOS NO VALIDOS"})
  }
}

responsablescontrollers.deleteres= async (req,res) => {
  try{
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM responsables WHERE idresponsables=$1', [id]);
    res.json({mensaje:'Responsable eliminado'})
  }catch(error){
    console.log(error);
    res.json({mensaje:"CAMPOS NO VALIDOS"})
  }
}

module.exports = responsablescontrollers;
