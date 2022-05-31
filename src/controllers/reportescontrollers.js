const pool = require('../database');

const reportescontrollers = {};
reportescontrollers.dashboard = async (req, res) => {

    var consulta ="SELECT (SELECT COUNT(*) FROM aportantes) aportantes, ";
    consulta +="(SELECT COUNT(*) FROM aportantes INNER JOIN clasificaaportantes ";
    consulta +="ON clasificaaportantes_idclasificaaportantes=idclasificaaportantes ";
    consulta +=") obligatorios,";
    consulta +="(SELECT COUNT(*) FROM aportantes INNER JOIN clasificaaportantes ";
    consulta +="ON clasificaaportantes_idclasificaaportantes=idclasificaaportantes ";
    consulta +="AND cla_nombre='No Obligados') noobligatorios,";
    consulta +="(SELECT COUNT(distinct territorial_idterritorial) FROM aportantes INNER JOIN ciudades ";
    consulta +="ON ciudades_idciudades=idciudades INNER JOIN departamentos ON ";
    consulta +="departamentos_iddepartamentos=iddepartamentos ) territorial,";
    consulta +="(SELECT COUNT(*) FROM macrozonas) macros,";
    consulta +="(SELECT COUNT(*)-1 FROM territorial) sedes1, ";
    consulta +="(SELECT COUNT(*) FROM aportantes WHERE sectores_idsectores=1) principales,";
    consulta +="(SELECT COUNT(*) FROM aportantes WHERE sectores_idsectores=14) adscritos,";
    consulta +="(SELECT COUNT(*) FROM aportantes WHERE clasificaaportantes_idclasificaaportantes=3) estudio,";
    consulta +="(SELECT COUNT(*) FROM aportantes WHERE clasificaaportantes_idclasificaaportantes=1) oblig2";

    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);
}

reportescontrollers.zonarepo = async (req, res) => {    
    const idmac = parseInt(req.params.idmac);
    var consulta ="SELECT (SELECT COUNT(*) FROM aportantes INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta +="INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta +=" INNER JOIN territorial ON territorial_idterritorial=idterritorial ";
    consulta +=" INNER JOIN macrozonas ON ter_macrozona=mac_nombre AND idmacrozonas='"+idmac+"') aportantes, ";
    consulta +="(SELECT COUNT(*) FROM territorial INNER JOIN macrozonas ON ter_macrozona=mac_nombre AND idmacrozonas='"+idmac+"') territoriales,";
    consulta +="(SELECT COUNT(*) FROM sedes INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta +="INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta +="INNER JOIN territorial ON territorial_idterritorial=idterritorial ";
    consulta +="INNER JOIN macrozonas ON ter_macrozona=mac_nombre AND idmacrozonas='"+idmac+"' ) sedes, ";
    consulta +="(SELECT mac_nombre FROM macrozonas WHERE idmacrozonas='"+idmac+"') nombre";
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);
    res.json({ mensaje: consulta })
}

reportescontrollers.zonarepo2 = async (req, res) => {    
    const idter = parseInt(req.params.idter);
    var consulta ="SELECT (SELECT COUNT(*) FROM aportantes INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta +="INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta +=" INNER JOIN territorial ON territorial_idterritorial=idterritorial AND idterritorial='"+idter+"') aportantes, ";
    consulta +="(SELECT COUNT(*) FROM territorial WHERE idterritorial='"+idter+"') territoriales,";
    consulta +="(SELECT COUNT(*) FROM sedes INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta +="INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta +="INNER JOIN territorial ON territorial_idterritorial=idterritorial AND idterritorial='"+idter+"' ) sedes, ";
    consulta +="(SELECT ter_nombre FROM territorial WHERE idterritorial='"+idter+"') nombre";
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);
    //res.json({ mensaje: consulta })
}

reportescontrollers.geticatsinfiltro = async (req, res) => {
    var consulta="SELECT ter_nombre, ";
    consulta +="(SELECT COUNT(*) FROM aportantes INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta +="INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta +="INNER JOIN sectores ON sectores_idsectores=idsectores ";
    consulta +="AND territorial_idterritorial=a.idterritorial AND sec_codigo='01') principal, ";
    consulta +="(SELECT COUNT(*) FROM aportantes INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta +="INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta +="INNER JOIN sectores ON sectores_idsectores=idsectores ";
    consulta +="AND territorial_idterritorial=a.idterritorial AND sec_codigo='02') adscrita ";
    consulta +="FROM territorial a ";

    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);

}

reportescontrollers.geticatbyfiltro3 = async (req, res) => {
    const idsec = req.params.idsec;
    const idesn = req.params.idesn;
    const idcla = req.params.idcla;
    var idmac = parseInt(req.params.idmac);
    const idter = parseInt(req.params.idter);
    const iddep = parseInt(req.params.iddep);
    const idciu = parseInt(req.params.idciu);
    const repor = parseInt(req.params.repor);
    const idora = req.params.idora;

    if(idmac=="1"){ idmac="Macrozona 1"; }
    else if(idmac=="2"){ idmac="Macrozona 2"; }
    else if(idmac=="3"){ idmac="Macrozona 3"; }
    else { idmac="0"; }
  
    var consulta=""; var consulta2=""; 
    if(repor=="1"){ 
        consulta += "SELECT ter_nombre nombre, COUNT(*) cuenta, CAST(AVG(apo_promedioibc) AS int) promedio, CAST(AVG(apo_empleados) AS int) empleados FROM aportantes apo INNER JOIN sectores sec ";
        consulta2 += " GROUP BY ter_nombre ";
    }
    else if(repor=="2"){ 
        consulta += "SELECT ciu_nombre nombre, COUNT(*) cuenta, CAST(AVG(apo_promedioibc) AS int) promedio, CAST(AVG(apo_empleados) AS int) empleados FROM aportantes apo INNER JOIN sectores sec ";
        consulta2 += " GROUP BY ciu_nombre ";
    }
    else if(repor=="3"){ 
        consulta += "SELECT tad_descripcion nombre, COUNT(*) cuenta, CAST(AVG(apo_promedioibc) AS int) promedio, CAST(AVG(apo_empleados) AS int) empleados FROM aportantes apo INNER JOIN sectores sec ";
        consulta2 += " GROUP BY tad_descripcion ORDER BY tad_descripcion DESC ";
    }
    else if(repor=="4"){ 
        consulta += "SELECT cla_nombre nombre, COUNT(*) cuenta, CAST(AVG(apo_promedioibc) AS int) promedio, CAST(AVG(apo_empleados) AS int) empleados FROM aportantes apo INNER JOIN sectores sec ";
        consulta2 += " GROUP BY cla_nombre ";
    }
    else if(repor=="5"){ 
        consulta += "SELECT est_nombre nombre, COUNT(*) cuenta, CAST(AVG(apo_promedioibc) AS int) promedio, CAST(AVG(apo_empleados) AS int) empleados FROM aportantes apo INNER JOIN sectores sec ";
        consulta2 += " GROUP BY est_nombre ";
    }
    else if(repor=="6"){ 
        consulta += "SELECT ter_macrozona nombre, COUNT(*) cuenta, CAST(AVG(apo_promedioibc) AS int) promedio, CAST(AVG(apo_empleados) AS int) empleados FROM aportantes apo INNER JOIN sectores sec ";
        consulta2 += " GROUP BY ter_macrozona ";
    }
    else {
        consulta += "SELECT ter_nombre nombre, COUNT(*) cuenta, CAST(AVG(apo_promedioibc) AS int) promedio, CAST(AVG(apo_empleados) AS int) empleados FROM aportantes apo INNER JOIN sectores sec ";
        consulta2 += " GROUP BY ter_nombre  ";
    }
    consulta +="ON apo.sectores_idsectores=sec.idsectores INNER JOIN clasificaaportantes clasapor ";
    consulta +="ON apo.clasificaaportantes_idclasificaaportantes=clasapor.idclasificaaportantes ";
    consulta +=" INNER JOIN estructuranomina enom ON apo.estructuranomina_idestructuranomina=enom.idestructuranomina ";
    consulta +=" INNER JOIN tipoadscrita tipoads ON apo.tipoadscrita_idtipoadscrita=tipoads.idtipoadscrita ";
    consulta +=" INNER JOIN ciudades ciu ON apo.ciudades_idciudades=ciu.idciudades ";
    consulta +=" INNER JOIN departamentos dep ON ciu.departamentos_iddepartamentos=dep.iddepartamentos ";
    consulta +=" INNER JOIN territorial terr ON dep.territorial_idterritorial=terr.idterritorial ";
    consulta +=" INNER JOIN paises pa ON terr.paises_idpaises=pa.idpaises ";
    if(idsec!="0"){ consulta +=" AND sec.idsectores IN ("+idsec+")"; }
    if(idesn!="0"){ consulta +=" AND enom.idestructuranomina IN ("+idesn+")"; }
    if(idcla!="0"){ consulta +=" AND idclasificaaportantes IN ("+idcla+")"; }
    if(idmac!="0"){ consulta +=" AND terr.ter_macrozona='"+idmac+"'"; }
    if(idter!="0"){ consulta +=" AND terr.idterritorial="+idter; }
    if(iddep!="0"){ consulta +=" AND dep.iddepartamentos="+iddep; }
    if(idciu!="0"){ consulta +=" AND ciu.idciudades="+idciu; }
    if(idora!="0"){ consulta +=" AND idtipoadscrita IN ("+idora+")";  }
    consulta += consulta2;
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);
  }
  
  reportescontrollers.geticatbyfiltro4 = async (req, res) => {
    const idsec = req.params.idsec;
    const idesn = req.params.idesn;
    const idcla = req.params.idcla;
    var idmac = parseInt(req.params.idmac);
    const idter = parseInt(req.params.idter);
    const iddep = parseInt(req.params.iddep);
    const idciu = parseInt(req.params.idciu);
    const repor = parseInt(req.params.repor);
    const idora = req.params.idora;

    if(idmac=="1"){ idmac="Macrozona 1"; }
    else if(idmac=="2"){ idmac="Macrozona 2"; }
    else if(idmac=="3"){ idmac="Macrozona 3"; }
    else { idmac="0"; }

    var consulta2="";
    if(idsec!="0"){ consulta2 +=" AND idsectores IN ("+idsec+")"; }
    if(idesn!="0"){ consulta2 +=" AND idestructuranomina IN ("+idesn+")"; }
    if(idcla!="0"){ consulta2 +=" AND idclasificaaportantes IN ("+idcla+")"; }
    if(idter!="0"){ consulta2 +=" AND idterritorial="+idter; }
    if(iddep!="0"){ consulta2 +=" AND iddepartamentos="+iddep; }
    if(idciu!="0"){ consulta2 +=" AND idaportantes="+idciu; }
    if(idmac!="0"){ consulta2 +=" AND ter_macrozona='"+idmac+"'"; }
    if(idora!="0"){ consulta2 +=" AND idtipoadscrita IN ("+idora+")";  }

    var consulta3="INNER JOIN aportantes b ON aportantes_idaportantes=idaportantes ";
    consulta3 +=" INNER JOIN sectores ON sectores_idsectores=idsectores  ";
    consulta3 +="INNER JOIN clasificaaportantes ON clasificaaportantes_idclasificaaportantes=idclasificaaportantes ";
    consulta3 +=" INNER JOIN estructuranomina ON estructuranomina_idestructuranomina=idestructuranomina ";
    consulta3 +=" INNER JOIN tipoadscrita ON tipoadscrita_idtipoadscrita=idtipoadscrita ";
    consulta3 +=" INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta3 +=" INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta3 +=" INNER JOIN territorial ON territorial_idterritorial=idterritorial ";
    var consulta=""; 
    if(repor=="6"){ 
        consulta += "SELECT iddocumentosaportantes id, a.apo_nombre nombre, a.apo_ruta ruta, a.apo_fecha fecha, tid_nombre tipo, b.apo_nombre aportante, apo_identificacion, apo_sufijo FROM documentosaportantes a ";
        consulta += consulta3;
        consulta += "INNER JOIN tiposdocumentos ON idtiposdocumentos=tiposdocumentos_idtiposdocumentos  ";
        consulta += "AND tid_clasifica='Documentos de trabajo' ";
        consulta += consulta2;
    }
    else if(repor=="7"){ 
        consulta += "SELECT iddocumentosaportantes id, a.apo_nombre nombre, a.apo_ruta ruta, a.apo_fecha fecha, tid_nombre tipo, b.apo_nombre aportante, apo_identificacion, apo_sufijo FROM documentosaportantes a ";
        consulta += consulta3;
        consulta += "INNER JOIN tiposdocumentos ON idtiposdocumentos=tiposdocumentos_idtiposdocumentos  ";
        consulta += "AND tid_clasifica='Documentos de identificación' ";
        consulta += consulta2;
    }
    else if(repor=="8"){ 
        consulta +="SELECT idresponsables id, res_nombre nombre, res_cargo ruta, res_fecha fecha, res_nombre tipo, b.apo_nombre aportante, apo_identificacion, apo_sufijo FROM responsables ";
        consulta += consulta3;
        consulta += consulta2;
    }
    else {
        consulta += "SELECT iddocumentosaportantes id, a.apo_nombre nombre, a.apo_ruta ruta, a.apo_fecha fecha, tid_nombre tipo, b.apo_nombre aportante, apo_identificacion, apo_sufijo FROM documentosaportantes a ";
        consulta += consulta3;
        consulta += "INNER JOIN tiposdocumentos ON idtiposdocumentos=tiposdocumentos_idtiposdocumentos  ";
        consulta += "AND tid_clasifica='Documentos de trabajo' ";
        consulta += consulta2;
    }
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);
  }

  reportescontrollers.geticatbyfiltro5 = async (req, res) => {
    const idapo = parseInt(req.params.idapo);

    var consulta2="";
    consulta2 +=" AND idaportantes="+idapo; 

    var consulta3="INNER JOIN aportantes b ON aportantes_idaportantes=idaportantes ";
    consulta3 +=" INNER JOIN sectores ON sectores_idsectores=idsectores  ";
    consulta3 +="INNER JOIN clasificaaportantes ON clasificaaportantes_idclasificaaportantes=idclasificaaportantes ";
    consulta3 +=" INNER JOIN estructuranomina ON estructuranomina_idestructuranomina=idestructuranomina ";
    consulta3 +=" INNER JOIN tipoadscrita ON tipoadscrita_idtipoadscrita=idtipoadscrita ";
    consulta3 +=" INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta3 +=" INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta3 +=" INNER JOIN territorial ON territorial_idterritorial=idterritorial ";
    var consulta=""; 
    consulta +="SELECT idresponsables id, res_nombre nombre, res_cargo ruta, res_fechacrea fecha, res_nombre tipo, b.apo_nombre aportante, apo_identificacion, apo_sufijo, res_email FROM responsables ";
    consulta += consulta3;
    consulta += consulta2;
    consulta += " ORDER BY 4 DESC";
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);
  }

  reportescontrollers.geticatbyfiltro6 = async (req, res) => {
    const idapo = parseInt(req.params.idapo);
    var consulta2="";
    consulta2 +=" AND idaportantes="+idapo; 

    var consulta3=" ";
    consulta3 +=" INNER JOIN sectores ON sectores_idsectores=idsectores  ";
    consulta3 +="INNER JOIN clasificaaportantes ON clasificaaportantes_idclasificaaportantes=idclasificaaportantes ";
    consulta3 +=" INNER JOIN estructuranomina ON b.estructuranomina_idestructuranomina=idestructuranomina ";
    consulta3 +=" INNER JOIN tipoadscrita ON tipoadscrita_idtipoadscrita=idtipoadscrita ";
    consulta3 +=" INNER JOIN ciudades ON ciudades_idciudades=idciudades ";
    consulta3 +=" INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos ";
    consulta3 +=" INNER JOIN territorial ON territorial_idterritorial=idterritorial ";
    var consulta=""; 
    consulta +="SELECT idfactoresaportantes id, 'factores salariales' nombre, faa_documento ruta, faa_fechacrea fecha, ";
    consulta +="faa_factores tipo, b.apo_nombre aportante, apo_identificacion, apo_sufijo FROM factoresaportantes n ";
    consulta +="INNER JOIN aportantes b ON idaportantes=aportantes_idaportantes ";
    consulta += consulta3;
    consulta += consulta2;
    consulta += " ORDER BY 4 DESC";

    //res.json({consulta});
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);
  }

  reportescontrollers.geticatbyfiltro7 = async (req, res) => {
    const idapo = parseInt(req.params.idapo);
    const tipo = parseInt(req.params.tipo);
    var consulta2="";
    consulta2 +=" AND idaportantes="+idapo;
    if(tipo==1){
        consulta2+=" AND tra_tipo IN ('De obligada a no obligada', 'De no obligada a obligada', 'De en estudio de obligatoriedad a obligada', 'De en estudio de obligatoriedad a no obligada')";
    } 
    else {
        consulta2+=" AND tra_tipo IN ('De NIT principal a sub unidad ejecutora del gasto')";
    }
    var consulta=""; 
    consulta +="SELECT idtransicionesaportantes id, 'Transiciones' nombre, tra_ruta ruta, tra_fecha fecha, ";
    consulta +="tra_tipo tipo, b.apo_nombre aportante, apo_identificacion, apo_sufijo FROM transicionesaportantes n ";
    consulta +="INNER JOIN aportantes b ON idaportantes=aportantes_idaportantes ";
    consulta += consulta2;
    consulta += " ORDER BY 4 DESC";
    //res.json({consulta});
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows);
  }

  reportescontrollers.getmapa = async (req, res) => {
    var consulta = "SELECT idaportantes, apo_nombre, ciu_nombre, dep_nombre,";
    consulta +=" apo_lat, apo_lon FROM aportantes";
    consulta +=" INNER JOIN ciudades ON ciudades_idciudades=idciudades";
    consulta +=" INNER JOIN departamentos ON departamentos_iddepartamentos=iddepartamentos";
    consulta +=" AND apo_lat !='' ";
    const respuesta = await pool.query(consulta);
    res.json(respuesta.rows)
  
  }
  
module.exports = reportescontrollers;