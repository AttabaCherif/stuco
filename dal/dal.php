<?php
require_once 'connect.php' ;
/**
 * Lire un Login de la DB
 * @param String $username
 * @param String $password
 * @return NULL si pas trouvé | l'id si ok | NULL si Exception
 */
function dbReadLogin($username,$password)
{

   //query
   $sql="SELECT id FROM login WHERE username='$username' AND password='$password'";
   //
   try {
       $pdo = getPDO();
       $row = $pdo->query($sql)->fetch();
       //fermer la connexion
       $pdo=null;
       //return
       if(!$row)
           return NULL;
       else
           $id = $row['id'];
       return $id;
   }
   catch (Exception $error) {
       return NULL;
   }
}

/**
 * @return null en cas d'exception | String username associé à l'id
 * @param int $id : id du user dont on veut le username
 */
function dbFetchUsername($id)
{
    //query
    $sql="SELECT username FROM login WHERE id = '$id'";
    //
    try {
        $pdo = getPDO();
        $row = $pdo->query($sql)->fetch();
        //fermer la connexion
        $pdo=null;
        //return
        if(!$row)
            return NULL;
        else
            $username = $row['username'];
        return $username;
    }
    catch (Exception $error) {
        return NULL;
    }
}
/**
 * @return null en cas d'exception | L'ensemble des coDisciple stockés en DB
 * @param int $id : id du user dont on demande la liste des coDisciples
 */
function dbListOfCodisciples($id){

    $sql="SELECT l.id, l.username from login l , approval a WHERE ((a.owner_id = '$id'  AND a.guest_id = l.id) OR (a.guest_id = '$id' AND l.id = a.owner_id)) AND a.current_status = 1";

    try{
        $pdo = getPDO();
        $rows = $pdo->query($sql)->fetchAll();
        $pdo=null;
        return $rows;
    }catch (PDOException $erreur){return NULL;}
}

/**
 * @return null en cas d'exception | L'ensemble des coDisciple stockés en DB
 * @param int $id : id du user dont on demande la liste des coDisciples
 */
function dbListOfTweets($id){
    $sql="SELECT * from tweet where wall_owner_id = '$id'";
    try{
        $pdo = getPDO();
        $rows = $pdo->query($sql)->fetchAll();
        $pdo=null;
        return $rows;
    }catch (PDOException $erreur){return NULL;}
}
