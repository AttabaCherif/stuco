<?php

require_once 'bl.php';

$tweet_content = utf8_encode($_REQUEST['tweet_content']);
$wall_owner_id = utf8_encode($_REQUEST['wall_owner_id']);

session_start();

$writer_id = $_SESSION['uid'];

if($wall_owner_id==0)
    $wall_owner_id=$writer_id;

$ret=writeTweet($writer_id,$wall_owner_id,$tweet_content);

echo $ret;

//if($ret)
//    return $ret;
//else
//    return false;

