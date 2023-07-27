console.log( "Esta conectado");
const productosArray = [];
const contenedorProductos = document.querySelector("#contenedor-productos");
let carritoProductos = [];
localStorage.setItem("carrito", carritoProductos);

// Función para obtener los datos y guardarlos en el array
async function obtenerProductos() {
    try {
        const response = await fetch("../JSON/productos-destacados.json");
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
        })

    })

}

function actualizarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

obtenerProductos();