<aside class="sidebar">
    <div class="contenedor-sidebar">
        <div class="titulo-logo">
            <img src="build/img/logo.png" alt="logoImagen">
            <h2>MyFavFilms</h2>
        </div>
        

        <div class="cerrar-menu">
            <img id="cerrar-menu" src="build/img/cerrar.svg" alt="imagen cerrar menu">
        </div>        
    </div>    

    <nav class="sidebar-nav">
        <a class="<?php echo ($titulo === 'Catalogos') ? 'activo' : ''; ?>" href="/dashboard">Catalogos</a>
        <a class="<?php echo ($titulo === 'Crear Catalogo') ? 'activo' : ''; ?>" href="/crear-proyecto">Crear Catalogo</a>
        <a class="<?php echo ($titulo === 'Perfil') ? 'activo' : ''; ?>" href="/perfil">Perfil</a>
    </nav>

    <div class="cerrar-sesion-mobile">
        <a href="/logout" class="cerrar-sesion">Cerrar Sesión</a>
    </div>
</aside>