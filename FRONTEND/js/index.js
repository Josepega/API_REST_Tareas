const botonGuardar = document.querySelector("#GuardarTarea");
const mensajes = document.querySelector("#mensajes");

//variable de almacenaje de datos
let almacen = [];

//guardar los datos en la bbdd
botonGuardar.addEventListener("click", () => {
  // campos del formulario
  const campoDescripcion = document.querySelector("#descripcion");
  const campoFecha_inicio = document.querySelector("#fecha_inicio");
  const campoFecha_final = document.querySelector("#fecha_final");
  const campoEstadoTarea = document.querySelector("#estadoTarea");

  // variable del total de caracteres que aceptaremos
  const caracteresMax = 20;

  //este if comprueba que los datos que llegan no estén vacíos
  if (
    campoDescripcion.value.length === 0 ||
    campoFecha_inicio.value.length === 0 ||
    campoFecha_final.value.length === 0 ||
    campoEstadoTarea.value.length === 0
  ) {
    mensajes.innerHTML =
      "Campos vacios ... <i class='fa-solid fa-ban fa-beat-fade'></i>";
    return;
  }

  if (campoFecha_inicio.value > campoFecha_final.value) {
    mensajes.innerHTML =
      "La fecha de inicio no puede ser <br> posterior a la fecha final ...  <i class='fa-solid fa-triangle-exclamation fa-beat'></i>";
    return;
  }

  if (campoDescripcion.value.length >= caracteresMax) {
    mensajes.innerHTML =
      "La descripción es demasiado larga ... <i class='fa-solid fa-ban fa-beat-fade'></i>";
    return;
  }
  const url = "http://localhost:3500/api/v1/crearTarea";
  fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Descripcion: campoDescripcion.value,
      FechaInicio: campoFecha_inicio.value,
      Fechafinal: campoFecha_final.value,
      Estado: campoEstadoTarea.value,
    }),
  })
    .then((res) => res.json())
    .then((mensaje) => {
      mensajes.innerHTML =
        "Tarea Insertada correctamente ... <i class='fa-regular fa-pen-to-square fa-spin'></i>";
      setTimeout(() => {
        // refresca página<i class="fc"></i>
        location.reload();
      }, 3000);
    })
    .catch((error) => (contenedorDatos.innerHTML = error));
});

// cRud (leer)
fetch("http://localhost:3500/api/v1/leer")
  .then((res) => res.json())
  .then((datos) => {
    const contenedorDatos = document.getElementById("contenedorDatos");
    const arrayDatosConsulta = datos.resultado;
    almacen = arrayDatosConsulta;
    console.log("al declarar " + [almacen]);
    if (arrayDatosConsulta.length === 0) {
      contenedorDatos.innerHTML =
        "<p class='tituloNoTareas'> No hay ninguna tarea,<br><br> <b>¡espabila!</b> ... <i class='fa-regular fa-face-frown fa-bounce'></i> ... que te pilla el toro !</p>";
    } else {
      for (let i = 0; i < arrayDatosConsulta.length; i++) {
        const tarea = arrayDatosConsulta[i];
        // Obtener la descripción y dividirla en fragmentos de 15 caracteres
        const descripcion = tarea.descripcion;
        const fragmentos = [];
        for (let j = 0; j < descripcion.length; j += 15) {
          fragmentos.push(descripcion.substring(j, j + 15));
        }
        // Unir los fragmentos con saltos de línea o <br>
        const descripcionConSaltos = fragmentos.join("<br>");

        contenedorDatos.innerHTML +=
          "<div class='indiv'><p class='titulo'>TAREA: " +
          tarea.id +
          "</p><p class='detalle'>" +
          descripcionConSaltos +
          "</p><div class='row'><div class='col-25'>INICIO:</div><div class='col-75'>" +
          tarea.diaInicio +
          "-" +
          tarea.mesInicio +
          "-" +
          tarea.anoInicio +
          "</div></div><div class='row'><div class='col-25'>FIN:</div> <div class='col-75'>" +
          tarea.diafin +
          "-" +
          tarea.mesfin +
          "-" +
          tarea.anofin +
          "</div></div><div class='row'><div class='col-25'>ESTADO: </div><div class='col-75'> " +
          tarea.Estado_tarea +
          "</div></div><div id='iconosPosit'><i class='fa-regular fa-pen-to-square editarBTN' id='" +
          tarea.id +
          "'></i> <i class='fa-regular fa-trash-can' id='" +
          tarea.id +
          "'></i></div></div>";
      }

      borrarFuncion();
      editarDatoFuncion();
    }
  })
  .catch((error) => (contenedorDatos.innerHTML = error));

// crUd (update)//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function editarDatoFuncion() {
  console.log(almacen);
  const botonesEditar = document.querySelectorAll(".editarBTN");
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].addEventListener("click", (lapicito) => {
      editarMODAL.style.display = "Block";
      const idED = lapicito.target.id.toString();
      console.log(idED);

      // Encuentra el elemento en el array `almacen` con el ID correspondiente
      function encontrarTareaPorId(id) {
        for (let i = 0; i < almacen.length; i++) {
          if (almacen[i].id.toString() === id) {
            return almacen[i];
          }
        }
        return null; // Retorna null si no se encuentra la tarea con el ID proporcionado
      }

      const tareaEditada = encontrarTareaPorId(idED);

      // Verifica si la tarea se encuentra en el array
      console.log("----Verifica si la tarea se encuentra en el array");
      console.log("Descripción editada:", tareaEditada.descripcion);
      console.log(
        "Fecha de inicio editada:",
        tareaEditada.diaInicio,
        tareaEditada.mesInicio,
        tareaEditada.anoInicio
      );
      console.log(
        "Fecha final editada:",
        tareaEditada.diafin,
        tareaEditada.mesfin,
        tareaEditada.anofin
      );
      console.log("Estado editado:", tareaEditada.Estado_tarea);

      // Si se encuentra el elemento, puedes acceder a sus propiedades
        const campoDescripcionED = document.querySelector("#descripcionED");
        const campoFecha_inicioED = document.querySelector("#fecha_inicioED");
        const campoFecha_finalED = document.querySelector("#fecha_finalED");
        const campoEstadoTareaED = document.querySelector("#estadoTareaED");
        // Verifica los valores actuales de los campos
        console.log("----Verifica los valores actuales de los campos");
        console.log(
          "Campo de de descripción en modal de edición antes de asignación:",
          campoDescripcionED.value
        );
        console.log(
          "Campo de fecha de inicio en modal de edición antes de asignación:",
          campoFecha_inicioED.value
        );
        console.log(
          "Campo de fecha final en modal de edición antes de asignación:",
          campoFecha_finalED.value
        );
        console.log(
          "Campo de estado de inicio en modal de edición antes de asignación:",
          campoEstadoTareaED.value
        );

        // Llena los campos del formulario con los valores del elemento encontrado
        console.log(
          "----Llena los campos del formulario con los valores del elemento encontrado"
        );

        campoDescripcionED.value = tareaEditada.descripcion;

        // Crear objetos Date con las fechas de inicio y finalización, de manera que las formateamos para que las lea el explorador
        var fechaInicio = new Date(
          tareaEditada.anoInicio,
          tareaEditada.mesInicio - 1,
          tareaEditada.diaInicio + 1
        );
        var fechaFinalizacion = new Date(
          tareaEditada.anofin,
          tareaEditada.mesfin - 1,
          tareaEditada.diafin + 1
        );

        // Formatear las fechas en formato "yyyy-MM-dd"
        var fechaInicioFormateada = fechaInicio.toISOString().split("T")[0];
        var fechaFinalizacionFormateada = fechaFinalizacion.toISOString().split("T")[0];

        // Asignar las fechas formateadas a los campos de entrada de fecha
        campoFecha_inicioED.value = fechaInicioFormateada;
        campoFecha_finalED.value = fechaFinalizacionFormateada;

        campoEstadoTareaED.value = tareaEditada.Estado_tarea;

        // Verifica los valores actuales de los campos
        console.log("----Verifica los valores actuales de los campos");

        console.log(
          "Campo de de descripción en modal de edición después de asignación:",
          campoDescripcionED.value
        );
        console.log(
          "Campo de fecha de inicio en modal de edición después de asignación:",
          campoFecha_inicioED.value
        );
        console.log(
          "Campo de fecha final en modal de edición después de asignación:",
          campoFecha_finalED.value
        );
        console.log(
          "Campo de estado de inicio en modal de edición después de asignación:",
          campoEstadoTareaED.value
        );

        // Agrega un evento al botón de editar
        const caracteresMaxED = 20;
        const editarBoton = document.querySelector("#EditarTarea");
        editarBoton.addEventListener("click", () => {
          if (
            campoDescripcionED.value.length === 0 ||
            campoFecha_inicioED.value.length === 0 ||
            campoFecha_finalED.value.length === 0 ||
            campoEstadoTareaED.value.length === 0
          ) {
            mensajesEdicion.innerHTML =
              "Campos vacios ... <i class='fa-solid fa-triangle-exclamation fa-beat'></i>";
            return;
          }
          if (campoFecha_inicioED.value > campoFecha_finalED.value) {
            mensajesEdicion.innerHTML =
              "La fecha de inicio no puede ser <br> posterior a la fecha final ... <i class='fa-solid fa-ban fa-beat-fade'></i>";
            return;
          }
          if (campoDescripcionED.value.length >= caracteresMaxED) {
            mensajesEdicion.innerHTML =
              "La descripción es demasiado larga ... <i class='fa-solid fa-ban fa-beat-fade'></i>";
            return;
          }
          const url = "http://localhost:3500/api/v1/editar";
          fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              Descripcion: campoDescripcionED.value,
              FechaInicio: campoFecha_inicioED.value,
              Fechafinal: campoFecha_finalED.value,
              Estado: campoEstadoTareaED.value,
              id: idED,
            }),
          })
            .then((res) => res.json())
            .then((mensaje) => {
              mensajesEdicion.innerHTML =
                "Tarea editada ... <i class='fa-solid fa-wrench fa-spin'></i>";
              setTimeout(() => {
                location.reload(); // refresca página
              }, 3000);
              // Puedes realizar alguna acción adicional después de editar la tarea, como recargar la página
            })
            .catch((error) =>
              console.error("Error al editar la tarea:", error)
            );
        });

    });
  }
}

// FIN crUd (update)//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// cruD (borrar)
function borrarFuncion() {
  const papeleras = document.querySelectorAll(".fa-trash-can");
  for (let i = 0; i < papeleras.length; i++) {
    papeleras[i].addEventListener("click", (papelerita) => {

      swal({
        title: "Estás seguro de quieres eliminar esta TAREA?",
        text: "Luego de esta desición no hay vuelta atrás!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        
      })
      .then((willDelete) => {
        if (willDelete) {
          fetch("http://localhost:3500/api/v1/borrar", {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: papelerita.target.id,
          }),
        }),
          swal("Poof! Tarea eliminada para SIEMPRE!", {
            icon: "success",});
            setTimeout(() => {
              location.reload(); // refresca página
            }, 3000);
          
        } else {
          swal("TODO a SALVO!",{
          icon: "success"}
          );
          
        }
      });
      /* if (confirm("Estás seguro que quieres eliminar la tarea?")) {
        fetch("http://localhost:3500/api/v1/borrar", {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: papelerita.target.id,
          }),
        })
          .then((res) => res.json())
          .then((mensaje) => {
           swal("Tarea eliminada, buen trabajo");
            setTimeout(() => {
              location.reload(); // refresca página
            }, 1000);
          })
          .catch((error) => (mensajes.innerHTML = "Error en servidor!"));
      } */
    });
  }
}
