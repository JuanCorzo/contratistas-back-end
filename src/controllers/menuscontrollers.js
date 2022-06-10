
const pool = require('../database');

const menuscontrollers = {};

menuscontrollers.listmenus = async (req,res) => {
  try{
    const respuesta = await pool.query('SELECT idmenus, men_nombre, men_ruta, men_orden, men_categoria, men_ordenc FROM menus ORDER BY men_ordenc, men_orden ');
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}
menuscontrollers.getmenubyid = async (req,res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idmenus, men_nombre, men_ruta, men_orden, men_categoria, men_ordenc FROM menus WHERE idmenus=$1',[id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

menuscontrollers.editmenu = async (req,res) => {
  try{
    const id = parseInt(req.params.id);
    const {men_nombre, men_ruta, men_orden,men_categoria,men_ordenc} =req.body;
    await pool.query('UPDATE menus set men_nombre=$1, men_ruta=$2, men_orden=$3, men_categoria=$4, men_ordenc=$5 WHERE idmenus=$6', [men_nombre, men_ruta, men_orden,men_categoria, men_ordenc, id]);
    res.json({mensaje:'El menú ha sido actualizado'})
  }catch(error){
    console.log(error)
    res.json({mensaje:"CAMPOS NO VALIDOS"})
  }
}

menuscontrollers.createmenu = async (req,res) => {
  try{
    const {men_nombre, men_ruta, men_orden,men_categoria, men_ordenc} =req.body;
    await pool.query('INSERT INTO menus (men_nombre, men_ruta, men_orden,men_categoria, men_ordenc) VALUES ($1, $2, $3, $4, $5)', [men_nombre, men_ruta, men_orden,men_categoria, men_ordenc]);
    res.json({mensaje: 'menú registrado'})
  }catch(error){
    console.log(error)
    res.json({mensaje:"CAMPOS NO VALIDOS"})
  }
}

menuscontrollers.deletemenu = async (req,res) => {
  try{
    const id = parseInt(req.params.id);    
    let nulo = null;
    await pool.query('UPDATE permisos SET menus_idmenus = $1 WHERE menus_idmenus = $2', [nulo,id]);
    await pool.query('DELETE FROM menus WHERE idmenus=$1', [id]);     
    res.json({mensaje:'menu eliminado'})
  }catch(error){
    console.log(error)
    res.json({mensaje:"CAMPOS NO VALIDOS"})
  }
}

module.exports = menuscontrollers;
