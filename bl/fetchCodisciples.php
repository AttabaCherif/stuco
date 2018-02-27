<?php

require_once 'bl.php';

$rows = fetchCoDisciples();
echo ("Liste des utilisateurs");
echo ('<hr/>');
if (!$rows) echo ("Il n'y a aucun utilisateurs enregistrés");
else
    foreach ($rows as $row)
        echo ($row[0].'<br/>');