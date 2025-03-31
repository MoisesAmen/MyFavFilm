<?php

namespace Model;

class Produccion extends ActiveRecord {
    protected static $tabla = 'produccion';
    protected static $columnasDB = ['id', 'nombre', 'tipo', 'fechaEstreno', 'calificacion', 'duracion', 'director', 
    'presupuesto', 'taquillaMundial', 'sinopsis', 'urlImagen', 'urlTrailer', 'proyectoId'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->tipo = $args['tipo'] ?? '';
        $this->fechaEstreno = $args['fechaEstreno'] ?? '';
        $this->calificacion = $args['calificacion'] ?? '';
        $this->duracion = $args['duracion'] ?? '';
        $this->director = $args['director'] ?? '';
        $this->presupuesto = $args['presupuesto'] ?? '';
        $this->taquillaMundial = $args['taquillaMundial'] ?? '';
        $this->sinopsis = $args['sinopsis'] ?? '';
        $this->urlImagen = $args['urlImagen'] ?? '';
        $this->urlTrailer = $args['urlTrailer'] ?? '';
        $this->proyectoId = $args['proyectoId'] ?? '';
    }
}