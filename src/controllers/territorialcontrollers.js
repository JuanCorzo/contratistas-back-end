const pool = require('../database');


const territorialcontrollers = {};

territorialcontrollers.listdep = async (req, res) => {
  try{
    const consulta ="SELECT terri.idterritorial, terri.ter_cod, terri.ter_nombre, ";
    consulta +="terri.ter_macrozona, pa.idpaises, pa.pai_nombre FROM territorial terri INNER JOIN paises pa ON ";
    consulta +="terri.paises_idpaises=pa.idpaises ";
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }
}

territorialcontrollers.listamacrozonas = async (req, res) => {
  try{
    const consulta ="SELECT DISTINCT(ter_macrozona) FROM territorial ";
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }
}

territorialcontrollers.getidepbyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT terri.idterritorial, terri.ter_cod, terri.ter_nombre, terri.ter_macrozona, pa.idpaises, pa.pai_nombre FROM territorial terri INNER JOIN paises pa ON terri.paises_idpaises=pa.idpaises WHERE terri.idterritorial=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }
}

territorialcontrollers.getidepbypais = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT terri.idterritorial, terri.ter_cod, terri.ter_nombre, terri.ter_macrozona, pa.idpaises, pa.pai_nombre FROM territorial terri INNER JOIN paises pa ON terri.paises_idpaises=pa.idpaises WHERE pa.idpaises=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }
}

territorialcontrollers.createdep= async (req, res) => {
  try {
      const { ter_cod, ter_nombre, ter_macrozona, paises_idpaises } = req.body;
      await pool.query('INSERT INTO territorial (ter_cod, ter_nombre, ter_macrozona, paises_idpaises) VALUES($1, $2, $3, $4)', [ter_cod, ter_nombre, ter_macrozona, paises_idpaises]);
      res.json({ mensaje: 'Territorial Registrada' })
  } catch (error) {
      console.log(error);
      res.json({ mensaje: "CAMPOS NO VALIDOS" })
  }
}

territorialcontrollers.editdep = async (req, res) => {
  const id = parseInt(req.params.id);
  const { ter_cod, ter_nombre, ter_macrozona, paises_idpaises } = req.body;
  try{
    await pool.query('UPDATE territorial set ter_cod=$1, ter_nombre=$2, ter_macrozona=$3, paises_idpaises=$4 WHERE idterritorial=$5', [ter_cod, ter_nombre, ter_macrozona, paises_idpaises, id]);
    res.json({ mensaje: 'Territoriales editadas' })
  }
  catch (error) {
    res.json({ mensaje: error + " CAMPOS NO VALIDOS" })
  }
}

territorialcontrollers.deletedep = async (req, res) => {
  const id = parseInt(req.params.id);
  await pool.query('DELETE FROM territorial WHERE idterritorial = $1', [id]);
  res.json({ mensaje: 'Sede eliminada' })
}


module.exports = territorialcontrollers;
