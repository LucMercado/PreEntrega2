
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
    const carritoGuardado = localStorage.getItem("carrito");
    let carritoParse;
    if (carritoGuardado) {
        carritoParse = JSON.parse(carritoGuardado);
    } else {
        carritoParse = []
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
            // carritoParse = JSON.parse(localStorage.getItem("carrito"));
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
            mostrarCarrito();
            Toastify({

                text: "Producto agregado.",
                
                duration: 3000
                
                }).showToast();
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
        let carritoParse = JSON.parse(carritoGuardado);
        carritoParse.forEach(producto => {
            const artCarrito = document.createElement("article");
            artCarrito.innerHTML = `
                <article class="card-producto card-carrito"> 
                    <img src=${producto.img}>
                    <div class="card-producto-body">
                        <hr>
                        <strong class="card-producto-price">${producto.precio}</strong>
                        <h3 class="card-producto-title">${producto.nombre}</h3>
                        <div class="cantidad-contenedor">
                            <button class="cantidad-btn" id="btn-menos">-</button>
                            <input class="cantidad-input" type="text" value="${producto.cantidad}">
                            <button class="cantidad-btn" id="btn-mas">+</button>
                        </div>
                        <button class="btn" id="btn-quitar-productos">Quitar producto</button>
                    </div>
                </article>
            `;
            precioTotal += producto.precio * producto.cantidad;
            contenedorCarrito.appendChild(artCarrito);

            const btnQuitar = artCarrito.querySelector("#btn-quitar-productos");
            btnQuitar.addEventListener("click", () => {
                carritoParse = quitarProducto(producto, carritoParse);

                actualizarCarrito(carritoParse);
                mostrarCarrito();
                Toastify({

                    text: "Producto eliminado.",
                    
                    duration: 3000
                    
                    }).showToast();
            })

            const btnCantidadMenos = artCarrito.querySelector("#btn-menos");
            btnCantidadMenos.addEventListener("click", () => {
                producto.cantidad--;
                carritoParse = quitarProducto(producto, carritoParse);
                carritoParse.push(producto);
                actualizarCarrito(carritoParse);
                mostrarCarrito();
            })


            const btnCantidadMas = artCarrito.querySelector("#btn-mas");
            btnCantidadMas.addEventListener("click", () => {
                producto.cantidad++;
                carritoParse = quitarProducto(producto, carritoParse);
                carritoParse.push(producto);
                actualizarCarrito(carritoParse);
                mostrarCarrito();
            })

        })
        let precioTotalTexto = document.createElement("h4");
        precioTotalTexto.innerHTML = `
        <h4 style="color:white">Monto Total Carrito: $${precioTotal}</h4>
        `;
        contenedorMontoTotal.innerHTML = "";
        contenedorMontoTotal.appendChild(precioTotalTexto);

    } else {
        let carritoVacioTexto = document.createElement("h4");
        carritoVacioTexto.innerHTML = `
        <h4 style="color:white">Aun no se han agregado productos al carrito</h4>
        `;
        contenedorMontoTotal.innerHTML = "";
        contenedorMontoTotal.appendChild(carritoVacioTexto);
        const btnConfirmarCompra = document.getElementById("confirmar-compra");
        btnConfirmarCompra.disabled = true;
    }

}

function quitarProducto(producto, arrayOriginal) {
    const productosFiltrados = arrayOriginal.filter((item) => item.nombre !== producto.nombre);
    return productosFiltrados;
}

async function buscarProducto() {
    try {
        const response = await fetch("../JSON/productos.json");
        if (!response.ok) {
            throw new Error('Error al obtener los datos del JSON.');
        }

        const data = await response.json();
        productosArray.push(...data);

        console.log('Datos obtenidos del JSON:', productosArray);
    } catch (error) {
        console.error('Error:', error.message);
    }
    let productoIngresado = document.getElementById("producto-buscar").value;
    let productosFiltrados = productosArray.filter(producto => producto.nombre.includes(productoIngresado));

    if (productosFiltrados.length != 0) {
        mostrarProductos(productosFiltrados);
    } else {
        contenedorProductos.innerHTML = "No se encontraron productos con ese nombre.";
    }


}

function confirmarCompra() {
    Swal.fire('Compra Realizada');
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

obtenerProductos();
mostrarCarrito();
