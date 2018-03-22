<?php

require_once 'bl.php';
$id_wanted=utf8_encode($_REQUEST['id']);

session_start();
$id = $_SESSION['uid'];

// si id_wanted est 0 alors prendre l'id du user connecté
if($id_wanted==0)
    $rows = fetchUsername($id);
else
    $rows = fetchUsername($id_wanted);

if(!$rows)
    $ret=NULL;
else
    $ret=$rows;

echo $ret;
