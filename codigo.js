var mascotas;

$(document).ready(function () {
    // Solicitud inicial al webservice
    cargarListaCompletaMascotas();


    // Abre el modal al hacer clic en el botón "Agregar Mascota"
    $("#btnAgregarMascota").click(function () {
        $("#modalAgregarMascota").modal("show");
    });

    // Maneja el clic en el botón "Guardar"
    $("#btnGuardarMascota").click(function () {
        var nombreMascota = $("#nombreMascota").val();
        var tipoMascota = $("#tipoMascota").val();
        var adoptado = "";
        var nombreDueno = "";
        if (nombreMascota.trim() === "") {
            alert("El nombre de la mascota es obligatorio.");
        } else if (!isNaN(nombreMascota)) {
            alert("El nombre de la mascota no puede ser un número.");
        }else {
        $.ajax({
            url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
            data: {
                _nombreMetodo_: "agregarMascota",
                nombre: nombreMascota,
                TIPO_MASCOTA: tipoMascota
            },
            method: "POST",
            headers: {
                "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
                "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3"
            },
            success: function (resultado) {
                // RECARGA EL LISTADO

                cargarListaCompletaMascotas();
                
                // Cierra el modal
                $("#modalAgregarMascota").modal("hide");
            },
            error: function (error) {
                console.error("Error al agregar la mascota: " + error.statusText);
            }
        });
    }

    });

    // Maneja el clic en el botón "Borrar" en la tabla
    $("table").on("click", ".btnBorrar", function () {
        // Guarda una referencia al botón
        var botonBorrar = $(this);
            var codigoMascota = botonBorrar.closest("tr").find("td:first").text();
    
        $.ajax({
            url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
            data: {
                _nombreMetodo_: "borrarMascota",
                COD_MASCOTA: codigoMascota
            },
            method: "POST",
            headers: {
                "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
                "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3"
            },
            success: function (resultado) {    
                // Elimina la fila de la tabla utilizando la referencia guardada
                botonBorrar.closest("tr").remove();
            },
            error: function (error) {
                console.error("Error al borrar la mascota: " + error.statusText);
            }
        });
    });

    var mascotaId;
    $("table").on("click", ".btnAsignarAdopcion", function () {
        var botonAsignar = $(this);
        $("#modalAsignarAdopcion").modal("show");
         mascotaId = botonAsignar.closest("tr").find("td:first").text();
    });
    
    $("#btnAsignarAdopcion").click(function () {
        var nombreDueno = $("#nombreDueno").val();
        if (nombreDueno.trim() === "") {
            alert("El nombre del dueño es obligatorio.");
        } else if (!isNaN(nombreDueno)) {
            alert("El nombre del dueño no puede ser un número.");
        }else {

        
   
        
        $.ajax({
            url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
            data: {
                _nombreMetodo_: "asignarAdopcion",
                COD_MASCOTA: mascotaId,
                DUENO: nombreDueno
            },
            method: "POST",
            headers: {
                "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
                "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3"
            },
            success: function (resultado) {
                //Actualiza la tabla
    
                cargarListaCompletaMascotas()

                
                // Cierra el modal
                $("#modalAsignarAdopcion").modal("hide");
            },
            error: function (error) {
                console.error("Error al agregar la mascota: " + error.statusText);
            }
        });
    }
    });

    $("table").on("click", ".btnQuitarAdopcion", function () {
        // Guarda una referencia al botón
        var botonQuitarAdopcion = $(this);

        var codigoMascota = botonQuitarAdopcion.closest("tr").find("td:first").text();
        $.ajax({
            url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
            data: {
                _nombreMetodo_: "quitarAdopcion",
                COD_MASCOTA: codigoMascota
            },
            method: "POST",
            headers: {
                "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
                "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3"
            },
            success: function (resultado) {
                cargarListaCompletaMascotas();
            },
            error: function (error) {
                console.error("Error al borrar la mascota: " + error.statusText);
            }
        });
    });
});





function eliminarMascotaPorCodigo(codigoAEliminar, arrayDeMascotas) {
    const indiceAEliminar = arrayDeMascotas.findIndex(mascota => mascota.NOMBRE === codigoAEliminar);
  
    if (indiceAEliminar !== -1) {
      arrayDeMascotas.splice(indiceAEliminar, 1);
      console.log(`Mascota con COD_MASCOTA ${codigoAEliminar} eliminada.`);
    } else {
      console.log(`No se encontró una mascota con COD_MASCOTA ${codigoAEliminar}.`);
    }
  }

  function cargarListaCompletaMascotas() {
    $.ajax({
        url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
        data: {
            _nombreMetodo_: "listarMascotas",
            param1: "",
            param2: ""
        },
        method: "POST",
        headers: {
            "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z ",
            "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3"
        },
        success: function (resultados) {
            if (resultados && resultados.resultado && resultados.resultado.Table) {
                mascotas = resultados.resultado.Table;
                mascotas.sort(function (a, b) {
                    var nombreA = a.NOMBRE.toUpperCase();
                    var nombreB = b.NOMBRE.toUpperCase();
                    if (nombreA < nombreB) {
                        return -1;
                    }
                    if (nombreA > nombreB) {
                        return 1;
                    }
                    return 0;
                });

                // Limpia la tabla existente
                var tableBody = $("table tbody");
                tableBody.empty();

                //Crea filas en la tabla
                mascotas.forEach(function (mascota) {
                    var row = $("<tr>");
                    row.append($("<td>").text(mascota.COD_MASCOTA));
                    row.append($("<td>").text(mascota.NOMBRE));
                    row.append($("<td>").text(mascota.TIPO_MASCOTA));

                    if (mascota.ADOPTADO == "1") {
                        row.append($("<td>").text("Adoptado"));
                    } else if (mascota.ADOPTADO == "0") {
                        row.append($("<td>").text("En espera"));
                    } else {
                        row.append($("<td>").text("En espera"));
                    }
                    
                    row.append($("<td>").text(mascota.DUENO));
                    
                    // Columna de Acciones
                    var acciones = $("<td>");
                    acciones.append($("<button>").text("Borrar").addClass("btn btn-danger btnBorrar"));
                    if (mascota.ADOPTADO == "1") {
                        acciones.append($("<button>").text("Quitar adopción").addClass("btn btn-primary btnQuitarAdopcion"));
                    } else if (mascota.ADOPTADO == "0") {
                        acciones.append($("<button>").text("Asignar Adopción").addClass("btn btn-primary btnAsignarAdopcion"));
                    } else {
                        acciones.append($("<button>").text("Asignar Adopción").addClass("btn btn-primary btnAsignarAdopcion"));
                    }
                    row.append(acciones);

                    tableBody.append(row);
                });
            } else {
                console.log("No se encontraron mascotas.");
            }
        },
        error: function (error) {
            console.error("Error al cargar las mascotas: " + error.statusText);
        }
    });
}
