const pool = require('../database');


const sedescontrollers = {};

sedescontrollers.listcat = async (req, res) => {
  try{
    const respuesta = await pool.query('SELECT s.idsedes, s.sed_codigo, s.sed_nombre, s.sed_direccion, s.ciudades_idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM sedes s INNER JOIN ciudades ciu on s.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial= terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises');
    res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }

}


sedescontrollers.geticatbyid = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT s.idsedes, s.sed_codigo, s.sed_nombre, s.sed_direccion, s.ciudades_idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM sedes s INNER JOIN ciudades ciu on s.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial= terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE  s.idsedes=$1', [id]);

  res.json(respuesta.rows)
  } catch (error) {
    res.json([]);
  }


}





sedescontrollers.geticatbyidciu = async (req, res) => {
    const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT s.idsedes, s.sed_codigo, s.sed_nombre, s.sed_direccion, s.ciudades_idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM sedes s INNER JOIN ciudades ciu on s.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial= terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE  ciu.idciudades=$1', [id]);

  res.json(respuesta.rows)


}
sedescontrollers.geticatbydep = async (req, res) => {
    const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT s.idsedes, s.sed_codigo, s.sed_nombre, s.sed_direccion, s.ciudades_idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM sedes s INNER JOIN ciudades ciu on s.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial= terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE dep.iddepartamentos=$1', [id]);

  res.json(respuesta.rows)


}

sedescontrollers.geticatbyterr = async (req, res) => {
  const id = parseInt(req.params.id);
const respuesta = await pool.query('SELECT s.idsedes, s.sed_codigo, s.sed_nombre, s.sed_direccion, s.ciudades_idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM sedes s INNER JOIN ciudades ciu on s.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial= terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE terr.idterritorial=$1', [id]);

res.json(respuesta.rows)


}
sedescontrollers.geticatbypa = async (req, res) => {
  const id = parseInt(req.params.id);
const respuesta = await pool.query('SELECT s.idsedes, s.sed_codigo, s.sed_nombre, s.sed_direccion, s.ciudades_idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM sedes s INNER JOIN ciudades ciu on s.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial= terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE pa.idpaises=$1', [id]);

res.json(respuesta.rows)


}




sedescontrollers.createcat = async (req, res) => {

  const {sed_codigo, sed_nombre, sed_direccion,  ciudades_idciudades } = req.body;

  await pool.query('INSERT INTO sedes (sed_codigo, sed_nombre, sed_direccion,  ciudades_idciudades) VALUES($1, $2, $3, $4)', [sed_codigo, sed_nombre, sed_direccion,  ciudades_idciudades]);

  res.json({ mensaje: 'Sede Registrada' })
}

sedescontrollers.editcat = async (req, res) => {
    const id = parseInt(req.params.id);
  const {sed_codigo, sed_nombre, sed_direccion,  ciudades_idciudades} = req.body;
  await pool.query('UPDATE sedes set  sed_codigo=$1, sed_nombre=$2, sed_direccion=$3,  ciudades_idciudades=$4 WHERE idsedes=$5', [sed_codigo, sed_nombre, sed_direccion,  ciudades_idciudades,  id]);
  res.json({ mensaje: 'Sede Editada' })


}

sedescontrollers.deletesede = async (req, res) => {
  const id = parseInt(req.params.id);

  await pool.query('DELETE FROM sedes WHERE idsedes = $1', [id]);
  


  res.json({ mensaje: 'Sede eliminada' })

}
module.exports = sedescontrollers;
