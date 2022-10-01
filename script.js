let palabrita;
let cant_errores = 0;
let cant_aciertos = 0;

const palabras = ["amatista", "clerigo", "tunica", "elfo", "hechicera", "escudo", "armadura", "yelmo", "arco", "ballesta", "torre", "noble", "altar", "moneda", "mercader", "tierra", "caliz", "druida", "monje", "jade", "espada", "orco", "fortaleza"]

const btn = id("jugar");
const imagen = id("imagen-muñeco");
const boton_letras = document.querySelectorAll("#letras button");



//click iniciar juego

btn.addEventListener("click", iniciar);



function id(str) {
    return document.getElementById(str);
}


function obtener_random(min, max) {
    const amplitud_valores = max - min
    const valor_al_azar = Math.floor(Math.random() * amplitud_valores) + min;
    return valor_al_azar;
}

function iniciar(event) {
    imagen.src = "img/img0.png";
    id("resultado").innerHTML = "";
    btn.disabled = true;
    cant_errores = 0;
    cant_aciertos = 0;

    const parrafo = id("palabra");
    parrafo.innerHTML = "";

    const cantidad_palabras = palabras.length;
    const valor_al_azar = obtener_random(0, cantidad_palabras);

    palabrita = palabras[valor_al_azar];
    const cantidad_letras = palabrita.length;

    for (let i = 0; i < boton_letras.length; i++) {

        boton_letras[i].disabled = false;
    }


    for (let i = 0; i < cantidad_letras; i++) {
        const span = document.createElement("span");
        parrafo.appendChild(span);
    }
}

//click de adivinar letra 

for (let i = 0; i < boton_letras.length; i++) {

    boton_letras[i].addEventListener("click", click_letras);
}

function click_letras(event) {

    const spans = document.querySelectorAll("#palabra span");

    const button = event.target;
    button.disabled = true;
    const letra = button.innerHTML.toLowerCase();
    const palabra = palabrita.toLowerCase();


    let acerto = false;

    for (let i = 0; i < palabra.length; i++) {

        if (letra == palabra[i]) {
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acerto = true;
        }
    }

    if (acerto == false) {
        cant_errores++;
        const source = `img/img${cant_errores}.png`;
        const imagen = id("imagen-muñeco");
        imagen.src = source;
    }



    if (cant_errores == 6) {

        id("resultado").innerHTML = "Perdiste, la palabra era: " + palabrita;
        game_over();

    } else if (cant_aciertos == palabrita.length) {

        id("resultado").innerHTML = "Felicidades ¡Ganaste!";
        game_over();
    }


}

//fin del juego

function game_over() {

    for (let i = 0; i < boton_letras.length; i++) {

        boton_letras[i].disabled = true;
    }

    btn.disabled = false;
}