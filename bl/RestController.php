<?php
/**
 * Controller - RESTful Test
 * Point d’entrée pour les webservices du projet StudentCo
 * @param method la méthode appelée dans bl.php
 * @param …les autres paramètres nécessaires suivant l’appel
 */
require_once('StucoRestHandler.class.php');
$method = "";

if(isset($_GET["method"]))
    $method = $_GET["method"];

//controls the RESTful services - URL mapping
switch($method){
    case "authenticate":
// to handle REST Url login/<username>/<password>/
        $stucoRestHandler = new StucoRestHandler();
        $username = $_GET["username"];
        $password = $_GET["password"];
        $stucoRestHandler->restAuthenticate($username , $password);
        break;
    case "" :
//404 - not found;
        break;
}