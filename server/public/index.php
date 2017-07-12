<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
spl_autoload_register(function ($classname) {
    require ("../classes/" . $classname . ".php");
});


$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = "localhost";
$config['db']['user']   = "root";
$config['db']['pass']   = "";
$config['db']['dbname'] = "aereo";


$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

//$container['view'] = new \Slim\Views\PhpRenderer("../../templates/");
$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'].";charset=utf8",
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};




$app->get('/', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Bienvenido al API");
    return $response;
});
$app->map(['GET', 'POST'], '/search/[{year}[/{geo}]]', function ($request, $response, $args) {
    $data ="";
    if ($request->isPost()){
        $json = $request->getParsedBody();
        $data =json_decode($json['json'], true);
    }elseif ($request->isGet()){

    }
    $foto = new Fotos($this->db);
    $result = $foto->searchPhotos($data);
    $newResponse = $response->withJson(array($result));
    return $newResponse;


});
$app->get('/fotos/', function (Request $request, Response $response) {
    $foto = new Fotos($this->db);
    $result = $foto->getComponents();
    //var_dump($result);
    $newResponse = $response->withJson($result);
    return $newResponse;
    //$response->getBody()->write("Bienvenido al API");

    return $response;
});
$app->run();