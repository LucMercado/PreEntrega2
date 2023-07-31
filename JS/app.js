const productosDestacados = [];
const contenedorProductos = document.querySelector("#contenedor-productos");


// Función para obtener los datos y guardarlos en el array
async function obtenerProductos() {
    try {
        const response = await fetch("./JSON/productosDestacados.json");
        if (!response.ok) {
            throw new Error('Error al obtener los datos del JSON.');
        }

        const data = await response.json();
        productosDestacados.push(...data);

        mostrarProductos(productosDestacados);

        console.log('Datos obtenidos del JSON:', productosDestacados);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function mostrarProductos(productos) {
    const carritoGuardado = localStorage.getItem("carrito");
    let carritoParse;
    if (carritoGuardado) {
        carritoParse = JSON.parse(carritoGuardado);
    } else {
        carritoParse = [];
    }
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
            if (carritoParse !== null) {
                if (carritoParse.includes(producto)) {
                    producto.cantidad++;
                    carritoParse = quitarProducto(producto, carritoParse);
                    carritoParse.push(producto);
                } else {
                    carritoParse.push(producto);
                }
            } else {
                carritoParse = [{
                    "id": producto.id,
                    "nombre": producto.nombre,
                    "precio": producto.precio,
                    "descripcion": producto.descripcion,
                    "img": producto.img,
                    "cantidad": producto.cantidad
                }];
            }

            actualizarCarrito(carritoParse);
        })

    })




}

function actualizarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function actualizarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

obtenerProductos();