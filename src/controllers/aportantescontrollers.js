const pool = require('../database');
const Excel = require('exceljs');
const path = require('path');

const aportantescontrollers = {};

aportantescontrollers.listcat = async (req, res) => {
  var consulta = "SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, ";
  consulta +="apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, ";
  consulta +="apo_promedioibc,  tipoads.idtipoadscrita, ";
  consulta +="tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, ";
  consulta +="sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ";
  consulta +="ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre,";
  consulta +="pa.idpaises, pa.pai_nombre, apo_identificacion, apo_sucursal, apo_empleados, apo_feccatipo, apo_feccasect FROM aportantes apo INNER JOIN sectores sec ";
  consulta +="ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ";
  consulta +="ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes ";
  consulta +=" INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina ";
  consulta +=" INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita ";
  consulta +=" INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades ";
  consulta +=" INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos ";
  consulta +=" INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial ";
  consulta +=" INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises  ";
  const respuesta = await pool.query(consulta);
  res.json(respuesta.rows)
}

aportantescontrollers.aporficha = async (req, res) => {
  const nit = parseInt(req.params.nit);
  var consulta = "SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, ";
  consulta +="apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, ";
  consulta +="apo_promedioibc, tipoads.idtipoadscrita, ";
  consulta +="tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, ";
  consulta +="sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ";
  consulta +="ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre,";
  consulta +="pa.idpaises, pa.pai_nombre, apo_identificacion, apo_sucursal, apo_empleados, apo_feccatipo, apo_feccasect FROM aportantes apo INNER JOIN sectores sec ";
  consulta +="ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ";
  consulta +="ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes ";
  consulta +=" INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina ";
  consulta +=" INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita ";
  consulta +=" INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades ";
  consulta +=" INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos ";
  consulta +=" INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial ";
  consulta +=" INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises ";
  consulta +=" WHERE apo_identificacion='"+nit+"'";
  const respuesta = await pool.query(consulta);
  res.json(respuesta.rows)
}


aportantescontrollers.geticatbyid = async (req, res) => {
  const id = parseInt(req.params.id);
  var consulta = "SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, ";
  consulta +="apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, ";
  consulta +="apo_promedioibc, tipoads.idtipoadscrita, ";
  consulta +="tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, ";
  consulta +="sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ";
  consulta +="ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre,";
  consulta +="pa.idpaises, pa.pai_nombre, apo_identificacion, ter_macrozona, tad_descripcion, apo_sucursal, apo_empleados, apo_feccatipo, ";
  consulta +="apo_feccasect, ciu_codigo, dep_codigo FROM aportantes apo INNER JOIN sectores sec ";
  consulta +="ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ";
  consulta +="ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes ";
  consulta +=" INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina ";
  consulta +=" INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita ";
  consulta +=" INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades ";
  consulta +=" INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos ";
  consulta +=" INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial ";
  consulta +=" INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE apo.idaportantes="+id;
  const respuesta = await pool.query(consulta);
  res.json(respuesta.rows)
}

aportantescontrollers.geticatbyfiltro = async (req, res) => {
  const idsec = req.params.idsec;
  const idesn = req.params.idesn;
  const idcla = req.params.idcla;
  const iddep = req.params.iddep;
  const idciu = req.params.idciu;
  var cuen = 0;

  var consulta = "SELECT idaportantes, apo_nombre, apo_email, apo_celular, ";
  consulta +="apo_direccion, apo_replegal, apo_ccreplegal, apo_sufijo, ";
  consulta +="apo_promedioibc, tipoads.idtipoadscrita, ";
  consulta +="tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, ";
  consulta +="sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ";
  consulta +="ciu_nombre, dep.iddepartamentos, dep_nombre, terr.idterritorial, ter_nombre,";
  consulta +="pa.idpaises, pa.pai_nombre, apo_identificacion, apo_sucursal, apo_empleados, apo_feccatipo, apo_feccasect, ter_macrozona FROM aportantes apo INNER JOIN sectores sec ";
  consulta +="ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ";
  consulta +="ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes ";
  consulta +=" INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina ";
  consulta +=" INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita ";
  consulta +=" INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades ";
  consulta +=" INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos ";
  consulta +=" INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial ";
  consulta +=" INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises ";
  if(idsec!="0"){ consulta +=" AND sec.idsectores="+idsec; cuen++; }
  if(idesn!="0"){ consulta +=" AND enom.idestructuranomina="+idesn; cuen++; }
  if(idcla!="0"){ consulta +=" AND idclasificaaportantes IN ("+idcla+")"; cuen++; }
  if(iddep!="0"){ consulta +=" AND dep.iddepartamentos="+iddep; cuen++; }
  if(idciu!="0"){ consulta +=" AND ciu.idciudades="+idciu; cuen++; }
  //if(cuen==0){ 
    //consulta += " LIMIT 50 ";  
  //}
  consulta +=" ORDER BY apo_identificacion, CAST(apo_sufijo AS INT)";

  const respuesta = await pool.query(consulta);
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Reporte1');
  const reporte1 = respuesta.rows;
  worksheet.columns = [
      { header: 'Id', key: 'idaportantes', width: 50 },
      { header: 'Nombre', key: 'apo_nombre', width: 40 },
      { header: 'Email', key: 'apo_email', width: 30 },
      { header: 'Direccion', key: 'apo_direccion', width: 30 },
      { header: 'Representante_legal', key: 'apo_replegal', width: 30 },
      { header: 'Cedula_representante_legal', key: 'apo_ccreplegal', width: 30 },
      { header: 'Sufijo', key: 'apo_sufijo', width: 30 },
      { header: 'Promedio_IBC', key: 'apo_promedioibc', width: 30 },
      { header: 'Telefono', key: 'apo_celular', width: 30 },
      { header: 'Empleados', key: 'apo_empleados', width: 30 },
      { header: 'Municipio', key: 'ciu_nombre', width: 30 },
      { header: 'Departamento', key: 'dep_nombre', width: 30 },
      { header: 'Territorial', key: 'ter_nombre', width: 30 },
  ];
  for (var i = 0; i < reporte1.length; ++i) {
      await worksheet.addRow({ idaportantes: reporte1[i].idaportantes, 
      apo_nombre: reporte1[i].apo_nombre, apo_email: reporte1[i].apo_email,
      apo_direccion: reporte1[i].apo_direccion, apo_replegal: reporte1[i].apo_replegal,
      apo_ccreplegal: reporte1[i].apo_ccreplegal, apo_sufijo: reporte1[i].apo_sufijo,
      apo_promedioibc: reporte1[i].apo_promedioibc, ciu_nombre: reporte1[i].ciu_nombre,
      apo_empleados: reporte1[i].apo_empleados, apo_email: reporte1[i].apo_email,
      dep_nombre: reporte1[i].dep_nombre, ter_nombre: reporte1[i].ter_nombre
      });
  };
  //await workbook.xlsx.writeFile(path.join('reportes/reporte.xlsx'))
  res.json(respuesta.rows);
}

aportantescontrollers.geticatbyfiltro2 = async (req, res) => {
  const idcla = req.params.idcla;
  const idesn = req.params.idesn;
  const idsec = req.params.idsec;
  var idmac = parseInt(req.params.idmac);
  const idter = parseInt(req.params.idter);
  const iddep = parseInt(req.params.iddep);
  const idciu = parseInt(req.params.idciu);
  const idora = req.params.idora;
  var cont = 0;
  if(idmac=="1"){ idmac="Macrozona I"; cont++; }
  else if(idmac=="2"){ idmac="Macrozona II"; cont++; }
  else if(idmac=="3"){ idmac="Macrozona III"; cont++; }
  else { idmac="0"; }
   
  var consulta = "SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, ";
  consulta +="apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, ";
  consulta +="apo_promedioibc,  tipoads.idtipoadscrita, ";
  consulta +="tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, ";
  consulta +="sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ";
  consulta +="ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre,";
  consulta +="pa.idpaises, pa.pai_nombre, apo_identificacion, apo_sucursal, apo_empleados, apo_feccatipo,";
  consulta +=" apo_feccasect, ter_macrozona FROM aportantes apo INNER JOIN sectores sec ";
  consulta +="ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ";
  consulta +="ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes ";
  consulta +=" INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina ";
  consulta +=" INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita ";
  consulta +=" INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades ";
  consulta +=" INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos ";
  consulta +=" INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial ";
  consulta +=" INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises ";
  if(idcla!="0"){ consulta +=" AND idclasificaaportantes IN ("+idcla+")"; cont++; }
  if(idesn!="0"){ consulta +=" AND enom.idestructuranomina IN ("+idesn+")"; cont++; }
  if(idsec!="0"){ consulta +=" AND sec.idsectores IN ("+idsec+")"; cont++; }
  if(idmac!="0"){ consulta +=" AND terr.ter_macrozona='"+idmac+"'"; cont++; }
  if(idter!="0"){ consulta +=" AND terr.idterritorial IN ("+idter+")"; cont++; }
  if(iddep!="0"){ consulta +=" AND dep.iddepartamentos="+iddep; cont++; }
  if(idciu!="0"){ consulta +=" AND ciu.idciudades="+idciu; cont++; }
  if(idora!="0"){ consulta +=" AND idtipoadscrita IN ("+idora+")"; cont++; }
  consulta +=" ORDER BY apo_identificacion, CAST(apo_sufijo AS INT)";

  const respuesta = await pool.query(consulta);

  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Reporte1');
  const reporte1 = respuesta.rows;
  worksheet.columns = [
      { header: 'Id', key: 'idaportantes', width: 50 },
      { header: 'Nombre', key: 'apo_nombre', width: 40 },
      { header: 'Email', key: 'apo_email', width: 30 },
      { header: 'Direccion', key: 'apo_direccion', width: 30 },
      { header: 'Representante_legal', key: 'apo_replegal', width: 30 },
      { header: 'Cedula_representante_legal', key: 'apo_ccreplegal', width: 30 },
      { header: 'Nit', key: 'apo_identificacion', width: 30 },
      { header: 'Sufijo', key: 'apo_sufijo', width: 30 },
      { header: 'Promedio_IBC', key: 'apo_promedioibc', width: 30 },
      { header: 'Telefono', key: 'apo_celular', width: 30 },
      { header: 'Empleados', key: 'apo_empleados', width: 30 },
      { header: 'Municipio', key: 'ciu_nombre', width: 30 },
      { header: 'Departamento', key: 'dep_nombre', width: 30 },
      { header: 'Territorial', key: 'ter_nombre', width: 30 },
  ];
  for (var i = 0; i < reporte1.length; ++i) {
      await worksheet.addRow({ idaportantes: reporte1[i].idaportantes, 
      apo_nombre: reporte1[i].apo_nombre, apo_email: reporte1[i].apo_email,
      apo_direccion: reporte1[i].apo_direccion, apo_replegal: reporte1[i].apo_replegal,
      apo_ccreplegal: reporte1[i].apo_ccreplegal, apo_identificacion: reporte1[i].apo_identificacion,
      apo_sufijo: reporte1[i].apo_sufijo,
      apo_promedioibc: reporte1[i].apo_promedioibc, ciu_nombre: reporte1[i].ciu_nombre,
      apo_empleados: reporte1[i].apo_empleados, apo_email: reporte1[i].apo_email,
      dep_nombre: reporte1[i].dep_nombre, ter_nombre: reporte1[i].ter_nombre
      });
  };
  //await workbook.xlsx.writeFile(path.join('reportes/reporte.xlsx'))

  //res.json({ mensaje: consulta })

  res.json(respuesta.rows);
}

aportantescontrollers.geticatbyfiltropanel = async (req, res) => {
  const idcla = req.params.idcla;
  const idesn = req.params.idesn;
  const idsec = req.params.idsec;
  var idmac = parseInt(req.params.idmac);
  const idter = parseInt(req.params.idter);
  const iddep = parseInt(req.params.iddep);
  const idciu = parseInt(req.params.idciu);
  const idora = req.params.idora;
  var cont = 0;
  if(idmac=="1"){ idmac="Macrozona I"; cont++; }
  else if(idmac=="2"){ idmac="Macrozona II"; cont++; }
  else if(idmac=="3"){ idmac="Macrozona III"; cont++; }
  else { idmac="0"; }
   
  var consulta = "SELECT COUNT(*) total FROM aportantes apo INNER JOIN sectores sec ";
  consulta +="ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ";
  consulta +="ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes ";
  consulta +=" INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina ";
  consulta +=" INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita ";
  consulta +=" INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades ";
  consulta +=" INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos ";
  consulta +=" INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial ";
  consulta +=" INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises ";
  if(idcla!="0"){ consulta +=" AND idclasificaaportantes IN ("+idcla+")"; cont++; }
  if(idesn!="0"){ consulta +=" AND enom.idestructuranomina IN ("+idesn+")"; cont++; }
  if(idsec!="0"){ consulta +=" AND sec.idsectores IN ("+idsec+")"; cont++; }
  if(idmac!="0"){ consulta +=" AND terr.ter_macrozona='"+idmac+"'"; cont++; }
  if(idter!="0"){ consulta +=" AND terr.idterritorial IN ("+idter+")"; cont++; }
  if(iddep!="0"){ consulta +=" AND dep.iddepartamentos="+iddep; cont++; }
  if(idciu!="0"){ consulta +=" AND ciu.idciudades="+idciu; cont++; }
  if(idora!="0"){ consulta +=" AND idtipoadscrita IN ("+idora+")"; cont++; }
  const respuesta = await pool.query(consulta);
  res.json(respuesta.rows);
}

aportantescontrollers.geticatbyfiltropanel2 = async (req, res) => {
  const idcla = req.params.idcla;
  const idesn = req.params.idesn;
  const idsec = req.params.idsec;
  var idmac = parseInt(req.params.idmac);
  const idter = parseInt(req.params.idter);
  const iddep = parseInt(req.params.iddep);
  const idciu = parseInt(req.params.idciu);
  const idora = req.params.idora;
  var cont = 0;
  if(idmac=="1"){ idmac="Macrozona I"; cont++; }
  else if(idmac=="2"){ idmac="Macrozona II"; cont++; }
  else if(idmac=="3"){ idmac="Macrozona III"; cont++; }
  else { idmac="0"; }
   
  var consulta = "SELECT COUNT(*) total FROM aportantes apo INNER JOIN sectores sec ";
  consulta +="ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ";
  consulta +="ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes ";
  consulta +=" INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina ";
  consulta +=" INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita ";
  consulta +=" INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades ";
  consulta +=" INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos ";
  consulta +=" INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial ";
  consulta +=" INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises ";
  if(idcla!="0"){ consulta +=" AND idclasificaaportantes IN ("+idcla+")"; cont++; }
  if(idesn!="0"){ consulta +=" AND enom.idestructuranomina IN ("+idesn+")"; cont++; }
  consulta +=" AND sec.idsectores IN (1)"; cont++; 
  if(idmac!="0"){ consulta +=" AND terr.ter_macrozona='"+idmac+"'"; cont++; }
  if(idter!="0"){ consulta +=" AND terr.idterritorial IN ("+idter+")"; cont++; }
  if(iddep!="0"){ consulta +=" AND dep.iddepartamentos="+iddep; cont++; }
  if(idciu!="0"){ consulta +=" AND ciu.idciudades="+idciu; cont++; }
  if(idora!="0"){ consulta +=" AND idtipoadscrita IN ("+idora+")"; cont++; }
  const respuesta = await pool.query(consulta);
  res.json(respuesta.rows);
}


aportantescontrollers.getaportdep = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT idaportantes, apo.apo_nombre FROM aportantes INNER JOIN ciudades_idciudades=idciudades AND departamentos_iddepartamentos=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.getmacros  = async (req, res) => {
  const respuesta = await pool.query("SELECT DISTINCT(ter_macrozona) FROM territorial ORDER BY ter_macrozona");
  res.json(respuesta.rows)
}

aportantescontrollers.getterriid = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT terri.idterritorial, terri.ter_cod, terri.ter_nombre, terri.ter_macrozona, pa.idpaises, pa.pai_nombre FROM territorial terri INNER JOIN paises pa ON terri.paises_idpaises=pa.idpaises WHERE terri.idterritorial=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.getterrmacro = async (req, res) => {
  var id = parseInt(req.params.id);
  if(id==1){ id="Macrozona I"; }
  if(id==2){ id="Macrozona II"; }
  if(id==3){ id="Macrozona III"; }

  var consulta="SELECT idterritorial, ter_cod, ter_nombre FROM territorial WHERE ter_macrozona='"+id+"' ";
  const respuesta = await pool.query(consulta);
  res.json(respuesta.rows)
}

aportantescontrollers.getultid  = async (req, res) => {
  const respuesta = await pool.query('SELECT idaportantes FROM aportantes ORDER BY idaportantes DESC LIMIT 1');
  res.json(respuesta.rows)
}

aportantescontrollers.getmaterrim  = async (req, res) => {
  const respuesta = await pool.query('SELECT idterritorial, ter_cod, ter_nombre, ter_macrozona, idterritorial value, ter_nombre label  FROM territorial');
  res.json(respuesta.rows)
}

aportantescontrollers.createter= async (req, res) => {
  try {
      const { ter_cod, ter_nombre, ter_macrozona, paises_idpaises } = req.body;
      await pool.query('INSERT INTO territorial (ter_cod, ter_nombre, ter_macrozona, paises_idpaises) VALUES($1, $2, $3, $4)', [ter_cod, ter_nombre, ter_macrozona, paises_idpaises]);
      res.json({ mensaje: 'Territorial Registrada' })
  } catch (error) {
      console.log(error);
      res.json({ mensaje: "CAMPOS NO VALIDOS" })
  }
}

aportantescontrollers.editaporsect = async (req, res) => {
  const id = parseInt(req.params.id);
  const { sectores_idsectores } = req.body;
  await pool.query('UPDATE aportantes SET sectores_idsectores=$1 WHERE idaportantes=$2', [sectores_idsectores, id]);
  res.json({ mensaje: 'Aportante editado' })
}

aportantescontrollers.editaporclas = async (req, res) => {
  const id = parseInt(req.params.id);
  const { clasificaaportantes_idclasificaaportantes } = req.body;
  await pool.query('UPDATE aportantes SET clasificaaportantes_idclasificaaportantes=$1 WHERE idaportantes=$2', [clasificaaportantes_idclasificaaportantes, id]);
  res.json({ mensaje: 'Aportante editado' })
}

aportantescontrollers.editter = async (req, res) => {
  const id = parseInt(req.params.id);
  const { ter_cod, ter_nombre, ter_macrozona, paises_idpaises } = req.body;
  await pool.query('UPDATE territorial set ter_cod=$1, ter_nombre=$2, ter_macrozona=$3, paises_idpaises=$4 WHERE idterritorial=$5', [ter_cod, ter_nombre, ter_macrozona, paises_idpaises, id]);
  res.json({ mensaje: 'Territoriales editadas' })
}

aportantescontrollers.getdepater = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT iddepartamentos, dep_nombre FROM departamentos WHERE territorial_idterritorial=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.geticatbysector = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, apo_promedioibc,  tipoads.idtipoadscrita, tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM aportantes apo INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE sec.idsectores=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.geticatbyclasificacion = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, apo_promedioibc,  tipoads.idtipoadscrita, tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM aportantes apo INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE clasapor.idclasificaaportantes=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.geticatbyesnom = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, apo_promedioibc,  tipoads.idtipoadscrita, tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM aportantes apo INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE enom.idestructuranomina=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.geticatbytipoads = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, apo_promedioibc,  tipoads.idtipoadscrita, tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM aportantes apo INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE tipoads.idtipoadscrita=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.geticatbyciu = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, apo_promedioibc,  tipoads.idtipoadscrita, tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM aportantes apo INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE ciu.idciudades=$1', [id]);
  res.json(respuesta.rows)
}
aportantescontrollers.geticatbydep = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const respuesta = await pool.query('SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, apo_promedioibc,  tipoads.idtipoadscrita, tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM aportantes apo INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE dep.iddepartamentos=$1', [id]);
    res.json(respuesta.rows)
  } catch (error) {
    console.log(error);
    res.json([]);
  }
}

aportantescontrollers.geticatbyterr = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, apo_promedioibc,  tipoads.idtipoadscrita, tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM aportantes apo INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE terr.idterritorial=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.geticatbypais = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT apo.idaportantes, apo.apo_nombre, apo.apo_email, apo.apo_celular, apo.apo_direccion, apo_replegal, apo_ccreplegal, apo.apo_sufijo, apo_promedioibc,  tipoads.idtipoadscrita, tipoads.tad_codigo, enom.idestructuranomina, enom.est_nombre, sec.idsectores, sec.sec_nombre, clasapor.idclasificaaportantes, clasapor.cla_nombre, ciu.idciudades, ciu.ciu_nombre, dep.iddepartamentos, dep.dep_nombre, terr.idterritorial, terr.ter_nombre, pa.idpaises, pa.pai_nombre FROM aportantes apo INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE pa.idpaises=$1', [id]);
  res.json(respuesta.rows)
}

aportantescontrollers.createcat = async (req, res) => {
  //const respuesta = await pool.query('SELECT idaportantes INNER JOIN sectores sec ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises WHERE pa.idpaises=$1', [id]);
  const {idaportantes, apo_nombre, apo_email, apo_celular, apo_identificacion, apo_sufijo, apo_direccion, apo_replegal, apo_ccreplegal, apo_promedioibc, estructuranomina_idestructuranomina, clasificaaportantes_idclasificaaportantes, sectores_idsectores, ciudades_idciudades,tipoadscrita_idtipoadscrita, apo_sucursal, apo_empleados } = req.body;
  try{
    await pool.query('INSERT INTO aportantes (idaportantes, apo_nombre, apo_email, apo_celular, apo_identificacion, apo_sufijo, apo_direccion, apo_replegal, apo_ccreplegal, apo_promedioibc, estructuranomina_idestructuranomina, clasificaaportantes_idclasificaaportantes, sectores_idsectores, ciudades_idciudades,tipoadscrita_idtipoadscrita, apo_sucursal, apo_empleados) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)', [idaportantes, apo_nombre, apo_email, apo_celular, apo_identificacion, apo_sufijo, apo_direccion, apo_replegal, apo_ccreplegal, apo_promedioibc,  estructuranomina_idestructuranomina, clasificaaportantes_idclasificaaportantes, sectores_idsectores, ciudades_idciudades,tipoadscrita_idtipoadscrita, apo_sucursal, apo_empleados]);
    res.json({ mensaje: 'Aporte registrado' })
  }
  catch(error){
    res.json({mensaje: error+" CAMPOS NO VALIDOS"})
  }
}

aportantescontrollers.editcat = async (req, res) => {
  const id = parseInt(req.params.id);
  const {apo_nombre, apo_email, apo_celular, apo_identificacion, apo_sufijo, apo_direccion, apo_replegal, apo_ccreplegal, apo_promedioibc,  estructuranomina_idestructuranomina, clasificaaportantes_idclasificaaportantes, sectores_idsectores, ciudades_idciudades,tipoadscrita_idtipoadscrita, apo_sucursal, apo_empleados } = req.body;
  try{
    await pool.query('UPDATE aportantes set apo_nombre=$1, apo_email=$2, apo_celular=$3, apo_identificacion=$4, apo_sufijo=$5, apo_direccion=$6, apo_replegal=$7, apo_ccreplegal=$8, apo_promedioibc=$9, estructuranomina_idestructuranomina=$10, clasificaaportantes_idclasificaaportantes=$11, sectores_idsectores=$12, ciudades_idciudades=$13, tipoadscrita_idtipoadscrita=$14, apo_sucursal=$15, apo_empleados=$16 WHERE idaportantes=$17', 
    [apo_nombre, apo_email, apo_celular, apo_identificacion, apo_sufijo, apo_direccion, apo_replegal, apo_ccreplegal, apo_promedioibc,  estructuranomina_idestructuranomina, clasificaaportantes_idclasificaaportantes, sectores_idsectores, ciudades_idciudades, tipoadscrita_idtipoadscrita, apo_sucursal, apo_empleados, id]);
    res.json({ mensaje: 'Aportante Editado' })

  }catch(error){
    console.log(error);
    res.json({mensaje:"CAMPOS NO VALIDOS"})
  }
}

aportantescontrollers.delete = async (req,res) => {
  const id = parseInt(req.params.id);

  let nulo= null

  
  await pool.query('UPDATE responsables  SET aportantes_idaportantes =$1 WHERE aportantes_idaportantes = $2', [nulo,

    id
  ]);
  await pool.query('UPDATE documentosaportantes  SET aportantes_idaportantes =$1 WHERE aportantes_idaportantes = $2', [nulo,

    id
  ]);

  await pool.query('UPDATE aportesmunicipios  SET aportantes_idaportantes =$1 WHERE aportantes_idaportantes = $2', [nulo,

    id
  ]);
   await pool.query('DELETE FROM aportantes WHERE idaportantes=$1', [id]);
    
res.json({mensaje:'aportante eliminado'})

}

module.exports = aportantescontrollers;
