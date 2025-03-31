<?php

namespace Model;

class ProduccionProta extends ActiveRecord {
    protected static $tabla = 'produccion_prota';
    protected static $columnasDB = ['id', 'personaje', 'produccionId', 'actorId'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->personaje = $args['personaje'] ?? '';
        $this->produccionId = $args['produccionId'] ?? '';
        $this->actorId = $args['actorId'] ?? '';       
        
    }
}