<?php

require_once 'bl.php';


session_start();
$id = $_SESSION['uid'];

// récupère un array php des codisciples
$rows = fetchCoDisciples($id);


if(!$rows) $ret=NULL;
else
{
    // retourne au navigateur un fichier JSON avec les users
    $ret=json_encode($rows);
}

echo $ret;


    //aide debogage PHP au lieu de la boucle (cf. A)
//    echo("<b>print_r</b><br/>");
//    print_r($rows);
//    echo('<hr/>');
//    echo("<b>var_dump</b><br/>");
//    var_dump($rows);


// OLD CODE construction de la liste de coDisciple au format html
//echo ("Liste des utilisateurs");
//echo ('<hr/>');
//if (!$rows) echo ("Il n'y a aucun utilisateurs enregistrés");
//else
//{
//    foreach ($rows as $row)
//        echo ($row[0].'<br/>');
//
//}


