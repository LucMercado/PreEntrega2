function mostrarCarrito() {
    const contenedorCarrito = document.querySelector("#contenedor-carrito");
    contenedorCarrito.innerHTML = " ";
    const carritoGuardado = localStorage.getItem("carrito");
    const contenedorMontoTotal = document.getElementById("monto-total");
    let precioTotal = 0;

    if (carritoGuardado) {
        let carritoParse = JSON.parse(carritoGuardado);
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
                carritoParse = quitarProducto(producto, carritoParse);

                actualizarCarrito(carritoParse);
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

function actualizarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function quitarProducto(producto, arrayOriginal) {
    const productosFiltrados = arrayOriginal.filter((item) => item.nombre !== producto.nombre);
    return productosFiltrados;
}

function confirmarCompra() {
    alert("Compra realizada");
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

mostrarCarrito();