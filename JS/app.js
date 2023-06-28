console.log( "Esta conectado");

let titulo = document.getElementById("titulo");

// console.log(titulo.innerHTML);

// titulo.innerText = "Hola mundoo";

// parrafo = document.createElement("p");
// parrafo.innerHTML = "<h2>¡Bienvenidos, Llegaste al lugar indicado!</h2>";

// document.body.append(parrafo);
// parrafo.remove();

let arrayProductos = [];

function Producto (nombre, precio){

    this.nombre = nombre;
    this.precio = precio;

}

function crearNuevoProducto () {
    let nombreProducto = document.getElementById("nombre-producto").value;
    let precioProducto = document.getElementById("precio-producto").value;
    
    producto1 = new Producto(nombreProducto, precioProducto);
    arrayProductos.push(producto1)
    console.log(arrayProductos)
    console.log("Creo un producto llamado: ", producto1.nombre, ", con el precio: $" , producto1.precio);
    document.getElementById("nombre-producto").value = "";
    document.getElementById("precio-producto").value = "";

}

function enviarArray() {
    console.log("Lista de Productos agregados:");
    mostrarProductos(arrayProductos);
}

function mostrarProductos(array) {
    let i = 1;
    for (let producto of array){
        
        console.log("Producto", i, ": " , producto.nombre, ", Precio: $", producto.precio );
        i++;
    }
}

function mostrarProductosOrdenadosPorNombre() {
    let ordenadosPorNombre = arrayProductos.map(elemento => elemento);
    ordenadosPorNombre.sort((x, y) => x.nombre.localeCompare(y.nombre));
    
    console.log("Lista de Productos ordenados por nombre:");

    mostrarProductos(ordenadosPorNombre);
}

function buscarProducto(){
    let productoIngresado = document.getElementById("producto-buscar").value;
    let productosFiltrados = arrayProductos.filter(producto => producto.nombre.includes(productoIngresado));
    
    if (productosFiltrados.length != 0) {
        console.log("Lista de productos que coinciden con ese nombre: ")
        mostrarProductos(productosFiltrados);
    } else {
        console.log("No se encontraron productos con ese nombre.");
    }

    document.getElementById("producto-buscar").value = "";

}
