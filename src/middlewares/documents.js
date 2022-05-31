const multer =require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const documents = {};

const storage = multer.diskStorage({
    destination: path.join('uploads'),
    filename:(req,file,cb) =>{
        cb(null,uuidv4() +"_"+ file.originalname);
    }
})

documents.storagesingle = multer({
    storage: storage,
    dest: ('uploads'),
    limits:(fileSize=1000000)
  }).fields([{
    name: 'archivo', maxCount: 1     //poner los nombres de cada archivo que se quiere recibir
  },
  {
    name: 'docs_aportantes', maxCount: 1     //poner los nombres de cada archivo que se quiere recibir
  },
  {
    name: 'faa_documento', maxCount: 1     //poner los nombres de cada archivo que se quiere recibir
  },
  {
    name: 'res_documento', maxCount: 1     //poner los nombres de cada archivo que se quiere recibir
  },
  {
    name: 'tra_ruta', maxCount: 1     //poner los nombres de cada archivo que se quiere recibir
  }
  ]);

  
module.exports = documents;