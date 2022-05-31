const pool = require('../database');


const paisescontrollers = {};

paisescontrollers.listpa = async (req, res) => {
    const respuesta = await pool.query('SELECT idpaises, pai_codigo, pai_nombre FROM paises');
    res.json(respuesta.rows)
}

paisescontrollers.getipabyid = async (req, res) => {
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT idpaises, pai_codigo, pai_nombre FROM paises WHERE idpaises=$1', [id]);
    res.json(respuesta.rows)
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
    const id = parseInt(req.params.id);
    try {
        const {pai_codigo, pai_nombre} = req.body;
        await pool.query('UPDATE paises SET pai_codigo=$1, pai_nombre=$2 WHERE idpaises=$3', [pai_codigo, pai_nombre, id]);
        res.json({ mensaje: 'Pais Editado' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: "CAMPOS NO VALIDOS" })
    }
}
paisescontrollers.deletepa = async (req, res) => {
    const id = parseInt(req.params.id);
    let nulo = null
    await pool.query('DELETE FROM paises WHERE idpaises=$1', [id]);
    res.json({ mensaje: 'rol eliminado' })
}
module.exports = paisescontrollers;
