const pool = require('../database');
const path = require('path');
const documentscontrollers = {};

documentscontrollers.uploaduno = async (req, res) => {
    try {
        const doc_nombre = req.files.archivo[0].filename;
        const doc_ruta = req.files.archivo[0].path;
        const { doc_idvienede, doc_tabla, doc_version } = req.body;
        await pool.query('INSERT INTO documentos (doc_nombre, doc_ruta, doc_idvienede, doc_tabla, doc_version) VALUES ($1, $2, $3, $4, $5) ', [doc_nombre, doc_ruta, doc_idvienede, doc_tabla, doc_version]);
        res.json({ mensaje: 'documento cargado satisfactoriamente' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}

documentscontrollers.downloaduno = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const respuesta = await pool.query('SELECT doc_ruta FROM documentos WHERE iddocumentos=$1',[id]);
        res.download(path.join(__dirname,  '../../' +  respuesta.rows[0].doc_ruta));
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error ejecutando la consulta'});
    }
}

module.exports = documentscontrollers;