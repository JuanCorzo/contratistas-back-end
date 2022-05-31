const pool = require('../database');
const logscontrollers = {};

logscontrollers.listlogs = async (req, res) => {
  const respuesta = await pool.query('SELECT idlog_eventos, log_fecha, log_accion, log_objeto, usu_nombre FROM log_eventos INNER JOIN usuarios ON log_idusuarios=idusuarios');
  res.json(respuesta.rows)
}

logscontrollers.listlogsent = async (req, res) => {
  const id = parseInt(req.params.id);
  var consulta = "SELECT idlog_eventos, log_fecha, log_accion, log_objeto, usu_nombre ";
  consulta +="FROM log_eventos INNER JOIN usuarios ON log_idusuarios=idusuarios";
  consulta +=" WHERE log_objeto='Enlace entidad aportante' ";
  const respuesta = await pool.query(consulta);
  res.json(respuesta.rows)
}

logscontrollers.createlogs = async (req, res) => {
  const { log_fecha, log_accion, log_objeto, log_idusuarios } = req.body;
  try {
    await pool.query('INSERT INTO log_eventos (log_fecha, log_accion, log_objeto, log_idusuarios) VALUES ($1, $2, $3, $4)', [log_fecha, log_accion, log_objeto, log_idusuarios]);
    res.json({ mensaje: 'rol registrado' })
  } catch (error) {
    res.json({ mensaje: "CAMPOS NO VALIDOS!" })
  }
}
module.exports = logscontrollers;
