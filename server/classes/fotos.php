<?php
class Fotos {

    protected $db;
    public function __construct($db) {
        $this->db = $db;
    }


    public function getFotos($id){
        $fotos = array();


        if (!empty($id)) {
            $unaFoto = array("id" => $id);
            $query = "Select * from foto WHERE idfoto= :$id";
            $fotos = $unaFoto;
        }else{
            $query = "Select * from foto";
        }
        $result = $this->db->query($query);
        return $fotos;

    }

    public function getComponents() {
        $sql = "SELECT idfoto,foto,titulo,sector,latitud,longitud,ano
            from foto";
        $stmt = $this->db->query($sql);
        $results = [];
        while($row = $stmt->fetch()) {
            $results[] = $row;
        }
        return $results;
    }
}