<?php
// the includes
require_once 'bl.php';

// parameters
$username=utf8_encode($_REQUEST['username']);
$password=utf8_encode($_REQUEST['password']);
//
$id = authenticate($username, $password);

if ($id != NULL)
    $ret=1;
else
    $ret=0;

echo $ret;

