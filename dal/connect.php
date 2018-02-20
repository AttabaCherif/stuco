<?php
// connexion à la DB stuco
define("PILOTE","mysql");
define("SERVERIP","localhost");
define("BASEDB","studentcodb");
define("USERDB","root");
define("PSWDB", "");
//data source name
define("DSN",PILOTE.":host=".SERVERIP.";dbname=".BASEDB);



/**
 * Utilise les paramètres de connexion pour instancier un objet PDO
 * @return objet PDO initialisé pour la DB studentco
 */
function getPDO() {
    $arrExtraParam= array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
    $pdo = new PDO(DSN,USERDB,PSWDB,$arrExtraParam);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
}



