<?php include_once __DIR__  . '/header-dashboard.php'; ?>

    <div class="contenedor-sm">
        <div class="contenedor-nueva-pelicula">
            <button
                type="button"
                class="agregar-pelicula"
                id="agregar-pelicula"
            >&#43; Nueva Pelicula</button>
        </div>        

        <div id="filtros" class="filtros">
            <div class="headerFiltros">
                <h2>Filtros:</h2> 
                <div class="desplegar-contraer">
                    <img id="mobile-desplegar" src="build/img/desplegar.svg" alt="imagen desplegar">                    
                    <img id="mobile-contraer" src="build/img/contraer.svg" alt="imagen contraer">                
                </div>                              
            </div>            
            <div class="filtros-inputs">                
                <div class="row row-one">
                    <div class="columns">
                        <label for="filtroTipo">Tipo</label>
                        <select class="u-full-width" id="filtroTipo">
                            <option value="">Seleccione</option>
                            <option value="Película">Película</option>
                            <option value="Serie">Serie</option>
                            <option value="Corto">Corto</option>
                            <option value="Anime">Anime</option>
                        </select>
                    </div>
                    <div class="columns">
                        <label for="filtroGenero">Género</label>
                        <select class="u-full-width" id="filtroGenero">
                            <option value="">Seleccione</option>
                            <option value="Acción">Acción</option>
                            <option value="Ciencia Ficción">Ciencia Ficción</option>
                            <option value="Fantasía">Fantasía</option>
                            <option value="Aventura">Aventura</option>
                            <option value="Romance">Romance</option>
                            <option value="Comedia">Comedia</option>
                            <option value="Drama">Drama</option>
                            <option value="Suspenso">Suspenso</option>
                            <option value="Terror">Terror</option>
                            <option value="Animación">Animación</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Misterio">Misterio</option>
                            <option value="Crimen">Crimen</option>
                            <option value="Western">Western</option>
                            <option value="Guerra">Guerra</option>
                            <option value="Documental">Documental</option>
                            <option value="Biografía">Biografía</option>
                            <option value="Historia">Historia</option>
                            <option value="Musical">Musical</option>
                            <option value="Otros">Otros</option>                                            
                        </select>
                    </div>
                    
                    <div class="columns">
                        <label for="filtroActor">Actor</label>
                        <select class="u-full-width" id="filtroActor">
                                <option value="">Seleccione</option>

                        </select>
                    </div>
                    <div class="columns">
                        <label for="filtroAnioEstreno">Año de Estreno</label>
                        <select class="u-full-width" id="filtroAnioEstreno">
                                <option value="">Seleccione</option>
                        </select>
                    </div>                
                </div>
                <div class="row row-two">
                    <div class="columns">
                        <label for="fitrocalificacion">Calificación</label>
                        <select class="u-full-width" id="filtroCalificacion">
                            <option value="">Seleccione</option>
                            <option value="1">1 Estrella</option>
                            <option value="2">2 Estrellas</option>
                            <option value="3">3 Estrellas</option>
                            <option value="4">4 Estrellas</option>
                            <option value="5">5 Estrellas</option>
                        </select>
                    </div>
                    <div class="columns">
                        <label for="filtroDuracion">Duración</label>
                        <select class="u-full-width" id="filtroDuracion">
                            <option value="">Seleccione</option>
                            <option value="60">(0)-(1) hora</option>
                            <option value="90">(1)-(1.5) horas</option>
                            <option value="120">(1.5)-(2) horas</option>
                            <option value="150">(2)-(2.5) horas</option>
                            <option value="180">(2.5)-(3) horas</option>
                            <option value="181">Más de 3 horas</option>
                        </select>
                    </div>

                    <div class="columns">
                        <label for="filtroDirector">Director</label>
                        <select class="u-full-width" id="filtroDirector">
                                <option value="">Seleccione</option>
                        </select>
                    </div>
                </div> 
            </div>
        </div>

        <div id="movieCatalog" class="container_todosFilmes"></div>

        <div id= "contenedorMoviesMovil"class= "swiper mySwiper">
            <div id="movieCatalogMovil" class="container_todosFilmes_movil swiper-wrapper"></div>
        </div>        

        <div id="pagination">
            <button id="prev-btn">Página Anterior</button>                       
            <button id="next-btn">Siguiente Página</button>            
        </div>            
        
        
    </div>    

<?php include_once __DIR__  . '/footer-dashboard.php'; ?>

<?php
$script .= '    
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="build/js/bootstrap.bundle.min.js"></script>
    <script src="build/js/peliculas.js"></script>  
';

?>