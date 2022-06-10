const pool = require('../database');


const estructuranominacontrollers = {};

estructuranominacontrollers.listcat = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT idestructuranomina, est_codigo, est_nombre, est_descripcion FROM estructuranomina ORDER BY est_nombre');
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

estructuranominacontrollers.listest = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT idestructuranomina value, est_nombre label  FROM estructuranomina ORDER BY est_nombre');
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}


estructuranominacontrollers.geticatbyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idestructuranomina, est_codigo, est_nombre, est_descripcion  FROM estructuranomina WHERE idestructuranomina=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

estructuranominacontrollers.createcat = async (req, res) => {
 try{
    const {est_codigo, est_nombre, est_descripcion} = req.body;
    await pool.query('INSERT INTO estructuranomina (est_codigo, est_nombre, est_descripcion) VALUES($1, $2, $3)', [est_codigo, est_nombre, est_descripcion]);
    res.json({ mensaje: 'Estructura Nomnina Registrada' })
 }catch(error){
    console.log(error);
    res.json({mensaje:"CAMPOS INVALIDOS"})
 }
}

estructuranominacontrollers.editcat = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const {est_codigo, est_nombre, est_descripcion} = req.body;
    await pool.query('UPDATE estructuranomina set est_codigo=$1, est_nombre=$2, est_descripcion=$3  WHERE idestructuranomina=$4', [est_codigo , est_nombre, est_descripcion, id]);
    res.json({ mensaje: 'Estructura Nómina Editada' })
  } catch(error){
    console.log(error);
    res.json({mensaje:"CAMPOS INVALIDOS"})
  }
}

estructuranominacontrollers.delete = async (req,res) => {
  try{
    const id = parseInt(req.params.id);
    let nulo = null;
    await pool.query('UPDATE aportantes SET estructuranomina_idestructuranomina =$1 WHERE estructuranomina_idestructuranomina = $2', [nulo,id]);
    await pool.query('UPDATE responsables  SET aportantes_idaportantes =$1 FROM aportantes  WHERE responsables.aportantes_idaportantes=aportantes.idaportantes AND aportantes.estructuranomina_idestructuranomina IS NULL', [nulo]);
    await pool.query('DELETE FROM estructuranomina WHERE idestructuranomina=$1', [id]);
    res.json({mensaje:'estructura nomina eliminada'})
  } catch(error){
    console.log(error);
    res.json({mensaje:"CAMPOS INVALIDOS"})
  }
}

module.exports = estructuranominacontrollers;
