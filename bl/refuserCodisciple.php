<?php
require_once 'bl.php';

$approbation_id= utf8_encode($_REQUEST['id']);

$ret=refuserCodisciple($approbation_id);

echo $ret;


