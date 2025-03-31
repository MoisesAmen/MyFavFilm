(function() {
    
   obtenerProducciones();     
  
   //Selector de paginacion
    const moviesPerPage = 8;
    let currentPage = 1;

    let filtrar = false;


    // crear los años
    const years = document.createElement('option');
    const max = new Date().getFullYear();
    const min = max - 100;

    for(let i = max; i >  min; i--) {
        const option =  document.createElement('option');
        option.value = i;
        option.innerText = i;
        document.querySelector('#filtroAnioEstreno').appendChild(option);
    }

    //Selector de filtros
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroGenero = document.getElementById('filtroGenero');
    const filtroActor = document.getElementById('filtroActor');
    const filtroAnioEstreno = document.getElementById('filtroAnioEstreno');
    const filtroCalificacion = document.getElementById('filtroCalificacion');
    const filtroDuracion = document.getElementById('filtroDuracion');
    const filtroDirector = document.getElementById('filtroDirector');
   
    const filtroForm = document.getElementById('filtros-inputs');

    // Selectores de paginacion
    const pagination = document.getElementById('pagination');    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Event Listeners para el filtrado
    filtroTipo.addEventListener('input', e => {
        datosBusqueda.tipo = e.target.value;
        filtrando = true;
        actualizarFiltrado();
        filtrarProducciones();
    });

    filtroGenero.addEventListener('input', e => {
        datosBusqueda.genero = e.target.value;
        filtrando = true;
        actualizarFiltrado();
        filtrarProducciones();
    });

    filtroActor.addEventListener('input', e => {
        datosBusqueda.actor = e.target.value;
        filtrando = true;
        actualizarFiltrado();
        filtrarProducciones();
    });

    filtroAnioEstreno.addEventListener('input', e => {
        datosBusqueda.fechaEstreno = e.target.value;
        filtrando = true;
        actualizarFiltrado();
        filtrarProducciones();
    });

    filtroCalificacion.addEventListener('input', e => {
        datosBusqueda.calificacion = parseInt(e.target.value);
        filtrando = true;
        actualizarFiltrado();
        filtrarProducciones();
    });

    filtroDuracion.addEventListener('input', e => {
        datosBusqueda.duracion = e.target.value;
        filtrando = true;
        actualizarFiltrado();
        filtrarProducciones();
    });

    filtroDirector.addEventListener('input', e => {
        datosBusqueda.director = e.target.value;
        filtrando = true;
        actualizarFiltrado();
        filtrarProducciones();
    });

    const datosBusqueda = {
        nombre: '',
        tipo: '',
        fechaEstreno: '',
        genero: '',
        calificacion: '',
        duracion: '',
        director: '',
        actor: '',    
    }


    // Botón para mostrar el Modal de Agregar tarea
    const nuevaTareaBtn = document.querySelector('#agregar-pelicula');
    nuevaTareaBtn.addEventListener('click', function () {
        mostrarFormulario();       
    });   

    class Producciones {
        constructor() {
            this.producciones = [];
        }
        agregarProduccion(produccion) {
            this.producciones = [...this.producciones, produccion];            
        }
        editarProduccion(produccionActualizada) {
            this.producciones = this.producciones.map( produccion => produccion.id === produccionActualizada.id ? produccionActualizada : produccion);            
        }
        eliminarProduccion(id) {
            this.producciones = this.producciones.filter( produccion => produccion.id !== id);            
        }
        // Método para obtener todas las películas
        obtenerTodas() {
            return this.producciones;
        }

        buscarProduccionPorId(id) {
            // Utiliza el método find para buscar la producción por su ID
            return this.producciones.some(produccion => produccion.id === id);
            // Si se encuentra alguna producción con el ID, devuelve true, de lo contrario, devuelve false
        }
    
        // Método para determinar en qué página se encuentra una película específica
        paginaDeProduccion(idProduccion, produccionesPorPagina) {
            const index = this.producciones.findIndex(produccion => produccion.id === idProduccion);
            if (index !== -1) {
            return Math.floor(index / produccionesPorPagina)+1; // Páginas indexadas desde 0
            } else {
            return -1; // Si la película no se encuentra, retorna -1
            }
        }
    
        ultimaPagina() {
            return Math.ceil(this.producciones.length / moviesPerPage);
        }   

        obtenerDirectores() {
            const directores = new Set(); // Utilizamos un Set para evitar duplicados
            this.producciones.forEach(produccion => {
                directores.add(produccion.director);
            });
            return Array.from(directores); // Convertimos el Set de directores a un array
        }      
    
        agregarDirectoresComoOpciones() {
            const directoresUnicos = this.obtenerDirectores();
            const selectDirector = document.getElementById("filtroDirector");       
    
            // Agregar opciones de directores
            directoresUnicos.forEach(director => {
                const option = document.createElement("option");
                option.value = director;
                option.textContent = director;
                selectDirector.appendChild(option);
            });
        }
    
        actualizarDirectoresComoOpciones() {
            const directoresUnicos = this.obtenerDirectores();
            const selectDirector = document.getElementById("filtroDirector");
    
            console.log(directoresUnicos);
    
            // Limpiar las opciones actuales
            selectDirector.innerHTML = "";
    
            // Limpiar opciones existentes
            selectDirector.innerHTML = '<option value="">Seleccione</option>';
    
            // Agregar opciones de directores
            directoresUnicos.forEach(director => {
                const option = document.createElement("option");
                option.value = director;
                option.textContent = director;
                selectDirector.appendChild(option);
            });
        }

        obtenerActores(){
            const actores = new Set();
            this.producciones.forEach(produccion => {
                produccion.protagonista.forEach(protagonista => {
                    const nombreActor = Object.keys(protagonista)[0];
                    actores.add(nombreActor);
                });
            });
            return Array.from(actores);
        }       
    
        agregarActoresComoOpciones() {
            const actoresUnicos = this.obtenerActores();
            const selectActor = document.getElementById("filtroActor");
    
            // Agregar opciones de actores
            actoresUnicos.forEach(actor => {
                const option = document.createElement("option");
                option.value = actor;
                option.textContent = actor;
                selectActor.appendChild(option);
            });
        }
    
        actualizarActoresComoOpciones() {
            const actoresUnicos = this.obtenerActores();
            const selectActor = document.getElementById("filtroActor");
    
            // Limpiar las opciones actuales
            selectActor.innerHTML = "";
    
            // Limpiar opciones existentes
            selectActor.innerHTML = '<option value="">Seleccione</option>';
    
            // Agregar opciones de actores
            actoresUnicos.forEach(actor => {
                const option = document.createElement("option");
                option.value = actor;
                option.textContent = actor;
                selectActor.appendChild(option);
            });
        }
    } 
    
    const administrarproducciones = new Producciones();
    const administrarproduccionesFiltradas = new Producciones();

    async function obtenerProducciones() {        
        try {
            const proyectoId = obtenerProyecto();
            const url = `/api/producciones?id=${proyectoId}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();  
            administrarproducciones.producciones = resultado.producciones;          
            //producciones = resultado.producciones;
            //console.log(producciones);
            mostrarProducciones(currentPage, administrarproducciones);
            mostrarProduccionesMovil(administrarproducciones);

            createPaginationButtons(calcularTotalPaginas(administrarproducciones), administrarproducciones);
            updateButtons(administrarproducciones);

            administrarproducciones.agregarDirectoresComoOpciones();
            administrarproducciones.agregarActoresComoOpciones();

            actualizarFiltrado();

        } catch (error) {
            console.log(error);
        }
    }

    function mostrarProducciones(page, {producciones}) {
        //const producciones = administrarproducciones.obtenerTodas();
        //console.log(producciones);        
        const movieCatalog = document.getElementById("movieCatalog");
        limpiarHtmlSeleccionado(movieCatalog) 

        if(producciones.length === 0) {           

            const textoNoProducciones = document.createElement('LI');
            textoNoProducciones.textContent = 'No Hay Producciones Registradas';
            textoNoProducciones.classList.add('no-producciones');

            movieCatalog.appendChild(textoNoProducciones);
            return;
        }        

        //Nuevas modificaciones//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const displayedMovies = producciones.slice(startIndex, endIndex);

        // Recorrer las producciones y agregarlas al catálogo
        displayedMovies.forEach(produccion => {            

            const {nombre, urlImagen, id} = produccion;

            // Crear elemento div para cada producción
            const produccionDiv = document.createElement("div");
            //produccionDiv.classList.add("pelicula" , "swiper-slide");
            produccionDiv.classList.add("pelicula");
            produccionDiv.dataset.id = id;

            // Crear elemento de imagen
            const imagen = document.createElement("img");
            imagen.src = urlImagen // Asignar la URL de la imagen
            imagen.alt = nombre; // Asignar el nombre como texto alternativo
            // Agregar evento click para mostrar detalles de la película en el modal
            imagen.ondblclick = function() {
                mostrarDetallesProduccion(produccion);
            }
            //imagen.addEventListener("dblclick", () => this.mostrarDetallesPelicula(produccion));
            produccionDiv.appendChild(imagen); // Agregar la imagen al div de la producción

            // Crear elemento de título
            const titulo = document.createElement("p");
            titulo.classList.add("titulo");
            titulo.textContent = nombre; // Asignar el nombre de la producción como texto del título
            produccionDiv.appendChild(titulo); // Agregar el título al div de la producción

            // Crear contenedor para los botones
            const botones = document.createElement("div");
            botones.classList.add("botones");

            // Crear botón de editar
            const botonEditar = document.createElement("button");
            botonEditar.onclick = function() {
                mostrarFormulario(editar = true, {...produccion});
            }
            // Asignar el icono como HTML al botón
            botonEditar.innerHTML = '<i class="bi bi-pencil-square"></i>';
            //botonEditar.textContent = "Editar";
            botonEditar.classList.add("editar");            
            botones.appendChild(botonEditar);

            // Crear botón de eliminar
            const botonEliminar = document.createElement("button");
            botonEliminar.onclick = function() {
                confirmarEliminarProduccion({...produccion});
            } 
            // Asignar el icono como HTML al botón
            botonEliminar.innerHTML = '<i class="bi bi-trash3"></i>';
            //botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("eliminar");            
            botones.appendChild(botonEliminar);

            // Agregar contenedor de botones al div de la producción
            produccionDiv.appendChild(botones);

            // Agregar el div de la producción al catálogo
            movieCatalog.appendChild(produccionDiv);            
        });       
        
    }

    function mostrarProduccionesMovil({producciones}) {
        //const producciones = administrarproducciones.obtenerTodas();
        //console.log(producciones);        
        const movieCatalogMovil = document.getElementById("movieCatalogMovil");
        limpiarHtmlSeleccionado(movieCatalogMovil) 

        if(producciones.length === 0) {           

            const textoNoProducciones = document.createElement('LI');
            textoNoProducciones.textContent = 'No Hay Producciones Registradas';
            textoNoProducciones.classList.add('no-producciones');

            movieCatalogMovil.appendChild(textoNoProducciones);
            return;
        }          

        // Recorrer las producciones y agregarlas al catálogo
        producciones.forEach(produccion => {            

            const {nombre, urlImagen, id} = produccion;

            // Crear elemento div para cada producción
            const produccionDiv = document.createElement("div");
            produccionDiv.classList.add("pelicula" , "swiper-slide");
            //produccionDiv.classList.add("pelicula");
            produccionDiv.dataset.id = id;

            // Crear elemento de imagen
            const imagen = document.createElement("img");
            imagen.src = urlImagen // Asignar la URL de la imagen
            imagen.alt = nombre; // Asignar el nombre como texto alternativo
            // Agregar evento click para mostrar detalles de la película en el modal
            imagen.onclick = function() {
                mostrarDetallesProduccion(produccion);
            }
            //imagen.addEventListener("dblclick", () => this.mostrarDetallesPelicula(produccion));
            produccionDiv.appendChild(imagen); // Agregar la imagen al div de la producción

            // Crear elemento de título
            const titulo = document.createElement("p");
            titulo.classList.add("titulo");
            titulo.textContent = nombre; // Asignar el nombre de la producción como texto del título
            produccionDiv.appendChild(titulo); // Agregar el título al div de la producción

            // Crear contenedor para los botones
            const botones = document.createElement("div");
            botones.classList.add("botones");

            // Crear botón de editar
            const botonEditar = document.createElement("button");
            botonEditar.onclick = function() {
                mostrarFormulario(editar = true, {...produccion});
            }
            // Asignar el icono como HTML al botón
            botonEditar.innerHTML = '<i class="bi bi-pencil-square"></i>';
            //botonEditar.textContent = "Editar";
            botonEditar.classList.add("editar");            
            botones.appendChild(botonEditar);

            // Crear botón de eliminar
            const botonEliminar = document.createElement("button");
            botonEliminar.onclick = function() {
                confirmarEliminarProduccion({...produccion});
            } 
            // Asignar el icono como HTML al botón
            botonEliminar.innerHTML = '<i class="bi bi-trash3"></i>';
            //botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("eliminar");            
            botones.appendChild(botonEliminar);

            // Agregar contenedor de botones al div de la producción
            produccionDiv.appendChild(botones);

            // Agregar el div de la producción al catálogo
            movieCatalogMovil.appendChild(produccionDiv);            
        });   
        
        
        var swiper;
        var mySwiper = document.querySelector('.mySwiper');
        var slides = mySwiper.querySelectorAll('.swiper-slide');

        if (slides.length <= 2) {
            swiper = new Swiper('.mySwiper', {
                slidesPerView: slides.length, // Mostrar todos los elementos disponibles
                spaceBetween: 10,
                grabCursor: true,
                loop: false // Deshabilitar el bucle si hay solo 1 o 2 elementos
            });
        } else {
            swiper = new Swiper('.mySwiper', {
                slidesPerView: 2,
                spaceBetween: 10,
                grabCursor: true,
                loop: true,
                breakpoints: {
                    560: {
                        slidesPerView: 3
                    }
                }
            });
        }  

        
        
    }

    function DatosPelicula(peliculaObj) {
        peliculaObj.nombre = document.getElementById("nombre").value;
        peliculaObj.tipo = document.getElementById("tipo").value;
        peliculaObj.fechaEstreno = document.getElementById("fecha_estreno").value;    
    
        // Reiniciar el arreglo de géneros seleccionados
        peliculaObj.genero = [];

         // Obtener todos los checkboxes de género
        const checkboxesGenero = document.querySelectorAll('input[type="checkbox"][name="generos"]');
    
        // Agregar los géneros seleccionados al arreglo peliculaObj.genero
        checkboxesGenero.forEach(function(checkbox) {
            if (checkbox.checked) {
                const label = document.querySelector(`label[for="${checkbox.id}"]`);
                if (label) {
                    peliculaObj.genero.push(label.textContent);
                }
            }
        });
    
        peliculaObj.calificacion = parseFloat(document.getElementById("calificacion").value);
        peliculaObj.duracion = parseInt(document.getElementById("duracion").value);
        peliculaObj.director = document.getElementById("director").value;
    
        const protagonistaElements = document.querySelectorAll("#protagonistas .protagonista");
        //console.log(protagonistaElements);
        
        protagonistaElements.forEach(function(element) {
            const actor = element.querySelector("input:nth-of-type(1)").value.trim();
            const personaje = element.querySelector("input:nth-of-type(2)").value.trim();

            if (actor !== "" && personaje !== "") {
                peliculaObj.protagonista.push({ [actor]: personaje });
            }
        });
    
        peliculaObj.presupuesto = parseInt(document.getElementById("presupuesto").value);
        peliculaObj.taquillaMundial = parseInt(document.getElementById("taquillaMundial").value);        
        peliculaObj.sinopsis = document.getElementById("sinopsis").value;
        peliculaObj.urlImagen = document.getElementById("urlImagen").value;
        peliculaObj.urlTrailer = document.getElementById("urlTrailer").value;
        
    }    

    function mostrarFormulario(editar = false, produccion = {}) {       

        const overlayDiv = crearOverlay(editar, produccion);
        
        
        overlayDiv.addEventListener('click', function(event) {
            if (event.target.id === 'closeButton' || event.target.id === 'x') {
                overlayDiv.remove();                                                     
            }

            if(event.target.id === 'submitButton') {
                const peliculaObj = {
                    nombre: '',
                    tipo: '',
                    fechaEstreno: '',
                    genero: [],
                    calificacion: '',
                    duracion: '',
                    director: '',
                    protagonista: [],
                    presupuesto: '',
                    taquillaMundial: '',
                    sinopsis: '',
                    urlImagen: '',
                    urlTrailer: '',
                    id: '',
                    proyectoId: ''
                };

                DatosPelicula(peliculaObj);

                const{nombre, tipo, fechaEstreno, genero, calificacion, duracion, director, protagonista, presupuesto, taquillaMundial, sinopsis, urlImagen, urlTrailer, id} = peliculaObj;
                
                const nombreProtagonistasLargos = protagonista.some(personaje => {
                    const actor = Object.keys(personaje)[0]; // Obtenemos el nombre del actor del primer (y único) índice del objeto
                    return actor.length > 45 || personaje[actor].length > 45;
                });

                if(nombre === '' || tipo === '' || fechaEstreno === '' || genero.length === 0 ||  calificacion === '' || duracion === '' || director === '' || protagonista.length === 0 || presupuesto === '' || taquillaMundial === '' || sinopsis === '' || urlImagen === '' || urlTrailer === '') {
                    //console.log(peliculaObj);
                    mostrarAlerta('Todos los mensajes son Obligatorios', 'error', document.querySelector('.modal-footer'))                    
                    return;
                } else if (parseFloat(calificacion) > 5 || parseFloat(calificacion) < 1 ) {
                    mostrarAlerta('La calificación debe ser un número entre 1 y 5', 'error', document.querySelector('.modal-footer'))
                    return;
                } else if (parseInt(duracion) < 0 || parseInt(presupuesto) < 0 || BigInt(taquillaMundial) < 0) {
                    mostrarAlerta('Dato invalido', 'error', document.querySelector('.modal-footer'))    
                    console.log(protagonista);                
                    return;
                } else if (nombre.length > 45 || director.length > 45 || nombreProtagonistasLargos) {
                    mostrarAlerta('El nombre, director o alguno de los protagonistas no puede tener más de 45 caracteres', 'error', document.querySelector('.modal-footer'));
                    return;
                } else if (tipo === 'Película' && parseInt(duracion) > 51420) {
                    mostrarAlerta('La película más larga del mundo hasta la fecha es “Logistics” con 51,420 min', 'error', document.querySelector('.modal-footer'));
                    return;
                }else if (tipo === 'Anime' && parseInt(duracion) > 65000) {
                    mostrarAlerta('El anime más larga del mundo hasta la fecha es "Sazae-San" tiene con 65,000 minutos', 'error', document.querySelector('.modal-footer'));
                    return;
                }else if (tipo === 'Serie' && parseInt(duracion) > 59899) {
                    mostrarAlerta('La serie más larga del mundo hasta la fecha es “La Ley y el Orden” con 59,899 minutos.', 'error', document.querySelector('.modal-footer'));
                    return;
                }else if (tipo === 'Corto' && parseInt(duracion) > 30) {
                    mostrarAlerta('El cortometraje más larga del mundo hasta la fecha es “Mi Holocausto” con 30 minutos.', 'error', document.querySelector('.modal-footer'));
                    return;
                }else if (parseInt(presupuesto) > 500) {
                    mostrarAlerta('El presupuesto nunca ha sido mayor a 500 millones de dolares', 'error', document.querySelector('.modal-footer'));
                    return;
                }else if (BigInt(taquillaMundial) > 2923706026) {
                    mostrarAlerta('La Pelicula más taquillera de la historia recaudo 2,923,706,026 $, lamentamblemente no es End Game', 'error', document.querySelector('.modal-footer'));
                    return;
                }
                console.log(protagonista);

                if(editar) {
                    peliculaObj.id = produccion.id;
                    peliculaObj.proyectoId = produccion.proyectoId;                    
                    actualizarProduccion(peliculaObj);
                } else {
                    agregarProduccion(peliculaObj);                  
                }
            }
        });

        document.querySelector('.dashboard').appendChild(overlayDiv);

        if (editar) {
            cargarEdicionGeneroYProtagonista(produccion)
        }

        const addProtagonistaBtn = document.getElementById("addProtagonistaButton")
        addProtagonistaBtn.addEventListener("click", agregarProtagonista);

        const modalInsertar = document.getElementById('overlay');
        const bootstrapModalInsertar = new bootstrap.Modal(modalInsertar, {});        

        eliminarProtagonista()

        bootstrapModalInsertar.show();
    }    

    function cargarEdicionGeneroYProtagonista(produccion) {

        document.getElementById('tipo').value = produccion.tipo;

        // Marcar las casillas de verificación correspondientes a los géneros
        produccion.genero.forEach(gen => {
            const checkboxId = gen.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "_"); // Convertir a minúsculas, sin tildes y sin espacios
            const checkbox = document.getElementById(checkboxId);         
            if (checkbox) {
                checkbox.checked = true; // Marcar la casilla de verificación
            }
        });

        // Agregar los protagonistas al formulario
        const protagonistasDiv = document.getElementById("protagonistas");
        protagonistasDiv.innerHTML = ""; // Limpiar los protagonistas existentes

        produccion.protagonista.forEach(actor => {
            const protagonistaDiv = document.createElement("div");
            protagonistaDiv.classList.add("protagonista");

            const protagonistaInput = document.createElement("input");
            protagonistaInput.setAttribute("type", "text");
            protagonistaInput.setAttribute("placeholder", "Nombre del actor");
            protagonistaInput.value = Object.keys(actor)[0]; // Establecer el nombre del actor

            const personajeInput = document.createElement("input");
            personajeInput.setAttribute("type", "text");
            personajeInput.setAttribute("placeholder", "Personaje");
            personajeInput.value = Object.values(actor)[0]; // Establecer el personaje

            const removeButton = document.createElement("button");            
            //removeButton.textContent = "X";
            removeButton.type = "button";
            removeButton.classList.add("removeProtagonista"); 
            removeButton.addEventListener("click", function() {
                protagonistasDiv.removeChild(protagonistaDiv);
            });  
            removeButton.innerHTML = '<i class="bi bi-backspace"></i>';

            protagonistaDiv.appendChild(protagonistaInput);
            protagonistaDiv.appendChild(personajeInput);
            protagonistaDiv.appendChild(removeButton);

            protagonistasDiv.appendChild(protagonistaDiv);
        });
    }

    function crearFormulario(produccion) {
        const modalBodyDiv = document.createElement("div");
        modalBodyDiv.classList.add("modal-body");
        modalBodyDiv.innerHTML = `
            <form id="nueva-pelicula" class="form-container">                    
                <div class="control">
                    <label for="nombre">Nombre de la producción: </label>
                    <input 
                        type="text" 
                        id="nombre" 
                        placeholder="Nombre de la produccion..."
                        value = "${produccion.nombre ? produccion.nombre : ''}"
                    />
                </div>
                <div class="grupo">
                    <div class="control">
                        <label for="tipo">Tipo: </label>
                        <select id="tipo">
                            <option value="Película">Película</option>
                            <option value="Serie">Serie</option>
                            <option value="Corto">Corto</option>
                            <option value="Anime">Anime</option>
                        </select>
                    </div>
                    <div class="control">
                        <label for="fecha_estreno">Fecha de Estreno: </label>
                        <input 
                            type="date" 
                            id="fecha_estreno" 
                            placeholder="Fecha de Estreno..." 
                            value = "${produccion.fechaEstreno ? produccion.fechaEstreno : ''}"
                        />
                    </div>
                </div>
                <div class="control">
                    <fieldset>
                        <legend>Géneros:</legend>
                        <div class="columnas">
                            <div class="columna">
                                <div class="checkgenero">
                                    <input type="checkbox" id="accion" name="generos" value="accion"/>
                                    <label for="accion">Acción</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="ciencia_ficcion" name="generos" value="ciencia_ficcion"/>
                                    <label for="ciencia_ficcion">Ciencia Ficción</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="fantasia" name="generos" value="fantasia"/>
                                    <label for="fantasia">Fantasía</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="aventura" name="generos" value="aventura"/>
                                    <label for="aventura">Aventura</label><br/>
                                </div>   
                                <div class="checkgenero">                                                
                                    <input type="checkbox" id="romance" name="generos" value="romance"/>
                                    <label for="romance">Romance</label><br/>
                                </div>                                  
                                
                            </div>

                            <div class="columna">
                                <div class="checkgenero">
                                    <input type="checkbox" id="comedia" name="generos" value="comedia"/>
                                    <label for="comedia">Comedia</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="drama" name="generos" value="drama"/>
                                    <label for="drama">Drama</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="suspenso" name="generos" value="suspenso"/>
                                    <label for="suspenso">Suspenso</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="terror" name="generos" value="terror"/>
                                    <label for="terror">Terror</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="animacion" name="generos" value="animacion"/>
                                    <label for="animacion">Animación</label><br/>                                                
                                </div>           
                                
                            </div>

                            <div class="columna">
                                <div class="checkgenero">
                                    <input type="checkbox" id="thriller" name="generos" value="thriller"/>
                                    <label for="thriller">Thriller</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="misterio" name="generos" value="misterio"/>
                                    <label for="misterio">Misterio</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="crimen" name="generos" value="crimen"/>
                                    <label for="crimen">Crimen</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="western" name="generos" value="western"/>
                                    <label for="western">Western</label><br/>                                            
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="guerra" name="generos" value="guerra"/>
                                    <label for="guerra">Guerra</label><br/>
                                </div>
                            </div>

                            <div class="columna">
                                <div class="checkgenero">
                                    <input type="checkbox" id="documental" name="generos" value="documental"/>
                                    <label for="documental">Documental</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="biografia" name="generos" value="biografia"/>
                                    <label for="biografia">Biografía</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="historia" name="generos" value="historia"/>
                                    <label for="historia">Historia</label><br/>
                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="musical" name="generos" value="musical"/>
                                    <label for="musical">Musical</label><br/>

                                </div>
                                <div class="checkgenero">
                                    <input type="checkbox" id="otros" name="generos" value="otros"/>
                                    <label for="otros">Otros</label><br/>
                                </div>
                            </div>                           
                            
                        </div>
                    </fieldset>
                </div>
                <div class="grupo">
                    <div class="control">
                        <label for="calificacion">Calificación: </label>
                        <input 
                            type="number" 
                            id="calificacion" 
                            placeholder="Calificación..." 
                            min="1" 
                            max="5" 
                            step="0.1"
                            value="${produccion.calificacion ? produccion.calificacion : '4'}"                             
                        />
                    </div>
                    <div class="control">
                        <label for="duracion">Duración (minutos): </label>
                        <input 
                            type="number" 
                            id="duracion" 
                            placeholder="Duración..." 
                            step="1" 
                            value="${produccion.duracion ? produccion.duracion : '120'}"
                        />
                    </div>  
                </div>                    
                <div class="control">
                    <label for="director">Director: </label>
                    <input 
                        type="text" 
                        id="director" 
                        placeholder="Director..." 
                        pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+" 
                        title="Ingresa solo letras y espacios" required
                        value="${produccion.director ? produccion.director : ''}"
                    />
                </div>
                <div class="control">
                    <label for="protagonista">Protagonistas: </label>
                    <div id="protagonistas">
                        <div class="protagonista">
                            <input type="text" placeholder="Nombre del actor"/>
                            <input type="text" placeholder="Personaje"/>
                            <button type="button" class="removeProtagonista">
                                <i class="bi bi-backspace"></i>
                            </button>
                        </div>
                    </div>
                    <button type="button" id="addProtagonistaButton" class="button-32" role="button">Agregar Protagonista</button>                        
                </div>                                      
                <div class="control">
                    <label for="presupuesto">Presupuesto: </label>
                    <div class="grupo2">
                        <input 
                            type="number" 
                            id="presupuesto" 
                            placeholder="Presupuesto..." 
                            min="10" 
                            step="10" 
                            value="${produccion.presupuesto ? produccion.presupuesto : '100'}"
                        />
                        <span> millones de dólares</span>
                    </div>
                    
                </div>
                <div class="control">
                    <label for="taquillaMundial">Taquilla Mundial: </label>
                    <div class="grupo2">
                        <input 
                            type="number" 
                            id="taquillaMundial" 
                            placeholder="Taquilla Mundial..." 
                            min="10000" 
                            step="10000" 
                            value="${produccion.taquillaMundial ? produccion.taquillaMundial : '1000000'}"
                        />
                        <span> $</span>
                    </div>
                </div>          
                
                <div class="control" id="tam_completo">
                    <label for="sinopsis">Sinopsis: </label>
                    <textarea 
                        id="sinopsis" 
                        placeholder="Sinopsis..." 
                        rows="4"                        
                    >${produccion.sinopsis ? produccion.sinopsis : ''}</textarea>
                </div>
                <div class="control" id="tam_completo">
                    <label for="urlImagen">URL de Imagen: </label>
                    <input 
                        type="text" 
                        id="urlImagen" 
                        placeholder="URL de Imagen" 
                        pattern="https?://.+"
                        title="Ingresa una URL válida"
                        value="${produccion.urlImagen ? produccion.urlImagen : ''}"
                    />
                    <small>Ejemplo: https://www.ejemplo.com/imagen.jpg</small>
                </div>
                <div class="control" id="tam_completo">
                    <label for="urlTrailer">URL de Trailer: </label>
                    <input 
                        type="text" 
                        id="urlTrailer" 
                        placeholder="URL de Trailer"
                        pattern="https?://.+"   
                        title="Ingresa una URL válida"
                        value="${produccion.urlTrailer ? produccion.urlTrailer : ''}"
                    />
                </div>                                    
            </form>      
        `;
        return modalBodyDiv;
    }

    function crearOverlay(editar, produccion) {        
        // Crear el div overlay
        const overlayDiv = document.createElement("div");
        overlayDiv.id = "overlay";
        overlayDiv.classList.add("modal", "fade");
        overlayDiv.setAttribute("data-bs-backdrop", "static");
        overlayDiv.setAttribute("data-bs-keyboard", "false");
        overlayDiv.setAttribute("tabindex", "-1");
        overlayDiv.setAttribute("aria-hidden", "true");

        // Crear el div modal-dialog
        const modalDialogDiv = document.createElement("div");
        modalDialogDiv.classList.add("modal-dialog", "modal-dialog-scrollable");

        // Crear el div modal-content
        const modalContentDiv = document.createElement("div");
        modalContentDiv.classList.add("modal-content");

        // Crear el div modal-header
        const modalHeaderDiv = document.createElement("div");
        modalHeaderDiv.classList.add("TitleForm", "modal-header");

        // Crear el título h1 dentro del modal-header
        const titleH1 = document.createElement("h1");
        titleH1.classList.add("modal-title", "fs-1", "font-bold");
        titleH1.id = "insertarProduccion";        
        if (editar) {
            titleH1.textContent = "Editar Producción";
        } else {
            titleH1.textContent = "Insertar Producción";
        }

        // Crear el botón de cierre
        const closeButton1 = document.createElement("button");
        closeButton1.type = "button";
        closeButton1.classList.add("btn-close");
        closeButton1.id = "x";
        closeButton1.setAttribute("data-bs-dismiss", "modal");
        closeButton1.setAttribute("aria-label", "Close");

        // Agregar el título y el botón de cierre al modal-header
        modalHeaderDiv.appendChild(titleH1);
        modalHeaderDiv.appendChild(closeButton1);

        const modalBody = crearFormulario(produccion);

        // Crear el div modal-footer
        const modalFooterDiv = document.createElement("div");
        modalFooterDiv.classList.add("modal-footer", "flex", "justify-content-between");
        modalFooterDiv.id = "footerInsertar";

        // Crear el botón "Insertar Producción"
        const submitButton = document.createElement("button");
        submitButton.type = "button";
        submitButton.id = "submitButton";
        submitButton.classList.add("button-32");
        submitButton.setAttribute("role", "button");
        if (editar) {
            submitButton.textContent = "Guardar Cambios";
        } else {
            submitButton.textContent = "Insertar Producción";
        }

        // Crear el botón "Cerrar"
        const closeButton2 = document.createElement("button");
        closeButton2.type = "button";
        closeButton2.id = "closeButton";
        closeButton2.classList.add("button-32");
        closeButton2.setAttribute("role", "button");
        closeButton2.setAttribute("data-bs-dismiss", "modal");
        closeButton2.textContent = "Cerrar";
                

        // Agregar los botones al div modal-footer
        modalFooterDiv.appendChild(submitButton);
        modalFooterDiv.appendChild(closeButton2);

        // Agregar el modal-header, modal-body y el modal-footer al modal-content
        modalContentDiv.appendChild(modalHeaderDiv);
        modalContentDiv.appendChild(modalBody);
        modalContentDiv.appendChild(modalFooterDiv);

        // Agregar el div modal-content al div modal-dialog
        modalDialogDiv.appendChild(modalContentDiv);

        // Agregar el div modal-dialog al div overlay
        overlayDiv.appendChild(modalDialogDiv);          

        return overlayDiv;
    }

    function mostrarDetallesProduccion(produccion) {

        const duracionMaxima = 300; // Duración máxima en minutos
        

        const modalDiv = crearModalDetalle();
        document.querySelector('.dashboard').appendChild(modalDiv);

        modalDiv.addEventListener('click', function(event) {
            if (event.target.id === 'closeButton' || event.target.id === 'x') {
                modalDiv.remove();                                                     
            }
        });

        const {nombre, tipo, fechaEstreno, genero, calificacion, duracion, director, protagonista, presupuesto, taquillaMundial, sinopsis, urlImagen, urlTrailer} = produccion;

        // Obtiene la fecha actual
        const fechaActual = new Date();
        
        // Obtén el año, mes y día de la fecha de estreno
        const fecha = new Date(fechaEstreno);
        fecha.setDate(fecha.getDate() + 1);
        fecha.setHours(23, 59, 59, 0);

        const year = fecha.getFullYear();
        const month = fecha.toLocaleString('default', { month: 'long' }); // Nombre del mes en texto completo
        const day = fecha.getDate();

        // Formatea la fecha en el formato deseado
        const fechaFormateada = `${day} de ${month} del ${year}`;

        //const duracionPorcentaje = (duracion / duracionMaxima) * 100;
        // Obtener el modal y sus elementos        
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        // Crear el botón para el tipo de producción
        const tipoBtn = document.createElement('button');
        tipoBtn.textContent = tipo;
        tipoBtn.classList.add('tipo-btn', `${tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}-btn`);

        // Insertar el botón al lado del modalTitle
        modalTitle.insertAdjacentElement('afterend', tipoBtn);     

        let generosHTML = `            
            <div id="mostrarGeneros">
                <p><strong>Géneros:</strong> </p>
            `;
        genero.forEach(function(gen) {
            generosHTML += ` <button class="btnGenero">${gen}</button> `;
        });
        generosHTML += '</div>';

        // Asignar el título de la película al modal
        modalTitle.textContent = nombre;    
        
        const img = document.createElement('img');
        img.classList.add('img-fluid');
        img.src = urlImagen;
        img.alt = `receta ${nombre}`;

        // Crear el título de clasificación
        const h3 = document.createElement('h3');
        h3.classList.add('my-3');
        h3.textContent = 'Clasificación';

        // Añadir los elementos al modalBody
        modalBody.appendChild(img);

         // Verifica si la fecha de estreno aún no ha llegado
         if (fecha > fechaActual) {
            modalBody.insertAdjacentHTML('beforeend',`
                <div id="releaseCountdown" class="countdown-container">
                    <h2>Contador Regresivo para el Estreno</h2>
                    <div id="countdown">
                        <div class="time-section">
                            <span id="days" class="time">00</span>
                            <div class="smalltext">Días</div>
                        </div>
                        <div class="time-section">
                            <span id="hours" class="time">00</span>
                            <div class="smalltext">Horas</div>
                        </div>
                        <div class="time-section">
                            <span id="minutes" class="time">00</span>
                            <div class="smalltext">Minutos</div>
                        </div>
                        <div class="time-section">
                            <span id="seconds" class="time">00</span>
                            <div class="smalltext">Segundos</div>
                        </div>
                    </div>
                </div>
            `);

            cuentaRegresiva(fechaEstreno)
        }

        modalBody.appendChild(h3);
        modalBody.appendChild(crearStars(calificacion));
        
        modalBody.insertAdjacentHTML('beforeend',`            
            <h3 class="my-3">Sinopsis</h3>            
            <div class="recuadro">
                <p>${sinopsis}</p>
            </div>
            <h3 class="my-3">Datos Importantes</h3>            
            <div class="recuadro">
                <p><strong>Fecha de Estreno:</strong> ${fechaFormateada}</p>
                ${generosHTML}                
                <p><strong>Duración:</strong> ${duracion} minutos</p>
                <p><strong>Director:</strong> ${director}</p>
                <p><strong>Presupuesto:</strong> ${presupuesto} millones de dólares</p>
                <p><strong>Taquilla Mundial:</strong> $ ${taquillaMundial}</p>                               

                <!--<div class="trailer-container">                    
                    <button id="playTrailerBtn">Ver Tráiler</button>
                    <div id="trailerModal" class="trailer-modal">
                        <div class="trailer-modal-content">
                            <span class="close-trailer">×</span>                            
                            <iframe id="trailerIframe" src="${urlTrailer}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div> -->
            </div>

            <h3 class="my-3">Protagonistas</h3>
        `);            
        
        //relojArena(duracion)

        /*const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');

        protagonista.forEach(protagonista => {
            const actor = Object.keys(protagonista)[0];
            const personaje = protagonista[actor];

            const protagonistaElement = document.createElement('LI');
            protagonistaElement.classList.add('list-group-item');
            protagonistaElement.innerHTML = `${actor} <i class="bi bi-forward-fill"></i> ${personaje}`;  
            
            listGroup.appendChild(protagonistaElement);
        });
        
        modalBody.appendChild(listGroup);
        */


        const tablaProtagonistas = document.createElement("table");
        tablaProtagonistas.id = "tablaProtagonistas";
        tablaProtagonistas.classList.add("table");

        // Crear el encabezado de la tabla (thead)
        const thead = document.createElement("thead");
        const encabezadoFila = document.createElement("tr");

        const encabezadoActor = document.createElement("th");
        encabezadoActor.textContent = "Actor";
        encabezadoFila.appendChild(encabezadoActor);

        const encabezadoPersonaje = document.createElement("th");
        encabezadoPersonaje.textContent = "Personaje";
        encabezadoFila.appendChild(encabezadoPersonaje);

        thead.appendChild(encabezadoFila);
        tablaProtagonistas.appendChild(thead);

        // Crear el cuerpo de la tabla (tbody)
        const tbody = document.createElement("tbody");

        // Iterar sobre los protagonistas para crear las filas
        protagonista.forEach(protagonista => {
            const actor = Object.keys(protagonista)[0];
            const personaje = protagonista[actor];

            const fila = document.createElement("tr");

            const celdaActor = document.createElement("td");
            celdaActor.textContent = actor;
            fila.appendChild(celdaActor);

            const celdaPersonaje = document.createElement("td");
            celdaPersonaje.textContent = personaje;
            fila.appendChild(celdaPersonaje);

            // Agregar eventos para cambiar el color de fondo cuando el usuario pasa el cursor sobre una celda
            fila.addEventListener("mouseover", function() {
                celdaActor.style.backgroundColor = "#4338CA";
                celdaActor.style.color = "#FFFFFF";
                celdaPersonaje.style.backgroundColor = "#4338CA";
                celdaPersonaje.style.color = "#FFFFFF";
            });

            // Restablecer el color de fondo cuando el usuario deja de pasar el cursor sobre una celda
            fila.addEventListener("mouseout", function() {
                celdaActor.style.backgroundColor = "";
                celdaPersonaje.style.backgroundColor = "";
            });

            tbody.appendChild(fila);
        });

        tablaProtagonistas.appendChild(tbody);

        modalBody.appendChild(tablaProtagonistas);
        

        const modalFooter = document.querySelector('.modal-footer');
        limpiarHtmlSeleccionado(modalFooter);

        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
        btnCerrarModal.id = 'closeButton';
        btnCerrarModal.textContent = 'Cerrar';
        btnCerrarModal.onclick = function() {
            bootstrapModalDetalle.hide();
        }

        const btnVerTrailer = document.createElement('BUTTON');     
        btnVerTrailer.classList.add('btn');   
        btnVerTrailer.id = 'playTrailerBtn';
        btnVerTrailer.textContent = 'Ver Tráiler';
        btnVerTrailer.onclick = function() {
            window.open(urlTrailer, '_blank');
        }

        modalFooter.appendChild(btnVerTrailer);        
        modalFooter.appendChild(btnCerrarModal);

        const modalDetalle = document.getElementById('detallePeliculaModal');
        const bootstrapModalDetalle = new bootstrap.Modal(modalDetalle, {});   

        bootstrapModalDetalle.show();

    }

    function crearStars(clasificacion) {
        // Obtener el contenedor de estrellas
        const starsContainer = document.createElement('div');
        starsContainer.classList.add('stars');

        // Crear el contenedor de clasificación de estrellas
        const starRatingContainer = document.createElement('div');
        starRatingContainer.classList.add('star-rating');

        let nuevaClasificacion = 0;
        let decimales = 0;

        if (Number.isInteger(clasificacion)) {                
            //console.log("La clasificación es un número entero.");
            nuevaClasificacion = clasificacion;
            
        } else {                
            //console.log("La clasificación tiene decimales.");
            nuevaClasificacion = Math.floor(clasificacion)
            decimales = clasificacion - nuevaClasificacion;
            
        }

        // Crear cada división de estrellas
        for (let i = 1; i <= 5; i++) {

            const starDiv = document.createElement('div');
            
            if (nuevaClasificacion > 0) {                
                starDiv.classList.add('starDiv', i);                

                const star3 = document.createElement('i');
                star3.classList.add('bi', 'bi-star-fill', 'star');

                // Agregar las estrellas al contenedor de estrellas                
                starDiv.appendChild(star3);
            }else if (nuevaClasificacion == 0 && decimales > 0) {                
                starDiv.classList.add('starDiv', i);

                const star2 = document.createElement('i');
                star2.classList.add('bi', 'bi-star-half', 'star');

                // Agregar las estrellas al contenedor de estrellas
                starDiv.appendChild(star2);
            }else{                
                starDiv.classList.add('starDiv', i);

                const star1 = document.createElement('i');
                star1.classList.add('bi', 'bi-star', 'star');

                // Agregar las estrellas al contenedor de estrellas
                starDiv.appendChild(star1);
            }           

            // Agregar el contenedor de estrellas al contenedor de clasificación de estrellas
            starRatingContainer.appendChild(starDiv);

            nuevaClasificacion--;
        }

        // Agregar el contenedor de clasificación de estrellas al contenedor de estrellas
        starsContainer.appendChild(starRatingContainer);

        starsContainer.insertAdjacentHTML('beforeend',`                            
            <div class="etiquetaClasificacion" >                                
                <i class="bi bi-caret-left-fill"></i>
                <button type="button" class="btnClasificacion">${clasificacion}</button>
            </div> 
        `);   

       return starsContainer;

    }    

    function mostrarTrailler(urlTrailer) {

        const trailerIframe = document.getElementById('trailerIframe');
        const playTrailerBtn = document.getElementById('playTrailerBtn');
        const closeTrailerBtn = document.querySelector('.close-trailer');

       
        playTrailerBtn.addEventListener('click', function() {
            document.getElementById('trailerModal').style.display = 'block';
        });

        playTrailerBtn.addEventListener('load', function() {
            // Verifica si el contenido del iframe se ha cargado correctamente
            if (trailerIframe.contentWindow.document.body.innerHTML.includes('Error')) {
                console.log('Error al cargar el video');
                window.location.href = urlTrailer;
                                
            }
        });

        closeTrailerBtn.addEventListener('click', function() {
            document.getElementById('trailerModal').style.display = 'none';
            // Detiene el video al cerrar el modal
            document.getElementById('trailerIframe').src = document.getElementById('trailerIframe').src;
        });

        // Cierra el modal al hacer clic fuera de él
        window.onclick = function(event) {
            if (event.target == document.getElementById('trailerModal')) {
                document.getElementById('trailerModal').style.display = 'none';
                document.getElementById('trailerIframe').src = document.getElementById('trailerIframe').src;
            }
        };
    }


    function cuentaRegresiva(fechaEstreno) {

        let fecha = new Date(fechaEstreno);         
        // Sumar un día
        fecha.setDate(fecha.getDate() + 1);

        // Establecer la hora en 00:00:00
        fecha.setHours(0, 0, 0, 0);

        // Establece la fecha de estreno (año, mes, día)
        var countDownDate = fecha.getTime();      

        // Actualiza el contador cada segundo
        var x = setInterval(function() {
            var now = new Date().getTime();           
            var distance = countDownDate - now;

            // Calcula días, horas, minutos y segundos
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Muestra el resultado en los elementos con id="days", "hours", "minutes" y "seconds"
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;

            // Si el contador termina, muestra un mensaje
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "¡El estreno ha llegado!";
            }            
        }, 1000);
    }

    function crearModalDetalle() {

        // Crear el elemento div con la clase modal y sus atributos
        var modalDiv = document.createElement("div");
        modalDiv.classList.add("modal", "fade");
        modalDiv.id = "detallePeliculaModal";
        modalDiv.setAttribute("data-bs-backdrop", "static");
        modalDiv.setAttribute("data-bs-keyboard", "false");
        modalDiv.setAttribute("tabindex", "-1");
        modalDiv.setAttribute("aria-hidden", "true");

        // Crear el elemento div con la clase modal-dialog-scrollable
        var modalDialogDiv = document.createElement("div");
        modalDialogDiv.classList.add("modal-dialog", "modal-dialog-scrollable");

        // Crear el elemento div con la clase modal-content
        var modalContentDiv = document.createElement("div");
        modalContentDiv.classList.add("modal-content");

        // Crear el elemento div con la clase modal-header y sus elementos hijos
        var modalHeaderDiv = document.createElement("div");
        modalHeaderDiv.classList.add("modal-header");
        var modalTitle = document.createElement("h1");
        modalTitle.classList.add("modal-title", "fs-1", "font-bold");
        modalTitle.id = "staticBackdropLabel";            
        var closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.classList.add("btn-close");
        closeButton.id = "x";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        modalHeaderDiv.appendChild(modalTitle);
        modalHeaderDiv.appendChild(closeButton);

        // Crear el elemento div con la clase modal-body
        var modalBodyDiv = document.createElement("div");
        modalBodyDiv.classList.add("modal-body");

        // Crear el elemento div con la clase modal-footer
        var modalFooterDiv = document.createElement("div");
        modalFooterDiv.classList.add("modal-footer", "flex", "justify-content-between");

        // Agregar los elementos creados al modalContentDiv
        modalContentDiv.appendChild(modalHeaderDiv);
        modalContentDiv.appendChild(modalBodyDiv);
        modalContentDiv.appendChild(modalFooterDiv);

        // Agregar modalContentDiv al modalDialogDiv
        modalDialogDiv.appendChild(modalContentDiv);

        // Agregar modalDialogDiv al modalDiv
        modalDiv.appendChild(modalDialogDiv);

        // Retornar el elemento modalDiv creado
        return modalDiv;

    }
    
    // Consultar el Servidor para añadir una nueva tarea al proyecto actual
    async function agregarProduccion(peliculaObj) {

        const{nombre, tipo, fechaEstreno, genero, calificacion, duracion, director, protagonista, presupuesto, taquillaMundial, sinopsis, urlImagen, urlTrailer} = peliculaObj;
        // Construir la petición
        //const genero = ['Drama', 'Suspenso', 'Terror']
        const datos = new FormData();
        datos.append('nombre', nombre);
        datos.append('tipo', tipo);
        datos.append('fechaEstreno', fechaEstreno); 
        datos.append('genero', genero);       
        datos.append('calificacion', calificacion);
        datos.append('duracion', duracion);
        datos.append('director', director);
        datos.append('protagonista', JSON.stringify(protagonista));
        datos.append('presupuesto', presupuesto);
        datos.append('taquillaMundial', taquillaMundial);
        datos.append('sinopsis', sinopsis);
        datos.append('urlImagen', urlImagen);
        datos.append('urlTrailer', urlTrailer);
        datos.append('proyectoId', obtenerProyecto());        

        try {
            const url = 'http://localhost:3100/api/produccion';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
            
            const resultado = await respuesta.json();            
            
            /*mostrarAlerta(
                resultado.mensaje, 
                resultado.tipo, 
                document.querySelector('.filtros')
            )

            console.log(resultado);     */       

            if(resultado.tipo === 'exito') {   
                const btnCerrar = document.getElementById('closeButton');
                btnCerrar.click();
                
                Swal.fire('Insertado!', resultado.mensaje, 'success');
            }

            peliculaObj.id = String(resultado.id);
            peliculaObj.calificacion = String(calificacion);
            peliculaObj.duracion = String(duracion);
            peliculaObj.presupuesto = String(presupuesto);
            peliculaObj.taquillaMundial = String(taquillaMundial);            
            peliculaObj.proyectoId = String(resultado.proyectoId);

            administrarproducciones.agregarProduccion({...peliculaObj});

            if (filtrar) {
                //console.log('Filtrando.......');
                soloFiltrar();
                if(administrarproduccionesFiltradas.buscarProduccionPorId(peliculaObj.id)) { 
                    //console.log('El elemento existe en el arreglo filtrado');                    
                    currentPage = administrarproduccionesFiltradas.ultimaPagina();
                    // Refrescar las producciones
                    mostrarProducciones(currentPage, administrarproduccionesFiltradas);
                    mostrarProduccionesMovil(administrarproduccionesFiltradas);
                    removePaginationButtons();
                    createPaginationButtons(calcularTotalPaginas(administrarproduccionesFiltradas), administrarproduccionesFiltradas);
                    updateButtons(administrarproduccionesFiltradas);
                } 
            } else {
                currentPage = administrarproducciones.ultimaPagina();
                // Refrescar las producciones
                mostrarProducciones(currentPage, administrarproducciones);
                mostrarProduccionesMovil(administrarproducciones);
                removePaginationButtons()
                createPaginationButtons(calcularTotalPaginas(administrarproducciones), administrarproducciones);
                updateButtons(administrarproducciones);    

            }             
            
            administrarproducciones.actualizarDirectoresComoOpciones();
            administrarproducciones.actualizarActoresComoOpciones();

        } catch (error) {
            console.log(error);
        }
    }

    async function actualizarProduccion(produccion) {        
        const{id, nombre, tipo, fechaEstreno, genero, calificacion, duracion, director, protagonista, presupuesto, taquillaMundial, sinopsis, urlImagen, urlTrailer} = produccion;
        
        const datos = new FormData();
        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('tipo', tipo);
        datos.append('fechaEstreno', fechaEstreno); 
        datos.append('genero', genero);       
        datos.append('calificacion', calificacion);
        datos.append('duracion', duracion);
        datos.append('director', director);
        datos.append('protagonista', JSON.stringify(protagonista));
        datos.append('presupuesto', presupuesto);
        datos.append('taquillaMundial', taquillaMundial);
        datos.append('sinopsis', sinopsis);
        datos.append('urlImagen', urlImagen);
        datos.append('urlTrailer', urlTrailer);
        datos.append('proyectoId', obtenerProyecto());

        /*for (let valor of datos.values()) {
            console.log(valor); 
        }*/

        try {
            const url = 'http://localhost:3100/api/produccion/actualizar';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();
            //console.log(resultado);

            if(resultado.respuesta.tipo === 'exito') {   
                const btnCerrar = document.getElementById('closeButton');
                btnCerrar.click();  
                
                Swal.fire('Actualizado!', resultado.respuesta.mensaje, 'success');      
                
                produccion.id = String(resultado.respuesta.id);
                produccion.calificacion = String(calificacion);
                produccion.duracion = String(duracion);
                produccion.presupuesto = String(presupuesto);
                produccion.taquillaMundial = String(taquillaMundial);            
                produccion.proyectoId = String(resultado.respuesta.proyectoId);

                administrarproducciones.editarProduccion({...produccion});                                

                if (filtrar) {
                    //console.log('Filtrando.......');
                    soloFiltrar();
                    if(administrarproduccionesFiltradas.buscarProduccionPorId(produccion.id)) { 
                        //console.log('El elemento existe en el arreglo filtrado');                    
                        currentPage = administrarproduccionesFiltradas.paginaDeProduccion(produccion.id, moviesPerPage);
                    } else{
                        administrarproduccionesFiltradas.eliminarProduccion(produccion.id);                          
                    }

                     // Refrescar las producciones
                    mostrarProducciones(currentPage, administrarproduccionesFiltradas);
                    mostrarProduccionesMovil(administrarproduccionesFiltradas);
                    removePaginationButtons();
                    createPaginationButtons(calcularTotalPaginas(administrarproduccionesFiltradas), administrarproduccionesFiltradas);
                    updateButtons(administrarproduccionesFiltradas);

                } else {                   
                    // Refrescar las producciones
                    mostrarProducciones(currentPage, administrarproducciones);
                    mostrarProduccionesMovil(administrarproducciones);
                    removePaginationButtons()
                    createPaginationButtons(calcularTotalPaginas(administrarproducciones), administrarproducciones);
                    updateButtons(administrarproducciones);      
                }
                
                administrarproducciones.actualizarDirectoresComoOpciones();
                administrarproducciones.actualizarActoresComoOpciones();
            }    
            
            
            
        } catch (error) {
            console.log(error);
        }
    }

    function confirmarEliminarProduccion(produccion) {
        Swal.fire({
            title: '¿Eliminar Produción?',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarProduccion(produccion);
            } 
        })
    }

    async function eliminarProduccion(produccion) {
        const{id, nombre, tipo, fechaEstreno, genero, calificacion, duracion, director, protagonista, presupuesto, taquillaMundial, sinopsis, urlImagen, urlTrailer} = produccion;
        
        const datos = new FormData();
        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('tipo', tipo);
        datos.append('fechaEstreno', fechaEstreno); 
        datos.append('genero', genero);       
        datos.append('calificacion', calificacion);
        datos.append('duracion', duracion);
        datos.append('director', director);
        datos.append('protagonista', JSON.stringify(protagonista));
        datos.append('presupuesto', presupuesto);
        datos.append('taquillaMundial', taquillaMundial);
        datos.append('sinopsis', sinopsis);
        datos.append('urlImagen', urlImagen);
        datos.append('urlTrailer', urlTrailer);
        datos.append('proyectoId', obtenerProyecto());

        try {
            const url = 'http://localhost:3100/api/produccion/eliminar';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();
            if(resultado.resultado) {

                Swal.fire('Eliminado!', resultado.mensaje, 'success');
                administrarproducciones.eliminarProduccion(produccion.id);                

                if (filtrar) {
                    administrarproduccionesFiltradas.eliminarProduccion(produccion.id);                   
                    // Refrescar las producciones
                    mostrarProducciones(currentPage, administrarproduccionesFiltradas);
                    mostrarProduccionesMovil(administrarproduccionesFiltradas);
                    removePaginationButtons();
                    createPaginationButtons(calcularTotalPaginas(administrarproduccionesFiltradas), administrarproduccionesFiltradas);
                    updateButtons(administrarproduccionesFiltradas);

                } else {
                    // Refrescar las producciones
                    mostrarProducciones(currentPage, administrarproducciones);
                    mostrarProduccionesMovil(administrarproducciones);
                    removePaginationButtons()
                    createPaginationButtons(calcularTotalPaginas(administrarproducciones), administrarproducciones);
                    updateButtons(administrarproducciones);    
                }                  
                
                administrarproducciones.actualizarDirectoresComoOpciones();
                administrarproducciones.actualizarActoresComoOpciones();                
            }
            
        } catch (error) {
            console.log(error);
        }
    }    


    // Muestra un mensaje en la interfaz
    function mostrarAlerta(mensaje, tipo, referencia) {
        // Previene la creación de multiples alertas
        const alertaPrevia = document.querySelector('.alerta');
        if(alertaPrevia) {
            alertaPrevia.remove();
        }


        const alerta = document.createElement('DIV');
        alerta.classList.add('alerta', tipo);
        alerta.textContent = mensaje;

        // Inserta la alerta antes del legend
        referencia.parentElement.insertBefore(alerta, referencia);

        // Eliminar la alerta después de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }

    function eliminarProtagonista() {
        // Obtener todos los botones de eliminar protagonista
        var removeButtons = document.querySelectorAll('.removeProtagonista');
    
        // Recorrer todos los botones y agregar un evento de clic a cada uno
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Obtener el contenedor de la sección protagonista
                var protagonistaContainer = this.parentElement;
                
                // Eliminar el contenedor de la sección protagonista
                protagonistaContainer.remove();
            });
        });
    }      
    
    function agregarProtagonista() {
        const protagonistasDiv = document.getElementById("protagonistas");
    
        const protagonistaDiv = document.createElement("div");
        protagonistaDiv.classList.add("protagonista");
    
        const protagonistaInput = document.createElement("input");
        protagonistaInput.setAttribute("type", "text");
        protagonistaInput.setAttribute("placeholder", "Nombre del actor");
    
        const personajeInput = document.createElement("input");
        personajeInput.setAttribute("type", "text");
        personajeInput.setAttribute("placeholder", "Personaje");
    
        const removeButton = document.createElement("button");
        //removeButton.textContent = "X";        
        removeButton.type = "button";
        removeButton.classList.add("removeProtagonista"); 
        removeButton.addEventListener("click", function() {
            protagonistasDiv.removeChild(protagonistaDiv);
        });  
        removeButton.innerHTML = '<i class="bi bi-backspace"></i>';
    
        protagonistaDiv.appendChild(protagonistaInput);
        protagonistaDiv.appendChild(personajeInput);
        protagonistaDiv.appendChild(removeButton);
    
        protagonistasDiv.appendChild(protagonistaDiv);  
        
    }

    function obtenerProyecto() {
        const proyectoParams = new URLSearchParams(window.location.search);
        const proyecto = Object.fromEntries(proyectoParams.entries());
        return proyecto.id;
    }

    function limpiarHtmlSeleccionado(selector) {
        while(selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }

    ////Funciones para los botones de paginacion de producciones

    function updateButtons({producciones}) {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === Math.ceil(producciones.length / moviesPerPage);
        if(producciones.length === 0) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
        }
    }

    function calcularTotalPaginas({producciones}) {
        const totalMovies = producciones.length;
        const totalPages = Math.ceil(totalMovies / moviesPerPage);
        return totalPages;
    }

    function createPaginationButtons(totalPages, {producciones}) {
        //pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.id = `pageNum`;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                mostrarProducciones(currentPage, {producciones});
                updateButtons({producciones});
            });
            pagination.insertBefore(pageButton, nextBtn);     
        }             
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          if (filtrar){
            mostrarProducciones(currentPage, administrarproduccionesFiltradas);
            updateButtons(administrarproduccionesFiltradas);
          } else {
            mostrarProducciones(currentPage, administrarproducciones);
            updateButtons(administrarproducciones);
          }
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(administrarproducciones.obtenerTodas().length / moviesPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          if (filtrar){
            mostrarProducciones(currentPage, administrarproduccionesFiltradas);
            updateButtons(administrarproduccionesFiltradas);
          } else {
            mostrarProducciones(currentPage, administrarproducciones);
            updateButtons(administrarproducciones);
          }
        }
    });  

    function removePaginationButtons() {
        const buttons = document.querySelectorAll('#pageNum');
        buttons.forEach(button => {
            button.parentNode.removeChild(button);
        });
    }


    //funciones para filtrar producciones

    function filtrarProducciones() {
        const resultado = administrarproducciones.obtenerTodas().filter(filtrarTipo).filter(filtrarGenero).filter(filtrarActor).filter(filtrarAnioEstreno).filter(filtrarCalificacion).filter(filtrarDuracion).filter(filtrarDirector);
        administrarproduccionesFiltradas.producciones = resultado;

        if (resultado.length) {
            currentPage = 1;
            mostrarProducciones(currentPage, administrarproduccionesFiltradas);
            removePaginationButtons();
            createPaginationButtons(calcularTotalPaginas(administrarproduccionesFiltradas), administrarproduccionesFiltradas);
            updateButtons(administrarproduccionesFiltradas);
        }
        else {
            noResultado();
        }
    }

    function soloFiltrar(){
        const resultado = administrarproducciones.obtenerTodas().filter(filtrarTipo).filter(filtrarGenero).filter(filtrarActor).filter(filtrarAnioEstreno).filter(filtrarCalificacion).filter(filtrarDuracion).filter(filtrarDirector);
        administrarproduccionesFiltradas.producciones = resultado;
    }
    
     function noResultado() {
        const movieCatalog = document.getElementById("movieCatalog");
        limpiarHtmlSeleccionado(movieCatalog);
    
        const noResultado = document.createElement('div');
        noResultado.classList.add('text-center', 'alert', 'd-block', 'col-12', 'alert-danger');
        noResultado.appendChild(document.createTextNode('No hay Resultados'));
        movieCatalog.appendChild(noResultado);
    }
    
    function filtrarTipo(produccion) {
        if (datosBusqueda.tipo) {
            //console.log(datosBusqueda.tipo);
            return produccion.tipo === datosBusqueda.tipo;
        } 
        return produccion;
    }
    
    function filtrarGenero(produccion) {    
        if (datosBusqueda.genero) {
            const filtroGenero = produccion.genero;        
            return filtroGenero.includes(datosBusqueda.genero);
        }
        return produccion;
    }
    
    function filtrarActor(produccion) {
        if (datosBusqueda.actor) {
            return produccion.protagonista.some(protagonista => Object.keys(protagonista)[0] === datosBusqueda.actor);
        }
        return produccion;
    }
    
    function filtrarAnioEstreno(produccion) {
        if (datosBusqueda.fechaEstreno) {
            var anio = new Date(produccion.fechaEstreno).getFullYear();
            var anioString = anio.toString();
    
            return anioString === datosBusqueda.fechaEstreno;
        }
        return produccion;
    }
    
    function filtrarCalificacion(produccion) {
        if (datosBusqueda.calificacion) {
            return Math.round(produccion.calificacion) === datosBusqueda.calificacion;
        }
        return produccion;
    }
    
    function filtrarDuracion(produccion) {
        if (datosBusqueda.duracion) {
            return produccion.duracion === datosBusqueda.duracion;
        }
        return produccion;
    }
    
    function filtrarDuracion(produccion) {
        var filtroDuracion = datosBusqueda.duracion; // Suponiendo que 'duracion' es el atributo que almacena la duración de la producción
        var duracionProduccion = produccion.duracion; // Suponiendo que 'duracion' es el atributo que almacena la duración de la producción
    
        if (filtroDuracion === "") {
            return true; // No se aplica filtro de duración
        } else if (filtroDuracion === "60" && duracionProduccion <= 60) {
            return true; // Menos de 1 hora
        } else if (filtroDuracion === "90" && duracionProduccion <= 90 && duracionProduccion > 60) {
            return true; // 1 hora y media
        } else if (filtroDuracion === "120" && duracionProduccion <= 120 && duracionProduccion > 90) {
            return true; // 2 horas (redondeando 126 a 120)
        } else if (filtroDuracion === "150" && duracionProduccion <= 150 && duracionProduccion > 120) {
            return true; // 2 horas y media
        } else if (filtroDuracion === "180" && duracionProduccion <= 180 && duracionProduccion > 150) {
            return true; // 3 horas
        } else if (filtroDuracion === "181" && duracionProduccion > 180) {
            return true; // Más de 3 horas
        } else {
            return false; // No cumple con el filtro de duración
        }
    }
    
    function filtrarDirector(produccion) {
        if (datosBusqueda.director) {
            return produccion.director === datosBusqueda.director;
        }
        return produccion;
    }
    
    function actualizarFiltrado() {
        const selects = document.querySelectorAll('.filtros-inputs select');
        let todosVacios = true;
        
        selects.forEach(select => {
            if (select.value !== "") {
                todosVacios = false;
            }
        });
        
        filtrar = !todosVacios;       
    }

})();