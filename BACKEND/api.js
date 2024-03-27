const express = require("express");
const cors = require("cors");
/*const swaggerUI= require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpec = require("./swagger");
*/

//CONFIGURACION
const port =  process.env.PORT || 3500; 
const api = express();

//MIDDLEWEAR
api.use(cors());
api.use(express.json());
//ruta para mostrar la documentacion de swagger
/*api.use('./api/v1/doc', 
swaggerUI.serve,
swaggerUI.setup(swaggerJSDoc(swaggerSpec)));*/


//***************** importar rutas ************************ */
// Importar las rutas
const routes = require('./routes.js');

// Usar las rutas
api.use('/api/v1', routes);


//ARRANCAR EL SERVIDOR
api.listen(port, () => {
    console.log("Servidor conectado en puerto 3500");
});
