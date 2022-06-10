const pool = require('../database');


const paisescontrollers = {};

paisescontrollers.listpa = async (req, res) => {
    try{
        const respuesta = await pool.query('SELECT idpaises, pai_codigo, pai_nombre FROM paises');
        res.json(respuesta.rows)
    } catch (error) {
        console.error(error);
        res.json([]);
    }
}

paisescontrollers.getipabyid = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const respuesta = await pool.query('SELECT idpaises, pai_codigo, pai_nombre FROM paises WHERE idpaises=$1', [id]);
        res.json(respuesta.rows)
    } catch (error) {
        console.error(error);
        res.json([]);
    }
}

paisescontrollers.createpa = async (req, res) => {
    try {
        const { pai_codigo, pai_nombre } = req.body;
        await pool.query('INSERT INTO paises (pai_codigo, pai_nombre) VALUES($1, $2)', [pai_codigo, pai_nombre]);
        res.json({ mensaje: 'Pais Registrado' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}

paisescontrollers.editpa = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {pai_codigo, pai_nombre} = req.body;
        await pool.query('UPDATE paises SET pai_codigo=$1, pai_nombre=$2 WHERE idpaises=$3', [pai_codigo, pai_nombre, id]);
        res.json({ mensaje: 'Pais Editado' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}
paisescontrollers.deletepa = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM paises WHERE idpaises=$1', [id]);
        res.json({ mensaje: 'rol eliminado' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}
module.exports = paisescontrollers;
