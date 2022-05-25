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
let pFuga = new Pizza(4, "Fugazzeta", fugazzetta, 600);
let pJamYM = new Pizza(5, "Jamon y Morron", jym, 700);
let pFaina = new Pizza(6, "Faina", faina, 650);

let pizzasEnStock = [pMuzza, pNapo, pCala, pFuga, pJamYM, pFaina];

const $form = document.querySelector("form");
const $num = document.querySelector("#numeroPizza");
const $nombrePizza = document.querySelector("#nombre");
const $precio = document.querySelector("#precio");
const $foto = document.querySelector("#pizza_img");
const $foto_container = document.querySelector("#img_container");
const $container = document.querySelector(".container");
const $infoPizza = document.querySelector("#info_pizza_container");
const $ingreContainer = document.querySelector(".ingredientes_container");
const $error_container = document.querySelector(".error_container");

$form.addEventListener("submit", (e) => {
  //Se acciona al presionar el submit
  e.preventDefault();
  buscarPizza($num.value);
});

function buscarPizza(id) {
  //Si existe el id de la pizza la imprime,
  //Sino devuelve un error.
  if (esUnIdValido(id)) {
    imprimirDatosDePizzaId(id);
  } else {
    imprimirError(id);
  }
}

const imprimirDatosDePizzaId = (id) => {
  //Imprime los datos de la pizza con el id dado.
  const pizza = pizzasEnStock.filter((pizza) => pizza.getId() == id);
  actualizarInformacionHTMLDePizza(pizza[0]);
};

const actualizarInformacionHTMLDePizza = (pizza) => {
  //Actualiza los elementos del dom de la pizza, con los datos de la
  //pizza actual.
  actualizarEstiloDe(
    [$infoPizza, $container, $error_container],
    ["display:flex", "width:350px", "display:none"]
  );
  actualizarImgHTMLDePizza(pizza);
  actualizarNombreHTMLDePizza(pizza);
  actualizarPrecioHTMLDePizza(pizza);
  actualizarIngredientesHTMLDePizza(pizza);
};

const actualizarEstiloDe = (elems, propiedades) => {
  //Actualiza la propiedad de los elementos dados, con las
  //propiedades dadas.
  for (let i = 0; i < elems.length; i++) {
    elems[i].style = propiedades[i];
  }
};

const actualizarImgHTMLDePizza = (pizza) => {
  //Actualiza la img de la pizza, con la foto de la pizza dada.
  let nombrePizza = pizza.getNombre().toLowerCase();
  $foto.setAttribute("src", `./images/${nombrePizza}.webp`);
};

const actualizarNombreHTMLDePizza = (pizza) => {
  //Actualiza el input del nombre de pizza, con el nombre de la pizza dada.
  $nombrePizza.textContent = `${pizza.getNombre()}`;
};

const actualizarPrecioHTMLDePizza = (pizza) => {
  //Actualiza el input del precio de pizza, con el nombre de la pizza dada.
  $precio.textContent = `$ ${pizza.getPrecio()}`;
};

const actualizarIngredientesHTMLDePizza = (pizza) => {
  //Actualiza el container de ingredientes, con los ingredientes de la pizza dada.
  eliminarElemChildSiCorrespondeDe($ingreContainer);
  mostrarIngredientesDePizza(pizza);
};

const eliminarElemChildSiCorrespondeDe = (elem) => {
  //Si el elemento del dom dado, tiene childs, los elimina. 
  if (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
};

const mostrarIngredientesDePizza = (pizza) => {
  //Agrega un parrafo con los ingredientes de la pizza dada,
  // al container html de ingredientes.
  let parrafo = setearStringIngredientes(pizza);
  let parrafoElem = document.createElement("p");
  parrafoElem.textContent = parrafo;
  $ingreContainer.appendChild(parrafoElem);
};

function esUnIdValido(id) {
  //Describe si el id dado es valido.
  return id && id <= getIdMax() && id >= getIdMin();
}

function setearStringIngredientes(pizza) {
  //Da forma al texto de los ingredientes de la pizza dada
  //para mostrarlos en pantalla.
  let parrafo = "";
  let ingredientes = pizza.getIngredientes();
  parrafo = ingredientes.join(", ");
  let indice = parrafo.lastIndexOf(",");
  let pre = parrafo.slice(0, indice);
  let pos = parrafo.slice(indice + 1);
  return pre + " y" + pos + ".";
}

const imprimirError = (id) => {
  //Actualiza el container de error según el error correspondiente.
  eliminarElemChildSiCorrespondeDe($error_container);
  if (id) {
    setearHTMLParaErrorSinValue();
  } else {
    setearHTMLParaErrorConValue();
  }
};

function setearHTMLParaErrorConValue() {
  //Actualiza el container de error cuando el error
  //se trata de un id invalido.
  let msgError = "Por favor ingrese un ID.";
  actualizarEstiloDe(
    [$infoPizza, $container, $container, $error_container],
    ["display:none", "width:200px", "height:200px", "display:flex"]
  );
  setMsgError(msgError);
}

function setearHTMLParaErrorSinValue() {
  //Actualiza el container de error cuando el usuario
  //no ingresa un valor.
  let min = getIdMin();
  let max = getIdMax();
  let msgError = `No hay Pizzas con ese ID! Ingrese un ID entre ${min} y ${max}`;
  actualizarEstiloDe(
    [$infoPizza, $container, $container, $error_container],
    ["display:none", "width:200px", "height:200px", "display:flex"]
  );
  setMsgError(msgError);
}

const setMsgError = (msgError) => {
  //Agrega el mensaje dado, al container error.
  let msgElem = document.createElement("h2");
  msgElem.textContent = `${msgError}`;
  msgElem.classList.add("msgError");
  $error_container.appendChild(msgElem);
};

const getIdMin = () => {
  //Devuelve el id minimo de las pizzas en stock.
  let idEnStock = pizzasEnStock.map((pizza) => pizza.getId());
  let min = idEnStock.reduce((min, act) => {
    return min < act ? min : act;
  });
  return min
};

const getIdMax = () => {
  //Devuelve el id maximo de las pizzas en stock
  let idEnStock = pizzasEnStock.map((pizza) => pizza.getId());
  let max = idEnStock.reduce((max, act) => {
    return max > act ? max : act;
  });
  return max;
};
