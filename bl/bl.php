<?php

//Les imports lien entre Business et DAL
define("ROOTSITE", $_SERVER["DOCUMENT_ROOT"]."/stuco/");
define("DAL", ROOTSITE.'dal/dal.php');
require_once DAL;
//require_once 'C:/xampp/htdocs/stuco/dal/dal.php';


/**
 * ICI ON DEFINI LES FONCTIONS
 */

/**
 * Authentifie un login = (username, password)
 * @param string username
 * @param string password
 * @return boolean true si authentifié, false sinon
 */
function authenticate($username, $password){
    $id= dbReadLogin($username,$password);
	return $id;
}

function pubs(){
    return PUBS ;
}