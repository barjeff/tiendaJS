class celular {
    constructor(marca, precio, img, id, cantidad) {
        this.marca = marca;
        this.precio = precio;
        this.img = img
        this.id = id;
        this.cantidad = cantidad;
    }

}

const galaxys22 = (new celular("samsung galaxy s22", "120000", "img/galaxys22.jpg", "01", "1"));
const galaxya71 = (new celular("samsung Galaxy A71", "80000", "img/galaxyZflip.jpg ", "02", "1"));
const galaxflip = (new celular("samsung galaxy z flipp", "160000", "img/samsunga71.jpg", "03", "1"));
const motorolag71 = (new celular("Motorla Moto G71", "90000", "img/motoG71.jpg", "04", "1"));
const motorolag60 = (new celular("Motorla Moto G60", "70000", "img/motorolaG60.jpg ", "05", "1"));
const motorolaEdge = (new celular("Motorla Moto Edge", "120000", "img/motoEdge20.jpg", "06", "1"));
const iphone13 = (new celular("Iphone 12 ", "150000", "img/iphone12.jpg ", "07", "1"));
const iphone12 = (new celular("Iphone 13 ", "130000", "img/iphone13.jpg", "08", "1"));
const iphonexr = (new celular("Iphone xr ", "110000", "img/iphonexr.jpg", "09", "1"));
const carritoCelulares = [galaxys22, galaxya71, galaxflip, motorolag71, motorolag60, motorolaEdge, iphone12, iphone13, iphonexr];

let almacenados = [];
let descuento = 1500;
//// Funcion que crea las card
function crearCards(celular) {
    const rowdiv = document.getElementById("rowcard");
    let cards = document.createElement("div");
    cards.innerHTML = ` 
    <img src= ${celular.img} class="card-img-top border" alt="...">
    <h5 class="card-title">${celular.marca}</h5>
    <div class="card-body text-center" style="width: 18rem;">
      <p class="card-text">$ ${celular.precio}</p>
      <button id="${celular.id}" class="btn btnCard btn-1 boton">Añadir al carrito </button>
    </div>`;
    rowdiv.append(cards)

    cards.classList.add("card", "col", "col-lg-3", "col-sm-8", );

    const btn = document.querySelectorAll(".boton");
    for (const boton of btn) {
        boton.addEventListener("click", AgregarCarrito);

    }
}
///// Funcion que crea las card del Stock existente
function iciciar() {
    carritoCelulares.forEach((celular) => {
        crearCards(celular);

    });
}
iciciar()

///// function-Evento del boton agregar
function AgregarCarrito(e) {
    e.target.setAttribute("disabled", true); // Desactivo el Boton.
    e.target.innerHTML = "Agregado";
    /// encuentro el articulo seleccionado y lo subo al local storage
    let productoAgregado = carritoCelulares.find((item) => item.id == e.target.id);
    almacenados.push(productoAgregado);
    const enJson = JSON.stringify(almacenados);
    localStorage.setItem("Productos", enJson);
    const objparse = JSON.parse(localStorage.getItem("Productos"));
    actualizarTabla()
}
///// habilito los botos y actualizo el local storage
function actualizarBotonesyLocalStorage() {
    const objparse = JSON.parse(localStorage.getItem("Productos"));
    let productoEliminado = objparse.find(() => celular.id === celular.id);
    let productId = productoEliminado.id;
    let btnProducto = document.getElementById(productId);
    document.getElementById(productId).innerHTML = "agregar al carrito";
    btnProducto.disabled = false; // activo el Boton.
    let indiceDeProducto = objparse.indexOf(productoEliminado);
    objparse.splice(indiceDeProducto, 1);
    localStorage.setItem("Productos", JSON.stringify(objparse));
    actualizarTabla()

}
///////////////// tabla de carrito ///////////////////////

let totalProductos = document.getElementById("Totalproducto")
let totalPrecio = document.getElementById("Totalprecio")
let tabla = document.getElementById("tablabdy");
let cupon = document.getElementById("descontar")

function agregarDatos(celular) {

    /// creae row de articulos
    let row = document.createElement("tr");
    row.innerHTML = `<th><img src= ${celular.img} class="card-img-top imgheigh border" alt="..."></th><th>${celular.marca}</th><th>${celular.id}</th><th>${celular.precio}</th><th>${celular.cantidad}</th><th> <button class="eliminar-item" id= "#${celular.id}"></button></th>`;
    tabla.append(row);
    /// aumentar y disminuir cantidad
    const locationItem = almacenados.indexOf(celular);
    let aux = document.createElement("th");
    row.append(aux);
    const aumentarCantidad = document.createElement("button");
    aumentarCantidad.className = "btn btn-primary";
    aumentarCantidad.innerText = "+";
    aumentarCantidad.onclick = (e) => {
        e.target
        if (almacenados[locationItem].cantidad <= 4) {
            almacenados[locationItem].cantidad++;
            const enJson = JSON.stringify(almacenados);
            localStorage.setItem("Productos", enJson);
        }
        actualizarTabla();
    };
    ////disminuir cantidad
    const disminuirCantidad = document.createElement("button");
    disminuirCantidad.className = "btn btn-warning";
    disminuirCantidad.innerText = "-";
    disminuirCantidad.onclick = (e) => {
        e.target;
        if (almacenados[locationItem].cantidad > 1) {
            almacenados[locationItem].cantidad--;
            const enJson = JSON.stringify(almacenados);
            localStorage.setItem("Productos", enJson);
        }
        actualizarTabla();
    };
    aux.append(aumentarCantidad);
    aux.append(disminuirCantidad);


    /// splice y  boton eliminar
    let eliminarBtn = document.querySelector(".eliminar-item")
    eliminarBtn.className = "btn ";
    eliminarBtn.innerText = "Eliminar";
    eliminarBtn.onclick = () => {
        almacenados.splice(locationItem, 1);
        actualizarTabla();
        actualizarBotonesyLocalStorage();
        /////// ALERT DE LIBRERIA JS
        Swal.fire({
            title: 'Estas seguro ?',
            text: "Perderas los descuentos promocionales!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Tus productos han sido eliminados.',
                    'success'
                )
            }
        })
    };
    //// foot de tabla - TOTALES
    totalProductos.innerHTML = almacenados.length;
    totalPrecio.innerHTML = almacenados.reduce((total, celular) => total + celular.precio * celular.cantidad - descuento, 0);
    cupon.innerHTML = ` $ ${descuento} ars`;
}

//// actualizo la tabla 
function actualizarTabla() {
    tabla.innerHTML = "";
    almacenados.forEach((item) => {
        agregarDatos(item);
    });
    totalProductos.innerHTML = almacenados.length;
    totalPrecio.innerHTML = almacenados.reduce((total, celular) => total + celular.precio * celular.cantidad - descuento, 0);

}

///// OPERADORES AVANZADOS 
let objparse = JSON.parse(localStorage.getItem('Productos'));
almacenados = JSON.parse(localStorage.getItem('Productos')) || [];

/////   

//// side bar
const openBtn = document.querySelector(".carri");
const sideBarWrapper = document.querySelector("div.side-bar-wrapper");

openBtn.addEventListener("click", function() {
    sideBarWrapper.style.width = "100vw";
    document.querySelector("#side-bar").style.width = "750px";
});

const closeBtn = document.querySelector("#close-cart");

closeBtn.addEventListener("click", function() {
    sideBarWrapper.style.width = "0vw";
    document.querySelector("#side-bar").style.width = "0px";
});

sideBarWrapper.addEventListener("click", function(e) {
    sideBarWrapper.style.width = "0vw";
    document.querySelector("#side-bar").style.width = "0px";
});
document.querySelector("#side-bar").addEventListener("click", function(e) {
    e.stopPropagation();
});

actualizarTabla();