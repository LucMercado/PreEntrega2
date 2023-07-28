// class Producto {
//     constructor(id, nombre, precio, descripcion, img) {
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.descripcion = descripcion;
//         this.img = img;
//     }
// }

// const productos = [
//     new Producto(1, "Arena", 6000, "Precio x bolson", "../img/arena.jpg"),
//     new Producto(2, "Cal", 800, "Precio x bolsa", "../img/cal.jpg"),
//     new Producto(3, "Cemento", 950, "Precio x bolsa", "../img/bolsa-cemento.png"),
//     new Producto(4, "Cemento Hidralit", 1850, "Precio x bolsa", "../img/hidralit.png"),
//     new Producto(5, "Pegamento Ceramica", 980, "Precio x bolsa", "../img/pegamento-ceramica.png"),
//     new Producto(6, "Ladrillo", 300, "Precio x unidad", "../img/ladrillo.jpg"),
//     new Producto(7, "Ladrillo Hueco", 250, "Precio x unidad", "../img/ladrillo-hueco.jpg"),
//     new Producto(8, "Ladrillo Block", 300, "Precio x unidad", "../img/ladrillo-block.jpg")
// ];

let carritoProductosJSON = localStorage.getItem("carrito");
if (carritoProductosJSON) {
    carritoProductos = JSON.parse(carritoProductosJSON);
} else {
    carritoProductos = [];
}

console.log(carritoProductos);
const productosArray = [];
const contenedorProductos = document.querySelector("#contenedor-productos");

// Función para obtener los datos y guardarlos en el array
async function obtenerProductos() {
    try {
        const response = await fetch("../JSON/productos.json");
        if (!response.ok) {
            throw new Error('Error al obtener los datos del JSON.');
        }

        const data = await response.json();
        productosArray.push(...data);

        mostrarProductos(productosArray);

        console.log('Datos obtenidos del JSON:', productosArray);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function mostrarProductos(productos) {
    contenedorProductos.innerHTML = " ";
    productos.forEach(producto => {
        const artProductos = document.createElement("article");
        artProductos.innerHTML = `
            <article class="card-producto"> 
                <img src=${producto.img}>
                <div class="card-producto-body">
                    <hr>
                    <strong class="card-producto-price">${producto.precio}</strong>
                    <h3 class="card-producto-title">${producto.nombre}</h3>          
                    <button class="btn" id="btn-agregar-productos">Agregar producto</button>
                </div>
            </article>
        `;
        contenedorProductos.appendChild(artProductos);

        const btnAgregar = artProductos.querySelector("#btn-agregar-productos");

        btnAgregar.addEventListener("click", () => {
            carritoProductos.push(producto);

            actualizarCarrito(carritoProductos);
            mostrarCarrito();
        })

    })

}


function actualizarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    document.getElementById("contenedor-carrito").innerHTML = " ";

    const contenedorCarrito = document.querySelector("#contenedor-carrito");
    const contenedorMontoTotal = document.getElementById("monto-total");
    const carritoGuardado = localStorage.getItem("carrito");
    let precioTotal = 0;

    if (carritoGuardado) {
        const carritoParse = JSON.parse(carritoGuardado);
        carritoParse.forEach(producto => {
            const artCarrito = document.createElement("article");
            artCarrito.innerHTML = `
                <article class="card-producto"> 
                    <img src=${producto.img}>
                    <div class="card-producto-body">
                        <hr>
                        <strong class="card-producto-price">${producto.precio}</strong>
                        <h3 class="card-producto-title">${producto.nombre}</h3>          
                        <button class="btn" id="btn-quitar-productos">Quitar producto</button>
                    </div>
                </article>
            `;
            precioTotal += producto.precio;
            contenedorCarrito.appendChild(artCarrito);

            const btnQuitar = artCarrito.querySelector("#btn-quitar-productos");

            btnQuitar.addEventListener("click", () => {
                carritoProductos = quitarProducto(producto, carritoProductos);

                actualizarCarrito(carritoProductos);
                mostrarCarrito();
            })
        })
        let precioTotalTexto = document.createElement("h4");
        precioTotalTexto.innerHTML = `
        <h4 style="color:white">Monto Total Carrito: $${precioTotal}</h4>
        `;
        // contenedorCarrito.appendChild(precioTotalTexto);
        contenedorMontoTotal.innerHTML = "";
        contenedorMontoTotal.appendChild(precioTotalTexto);

    } else {
        let carritoVacioTexto = document.createElement("h4");
        carritoVacioTexto.innerHTML = `
        <h4 style="color:white">Aun no se han agregado productos al carrito</h4>
        `;
        contenedorMontoTotal.innerHTML = "";
        contenedorMontoTotal.appendChild(carritoVacioTexto);
    }

}

function quitarProducto(producto, arrayOriginal){
    const productosFiltrados = arrayOriginal.filter((item) => item.nombre !== producto.nombre);
    console.log(productosFiltrados);
    return productosFiltrados;
}

function buscarProducto() {
    let productoIngresado = document.getElementById("producto-buscar").value;
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(productoIngresado));

    if (productosFiltrados.length != 0) {
        mostrarProductos(productosFiltrados);
    } else {
        contenedorProductos.innerHTML = "No se encontraron productos con ese nombre.";
    }


}

function confirmarCompra() {
    alert("Compra realizada");
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

obtenerProductos();
mostrarCarrito();
