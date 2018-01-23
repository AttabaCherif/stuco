<?php
// the includes
require_once 'bl.php';

// parameters
$username=utf8_encode($_REQUEST['username']);
$password=utf8_encode($_REQUEST['password']);
//
$ret = authenticate($username, $password);
echo $ret;