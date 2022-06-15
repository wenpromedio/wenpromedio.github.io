'use strict'

//* Botones
const add = document.getElementById("add");
const close = document.getElementById("close");
const del = document.getElementById("eliminarTodo");

//* Inputs
const nombre = document.getElementById("nombre");
const semestre = document.getElementById("semestre");
const credito = document.getElementById("credito");
const nota = document.getElementById("nota");

//* Salida
const clases = document.getElementById("clases");
const promedio = document.getElementById("promedio");

//* Variables
let datosClases = [];
if(localStorage.getItem("datos")){
    datosClases = JSON.parse(localStorage.getItem("datos"));
}
let nCO = 0, cO = 0;
if(localStorage.getItem("cuentas")){
    let cuentas = JSON.parse(localStorage.getItem("cuentas"));
    nCO = parseInt(cuentas.nCO), cO = parseInt(cuentas.cO);
}


const mostrar = () => {
    let htmlOutput = "";
    let number = 1;
    for(let i in datosClases){
        htmlOutput += `
        <tr>
            <th scope="row">${number}</th>
            <td>${datosClases[i].nombre}</td>
            <td>${datosClases[i].semestre}</td>
            <td>${datosClases[i].credito}</td>
            <td>${datosClases[i].nota}</td>
            <td><button onclick="eliminar(${i})" class="btn btn-danger br">X</button></td>
        </tr>
    `
    number++;
    }
    clases.innerHTML = htmlOutput;
    if(nCO != 0 && cO != 0){
        promedio.innerHTML = (nCO/cO).toFixed(2);
    }else{
        promedio.innerHTML = "0";
    }
    
}

const limpiarCampos = () => {
    nombre.value = "";
    semestre.value = 0;
    credito.value = 0;
    nota.value = 0;
}

const guardar = () => {
    if(nombre.value == "" || nombre.value.length <= 10){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nombre Incorrecto!'
        })
    }else if(semestre.value == 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Semestre Incorrecto!'
        })
    }else if(credito.value <= 0 || credito.value > 5){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Creditos Incorrecto!'
        })
    }else if(nota.value <= 0 || nota.value > 100){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nota Incorrecta!'
        })
    }else{
        datosClases.push(
            {   
                "nombre": nombre.value,
                "semestre": semestre.value,
                "credito": credito.value,
                "nota": nota.value
            }
        )
        nCO += (parseInt(credito.value * nota.value));
        cO += parseInt(credito.value);
        limpiarCampos();
        localStorage.setItem("datos",JSON.stringify(datosClases));
        localStorage.setItem("cuentas",JSON.stringify({"nCO":nCO,"cO": cO}
        ))
        $("#exampleModalCenter").modal("hide");
    }
}

const eliminar = (id) => {
    nCO -= parseInt(datosClases[id].nota * datosClases[id].credito);
    cO -= datosClases[id].credito;
    datosClases.shift(id);
    mostrar();
}

add.addEventListener('click',() => {
    guardar();
    mostrar();
})

del.addEventListener('click', () => {
    datosClases = [];
    nCO = 0;
    cO = 0;
    mostrar();
    localStorage.clear();
})

mostrar();