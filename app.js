//Creamos la clase que contenga el producto:
class Producto { //PASO-1
    //COMO EN REACT LUEGO VIENE EL CONSTRUCTOR PERO AQUI LE AGREGAM,OS LOS PARAMETROS DE LOS OBJETOS. 
    constructor(name,price,model){
        this.name = name,
        this.price = price,
        this.model= model
        //traduccion: de este producto su name, etc va a ser asignado del name que le paso al constructor. 

    }

}
//Creamos la clase que contenga la interfaz.Esta va a contener metodos para poder listarlo, eliminarlo. 
class UserInterfaz{ //PASO-2 

    addProduct( product){ //PASO-5 Usamos addProduct- toma como parametro la const que contiene new product
        const productList =  document.getElementById("product-list"); //capturamos y almacenamos.
        // creamos un elemento que luego se lo pasaremos a productList:
        const elementProduc = document.createElement('div');
        elementProduc.innerHTML = ` <div class='card text-center mb-4'>
        <div class='card-body'>
        <strong> Producto:</strong>${product.name}
        <strong>Precio:</strong>${product.price}
        <strong>Modelo:</strong>${product.model}
        <a href='#' class='btn btn-danger ml-4' name='delete'>Delete</a>
        </div>
         </div>
`
       //hasta aquí fue creado pero no insertado, para ello hacemos lo siguiente:
       productList.appendChild(elementProduc);
       /*importante: el boton Delete se creo en el paso 7 y en vez de id utilizamos name='delete' porque va a
       ser utilizado en varios lugares o varias veces*/


    }
    //PASO-6- para resetear el formulario luego del producto creado, creamos esta funcion y la llamamos (abajo) despues de UI.addProduct(producto)
    resetForm(){
        document.getElementById('product-form').reset();
    }
    //PASO-8 primero debemos agregar a nuestro  producto un boton de delete. 
    deleteProduct(e){
        //si el click es sobre el elemento con la propiedad name='delete', hay que eliminarlo.
        if(e.name === 'delete'){

            /* e.parentElement nos permite seleccionar  el padre del boton.Pero para seleccionar el padre del padre
            es e.parentElement.parentElement y a su padre parentElement una vez mas.
            */const elemento = e.parentElement.parentElement.parentElement;
            elemento.remove();
            //PASO-10 luego de crear la funcion showmenssage() la  volvemos a utilizar aqui:
            this.showMessage('Producto eliminado','danger')



        }

    }
    /*PASO -9 Creamos un mensaje para mostrar como error o satisfactorio.
    para esto tbn creamos un div usamos como parametro el mensaje y una clase(los nombres son genericos)*/
    showMessage(menssage,cssClass){
        const mensaje = document.createElement('div');
        mensaje.className = `alert alert-${cssClass} mt-3`;
        mensaje.appendChild(document.createTextNode(menssage));
        //ya esta creado ahora a selleccionar donde queremos que aparezca, en nuestro caso en el div container, para eso usamos queryselector.
        const container = document.querySelector('.container');
        const app= document.querySelector('#app');
        container.insertBefore(mensaje, app);// Aca digo que inserte mensaje dentro de container pero antes que app.
        //la llamamos abajo.
        setTimeout(()=>{
            //seleccionamos elementos con la clase alert y lo removemos en 2 segundos. 
            document.querySelector('.alert').remove();

        },2000)

    }

}
//Entonces tenemos dos clases una que interactua con el html, el dom . y otra que solo muestra las propiedades del producto.

//Eventos del Dom: PASO-3
document.getElementById('product-form')
.addEventListener('submit', (e)=>{ //este (e) es el evento capturado para poder hacer el preventdefault del final.
    const name = document.getElementById("name").value;
   const price = document.getElementById("product-price").value;
    const model = document.getElementById("model").value;

    const product = new Producto( price, name, model ); // podemos hacer un console.log, o almacenar en una const los datos.
    /*  para esto se utiliza  las clases. Creamos un objeto producto nuevo con 
    las propiedades que le pasamos en constructor .
    terminan formando un objeto unico. Un unico producto.
    Para ver este producto tengo que "hablar" con la interfaz y de la interfaz se encarga la clase UserInterfaz desde addProduc*/ 

//PASO-4 llamar a la interfaz UserInterfaz, es decir crear el objeto desde la interfaz:
    const UI = new UserInterfaz();
/*PASO-10 Una vez creado todo le agregamos validacion y podemos utilizar como alert el mismo showMenssage():

/*/

if( name === '' || price ==='' || model === ''){
    return UI.showMessage('Complete los campos por favor.','info')
}


    UI.addProduct(product); // de esta constante utilizo la funcion addProduct y le paso la const que tiene new Producto
//--------------------------------------
    UI.resetForm(); // esta funcion fue creado en el Paso-6
    UI.showMessage('Producto agregado satisfactoriamente','success');/* FUNCION CREADA EN EL PASO -9.dENTO DE LOS PARENTESIS agregamos el mensaje primero y la clase bootstrap despues
    ambos en la funcion son genericos*/
    e.preventDefault();

 
    
})
//PASO-7 Se captura el evento (e). con e.target coroboramos que sea click sobre el boton y no en otro lado para poder llamarlo en el paso 8.
document.getElementById("product-list").addEventListener('click', (e)=>{ 
    //no se puede hacer getElement.ByName.addEv...no reconoce el metodo. por eso usamos getElementById.
const UI = new UserInterfaz();
UI.deleteProduct(e.target)
})
