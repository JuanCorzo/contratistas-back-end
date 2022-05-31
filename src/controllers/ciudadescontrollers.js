
const pool = require('../database');


const ciudadescontrollers = {};

ciudadescontrollers.listciu = async (req, res) => {
  try {
    const respuesta = await pool.query('SELECT c.idciudades, c.ciu_codigo, c.ciu_nombre, d.iddepartamentos, d.dep_nombre, terr.idterritorial, terr.ter_nombre, p.idpaises, p.pai_nombre FROM ciudades c INNER JOIN  departamentos d ON c.departamentos_iddepartamentos=d.iddepartamentos INNER JOIN territorial terr ON d.territorial_idterritorial=terr.idterritorial INNER JOIN paises p ON terr.paises_idpaises =p.idpaises');
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json({mensaje: 'Error ejecutando la consulta'});
  }
}

ciudadescontrollers.geticiubyid = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT c.idciudades, c.ciu_codigo, c.ciu_nombre, d.iddepartamentos, d.dep_nombre, terr.idterritorial, terr.ter_nombre, p.idpaises, p.pai_nombre FROM ciudades c INNER JOIN  departamentos d ON c.departamentos_iddepartamentos=d.iddepartamentos INNER JOIN territorial terr ON d.territorial_idterritorial=terr.idterritorial INNER JOIN paises p ON terr.paises_idpaises =p.idpaises WHERE c.idciudades=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json({mensaje: 'Error ejecutando la consulta'});
  }
}

// listar ciudades por departamento

ciudadescontrollers.geticiubydep = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT c.idciudades, c.ciu_codigo, c.ciu_nombre, d.iddepartamentos, d.dep_nombre, terr.idterritorial, terr.ter_nombre, p.idpaises, p.pai_nombre FROM ciudades c INNER JOIN  departamentos d ON c.departamentos_iddepartamentos=d.iddepartamentos INNER JOIN territorial terr ON d.territorial_idterritorial=terr.idterritorial INNER JOIN paises p ON terr.paises_idpaises =p.idpaises WHERE d.iddepartamentos=$1', [id]);
    res.json(respuesta.rows);
  } catch (error) {
    console.error(error);
    res.json([]);
  }
}

// listar ciudades por pais

ciudadescontrollers.geticiubyterr= async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT c.idciudades, c.ciu_codigo, c.ciu_nombre, d.iddepartamentos, d.dep_nombre, terr.idterritorial, terr.ter_nombre, p.idpaises, p.pai_nombre FROM ciudades c INNER JOIN  departamentos d ON c.departamentos_iddepartamentos=d.iddepartamentos INNER JOIN territorial terr ON d.territorial_idterritorial=terr.idterritorial INNER JOIN paises p ON terr.paises_idpaises =p.idpaises WHERE terr.idterritorial=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json({mensaje: 'Error ejecutando la consulta'});
  }
}

ciudadescontrollers.geticiubypa= async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT c.idciudades, c.ciu_codigo, c.ciu_nombre, d.iddepartamentos, d.dep_nombre, terr.idterritorial, terr.ter_nombre, p.idpaises, p.pai_nombre FROM ciudades c INNER JOIN  departamentos d ON c.departamentos_iddepartamentos=d.iddepartamentos INNER JOIN territorial terr ON d.territorial_idterritorial=terr.idterritorial INNER JOIN paises p ON terr.paises_idpaises =p.idpaises WHERE p.idpaises=$1', [id]);

    res.json(respuesta.rows)
  } catch (error) {
    console.error(error);
    res.json({mensaje: 'Error ejecutando la consulta'});
  }
}


ciudadescontrollers.createciu = async (req, res) => {
  try{
    const { ciu_codigo, ciu_nombre, departamentos_iddepartamentos } = req.body;
    await pool.query('INSERT INTO ciudades (ciu_codigo, ciu_nombre, departamentos_iddepartamentos) VALUES($1, $2, $3)', [ciu_codigo, ciu_nombre, departamentos_iddepartamentos]);
    res.json({ mensaje: 'ciudad registrada' })
  }catch(error){
    console.log(error)
    res.json({mensaje: "CAMPOS NO VALIDOS"})
  }
}

ciudadescontrollers.editciu = async (req, res) => {
  const id = parseInt(req.params.id);
  const { ciu_codigo, ciu_nombre, departamentos_iddepartamentos } = req.body;
  try{
    await pool.query('UPDATE ciudades SET ciu_codigo=$1, ciu_nombre=$2, departamentos_iddepartamentos=$3 WHERE idciudades=$4', 
    [ciu_codigo, ciu_nombre, departamentos_iddepartamentos, id]);
    res.json({ mensaje: 'ciudad editada' })
  }catch(error){
    console.log(error)
    res.json({mensaje: "CAMPOS NO VALIDOS"})
  }
}

ciudadescontrollers.delciu = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let nulo = null
    await pool.query('DELETE FROM ciudades WHERE idciudades=$1', [id]);
    res.json({ mensaje: 'municipio eliminado' })
  } catch (error) {
    console.error(error);
    res.json({mensaje: 'Error ejecutando la consulta'});
  }
}


module.exports = ciudadescontrollers;
