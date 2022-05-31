/*Script : Archivo principal de la aplicación 
*/
const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


// inicializations
const app = express();


// settings

app.set('port', process.env.PORT || 4000);

// Middelwares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Routes
//app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/roles', require('./routes/role.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/menus', require('./routes/menus.routes'));
app.use('/api/permisos', require('./routes/permisos.routes'));
app.use('/api/paises', require('./routes/paises.routes'));
app.use('/api/departamentos', require('./routes/departamentos.routes'));
app.use('/api/ciudades', require('./routes/ciudades.routes'));
app.use('/api/clasificacionesaportantes', require('./routes/clasificacionesaportantes.routes'));
app.use('/api/sectores', require('./routes/sectores.routes'));
app.use('/api/estructuranomnina', require('./routes/estrucnom.routes'));
app.use('/api/documentos', require('./routes/documents.routes'));
app.use('/api/aportantes', require('./routes/aportantes.routes'));
app.use('/api/responsables', require('./routes/responsables.routes'));
app.use('/api/sedes', require('./routes/sedes.routes'));
app.use('/api/aportesmunicipios', require('./routes/aportesmunicipios.routes'));
app.use('/api/tiposdocumentos', require('./routes/tiposdocs.routes'));
app.use('/api/documentosaportantes', require('./routes/docaportantes.routes'));
app.use('/api/territoriales', require('./routes/terrotorial.routes'));
app.use('/api/tipoadscrita', require('./routes/tipoadsc.routes'));
app.use('/api/reportes', require('./routes/reportes.routes'));

app.use('/api/logs', require('./routes/logs.routes'));
app.use('/api/macrozonas', require('./routes/macrozonas.routes'));
app.use('/api/clasificas', require('./routes/clasificas.routes'));
// Static files
app.use(express.static(path.join(__dirname, '/public')));

// Starting Server
app.listen(app.get('port'),  () => {
    console.log('Server on Port', app.get('port'))
});