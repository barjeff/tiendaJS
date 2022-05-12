let almacenados = [];
let descuento = 1500;

class celular {
    constructor(marca, precio, img, id, cantidad) {
        this.marca = marca;
        this.precio = precio;
        this.img = img
        this.id = id;
        this.cantidad = cantidad;

    }
    o
}
const galaxys22 = (new celular("samsung galaxy s22", "120000", "img/galaxys22.jpg", "01", "1"));
const galaxya71 = (new celular("samsung Galaxy A71", "80000", "img/galaxyZflip.jpg ", "02", "1"));
const galaxflip = (new celular("samsung galaxy z flipp", "160000", "img/samsunga71.jpg", "03", "1"));
const motorolag71 = (new celular("motorola Moto G71", "90000", "img/motoG71.jpg", "04", "1"));
const motorolag60 = (new celular("motorola Moto G60", "70000", "img/motorolaG60.jpg ", "05", "1"));
const motorolaEdge = (new celular("motorola Moto Edge", "120000", "img/motoEdge20.jpg", "06", "1"));
const iphone13 = (new celular("Iphone 12 ", "150000", "img/iphone12.jpg ", "07", "1"));
const iphone12 = (new celular("Iphone 13 ", "130000", "img/iphone13.jpg", "08", "1"));
const iphonexr = (new celular("Iphone xr ", "110000", "img/iphonexr.jpg", "09", "1"));
const xiaomiredmi = (new celular("Xiaomi Redmi note 11 ", "90000", "img/redmi11.jpg", "10", "1"));
const xiaomi10 = (new celular("Xiaomi Redmi 10 Pro", "80000", "img/redmi10.jpg", "11", "1"));
const xiaomi11 = (new celular("Xiaomi Redmi  9T Dual ", "75000", "img/redmi9.jpg", "12", "1"));
const carritoCelulares = [galaxys22, galaxya71, galaxflip, motorolag71, motorolag60, motorolaEdge, iphone12, iphone13, iphonexr, xiaomiredmi, xiaomi10, xiaomi11];

/*async function pedirRecurso() {
        const respuesta = await fetch("http://localhost:5500/inforSimuladorServer.json")
        const dataServer = await respuesta.json()
        carritoCelulares = dataServer;
        carritoCelulares.forEach((celular) => {
            crearCards(celular);
        }); 
}

pedirRecurso()*/


/*fetch("/inforSimuladorServer.json")
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error))
    .then((infoServer) => {
        carritoCelulares = infoServer;
        carritoCelulares.forEach((celular) => {
            crearCards(celular);
        });
        AsideSearch()
    });
*/


//// Funcion que crea las card en DOM
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

    cards.classList.add("card", "col", "col-lg-3", "col-md-6",
        "col-sm-8", );

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
    objparse = JSON.parse(localStorage.getItem("Productos"));
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
        /////// ALERT DE LIBRERIA JS SWEETalert2
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

/////   Funcion compra exitosa
function comprarBtn() {
    const btnCompra = document.getElementById("btnTableCompra")
    btnCompra.onclick = (e) => {
        e.target;
        e.preventDefault
            /////// ALERT DE LIBRERIA JS SWEETalert2
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Compra Realizada con Exito',
            showConfirmButton: false,
            timer: 1500
        });
        totalProductos.innerHTML = "";
        totalPrecio.innerHTML = "";
        tabla.innerHTML = "";
        almacenados = [];
        localStorage.setItem("Productos", JSON.stringify(almacenados));

    }
}

///// Evento de boton comprar solo se activa si hay elementos AGREGADOS en el array
if (almacenados.length >= 1) {
    comprarBtn();
    console.log("El carrito no está vacío Puedes comprar!");

}

//// Elementos del side bar
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

//// Funcion que buscar telefonos a traves de un Input en barra de NAVegacion
let btnNavSearch = document.querySelector(".botonBusqueda");
btnNavSearch.addEventListener("click", function(e) {
    e.preventDefault();
    const rowdiv = document.getElementById("rowcard");
    const inputNavSearch = document.querySelector(".barraBusqueda").value;
    let encontrados = carritoCelulares.filter((celular) => celular.marca.toLowerCase().includes(inputNavSearch));
    rowdiv.innerText = "";
    for (const articulo of encontrados) {
        crearCards(articulo);
    }

});

//// Funcion que busca por marca a traves de UL en el Dom Y Oculta el parallax
function AsideSearch() {
    let divSearh = document.querySelector(".divBusqueda");
    let ulSearch = document.createElement("ul");
    ulSearch.className = ("navbar-nav");
    ulSearch.innerHTML = `
<p><b>Buscar por Marcas</b></p>
<li><button id="iphone" class="btn searchMarca" value="iphone">Iphone</button></li>
<li><button id="samsung" class="btn searchMarca" value="samsung">Samsung</button></li>
<li><button id="motorola" class="btn searchMarca" value="motorola">Motorola</button></li>
<li><button id="xiaomi" class="btn searchMarca" value="xiaomi">Xiaomi</button></li>
<li><a href="index.html" class="btn">Mostrar <b>Todos</b></a></li>
`
    divSearh.append(ulSearch);

    let btn = document.querySelectorAll(".searchMarca");
    for (const boton of btn) {
        boton.addEventListener("click", function(e) {
            e.preventDefault();
            let busquedaMarca = carritoCelulares.filter((celular) => celular.marca.toLowerCase().includes(e.target.id));
            const rowdiv = document.getElementById("rowcard");
            rowdiv.innerText = "";
            ///Oculto el parallax
            let ocultarParallax = document.getElementById("teAyudamos")
            ocultarParallax.style.display = 'none';
            for (const articulo of busquedaMarca) {
                crearCards(articulo);
            }
        });

    }
}

AsideSearch()
actualizarTabla();