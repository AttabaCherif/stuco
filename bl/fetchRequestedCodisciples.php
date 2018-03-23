<?php
require_once 'bl.php';

$name = utf8_encode($_REQUEST['name']);

session_start();
$user_id= $_SESSION['uid'];

$rows = fetchRequestedCodisciples($name,$user_id);

if(!$rows) $ret=NULL;
else
{
    // retourne au navigateur un fichier JSON avec les users
    $ret=json_encode($rows);
}


echo $ret;

