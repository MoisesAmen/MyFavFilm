<?php

namespace Model;

class Genero extends ActiveRecord {
    protected static $tabla = 'genero';
    protected static $columnasDB = ['id', 'genero'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->genero = $args['genero'] ?? '';        
        
    }
}