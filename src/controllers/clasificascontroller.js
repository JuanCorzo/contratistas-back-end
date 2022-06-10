const pool = require('../database');
const clasificadocumentoscontrollers = {};

clasificadocumentoscontrollers.listclas = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT idclasificadocumentos, cld_nombre FROM clasificadocumentos ');
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

clasificadocumentoscontrollers.getclasbyid = async (req, res) => {
 try{ 
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idclasificadocumentos, cld_nombre FROM clasificadocumentos WHERE idclasificadocumentos=$1', [id]);
    res.json( respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

clasificadocumentoscontrollers.editclas = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const { cld_nombre } = req.body;
    await pool.query('UPDATE clasificadocumentos SET cld_nombre=$1 WHERE idclasificadocumentos=$2', [cld_nombre, id]);
    res.json({ mensaje: 'El rol ha sido actualizado' })
  }catch(error){
    console.log(error)
    res.json({mensaje: "CAMPOS NO VALIDOS"})
  }
}
clasificadocumentoscontrollers.createclas = async (req, res) => {
  try {
    const { cld_nombre } = req.body;
    await pool.query('INSERT INTO clasificadocumentos (cld_nombre)  VALUES ($1)', [cld_nombre]);
    res.json({ mensaje: 'rol registrado' })
  } catch (error) {
    res.json({ mensaje: "CAMPOS NO VALIDOS!" })
  }
}
clasificadocumentoscontrollers.deleteclas = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    let nulo= null
    await pool.query('DELETE FROM clasificadocumentos WHERE idclasificadocumentos = $1', [id]);
    res.json({ mensaje: 'rol eliminado' })
  } catch (error) {
    console.error(error);
    res.json({mensaje: 'Error ejecutando la consulta'});
  }
}
module.exports = clasificadocumentoscontrollers;
