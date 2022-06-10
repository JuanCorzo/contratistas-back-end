const pool = require('../database');
const path = require('path');

const docaportantescontrollers = {};
docaportantescontrollers.uploaduno = async (req, res) => {
    try {
        const apo_nombre = req.files.docs_aportantes[0].filename;
        const apo_ruta = req.files.docs_aportantes[0].path;
        const { apo_fecha, apo_version, tiposdocumentos_idtiposdocumentos, aportantes_idaportantes } = req.body;
        await pool.query('INSERT INTO documentosaportantes (apo_nombre, apo_ruta, apo_fecha, apo_version, tiposdocumentos_idtiposdocumentos, aportantes_idaportantes) VALUES ($1, $2, $3, $4, $5, $6) ', [apo_nombre, apo_ruta, apo_fecha, apo_version, tiposdocumentos_idtiposdocumentos, aportantes_idaportantes]);
        res.json({ mensaje: 'documento cargado satisfactoriamente' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}

docaportantescontrollers.uploadfact = async (req, res) => {
    try {
        const faa_ndocumento = req.files.faa_documento[0].filename;
        const faa_documento = req.files.faa_documento[0].path;
        const { faa_factores, aportantes_idaportantes } = req.body;
        await pool.query('INSERT INTO factoresaportantes (faa_documento, aportantes_idaportantes, faa_factores, faa_ndocumento) VALUES ($1, $2, $3, $4) ', [faa_documento, aportantes_idaportantes, faa_factores, faa_ndocumento]);
        res.json({ mensaje: 'documento cargado satisfactoriamente' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}

docaportantescontrollers.uploadenla = async (req, res) => {
    try{
        const res_ndocumento = req.files.res_documento[0].filename;
        const res_documento = req.files.res_documento[0].path;
        const {res_nombre, res_identificacion, res_cargo, res_email, res_telefono, aportantes_idaportantes, res_fecha} = req.body;
        await pool.query('INSERT INTO responsables (res_nombre, res_identificacion, res_cargo, res_email, res_telefono, aportantes_idaportantes, res_fecha, res_documento, res_ndocumento) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [res_nombre, res_identificacion, res_cargo, res_email, res_telefono, aportantes_idaportantes, res_fecha, res_documento, res_ndocumento]);
        res.json({ mensaje: 'documento cargado satisfactoriamente' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}

docaportantescontrollers.uploadtran = async (req, res) => {
    try{
        const tra_nombre = req.files.tra_ruta[0].filename;
        const tra_ruta = req.files.tra_ruta[0].path;
        const {tra_tipo, tra_usuario, tra_observaciones, aportantes_idaportantes} = req.body;
        await pool.query('INSERT INTO transicionesaportantes (tra_tipo, tra_usuario, tra_observaciones, aportantes_idaportantes, tra_nombre, tra_ruta) VALUES($1, $2, $3, $4, $5, $6)', [tra_tipo, tra_usuario, tra_observaciones, aportantes_idaportantes, tra_nombre, tra_ruta]);
        res.json({ mensaje: 'documento cargado satisfactoriamente' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}

docaportantescontrollers.downloaduno = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const respuesta = await pool.query('SELECT apo_ruta, apo_nombre FROM documentosaportantes WHERE iddocumentosaportantes=$1', [id]);
        console.log(__dirname, '../../' + respuesta.rows[0].apo_ruta);
        res.download(path.join(__dirname, '../../' + respuesta.rows[0].apo_ruta));
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error ejecutando la consulta'});
    }
}

docaportantescontrollers.downloaddos = async (req, res) => {
    res.download('reportes/reporte.xlxs');
}

docaportantescontrollers.downloadenla = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const respuesta = await pool.query('select res_documento, res_ndocumento FROM responsables WHERE idresponsables=$1', [id]);
        console.log(__dirname, '../../' + respuesta.rows[0].apo_ruta);
        res.download(path.join(__dirname, '../../' + respuesta.rows[0].apo_ruta));
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error ejecutando la consulta'});
    }
}

docaportantescontrollers.listcat = async (req, res) => {
    try{
        const respuesta = await pool.query('SELECT iddocumentosaportantes, apo_nombre, apo_ruta, apo_fecha, apo_version, tiposdocumentos_idtiposdocumentos, aportantes_idaportantes FROM documentosaportantes');
        res.json(respuesta.rows)
    } catch (error) {
        console.error(error);
        res.json([]);
    }
}

docaportantescontrollers.transiciones = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        var consulta ="SELECT idtransicionesaportantes, tra_tipo, tra_fecha, usu_nombre, tra_observaciones ";
        consulta +=" FROM transicionesaportantes INNER JOIN usuarios ON idusuarios=tra_usuario AND ";
        consulta += " aportantes_idaportantes='"+id+"'  "; 
        const respuesta = await pool.query(consulta);
        res.json(respuesta.rows)
    } catch (error) {
        console.error(error);
        res.json([]);
    }
}

docaportantescontrollers.docapoid = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const respuesta = await pool.query('SELECT iddocumentosaportantes, apo_fecha, apo_nombre, apo_ruta, apo_version FROM documentosaportantes WHERE iddocumentosaportantes=$1', [id]);
        res.json(respuesta.rows)
    } catch (error) {
        console.error(error);
        res.json([]);
    }
}


docaportantescontrollers.listcatbyaportante = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const respuesta = await pool.query('SELECT iddocumentosaportantes, apo_fecha, apo_nombre, apo_ruta, apo_version, idtiposdocumentos, tid_nombre, tid_clasifica FROM documentosaportantes INNER JOIN tiposdocumentos ON idtiposdocumentos=tiposdocumentos_idtiposdocumentos WHERE aportantes_idaportantes=$1', [id]);
        res.json(respuesta.rows)
    } catch (error) {
        console.error(error);
        res.json([]);
    }
}

docaportantescontrollers.delete = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM documentosaportantes WHERE iddocumentosaportantes=$1', [id]);
        res.json({ mensaje: 'Documentos eliminados' })
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error ejecutando la consulta'});
    }
}

module.exports = docaportantescontrollers;