const pool = require('../database');


const aportesmunicipios = {};


aportesmunicipios.listcat = async (req, res) => {
  
  const respuesta = await pool.query('SELECT  vapomun.idaportesmunicipios, vapomun.aps_fecha, vapomun.aps_monto, vapomun.aps_descripcion, vapomun.ciuapomun_id, vapomun.ciuapomun_nombre, apo.idaportantes, apo.apo_nombre, ciu.idciudades, ciu.ciu_nombre FROM view_ciudadesaportesmunicipios vapomun INNER JOIN aportantes apo ON vapomun.aportantes_idaportantes=apo.idaportantes INNER JOIN ciudades ciu ON apo.ciudades_idciudades = ciu.idciudades');
  
  res.json(respuesta.rows)

}


aportesmunicipios.geticatbyid = async (req, res) => {
    const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT  vapomun.idaportesmunicipios, vapomun.aps_fecha, vapomun.aps_monto, vapomun.aps_descripcion, vapomun.ciuapomun_id, vapomun.ciuapomun_nombre, apo.idaportantes, apo.apo_nombre, ciu.idciudades, ciu.ciu_nombre FROM view_ciudadesaportesmunicipios vapomun INNER JOIN aportantes apo ON vapomun.aportantes_idaportantes=apo.idaportantes INNER JOIN ciudades ciu ON apo.ciudades_idciudades = ciu.idciudades WHERE vapomun.idaportesmunicipios=$1', [id]);

  res.json(respuesta.rows)


}







aportesmunicipios.createcat = async (req, res) => {

  const {aps_fecha, aps_monto, aps_descripcion, aportantes_idaportantes, ciudades_idciudades} = req.body;

  await pool.query('INSERT INTO aportesmunicipios  (aps_fecha, aps_monto, aps_descripcion, aportantes_idaportantes, ciudades_idciudades) VALUES($1, $2, $3, $4, $5)', [aps_fecha, aps_monto, aps_descripcion,aportantes_idaportantes, ciudades_idciudades]);

  res.json({ mensaje: 'Aporte Municipio registrado' })
}

aportesmunicipios.editcat = async (req, res) => {
    const id = parseInt(req.params.id);
  const {aps_fecha, aps_monto, aps_descripcion, aportantes_idaportantes, ciudades_idciudades} = req.body;
  await pool.query('UPDATE aportesmunicipios  set aps_fecha=$1, aps_monto=$2, aps_descripcion=$3, aportantes_idaportantes=$4, ciudades_idciudades=$5 WHERE idaportesmunicipios=$6', [aps_fecha, aps_monto, aps_descripcion, aportantes_idaportantes, ciudades_idciudades, id]);
  res.json({ mensaje: 'Aporte Municipio Editado' })


}

aportesmunicipios.delete = async (req, res) => {
  const id = parseInt(req.params.id);

  await pool.query('DELETE FROM aportesmunicipios WHERE idaportesmunicipios = $1', [id]);
  


  res.json({ mensaje: 'Aporte municipio eliminado' })

}


module.exports = aportesmunicipios;
