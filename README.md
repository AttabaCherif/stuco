
stuco 
=====


TODO
----
* Ne selectionner que les  user sans approbations courantes
* Gerer le retour des requested user vide

BUG
---
* g_wall n'est pas initialisé correctement [RESOLVED]
* Impossible d'ecrire sur son propre mur...[RESOLVED]
* parfois le nom du propriétaire du mur ne s'affiche pas [RESOLVED]

Questions :
-----------

* doit-on supprimer les tweets des anciens amis ?

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