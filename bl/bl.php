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

/**
 * Ecrit en DB le tweet écrit par writer_id sur wall_owner_id
 * @param $writer_id (int) l'id de celui qui écrit
 * @param $wall_owner_id (int) l'id du user possédant le mur
 * @param $tweet_content (string) contenu du tweet
 * @return (int) nombre de ligne affecté ou NULL si error
 */
function writeTweet($writer_id,$wall_owner_id,$tweet_content)
{
    $ret=dbWriteTweet($writer_id,$wall_owner_id,$tweet_content);
    return $ret;
}

/**
 * Supprimer le tweet dont l'id est donné en parametre
 * @param $tweet_id (int) : id du tweet à supprimer
 * @return le nombre d'enregistrement modifié en DB
 */
function deleteTweet($tweet_id)
{
    $ret=dbDeleteTweet($tweet_id);
    return $ret;
}

/**
 * Supprimer un lien d'amitié
 * @param $user_id : utilisateur qui demande la suppression d'amitié
 * @param $coDisciple_id : utilisateur concerné par la suppression
 * @return int le nombre de ligne modifiée en DB
 */
function deleteCodisciple($user_id, $coDisciple_id)
{
    $ret=dbDeleteCodisciple($user_id, $coDisciple_id);
    return $ret;
}

/**
 * Prépare une requete ajax permettant de récupérer une liste d'utilisateur sans lien d'approbation
 * à partir d'un nom entré par l'user courant
 * @param $name : le user dont le nom est recherché
 * @param $user_id : Id du user qui lance la recherche
 * @return  la liste des utilisateurs sans lien d'approbation
 */
function fetchRequestedCodisciples($name,$user_id)
{
    $ret = dbfetchRequestedCodisciples($name,$user_id);
    return $ret;
}

/**
 * Ajoute en DB une approbation
 * @param $owner_id : lanceur d'invitation
 * @param $guest_id :  receveur d'invitation
 * @return int : nombre d'enregistrements moodifiés en DB
 */
function sendInvitation($owner_id,$guest_id)
{
    $ret= dbSendInvitation($owner_id,$guest_id);
    return $ret;
}

/**
 * @param $id : id  du l'utilisateur courant
 * @return list des approbations de  l'utilisateur courant
 */
function fetchApprobations($id)
{
    $ret= dbFetchApprobations($id);
    return $ret;
}