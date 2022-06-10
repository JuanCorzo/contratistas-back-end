const pool = require('../database');


const tipoadscritacontrollers = {};

tipoadscritacontrollers.listcat = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT idtipoadscrita, tad_codigo, tad_descripcion, idtipoadscrita value, tad_descripcion label FROM tipoadscrita');
    res.json(respuesta.rows )
  } catch (error) {
    res.json([]);
  }
}

tipoadscritacontrollers.geticatbyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idtipoadscrita, tad_codigo, tad_descripcion FROM tipoadscrita WHERE idtipoadscrita=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }
}

tipoadscritacontrollers.createcat = async (req, res) => {
  try{
    const {tad_codigo, tad_descripcion } = req.body;
    console.log(req.body)
    await pool.query('INSERT INTO tipoadscrita (tad_codigo, tad_descripcion) VALUES($1, $2)', [tad_codigo, tad_descripcion]);
    res.json({ mensaje: 'Tipo Adscrita registrada' })
  } catch (error) {
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}

tipoadscritacontrollers.editcat = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const { tad_codigo, tad_descripcion} = req.body;
    await pool.query('UPDATE tipoadscrita set tad_codigo=$1, tad_descripcion=$2 WHERE idtipoadscrita=$3', [tad_codigo, tad_descripcion, id]);
    res.json({ mensaje: 'Tipo Adscrita editada' })
  } catch (error) {
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}

tipoadscritacontrollers.delete = async (req,res) => {
  try{
      const id = parseInt(req.params.id);
      let nulo= null
      await pool.query('UPDATE aportantes  SET tipoadscrita_idtipoadscrita =$1 WHERE tipoadscrita_idtipoadscrita = $2', [nulo,
          id
        ]);
      await pool.query('UPDATE responsables  SET aportantes_idaportantes =$1 FROM aportantes  WHERE responsables.aportantes_idaportantes=aportantes.idaportantes AND aportantes.tipoadscrita_idtipoadscrita IS NULL', [nulo]);
      await pool.query('DELETE FROM tipoadscrita WHERE idtipoadscrita=$1', [id]);
        
    res.json({mensaje:'tipo adscrita eliminada'})
  } catch (error) {
    res.json({ mensaje: "Error ejecutando el consulta" });
  }
}

module.exports = tipoadscritacontrollers;