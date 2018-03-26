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
    $sql="SELECT login.username, tweet.id, tweet.tweet_content, tweet.wall_owner_id, tweet.writer_id FROM tweet,login WHERE tweet.wall_owner_id =  '$id' and tweet.writer_id = login.id";
    try{
        $pdo = getPDO();
        $rows = $pdo->query($sql)->fetchAll();
        $pdo=null;
        return $rows;
    }catch (PDOException $erreur){return NULL;}
}

/**
 * Ecrit en DB le tweet écrit par writer_id sur wall_owner_id
 * @param $writer_id (int) l'id de celui qui écrit
 * @param $wall_owner_id (int) l'id du user possédant le mur
 * @param $tweet_content (string) contenu du tweet
 * @return (int) nombre de ligne affecté ou null si error
 */
function dbWriteTweet($writer_id,$wall_owner_id,$tweet_content)
{
    $sql="INSERT INTO tweet (writer_id,wall_owner_id,tweet_content) VALUES ('$writer_id','$wall_owner_id','$tweet_content')";
    try
    {
        $pdo = getPDO();
        $rows = $pdo->exec($sql);
        $pdo=null;

        return $rows;
    }catch (PDOException $erreur){return NULL;}
}

/**
 * Supprimer en DB le tweet dont l'id est donné en parametre
 * @param $tweet_id (int) : id du tweet à supprimer
 * @return le nombre d'enregistrement modifié en DB
 */
function dbDeleteTweet($tweet_id)
{
    $sql="DELETE FROM tweet WHERE id='$tweet_id'";
    try
    {
        $pdo = getPDO();
        $rows = $pdo->exec($sql);
        $pdo=null;

        return $rows;
    }catch (PDOException $erreur){return NULL;}
}

/**
 * @param $user_id : id de l'user désirant supprimer un coDisciple
 * @param $coDisciple_id : l'id du coDisciple a supprimer
 * @return (int) nombre de ligne modifiée en DB
 */
function dbDeleteCodisciple($user_id, $coDisciple_id)
{
    $sql="DELETE FROM approval WHERE (owner_id = '$user_id' AND guest_id='$coDisciple_id') OR (owner_id ='$coDisciple_id' AND guest_id= '$user_id') AND current_status = 1";
    try
    {
        $pdo = getPDO();
        $rows = $pdo->exec($sql);
        $pdo=null;

        return $rows;
    }catch (PDOException $erreur){return NULL;}
}

/**
 * Récupère en DB les user dont le nom est $name et qui n'ont aucune approbation en cours avec le user courant
 * @param $name : nom recherché
 * @param $user_id : id du user courant
 * @return la liste des coDisciples du nom demandé, sans lien d'approbation en cours
 */
function dbfetchRequestedCodisciples($name,$user_id)
{

    $sql="SELECT login.id, login.username FROM login WHERE login.id NOT IN (SELECT l.id FROM login l , approval a WHERE ((l.id = a.owner_id AND '$user_id' = a.guest_id) OR (l.id = a.guest_id AND '$user_id' = a.owner_id))) AND login.username = '$name' ";
    try
    {
        $pdo = getPDO();
        $rows = $pdo->query($sql)->fetchAll();
        $pdo=null;

        return $rows;
    }catch (PDOException $erreur){return NULL;}

}

/**
 * Ajoute en DB une approbation
 * @param $owner_id : lanceur d'invitation
 * @param $guest_id :  receveur d'invitation
 * @return int : nombre d'enregistrements moodifiés en DB
 */
function dbSendInvitation($owner_id,$guest_id)
{
    $zero = 0;
    $sql="INSERT INTO approval (owner_id, guest_id, current_status) VALUES ('$owner_id','$guest_id','$zero')";
    try
    {
        $pdo = getPDO();
        $rows = $pdo->exec($sql);
        $pdo=null;

        return $rows;
    }catch (PDOException $erreur){return NULL;}
}

/**
 * @param $id int : id de l'utilisateur
 * @return liste des approbations lié à l'id en parametre
 */
function dbFetchApprobations($id)
{
    $sql="SELECT approval.id, approval.owner_id, approval.guest_id, approval.current_status , login.username FROM  approval, login WHERE (approval.guest_id = '$id' AND login.id = approval.owner_id) OR (approval.owner_id='$id' AND login.id = approval.guest_id)";
    try{
        $pdo = getPDO();
        $rows = $pdo->query($sql)->fetchAll();
        $pdo=null;
        return $rows;
    }catch (PDOException $erreur){return NULL;}
}

/**
 * modifie le current_status (=1) de l'approbation lié à l'id en parametre
 * @param $approbation_id : id de l'approbation à modifier
 * @return le nombre d'enregistrement modifié en DB
 */
function dbAccepterCodisciple($approbation_id)
{
    $sql="UPDATE approval SET approval.current_status = 1 WHERE approval.id = '$approbation_id' ";
    try{
        $pdo = getPDO();
        $rows = $pdo->exec($sql);
        $pdo=null;
        return $rows;
    }catch (PDOException $erreur){return NULL;}
}


/**
 * modifie le current_status (=2) de l'approbation lié à l'id en parametre
 * @param $approbation_id : id de l'approbation à modifier
 * @return le nombre d'enregistrement modifié en DB
 */
function dbRefuserCodisciple($approbation_id)
{
    $sql="UPDATE approval SET approval.current_status = 2 WHERE approval.id = '$approbation_id' ";
    try{
        $pdo = getPDO();
        $rows = $pdo->exec($sql);
        $pdo=null;
        return $rows;
    }catch (PDOException $erreur){return NULL;}
}
