<?php
require_once 'connect.php' ;
/**
 * Lire un Login de la DB
 * @param String $username
 * @param String $password
 * @return NULL si pas trouvé | l'id si ok | NULL si Exception
 */
function dbReadLogin($username,$password){

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
 * @return null en cas d'exception | L'ensemble des coDisciple stockés en DB
 */
function dbListOfCodisciples($id){
    $sql="SELECT id,username FROM login WHERE id !='".$id."'";
    try{
        $pdo = getPDO();
        $rows = $pdo->query($sql)->fetchAll();
        $pdo=null;
        return $rows;
    }catch (PDOException $erreur){return NULL;}

}