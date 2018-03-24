<?php
require_once 'bl.php';

$guest_id = utf8_encode($_REQUEST['guest_id']);
session_start();

$owner_id = $_SESSION['uid'];



$ret=sendInvitation($owner_id,$guest_id);

echo $ret;
