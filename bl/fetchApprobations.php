<?php
require_once 'bl.php';


session_start();
$id = $_SESSION['uid'];

// récupère un array php des codisciples

$rows = fetchApprobations($id);


if(!$rows) $ret=NULL;
else
{
    array_push($rows,$id);
    // retourne au navigateur un fichier JSON avec les users
    $ret=json_encode($rows);
}

echo $ret;
