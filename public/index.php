<?php 

require_once __DIR__ . '/../includes/app.php';

use MVC\Router;
use Controllers\LoginController;
use Controllers\DashboardController;
use Controllers\ProduccionController;

$router = new Router();


// Login
$router->get('/', [LoginController::class, 'login']); // Para mostrar la vista
$router->post('/', [LoginController::class, 'login']); //Para enviar datos
$router->get('/logout', [LoginController::class, 'logout']); // Para cerrar sesión

// Crear Cuenta
$router->get('/crear', [LoginController::class, 'crear']);
$router->post('/crear', [LoginController::class, 'crear']);

// Formulario de olvide mi password
$router->get('/olvide', [LoginController::class, 'olvide']); // visitar la url
$router->post('/olvide', [LoginController::class, 'olvide']); // procesar el email

// Colocar el nuevo password
$router->get('/reestablecer', [LoginController::class, 'reestablecer']);
$router->post('/reestablecer', [LoginController::class, 'reestablecer']);

// Confirmación de Cuenta
$router->get('/mensaje', [LoginController::class, 'mensaje']);
$router->get('/confirmar', [LoginController::class, 'confirmar']);


// ZONA DE PROYECTOS
$router->get('/dashboard', [DashboardController::class, 'index']);
$router->get('/crear-proyecto', [DashboardController::class, 'crear_proyecto']);
$router->post('/crear-proyecto', [DashboardController::class, 'crear_proyecto']);
$router->get('/proyecto', [DashboardController::class, 'proyecto']);
$router->get('/perfil', [DashboardController::class, 'perfil']);
$router->post('/perfil', [DashboardController::class, 'perfil']);


$router->get('/cambiar-password', [DashboardController::class, 'cambiar_password']);
$router->post('/cambiar-password', [DashboardController::class, 'cambiar_password']);


// API para las tareas
$router->get('/api/producciones', [ProduccionController::class, 'index']);
$router->post('/api/produccion', [ProduccionController::class, 'crear']);
$router->post('/api/produccion/actualizar', [ProduccionController::class, 'actualizar']);
$router->post('/api/produccion/eliminar', [ProduccionController::class, 'eliminar']);


// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();