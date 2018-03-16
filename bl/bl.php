<?php

const PUBS = "1|Concombre->Le meilleur#1|Tomate->La plus
rouge#0|Carotte->La plus longue#1|salade->La plus légère#1|Choux->La fleur#1|Le
radis->Le noir#";

//Les imports lien entre Business et DAL
define("ROOTSITE", $_SERVER["DOCUMENT_ROOT"]."/stuco/");
define("DAL", ROOTSITE.'dal/dal.php');
require_once DAL;



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

/**
 * @return string contenant les pubs stockées en constante
 */
function pubs(){
    return PUBS ;
}

/**
 * @return list of rows contenant les coDisciples stockés en DB
 */
function fetchCoDisciples($id){
    $rows = dbListOfCodisciples($id);
    return $rows;
}

/**
 * @return list of rows contenant les Tweets stockés en DB
 */
function fetchTweets($id){
    $rows = dbListOfTweets($id);
    return $rows;
}

/**
 * @return string  contenant le username associé à id en DB
 * @param int id login
 */
function fetchUsername($id)
{
    $rows = dbFetchUsername($id);
    return $rows;
}