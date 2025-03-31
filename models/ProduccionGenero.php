<?php

namespace Model;

class ProduccionGenero extends ActiveRecord {
    protected static $tabla = 'produccion_genero';
    protected static $columnasDB = ['id', 'generoId', 'produccionId'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->generoId = $args['generoId'] ?? '';
        $this->produccionId = $args['produccionId'] ?? '';
        
    }
}