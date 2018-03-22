<?php

require_once 'bl.php';

$tweet_id = utf8_encode($_REQUEST['id']);

$ret=deleteTweet($tweet_id);

echo $ret;

//if($ret)
//    return $ret;
//else
//    return false;

