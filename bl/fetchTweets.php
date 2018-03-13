<?php

require_once 'bl.php';
$wall_owner_id=utf8_encode($_REQUEST['id']);

session_start();
$id = $_SESSION['uid'];

// récupère un array php des tweets
if($id==0)
    $rows = fetchTweets($id);
else
    $rows = fetchTweets($wall_owner_id);

if(!$rows)
    $ret=NULL;
else
{
    // retourne au navigateur un fichier JSON avec les users
    $ret=json_encode($rows);
}

echo $ret;
