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
            precioTotal += producto.precio * producto.cantidad;;
            contenedorCarrito.appendChild(artCarrito);

            const btnQuitar = artCarrito.querySelector("#btn-quitar-productos");
            btnQuitar.addEventListener("click", () => {
                carritoParse = quitarProducto(producto, carritoParse);
                actualizarCarrito(carritoParse);
                mostrarCarrito();
            })

            const btnCantidadMenos = artCarrito.querySelector("#btn-menos");
            btnCantidadMenos.addEventListener("click", () => {
                producto.cantidad --;
                carritoParse = quitarProducto(producto, carritoParse);
                carritoParse.push(producto);
                actualizarCarrito(carritoParse);
                mostrarCarrito();
            })


            const btnCantidadMas = artCarrito.querySelector("#btn-mas");
            btnCantidadMas.addEventListener("click", () => {
                producto.cantidad ++;
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
        const btnConfirmarCompra = document.getElementById("confirmar-compra");
        btnConfirmarCompra.disabled = true;
        
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
    Swal.fire('Compra Realizada');
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

mostrarCarrito();