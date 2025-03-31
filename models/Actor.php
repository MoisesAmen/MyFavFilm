<?php

namespace Model;

class Actor extends ActiveRecord {
    protected static $tabla = 'actor';
    protected static $columnasDB = ['id', 'actor'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->actor = $args['actor'] ?? '';        
        
    }
}