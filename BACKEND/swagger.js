const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

//SWAGGER
const swaggerSpec = swaggerJSDoc({
    definition: {
        openai: "3.0.0",
        info: {
            title: "Crear API tareas",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3500"
            },
        ],
    },
    // Rutas donde se encuentran las definiciones de Swagger
    apis: [path.join(__dirname, "./routes.js")],
});

/**
 * @swagger
 * componentes:
 *  Esquemas:
 *     Tareas:
 *       type: object
 *       propiedades:
 *          Descripcion:
 *            tipo: string
 *             description: descripcion de la tarea
 *           Fecha inicio:
 *              tipo: date
 *              description: fecha que comenzara la tarea
 *           Fecha final:
 *              tipo: date
 *              description: fecha aproximada de finalización de la tarea
 *           Estado Tarea:
 *              tipo: string 
 *              description: indicar si esta pendiente o finalizada 
 *           required:
 *              - descripcion
 *              - Fecha inicio
 *              - Fecha final  
 *              ejemplo:
 *                  descripcion: Inicializar un proyecto de crear una tarea
 *                  Fecha inicio: 29/02/2024
 *                  Fecha final: 11/03/2024
 */

/**
 * @swagger
 * /api/v1/tareas:
 *   post:
 *   summary: Crear una nueva tarea
 *   tags: [Tareas]
 *   requestBody:
 *     required: true
 *   content:
 *      application/json:
 *   Esquemas.
 *      tipo: objeto
 *      $ref: '#componentes/Esquemas/Tareas
 *   respuestas:
 *       200:
 *          descripcion: Nueva tarea se ha creado con exito  y se ha agregado a la base de datos
 *       400:
 *          descripcion: Nueva tarea se ha creado con exito  y se ha agregado a la base de datos
 */

// Obtener todas las tareas
/**
 * @swagger
 * /api/v1/tareas:
 *   get:
 *   summary: Devuelve todas las tareas
 *   tags: [Tareas]
 *   respuestas:
 *       200:
 *          descripcion: Muestra todas las tareas que se han creado 
 *         content:
 *            applicatiob/json:
 *              Esquema:
 *                 tipo: array
 *                  items:
 *                      $ref: '#componentes/Esquemas/Tareas
 *       400:
 *          descripcion: Nueva tarea se ha creado con exito  y se ha agregado a la base de datos
 */

// Borra  las o una tareas
/**
 * @swagger
 * /api/v1/tareas/(id):
 *   delete:
 *   summary: Borra una tarea
 *   tags: [Tareas]
 *    parametros:
 *      - in: path
 *          tarea: id
 *          Esquema:
 *             tipo: string
 *          required: true
 *          descripcion: id de la tarea
 *   respuestas:
 *       200:
 *          descripcion: Tarea borrada con exito
 *         
 *       404:
 *          descripcion: No se ha encontrado la tarea
 */

// Actualiza las tareas

/**
 * @swagger
 * /api/v1/tareas/(id):
 *   put:
 *   summary: actualiza una tarea
 *   tags: [Tareas]
 *    parametros:
 *      - in: path
 *          tarea: id
 *          Esquema:
 *             tipo: string
 *          required: true
 *          descripcion: id de la tarea
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           Esquemas:
 *             tipo: objeto
 *             $ref: '#componentes/Esquemas/Tareas
 *   respuestas:
 *       200:
 *          descripcion: Se han actualizado las tareas
 *         
 *       400:
 *          descripcion: No se ha encontrado la tarea
 */


module.exports = swaggerSpec;