<?php
// the includes
require_once 'bl.php';

// parameters
$username=utf8_encode($_REQUEST['username']);
$password=utf8_encode($_REQUEST['password']);
//
$id = authenticate($username, $password);

if ($id != NULL)
{
    session_start();
    $_SESSION['uid'] = $id;
    $ret=true;
}
else
    $ret=false;

echo $ret;

