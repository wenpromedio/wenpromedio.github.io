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
const img = document.getElementById("img");

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
        let prom = (nCO/cO).toFixed(2);     
        if(prom <= 100 && prom > 90){
            img.innerHTML = "<img src='https://i.ytimg.com/vi/3EN7osSwfYk/hqdefault.jpg' height='250px'>";
        }else if(prom <= 90 && prom > 80){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/4/47/Mr_incre%C3%ADble_normal_2.0.png/revision/latest/scale-to-width-down/1000?cb=20220607004914&path-prefix=es' height='250px'>";
        }else if(prom <= 80 && prom > 70){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/b/b1/Fase_2.png/revision/latest?cb=20220211170601&path-prefix=es' height='250px'>";
        }else if(prom <= 70 && prom > 60){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/6/6e/AAAAAAAAAAAAAAAA_2.0.png/revision/latest/scale-to-width-down/1000?cb=20220607004951&path-prefix=es' height='250px'>";
        }else if(prom <= 60 && prom > 50){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/e/ed/Mr_increible_selene_delgado_2.0.png/revision/latest/scale-to-width-down/1000?cb=20220607005029&path-prefix=es' height='250px'>";
        }else if(prom <= 50 && prom > 40){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/e/e2/Mr_increible_nivel_5_Remastered.png/revision/latest/scale-to-width-down/1000?cb=20220607005106&path-prefix=es' height='250px'>";
        }else if(prom <= 40 && prom > 30){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/5/5c/Mr_increible_deformado_2.0.png/revision/latest/scale-to-width-down/1000?cb=20220607005143&path-prefix=es' height='250px'>";
        }else if(prom <= 30 && prom > 20){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/d/de/Mr_incre%C3%ADble_a%C3%BAn_m%C3%A1s_saturado_2.0.png/revision/latest/scale-to-width-down/1000?cb=20220607005251&path-prefix=es' height='250px'>";
        }else if(prom <= 20 && prom > 10){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/e/e2/Mr_incre%C3%ADble_des4ngr4do_2.0.png/revision/latest/scale-to-width-down/1000?cb=20220607005332&path-prefix=es' height='250px'>";
        }else if(prom <= 10 && prom >= 0){
            img.innerHTML = "<img src='https://static.wikia.nocookie.net/memes-pedia/images/c/ce/Mr_incre%C3%ADble_calaber%C3%A9rico_2.0.png/revision/latest/scale-to-width-down/1000?cb=20220607005502&path-prefix=es' height='250px'>";
        }
        promedio.innerHTML = prom;
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
    if(nombre.value == "" || nombre.value.length <= 5){
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