<?php

namespace Controllers;

use Model\Proyecto;
use Model\Produccion;
use Model\ProduccionGenero;
use Model\ProduccionProta;
use Model\Genero;
use Model\Actor;


class ProduccionController {
    public static function index() {
  
        $proyectoId = $_GET['id'];

        if(!$proyectoId) header('Location: /dashboard');

        $proyecto = Proyecto::where('url', $proyectoId);

        session_start();

        if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) header('Location: /404');

        $producciones = Produccion::belongsTo('proyectoId', $proyecto->id);

        // Recorrer cada producción para agregar los protagonistas y sus actores
        $produccionesConProtagonistas = [];
        foreach ($producciones as $produccion) {
            $protagonistas = self::getProtagonistas($produccion->id);
            $generos = self::getGeneros($produccion->id);
            $produccionArray = [
                'id' => $produccion->id,
                'nombre' => $produccion->nombre,
                'tipo' => $produccion->tipo,
                'fechaEstreno' => $produccion->fechaEstreno,
                'calificacion' => $produccion->calificacion,
                'duracion' => $produccion->duracion,
                'director' => $produccion->director,
                'presupuesto' => $produccion->presupuesto,
                'taquillaMundial' => $produccion->taquillaMundial,
                'sinopsis' => $produccion->sinopsis,
                'urlImagen' => $produccion->urlImagen,
                'urlTrailer' => $produccion->urlTrailer,
                'proyectoId' => $produccion->proyectoId,           
            ];
            $produccionArray['protagonista'] = $protagonistas;
            $produccionArray['genero'] = $generos;
            $produccionesConProtagonistas[] = $produccionArray;
        }
        echo json_encode(['producciones' => $produccionesConProtagonistas]);  
    }

    // Función para obtener los protagonistas de una producción
    private static function getProtagonistas($produccionId) {
        $protagonistas = [];
        $produccionProta = ProduccionProta::belongsTo('produccionId', $produccionId);

        foreach ($produccionProta as $relacion) {
            $actor = Actor::find($relacion->actorId);
            $protagonistas[] = [$actor->actor => $relacion->personaje];
        }       

        return $protagonistas;
    }
    // Función para obtener los géneros de una producción
    private static function getGeneros($produccionId) {
        $generos = [];
        $produccionGenero = ProduccionGenero::belongsTo('produccionId', $produccionId);

        foreach ($produccionGenero as $relacion) {
            $genero = Genero::find($relacion->generoId);
            $generos[] = $genero->genero;
        }       

        return $generos;
    }

    public static function crear() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            session_start();

            $proyectoId = $_POST['proyectoId'];            

            $proyecto = Proyecto::where('url', $proyectoId);

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al agregar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            } 

            $produccion = new Produccion($_POST);
            $produccion->proyectoId = $proyecto->id;
            $resultado = $produccion->guardar();

            // Obtener los géneros de la petición POST (asumiendo que se envían como un array)
            $generosString = $_POST['genero'];
            $generos = explode(',', $generosString);
            
            // Ahora puedes iterar sobre los géneros y hacer lo que necesites con ellos
            foreach ($generos as $genero) {
                // Aquí puedes manejar cada género individualmente, por ejemplo, guardarlos en la tabla de relación
                $t_genero = Genero::where('genero', $genero); 
                                           
                if($t_genero) {   
                    $produccionGenero = new ProduccionGenero($_POST);
                    $produccionGenero->generoId = intval($t_genero->id);                 
                    $produccionGenero->produccionId = $resultado['id'];                    
                    $produccionGenero->guardar();
                }
                
            }

            // Obtener los protagonistas de la petición POST (asumiendo que se envían como un array)
            $protagonistasString = $_POST['protagonista'];
            $protagonistasArray = json_decode($protagonistasString, true);           
/*
            $protagonistas = [];

            foreach ($protagonistasArray as $protagonista) {
                // Obtener el primer (y único) elemento del objeto JSON
                $actor = trim(key($protagonista));
                $personaje = trim(reset($protagonista));
                // Agregar el actor y el personaje al array $protagonistas
                $protagonistas[] = ['actor' => $actor, 'personaje' => $personaje];
            }
*/
            foreach ($protagonistasArray as $prota) {
                
                $t_actor = Actor::where('actor', key($prota));                                          
                if($t_actor === null) {                      
                    $actor = new Actor($_POST);
                    $actor->actor = trim(key($prota));
                    $resultadoActor = $actor->guardar();                    

                    $produccionProta = new ProduccionProta($_POST);
                    $produccionProta->personaje = reset($prota);
                    $produccionProta->produccionId = $resultado['id'];
                    $produccionProta->actorId = $resultadoActor['id'];                    
                    $produccionProta->guardar();                    
                }else{
                    $produccionProta = new ProduccionProta($_POST);
                    $produccionProta->personaje = reset($prota);
                    $produccionProta->produccionId = $resultado['id'];
                    $produccionProta->actorId = intval($t_actor->id);                    
                    $produccionProta->guardar();                   
                }
                
            }

            $respuesta = [
                'tipo' => 'exito',                
                'id' => $resultado['id'],                
                'mensaje' => 'Produccion Creada Correctamente',
                'proyectoId' => $proyecto->id
            ];
            echo json_encode($respuesta);

            
        }
    }

    public static function actualizar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Validar que el proyecto exista
            $proyecto = Proyecto::where('url', $_POST['proyectoId']);

            session_start();

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al actualizar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            } 

            $produccion = new Produccion($_POST);
            $produccion->proyectoId = $proyecto->id;
            $resultado = $produccion->guardar();

            $t_produccionGenero = ProduccionGenero::belongsTo('produccionId', $_POST['id']);
            foreach ($t_produccionGenero as $produccionGenero) {                
                $produccionGenero->eliminar();
            }

            // Obtener los géneros de la petición POST (asumiendo que se envían como un array)
            $generosString = $_POST['genero'];
            $generos = explode(',', $generosString);

            $g= new Genero();
            // Ahora puedes iterar sobre los géneros y hacer lo que necesites con ellos
            foreach ($generos as $genero) {
                // Aquí puedes manejar cada género individualmente, por ejemplo, guardarlos en la tabla de relación
                $t_genero = Genero::where('genero', $genero); 
                //$g = $t_genero;                           
                if($t_genero) {   
                    $produccionGenero = new ProduccionGenero();
                    $produccionGenero->generoId = intval($t_genero->id);                 
                    $produccionGenero->produccionId = intval($produccion->id);                    
                    $produccionGenero->guardar();
                }                
            }

            $t_produccionProta = ProduccionProta::belongsTo('produccionId', $_POST['id']);
            foreach ($t_produccionProta as $produccionProta) {                 
                $produccionProta->eliminar();
            }

            // Obtener los protagonistas de la petición POST (asumiendo que se envían como un array)
            $protagonistasString = $_POST['protagonista'];
            $protagonistasArray = json_decode($protagonistasString, true);           

            foreach ($protagonistasArray as $prota) {
                // Aquí puedes manejar cada género individualmente, por ejemplo, guardarlos en la tabla de relación
                //$actorName = ' '. key($prota) . ' ';
                $t_actor = Actor::where('actor', key($prota));                                          
                if($t_actor === null) {                      
                    $actor = new Actor();
                    $actor->actor = trim(key($prota));
                    $resultadoActor = $actor->guardar();                    

                    $produccionProta = new ProduccionProta();
                    $produccionProta->personaje = reset($prota);
                    $produccionProta->produccionId = intval($produccion->id);
                    $produccionProta->actorId = $resultadoActor['id'];                    
                    $produccionProta->guardar();                    
                }else{
                    $produccionProta = new ProduccionProta();
                    $produccionProta->personaje = reset($prota);
                    $produccionProta->produccionId = intval($produccion->id);
                    $produccionProta->actorId = intval($t_actor->id);                    
                    $produccionProta->guardar();                   
                }
                
            }


            if($resultado) {
                $respuesta = [
                    'tipo' => 'exito',
                    'generos' => $g,
                    'protagonistas' => $protagonistasArray,
                    'idproduccion' => intval($produccion->id),
                    'id' =>$produccion->id,
                    'proyectoId' => $proyecto->id,
                    'mensaje' => 'Actualizado correctamente'
                ];
                echo json_encode(['respuesta' => $respuesta]);
            }

        }
    }

    public static function eliminar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Validar que el proyecto exista
            $proyecto = Proyecto::where('url', $_POST['proyectoId']);

            session_start();

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al actualizar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            } 

            $t_produccionGenero = ProduccionGenero::belongsTo('produccionId', $_POST['id']);
            foreach ($t_produccionGenero as $produccionGenero) {                
                $produccionGenero->eliminar();
            }
            
            $t_produccionProta = ProduccionProta::belongsTo('produccionId', $_POST['id']);
            foreach ($t_produccionProta as $produccionProta) {                 
                $produccionProta->eliminar();
            }

            $produccion = new Produccion($_POST);
            $resultado = $produccion->eliminar();


            $resultado = [
                'resultado' => $resultado,
                'mensaje' => 'Eliminado Correctamente',
                'tipo' => 'exito'
            ];
            
            echo json_encode($resultado);
    
        }

    }
}