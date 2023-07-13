let carritoProductos = [];

class Producto{
    constructor(id, nombre, precio, descripcion, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.img = img;
    }
}

const productos = [
    new Producto(1, "Arena" , 600, "Precio x metro cubico", "../img/ladrillo.png" ),
    new Producto(2, "Cal", 800, "Precio x bolsa", "../img/ladrillo.png"),
    new Producto(3, "Cemento", 950, "Precio x bolsa", "../img/ladrillo.png"),
    new Producto(4, "Pegamento Baldosas", 850, "Precio x bolsa", "../img/ladrillo.png"),
    new Producto(5, "Pegamento Ceramica", 980, "Precio x bolsa", "../img/ladrillo.png"),
    new Producto(6, "Ladrillo", 300, "Precio x unidad", "../img/ladrillo.png")
];

const contenedorProductos = document.querySelector("#contenedor-productos");

productos.forEach( producto => {
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

function actualizarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    const contenedorCarrito = document.querySelector("#contenedor-carrito");
    const carritoGuardado = localStorage.getItem("carrito");

    if(carritoGuardado) {
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
                        <button class="btn" id="btn-agregar-productos">Agregar producto</button>
                    </div>
                </article>
    `;

    contenedorCarrito.appendChild(artCarrito);


        })
    }

}
