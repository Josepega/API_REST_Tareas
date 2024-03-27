const express = require("express");

const router = express.Router();

const conexionMySQL = require('./conexionMySQL.js');

/****** INICIO Funciones para controlar y optimizar los mensajes ***** */




/****** FIN Funciones para controlar y optimizar los mensajes ***** */
router.get("/saludo", (req, res) => {
  res.json({
    "saludo": "Hola!"
  });
});

// CREAR, Crud
router.post("/crearTarea", (req, res) => {
  const Descripcion = req.body.Descripcion;
  const FechaInicio = req.body.FechaInicio;
  const Fechafinal = req.body.Fechafinal;
  const Estado = req.body.Estado;

  const sql = "insert into tareas values (default, ?, ?, ?, ? );";
  conexionMySQL.query(sql, [Descripcion, FechaInicio,  Fechafinal, Estado], err => {
    if (err) {
      res.json({
        "status": 500,
        "mensaje": "Error en la inserción del datos. Error:" + err
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "Dato insertado correctamente! <i class='fas fa-spinner fa-spin'></i>"
      });
    }
  });
});


// LEER, cRud
router.get("/leer", (req, res) => {
  const sql = "select id, descripcion, year(fecha_inicio) as anoInicio, month(fecha_inicio) as mesInicio, day(fecha_inicio) as diaInicio, year(fecha_fin) as anofin, month(fecha_fin) as mesfin, day(fecha_fin) as diafin, Estado_tarea   from tareas;";
  conexionMySQL.query(sql, (error, resultado) => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error en la inserción del dato. Error:" + error
      });
    } else {
      res.json({
        "status": 200,
        "resultado": resultado 
      });
    }
  });
});



//router.put("/actualizarTarea", (req, res) => {});
// EDITAR
router.put("/editar", (req, res) => {
  const Descripcion = req.body.Descripcion;
  const FechaInicio = req.body.FechaInicio;
  const Fechafinal = req.body.Fechafinal;
  const Estado = req.body.Estado;
  const id = req.body.id;
  // encriptamos el dato
  //const datoEncriptado = CryptoJS.AES.encrypt(tarea, 'miTextoSecreto').toString();
  const sql = "update tareas set descripcion = ?,fecha_inicio = ?, fecha_fin = ?, Estado_tarea = ? where id = ?";
  conexionMySQL.query(sql, [Descripcion, FechaInicio, Fechafinal, Estado, id], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en la edición del dato. Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "<span class='correcto'>Dato editado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
      });
    }
  });
});




// BORRAR
router.delete("/borrar", (req, res) => {
  const idTarea = req.body.id;
  const sql = "delete from tareas where id=?";
  conexionMySQL.query(sql, [idTarea], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en el borrado de la tarea. Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "<span class='correcto'>Tarea eliminada correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
      });
    }
  });
});


  
////*******Esta línea siempre al final para recoger todo lo ejecutado antes en el mismo archivo ********** */

module.exports = router;
