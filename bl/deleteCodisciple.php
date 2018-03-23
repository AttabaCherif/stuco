<?php

require_once 'bl.php';

session_start();
$user_id = $_SESSION['uid'];
$coDisciple_id = utf8_encode($_REQUEST['id']);


$ret=deleteCodisciple($user_id, $coDisciple_id);

echo 1;