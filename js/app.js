//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritobtn = document.querySelector('#vaciar-carrito');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando agregar
    listaCursos.addEventListener('click',agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Eliminar todos los cursos
    vaciarCarritobtn.addEventListener('click',(e)=>{
         e.preventDefault();
         articulosCarrito=[];
         carritoHTML();
    });
}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Eliminar del arreglo de articulosCarrito
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId);
        carritoHTML();
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCursos(curso){
    //Crear un objeto literal con el contenido del curso actual
    const infoCurso = {
        imagen:curso.querySelector('img').src,//Seleccionando de la variable 
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //Comprabando si un articulo ya existe en el carrito
    const existe=articulosCarrito.some(curso=>curso.id===infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos=articulosCarrito.map(curso=>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            }else{
                return curso;//retorna los objetos que NO son los actualizados
            }
        });
        articulosCarrito=[...cursos];
    }else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito=[...articulosCarrito,infoCurso];
        carritoHTML();
    }

}
//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarCarrito();
    //Reccore el carrito y genera el HTML
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${imagen}" width="100px">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        //Agregar el HTML al carrito
        contenedorCarrito.appendChild(row);
    });
}

function limpiarCarrito() {
    
    //Forma lenta
    //contenedorCarrito.innerHTML='';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}