/**
 *   Ejercicios de AJAX.
 *   @author Miguel Jaque <mjaque@migueljaque.com>
 *   @license GPL-3.0-or-later
 */

'use strict'

/**
Realiza una llamada asíncrona para cargar un fichero de texto.
Utiliza el método fetch y muestra el contenido del fichero en un div.
@param {String} fichero URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function cargarFicheroTextoFetch(fichero, divId, callback) {

    fetch(fichero)
        .then((respuesta) => respuesta.text())
        .then((texto) => {
            div1.innerHTML = texto
            if (callback) {
                callback()
            }
        })

}

/**
Realiza una llamada asíncrona por método GET para cargar un fichero de texto.
Utiliza el objeto XMLHttpRequest y su evento onload para mostrar el contenido del fichero en un div.
@param {String} fichero URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function cargarFicheroTextoXMLHttpRequest1(fichero, divId, callback) {
    let xml = new XMLHttpRequest()
    xml.open('GET', fichero)
    xml.send()
    xml.onload = () => {
        div2.innerHTML = xml.responseText
        if (callback) {
            callback()
        }
    }

}

/**
Realiza una llamada asíncrona por método GET para cargar un fichero de texto.
Utiliza el objeto XMLHttpRequest y su evento onreadystatechange para mostrar el contenido del fichero en un div.
La función comprueba el estado de la respuesta recibida del servidor.
@param {String} fichero URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function cargarFicheroTextoXMLHttpRequest2(fichero, divId, callback) {
    let xhttp = new XMLHttpRequest()
    xhttp.open('GET', fichero)
    xhttp.send()
    xhttp.onreadystatechange = () => {
        //console.log(xhttp.readyState); //interesante hacer esto para ver cambios de estado tras usar send()
        if (xhttp.readyState == 4) { //estado de solicitud completo
            if (xhttp.status == 200 && callback) { //Estado solicitud exitoso
                div3.innerHTML = xhttp.responseText
                callback()
            }

        }

    }
}

/**
Realiza una petición asíncrona por método GET y le pasa dos parámetros.
Utiliza la función fetch para realizar la llamada y muestra la respuesta en un div.
La respuesta esperada es de tipo texto.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombre1 Nombre del primer parámetro.
@param {String} valor1 Valor del primer parámetro.
@param {String} nombre2 Nombre del segundo parámetro.
@param {String} valor2 Valor del segundo parámetro.
@param {String} divId Identificador del div donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function enviarParametrosGET(url, nombre1, valor1, nombre2, valor2, divId, callback) {
    fetch(`${url}?${nombre1}=${valor1}&${nombre2}=${valor2}`)
        .then(respuesta => respuesta.text())
        .catch(error => console.log(error))
        .then(texto => {
            if (callback) {
                callback()
                div4.textContent = texto
            }
        })
        .catch(() => {
            console.log('No se pudo establecer la conexion');
        })
}

/**
Realiza una petición asíncrona por método POST y le pasa dos parámetros.
Utiliza la función fetch para realizar la llamada y muestra la respuesta en un div.
La respuesta esperada es de tipo texto.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombre1 Nombre del primer parámetro.
@param {String} valor1 Valor del primer parámetro.
@param {String} nombre2 Nombre del segundo parámetro.
@param {String} valor2 Valor del segundo parámetro.
@param {String} divId Identificador del div donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function enviarParametrosPOST(url, nombre1, valor1, nombre2, valor2, divId, callback) {
    let cuerpo = {
        nombre1: nombre1,
        nombre2: nombre2
    }

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: cuerpo
    })

        .then(respuesta => respuesta.text())
        .catch(error => console.log(error))
        .then(texto => {
            if (callback) {
                callback()
                div5.innerHTML = texto
            }
        })
        .catch(console.log('catch ya'))
}

/**
Realiza una petición asíncrona por método POST y le pasa un parámetro.
Utiliza la función fetch para realizar la llamada y muestra la respuesta en un div.
La respuesta esperada es de tipo JSON.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombreParam Nombre del primer parámetro.
@param {String} valorParam Valor del primer parámetro.
@param {String} divId Identificador del div donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function recibirJSON(url, nombreParam, valorParam, divId, callback) {
    const opciones = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "nombreParam": valorParam })
    }

    fetch(url, opciones)
        .then((respuesta) => respuesta.json())
        .catch(() => {
            console.log('No enviada')
            return false
        })
        .then((texto) => {
            if (callback) {
                callback()
                div6.innerHTML = texto.responseText()
            }

        }

        )
        .catch(
            () => console.log('No se pudo encontrar la respuesta')
        )
}

/**
Realiza una petición asíncrona por método POST y le pasa un parámetro.
Utiliza la función fetch para realizar la llamada y muestra la respuesta en un div.
La respuesta esperada es de tipo XML y se procesa con DOMParser.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombreParam Nombre del primer parámetro.
@param {String} valorParam Valor del primer parámetro.
@param {String} divId Identificador del div donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function recibirXML(url, nombreParam, valorParam, divId, callback) {

}

/**
Realiza una llamada asíncrona por el método GET a una URL y muestra el código del error recibido en el div indicado.
@param {String} fichero URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function controlarErrores(fichero, divId, callback) {
    let xhttp = new XMLHttpRequest()
    xhttp.open('GET', fichero)
    xhttp.send()
    xhttp.onreadystatechange = () => {
        if (xhttp.status == 404 || 503 || 418 && callback) {
            div8.innerHTML = xhttp.status
            callback()
        }
    }
    div8.innerHTML = xhttp.responseText
}

/**
Realiza una llamada asíncrona por el método GET a una URL y establece el tiempo de timeout en 5 segundos. Si transcurrido ese tiempo no se ha recibido la rrespuesta del servidor, muestra el texto "timeout" en el div indicado.
@param {String} url URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga o detectar el timeout.
**/
function controlarTimeout(url, divId, callback) {
    let xhtml = new XMLHttpRequest()

    xhtml.timeout = 5000
    xhtml.open('GET', url)
    xhtml.send()
    xhtml.ontimeout = () => {
        div9.innerHTML = 'timeout'
        if (callback) {
            callback()
        }
    }

    /* $.ajax({
        url:url,
        error:()=>{

        },
        exito:()=>{

        },
        timeout:5000
    }); */

}

/**
Realiza una llamada asíncrona para cargar un texto.
Utiliza el método fetch y muestra el texto de la respuesta en un div.
@param {String} url URL del la petición.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function peticionCORS(url, divId, callback) {

    fetch(url, {
        mode: 'cors'
    })
        .then(respuesta => respuesta.text())
        .then(texto => {
            div10.innerHTML = texto
            if (callback) {
                callback()
            }
        })

}

/**
Realiza una petición asíncrona por método POST y le pasa como parámetro un fichero.
Utiliza la función fetch para realizar la llamada y muestra la respuesta como fuente (src) de una imagen recibida con codificación Base64.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombre Nombre del parámetro.
@param {String} iFileId Identificador del input donde se cargará el fichero que se enviará al servidor.
@param {String} imgId Identificador del elemento imagen donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function enviarFichero(url, nombre, iFileId, imgId, callback) {

    fetch(url, opciones)
        .then()
        .catch(console.log('No enviada'))
        .then((respuesta) => {

            if (callback) {
                callback()
            }
        }
        )
        .catch(console.log('Sin respuesta'))
}
