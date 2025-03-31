# MyFavFilms - Sistema de Gestión de Producciones Cinematográficas

[![PHP](https://img.shields.io/badge/PHP-8.0+-7A86B8.svg)](https://www.php.net/)
[![MVC](https://img.shields.io/badge/Arquitectura-MVC-34A853.svg)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white)](https://sass-lang.com/)

Sistema web para gestionar y compartir tus películas y series favoritas. Desarrollado siguiendo el patrón arquitectónico MVC con PHP 8, SASS y JavaScript.

## 📋 Requisitos previos

- PHP 8.0 o superior
- Composer
- Node.js y NPM
- MySQL/MariaDB
- Servidor web (Apache o Nginx)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd MyFavFilm_MVC
```

### 2. Instalar dependencias PHP

```bash
composer install
```

### 3. Instalar dependencias de Node

```bash
npm install
```

### 4. Compilar assets

```bash
npm run dev
```

### 5. Configurar base de datos

Crear archivo de configuración en database.php siguiendo este formato:

```php
<?php
$db = mysqli_connect('hostname', 'usuario', 'password', 'nombre_basedatos');

if (!$db) {
    echo "Error en la conexión a la base de datos";
    exit;
}
```

### 6. Iniciar el servidor PHP

Una vez que hayas completado los pasos anteriores, puedes iniciar el servidor de desarrollo de PHP:

```bash
# Navega al directorio del proyecto
cd e:\Curso Internet\Proyecto MyFavFilms\MyFavFilm_MVC

# Inicia el servidor PHP apuntando al directorio public
cd public
php -S localhost:3000
```

## 🏗️ Estructura del proyecto

```
MyFavFilm_MVC/
├── classes/             # Clases auxiliares (Email, etc.)
├── controllers/         # Controladores MVC
├── includes/            # Funciones y configuración
├── models/              # Modelos MVC y ActiveRecord
├── public/              # Punto de entrada y archivos públicos
│   └── build/           # Assets compilados (CSS, JS, imágenes)
├── src/                 # Código fuente para assets
│   ├── img/             # Imágenes sin procesar
│   ├── js/              # Archivos JavaScript
│   └── scss/            # Archivos SCSS
├── vendor/              # Dependencias PHP (Composer)
├── views/               # Vistas MVC
├── .gitignore           # Archivos excluidos de Git
├── composer.json        # Configuración de Composer
├── gulpfile.js          # Configuración de Gulp
├── package.json         # Configuración de NPM
├── Router.php           # Sistema de enrutamiento
└── README.md            # Este archivo
```

## ✨ Características principales

- **Sistema de autenticación completo**: Registro, inicio de sesión y recuperación de contraseñas
- **Gestión de producciones cinematográficas**: Películas y series con información detallada
- **Actores y géneros**: Categorización detallada de producciones
- **Dashboard personalizado**: Interfaz intuitiva para gestionar contenido
- **Diseño responsivo**: Funciona en dispositivos móviles y de escritorio

## 🛠️ Desarrollo

### Compilación de assets

El proyecto utiliza Gulp para compilar SCSS, minificar JavaScript y optimizar imágenes:

```bash
# Compilar todos los assets
npm run dev

# Modo desarrollo (observa cambios)
gulp watchArchivos
```

### Tareas de Gulp

- `gulp css`: Compila SCSS a CSS con autoprefixer y minificación
- `gulp javascript`: Minifica archivos JavaScript
- `gulp imagenes`: Optimiza imágenes
- `gulp versionWebp`: Convierte imágenes al formato WebP

## 🔧 Estructura MVC

- **Models**: Implementados con patrón ActiveRecord para interactuar con la base de datos
- **Views**: Separadas por secciones funcionales (auth, dashboard, etc.)
- **Controllers**: Maneja la lógica de negocio y conexión entre modelos y vistas
- **Router.php**: Sistema de enrutamiento personalizado para gestionar las peticiones

## 🔒 Seguridad

- Autenticación basada en sesiones PHP
- Contraseñas hasheadas
- Validación de formularios
- Confirmación de cuentas por correo electrónico mediante PHPMailer

## 🛢️ Base de datos

El sistema utiliza múltiples tablas relacionadas:

- `usuarios`: Almacena información de usuarios registrados
- `producciones`: Películas y series con sus detalles
- `actores`: Información sobre actores
- `generos`: Categorías de producciones
- Tablas pivote para relaciones muchos a muchos

## 💻 Tecnologías utilizadas

- **Backend**: PHP 8, MVC personalizado
- **Frontend**: HTML5, SASS, JavaScript
- **Dependencias**: PHPMailer, Composer
- **Build tools**: Gulp, NPM
- **Base de datos**: MySQL/MariaDB

## 👥 Autores

- Tu nombre - Desarrollo principal

## 📄 Licencia

Este proyecto está bajo la Licencia [ISC] - ver el archivo package.json para más detalles.

---

*Proyecto desarrollado para evitar aburrirme*