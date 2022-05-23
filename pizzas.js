class Pizza {
  constructor(id, nombre, ingredientes, precio) {
    this.id = id;
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.precio = precio;
  }
  getId = () => this.id;
  getNombre = () => this.nombre;
  getIngredientes = () => this.ingredientes;
  getPrecio = () => this.precio;
}

let muzza = ["Mozzarella", "Oregano"];
let napolitana = ["Mozzarella", "Tomate", "Albahaca", "Oregano"];
let calabresa = ["Mozzarella", "Salamin", "Longaniza", "Oregano"];
let fugazzetta = ["Mozzarella", "Cebolla", "Oregano"];
let jym = ["Mozzarella", "Jamon", "Morron"];
let faina = ["Mozzarella", "Faina"];

let pMuzza = new Pizza(1, "Muzza", muzza, 400);
let pNapo = new Pizza(2, "Napolitana", napolitana, 700);
let pCala = new Pizza(3, "Calabresa", calabresa, 600);
let pFuga = new Pizza(4, "Fugazzeta", muzza, 600);
let pJamYM = new Pizza(5, "Jamon y Morron", muzza, 700);
let pFaina = new Pizza(6, "Faina", muzza, 650);

let pizzasEnStock = [pMuzza, pNapo, pCala, pFuga, pJamYM, pFaina];

//Indica si el id pasado por parametro es impar.
let esImpar = (id) => id % 2 != 0;

function pizzaConIdImpar(array) {
  //Devuelve todas las pizzas con id impar del array pasado por parametro.
  let pizzaIdImpar = [];
  for (let i = 0; i < array.length; i++) {
    if (esImpar(array[i].getId())) {
      pizzaIdImpar.push(array[i].getNombre());
    }
  }
  return pizzaIdImpar;
}

//Indica si la pizza pasada por parametro es menor al precio pasado por parametro
let esMasBarataQue = (precioA, precioB) => precioA < precioB;

function masBaratasQue(array, precio) {
  //Devuelve todas las pizzas del array pasado por parametro
  //que sean menores al precio pasado por parametro.
  let pizzasEconomicas = [];
  for (let i = 0; i < array.length; i++) {
    if (esMasBarataQue(array[i].getPrecio(), precio)) {
      pizzasEconomicas.push(array[i].getNombre());
    }
  }
  if (pizzasEconomicas.length == 0) {
    return "no hay pizzas con un precio menor a " + precio;
  } else {
    return (
      "las pizzas con precio menor a " + precio + " son: " + pizzasEconomicas
    );
  }
}

function nombreDeLasPizzas(array) {
  //Obtiene los nombres de todas las pizzas del array
  let nombreDePizza = (pizza) => pizza.getNombre();
  return obtenerInformacionDePizza(array, nombreDePizza);
}

function preciosDeLasPizzas(array) {
  //Obtiene los precios de todas las pizzas del array.
  let preciosDePizza = (pizza) => pizza.getPrecio();
  return obtenerInformacionDePizza(array, preciosDePizza);
}

function obtenerInformacionDePizza(array, callBack) {
  //Obtiene la información solicitada por el callback.
  let informacion = [];
  for (let i = 0; i < array.length; i++) {
    informacion.push(callBack(array[i]));
  }
  return informacion;
}

function pizzasYSusPrecios(arrayP) {
  //Devuelve los nombres de las pizzas junto a sus precios.
  let todosLosPrecios = preciosDeLasPizzas(arrayP);
  let todosLosNombres = nombreDeLasPizzas(arrayP);
  let preciosYNombres = [];
  for (let i = 0; i < todosLosPrecios.length; i++) {
    let precioYNombreActual =
      " de " + todosLosNombres[i] + ": " + todosLosPrecios[i];
    preciosYNombres.push(precioYNombreActual);
  }
  return preciosYNombres;
}
/*
function printPizzas(arrayP){
    console.log('Las pizzas con id impar, son: ' + pizzaConIdImpar(arrayP));
    console.log("En este momento, "+ masBaratasQue(arrayP, 600));
    console.log('Los nombres de todas las pizzas, son: ' + nombreDeLasPizzas(arrayP));
    console.log('Las precios de todas las pizzas, son: ' + preciosDeLasPizzas(arrayP));
    console.log('Los valores de las pizzas, son: ' + pizzasYSusPrecios(arrayP));
}
*/
//printPizzas(pizzasEnStock);

const $form = document.querySelector("form");
const $num = document.querySelector("#numeroPizza");
const $nombrePizza = document.querySelector("#nombre");
const $precio = document.querySelector("#precio");
const $foto = document.querySelector("#pizza_img");
const $foto_container = document.querySelector("#img_container");
const $container = document.querySelector(".container");

$form.addEventListener("submit", (e) => {
  //Se acciona al presionar el submit
  e.preventDefault();
  buscarPizza($num.value);
});

function buscarPizza(val) {
  //Si existe el id de la pizza la imprime,
  //Sino devuelve un error.
  if (val <= pizzasEnStock.length) {
    imprimirDatosDePizzaId(val);
  } else {
    imprimirError();
  }
}
function imprimirError() {
  //Devuelve un error por el elemento #nombre
  $nombrePizza.textContent = "¡No hay pizzas con ese id!";
  $precio.textContent = "";
  actualizarEstilos(
    [$foto, $container, $nombrePizza],
    ["display:none", "height:110px", "color:red"]
  );
}

function imprimirDatosDePizzaId(pizzaId) {
  //Muestra la pizza en el documento html.
  const { nombre, precio } = obtenerNombreYPrecio(pizzaId);
  actualizarEstilos(
    [$nombrePizza, $container, $foto_container],
    ["color:rgb(160,95,9)", "height:200px", "display:block"]
  );
  actualizarElementosHTML(nombre, precio);
}

function obtenerNombreYPrecio(pizzaId) {
  //Devuele el nombre y precio del id de la pizza enviada por parametro
  const pizza = pizzasEnStock.filter((p) => p.id == pizzaId);
  const nombre = pizza[0].getNombre();
  const precio = pizza[0].getPrecio();
  return { nombre, precio };
}

function actualizarElementosHTML(nombre, precio) {
  //Actualiza los elementos html, con nombre y precio
  //de la pizza dada. Además le agrega una imagen de cada pizza.
  $nombrePizza.textContent = `Pizza: ${nombre}`;
  $precio.textContent = `Precio: $${precio}`;
  $foto.setAttribute("src", `./images/${nombre}.webp`);
  $foto.style = "display:block";
}

const actualizarEstilos = (elementos, propiedades) => {
  //Actualiza los estilos del array de elementos,
  //con las propiedades del array dadas.
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].style = `${propiedades[i]}`;
  }
};
