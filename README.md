
stuco 
=====


TODO
----

* Ajouter tweet sur le mur courant
    * Cliquer sur a "ajouter tweet" propose une nouvelle fenetre en bas de wall avec :
        * textbox ecrire ici (max 140 char)
        * valider
    * le tout est envoyer dans DB via SQL (id_owner  = CURRENT_WALL_ID)

* Supprimer tweet : 
    afficher la liste avec un petit bouton en promo

* Layout ajouter CoDisciples
    * utiliser bootstrap form
* Gerer la déconnexion afin d'empeche quelque de non-loggé d'accèder aux ressources 'espace membre' 


BUG
---
* g_wall n'est pas initialisé correctement
* Impossible d'ecrire sur son propre mur...
* parfois le nom du propriétaire du mur ne s'affiche pas [RESOLVED]

old questions/rem
-----------------
* Question : Comment récupérer le nom d'un coDisciple à partir d'un id ?
    * le problème d'un fecthUsername(id) est que la fonction de call back ne peut pas retourner
le username associé à la fonction appelante.
    * a moins de : définir un tableau global où l'on stocke id : username des amis.
* solution : Appler les info dans la requete SQL 

other
-----

Some useful site for CSS
* http://paletton.com/#uid=53V0u1kllll3VTBcDuMu2bUPg2uklllle+dBiahuowpcrGt4klllle+dBiahuowpcrGt4
* https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background