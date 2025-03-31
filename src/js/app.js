const mostrarFiltroDiv  = document.querySelector('.desplegar-contraer');
const mobileDesplegarBtn = document.querySelector('#mobile-desplegar');
const mobileContraerBtn = document.querySelector('#mobile-contraer');
const filtros = document.querySelector('.filtros-inputs');

mostrarFiltroDiv.classList.add('desplegar');

mobileContraerBtn.addEventListener('click', function() {
    mostrarFiltroDiv.classList.add('desplegar');
    mostrarFiltroDiv.classList.remove('contraer');
    
    filtros.classList.add('ocultar');
        setTimeout(() => {
            filtros.classList.remove('mostrar');
            filtros.classList.remove('ocultar');
        }, 100);
});

mobileDesplegarBtn.addEventListener('click', function() {
    mostrarFiltroDiv.classList.add('contraer');
    mostrarFiltroDiv.classList.remove('desplegar');
    filtros.classList.add('mostrar');
});



const mobileMenuBtn = document.querySelector('#mobile-menu');
const cerrarMenuBtn = document.querySelector('#cerrar-menu');
const sidebar = document.querySelector('.sidebar');

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.add('mostrar');
    });
}

if(cerrarMenuBtn) {
    cerrarMenuBtn.addEventListener('click', function() {
        sidebar.classList.add('ocultar');
        setTimeout(() => {
            sidebar.classList.remove('mostrar');
            sidebar.classList.remove('ocultar');
        }, 1000);
    })
}

// Elimina la clase de mostrar, en un tamaño de tablet y mayores
const anchoPantalla = document.body.clientWidth;

window.addEventListener('resize', function() {
    const anchoPantalla = document.body.clientWidth;
    if(anchoPantalla >= 768) {
        sidebar.classList.remove('mostrar');
        filtros.classList.remove('mostrar');   
        mostrarFiltroDiv.classList.add('desplegar');
        mostrarFiltroDiv.classList.remove('contraer');     
    }
})





   
