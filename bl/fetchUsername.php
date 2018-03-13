<?php
/**
 * Created by IntelliJ IDEA.
 * User: matthias
 * Date: 13/03/2018
 * Time: 16:17
 */


require_once 'bl.php';
$requested_id=utf8_encode($_REQUEST['id']);

session_start();
$id = $_SESSION['uid'];

// récupère un array php des tweets
$ret = dbfetchUsername($requested_id);


if(!$rows) $ret=NULL;
else
{
    echo $ret;
}

