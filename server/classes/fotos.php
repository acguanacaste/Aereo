<?php
class Fotos {

    protected $db;
    public function __construct($db) {
        $this->db = $db;
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

    public function searchPhotos($arguments){
        $where = "";

        if (is_array($arguments['year'])){ //years are in range, is not "All"
            $where.="ano between ".$arguments["year"][0]." and ".$arguments["year"][1];
        }
        if (is_array($arguments['geo'])){
            $points="";
            $count = 0;
            $firstPoint ="";
            foreach ($arguments['geo'] as $onePoint){
                $points.= $onePoint['lat']." ".$onePoint['lng'].",";
                if ($count ==0){
                    $firstPoint= $onePoint['lat']." ".$onePoint['lng'];
                }
                $count++;
            }
            $points .=$firstPoint;
            $query = "SET @zone = GeomFromText('Polygon(($points))')";
            $error="";
            $geoWhere="";
            try{
                $result = $this->db->exec($query);
                $geoWhere = " and Contains(@zone,punto)";

            }catch (PDOException $e) {
                $error .= "Error buscando en el área marcada: ".$e->getMessage();
            }
        }

        try{

            $query2 = "SELECT idfoto,foto,titulo,sector,latitud,longitud,ano FROM foto WHERE $where $geoWhere";
            $result = $this->db->query($query2);
            $results = [];


            if (!empty($result)){
                while($row = $result->fetch()) {
                    $results[] = $row;
                }
            }else{
                $error .= "No ha resultados para su consulta<br/>";
            }

        }catch (PDOException $e) {
            $error .= "Ha ocurrido un erro en su búsqueda: ".$e->getMessage();
        }
        $response = array(
            "header" => array(
                "error" => $error,
                "count" => count($results),
                "year" => $arguments['year'],
                "geo"=>$arguments['geo'],
                "query2"=>$query2
            ),
            "result" => $results
        );
        return $response;

    }
}