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

function mostrarProductos() {
    let i = 1;
    for (let producto of arrayProductos){
        
        console.log("Producto", i, ": " , producto.nombre, ", Precio: $", producto.precio );
        i++;
    }
}


