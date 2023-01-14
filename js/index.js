const palabras = [
  "cigarrillos" /* 0 - 1 */,
  "gato" /* 1 - 2 */,
  "internet" /* 2 - 3 */,
  "tablet" /* 3 - 4 */,
  "perro" /* 4 - 5 */,
  "estrella" /* 5 - 6*/,
  "Tom" /* 6 - 7*/,
];
let intervaloResponsive;
let palabraOculta = "";
let cantErrores = 0;
let cantAciertos = 0;
let daltonico = false;
let ahorcado = obtenerClass(".container-img img");
const btnJugar = obtenerId("jugar-btn");
const btnLetras = document.querySelectorAll(".container-letras button");
let palabraAdivinar = obtenerClass(".palabra_adivinar");

// Funciones auxiliares
let colorValid = (t, m) => {
  if (m === true) {
    if (daltonico === true) {
      t.style.color = "yellow";
    } else {
      t.style.color = "rgb(115, 255, 0)";
    }
  } else {
    if (daltonico === true) {
      t.style.borderColor = "yellow";
      t.style.color = "yellow";
    } else {
      t.style.borderColor = "rgb(115, 255, 0)";
      t.style.color = "rgb(115, 255, 0)";
    }
  }
};
let colorInvalid = (t, m) => {
  if (m === true) {
    if (daltonico === true) {
      t.style.color = "slateblue";
    } else {
      t.style.color = "rgb(255, 0, 43)";
    }
  } else {
    if (daltonico === true) {
      t.style.borderColor = "slateblue";
      t.style.color = "slateblue";
    } else {
      t.style.borderColor = "rgb(255, 0, 43)";
      t.style.color = "rgb(255, 0, 43)";
    }
  }
};

let resetColor = (t) => {
  if (t.disabled === true) {
    t.style.borderColor = "cornflowerblue";
    t.style.color = "cornflowerblue";
  }
  if (t.disabled === false) {
    t.style.borderColor = "white";
    t.style.color = "#ffd";
  }
};

disabled();

function obtenerId(id) {
  return document.getElementById(id);
}
function obtenerClass(clas) {
  return document.querySelector(clas);
}

// Eventos

// Aqui se esta añadiendo el evento del click en jugar
btnJugar.addEventListener("click", jugar);
// Recorremos nuestros botones de letras y ejecutamos la funcion " clickLetras"
for (let i = 0; i < btnLetras.length; i++) {
  btnLetras[i].addEventListener("click", clickLetras);
}

//* Aqui generamos la funcionalidad  y dinamismo del evento
function jugar(event) {
  intervaloResponsive = setInterval(ajustarMobile, 2500);
  // ajustarMobile();
  palabraUsada.innerHTML = " ";

  active();
  btnJugar.classList.remove("button-start-active");
  btnJugar.disabled = true;
  palabraAdivinar.innerHTML = "";
  let palabraAzar = Math.floor(Math.random() * palabras.length);
  palabraOculta = palabras[palabraAzar];
  console.log(palabraOculta);
  for (const recorrer of palabraOculta) {
    let span = document.createElement("span");
    palabraAdivinar.appendChild(span);
  }
}

// Función  ha ejecutar en nuestros botones
function clickLetras(e) {
  // Nos permite ver donde se esta ejecutando la tecla
  let tecla = e.target;
  tecla.disabled = true;
  tecla.classList.remove("letra-hover");
  // Asumimos que empieza perdiendo
  let resultado = false;

  // Seleccionamos los spans generados por jugar
  const spans = document.querySelectorAll(".palabra_adivinar span");

  // Creamos 2 variables y las pasamos a minusculas para comparar el contenido
  let contenido = tecla.innerHTML.toLowerCase();
  let letraComparar = palabraOculta.toLowerCase();

  // Empieza el recorrido de comparación
  for (let i = 0; i < letraComparar.length; i++) {
    if (contenido === letraComparar[i]) {
      resultado = true;
      spans[i].innerHTML = contenido;
      cantAciertos++;
      colorValid(tecla, false);
      // console.log(daltonico);
    }
  }

  if (resultado === false) {
    colorInvalid(tecla, false);
    cantErrores++;
    let source = `/assets/img/ahorcado${cantErrores}.svg`;
    ahorcado.src = source;
    if (cantErrores === 4) {
      perdiste();
    }
  }

  if (cantAciertos === palabraOculta.length) {
    ganaste();
  }
}

function perdiste() {
  let modal = obtenerClass(".modal");
  modal.classList.toggle("modal-screen", false);

  let imgCambio = `./assets/img/perdiste.gif`;
  let img = obtenerClass(".modal-img img");
  img.src = ` ${imgCambio}`;
  const text = obtenerClass(".text span");
  text.innerHTML = `Perdiste :(   La palabra era ${palabraOculta.toLowerCase()}`;
  reiniciar();
}

function ganaste() {
  let modal = obtenerClass(".modal");
  modal.classList.toggle("modal-screen", false);

  let imgCambio = `/assets/img/ganaste.gif`;
  let img = obtenerClass(".modal-img img");
  img.src = ` ${imgCambio}`;
  const text = obtenerClass(".text span");
  text.innerHTML = `Ganaste!!! eres todo un crack :)`;
  reiniciar();
}

// Función auxiliar que permite que que inicien la teclas de PC inactivas
function disabled() {
  for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].disabled = true;
    btnLetras[i].classList.remove("letra-hover");
    resetColor(btnLetras[i]);
  }
  // Para desbloquear el botón jugar
  btnJugar.disabled = false;
}

// Para activar las teclas
function active() {
  for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].disabled = false;
    btnLetras[i].classList.add("letra-hover");
    resetColor(btnLetras[i]);
  }
}

//!Función auxiliar clave para que se reseteen las propiedades de los botones
function reiniciar() {
  let reinicio = obtenerId("re-start");
  let modal = obtenerClass(".modal");

  reinicio.addEventListener("click", () => {
    modal.classList.toggle("modal-screen", true);
    cantAciertos = 0;
    cantErrores = 0;
    disabled();

    //* Que el ahorcado incie desde  la imagen cero
    ahorcado.src = "/assets/img/ahorcado0.svg";
    btnJugar.classList.add("button-start-active");
  });
  // Termino el evento

  let body = document.querySelector("body");
  let bodyWidth = window.getComputedStyle(body);
  let width = parseFloat(bodyWidth.getPropertyValue("width"));
  if (width < 744) {
    reiniciarMobile();
  }

  clearInterval(intervaloResponsive);
}

// FUNCIONES PARA LA VERSIÓN MOBILE

let envio = obtenerId("enviar-palabra");
let envioPalabra = obtenerId("enviar-contenido");
let palabraUsada = obtenerClass(".palabras-usadas-mobile");
let palabraSpanMobile = obtenerClass(".palabras-usadas-mobile span");
let palabrasRepetidas = new Set();

envio.addEventListener("click", enviarRespuesta);

function enviarRespuesta() {
  let resultado = false;
  let span = document.createElement("span");
  // Seleccionamos los spans generados por jugar
  const spans = document.querySelectorAll(".palabra_adivinar span");

  const validarTexto = /^[A-Za-zÑñ]+$/;

  if (!palabrasRepetidas.has(envioPalabra.value.toLowerCase())) {
    if (validarTexto.test(envioPalabra.value)) {
      for (let i = 0; i < palabraOculta.length; i++) {
        if (
          envioPalabra.value.toLowerCase() === palabraOculta[i].toLowerCase()
        ) {
          spans[i].innerHTML = envioPalabra.value.toLowerCase();
          resultado = true;
          cantAciertos++;
          colorValid(span, true);
        }
      }
      palabrasRepetidas.add(envioPalabra.value.toLowerCase());
      if (cantAciertos === palabraOculta.length) {
        ganaste();
      }
      if (resultado === false) {
        colorInvalid(span, true);
        cantErrores++;
        let source = `/assets/img/ahorcado${cantErrores}.svg`;
        ahorcado.src = source;
      }
      span.innerHTML = envioPalabra.value.toLowerCase();
      palabraUsada.appendChild(span);
      // console.log("si evalua");
    }

    if (cantErrores === 4) {
      perdiste();
    }
  }
  envioPalabra.value = "";
}

function reiniciarMobile() {
  btnJugar.classList.remove("button-start-mobile");
  visibleGameMobile(".palabra_adivinar", "none");
  visibleGameMobile(".palabras-usadas-mobile", "none");
  visibleGameMobile(".content-enviar-mobile", "none");
  visibleGameMobile(".button-enviar-mobile", "none");
  palabraUsada.innerHTML = "";
  palabrasRepetidas.clear();
}

function ajustarMobile() {
  let body = document.querySelector("body");
  let bodyWidth = window.getComputedStyle(body);
  let widthTamanio = parseFloat(bodyWidth.getPropertyValue("width"));
  visibleGameMobile(".palabra_adivinar", "flex");
  visibleGameMobile(".palabras-usadas-mobile", "none");
  visibleGameMobile(".content-enviar-mobile", "none");
  visibleGameMobile(".button-enviar-mobile", "none");
  if (widthTamanio < 744) {
    // Nota: clase que da un display none
    btnJugar.classList.add("button-start-mobile");
    visibleGameMobile(".palabra_adivinar ", "flex");
    visibleGameMobile(".palabras-usadas-mobile", "flex");
    visibleGameMobile(".content-enviar-mobile", "flex");
    visibleGameMobile(".button-enviar-mobile", "inline-block");
  }
}

function visibleGameMobile(nombre, tipo) {
  let elemento = document.querySelector(nombre);
  elemento.style.display = tipo;
}

// TODO : Modo Daltonico
let buttonEye = document.querySelector(".ajustes");

buttonEye.addEventListener("click", activarModo);

function activarModo() {
  let but = buttonEye.classList.toggle("ajustes-active");
  daltonico = but;
  console.log(daltonico);
}
