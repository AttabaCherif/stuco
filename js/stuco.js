/**
 * stuco v0.1
 */

//var global
var g_username;
var g_password;
var g_isConnected;
var g_wall // id du user dont le wall est affiché


/**
 * Réinitialise les variables globales
 * Appelé à la fin du chargement de la page et quand nécessaire
 */
function initApp() {
	window.console.log("initApp() -start");
	g_isConnected = false;
	g_username = "";
	g_password = "";
	window.console.log("initApp() -end");
}

/**
 * Appelé quand click sur le bouton de la boîte de connexion : change l'interface en fonction de la
 * variable g_isConnected :
 *      si g_isConnected = true : on est déjà connecté et l'utilisateur doit être déconnecté
 *      si g_isConnected = false : authenticate(username, password) décide si connection ou non
 */
function doConnect() {
	window.console.log("doConnect() -start/return");

	if (g_isConnected) {
		pubs();
        $('#btConnexion').html("Connexion");
        $('#frontUsername').html("");
        $('#page').html("");
        $('#wall').html("");
		g_isConnected = false;
	} else {
		authenticate($('#logUsername').val(),$('#logPassword').val());
	}
}

/**
 * authentifie un login = (username, password) par une requête Ajax vers le server
 * @param username : nom d'utilisateur
 * @param password : mot de passe
 * @return authentificateCallback(responses)
 */
function authenticate(username, password) {
    window.console.log("authenticate("+username+","+password+") -start Ajax");

    $.ajax({
        type : 'GET',
        url : 'bl/authenticate.php',
        data : "username="+username+"&password="+password,
        dataType : 'text',
        success : authenticateCallback
    });
}

/**
* Réalise l'affichage en fonction de la valeur de retour de authenticate
 * @param response : 1 ou 0 selon réussite ou echec du log in
* */
function authenticateCallback(response){
    if(response)
        connect();
    else
        alert("Mot de passe incorrect");
}

/**
 * Affiche les informations relative à un log in réussi
 * Affiche la liste des Codisciple (pour l'instant l'entièreté)
 */
function connect()
{
    window.console.log("authenticate () -start ")
    var logUsername=$("#logUsername");
    var logPassword=$("#logPassword");

    $('#btConnexion').html('Deconnexion');
    logUsername.val("");
    logPassword.val("");

    window.console.log("ajax -> bl/fetchCodisciples.php");

    g_isConnected = true;

    fetchCodisciples();
    fetchTweets(0);
}

/**
 * Prepare une requete ajax pour récupéré la liste des coDiscpliples
 */
function fetchCodisciples()
{
    window.console.log("fetchCodisciples() - start Ajax -> bl/fetchCodisciples.php");
    $.ajax({
        type :'GET',
        url : 'bl/fetchCodisciples.php',
        success : fetchCodisciplesCallback
    });
}

/**
 * affiche dans page la liste des coDispliples
 * @param ret : liste JSON des coDisciples
 */
function fetchCodisciplesCallback(ret)
{
    window.console.log("fetchCodisciplesCallback(ret) -start");
    try{
        var affiche = "<div class='list-group'><button type='button' class='custom-list-group list-group-item list-group-item-action active' >List des co' disciples </button>";
        var jarray = $.parseJSON(ret);
        for (var i = 0 ; i <jarray.length ; i++)
        {
            var row= jarray[i];
            var id = row['id'];
            var username = row['username'];
            var ligne = "<button class='list-group-item list-group-item-action' id='co"+id+
                "' onclick='fetchTweets(this.id.substring(2),this.innerHTML);'"+
            " onmousemove='overElement(this);' onmouseout='outElement(this);'>"
            ligne+= username+"</button>";
            affiche += ligne;
        }
    }catch (err){window.console.log("fetchCoDisciplesCallBack -err = "+err);}
    affiche+="</div>";

    $('#page').html(affiche);

    window.console.log("fetchCodisciplesCallback(ret) -start");
}

/**
 * Récupère la liste des tweets associées à un id login donnée
 * @param id : id du propriétaire du mur
 */
function fetchTweets(id)
{
    window.console.log("fetchTweets() - start Ajax -> bl/fetchTweets.php");

    g_wall = id;

    $.ajax({
        type :'GET',
        url : 'bl/fetchTweets.php',
        data : 'id='+id,
        success : fetchTweetsCallback
    });

}

/**
 * Affiche la liste des tweets dans le wall
 * @param tweets
 */
function fetchTweetsCallback(tweets)
{
    window.console.log("wallCoDiscipleCallBack() - start");
    var affiche = "<div class='list-group'><button type='button' id='wallTitle' class='custom-list-group list-group-item list-group-item-action active' ></button>"
    if (!tweets)
    {
        affiche +="<button class='list-group-item list-group-item-action'>Aucun tweet :(</button></div>";
    }
    else
    {
        try
        {
            var jarray = $.parseJSON(tweets);
            for (var i = 0 ; i < jarray.length ; i++)
            {
                var row= jarray[i];
                var id = row['id'];
                var tweet = row['tweet_content'];
                var writer = row['username'];
                // ajout de
                var ligne = "<button class='list-group-item list-group-item-action' id='tw"+id+"' >";
                ligne+= writer+" : "+tweet+"</button>";
                affiche += ligne;
            }
            affiche+="</div>";
        }
        catch (err)
        {
            window.console.log("wallCodiscipleCallBack() -err = "+err);
        }
    }
    $('#wall').html(affiche);
    wallTitle(g_wall);
}

/**
 * Prépare la requete ajax pour changer le nom du mur courant
 * @param id du propriétaire du mur
 */
function wallTitle(id)
{
    $.ajax({
        type :'GET',
        url : 'bl/fetchUsername.php',
        data : 'id='+id,
        success : wallTitleCallback
    });
}

/**
 * Affiche le nom du propriétaire du mur
 * @param username : nom du propriétaire du  mur
 */
function wallTitleCallback(username)
{
    $('#wallTitle').html("Mur de "+username);
}

/**
 * Prepare la requete ajax pour récupérer la liste des tweets supprimables
 */
function displayTweetDelete()
{
    window.console.log("displayTweetDelete() ajax -> bl/fetchTweets.php ");

    $.ajax({
        type :'GET',
        url : 'bl/fetchTweets.php',
        data : 'id='+0,
        success : displayTweetDeleteCallback
    });
}

/**
 * Affiche la liste des tweets supprimables dans le wall
 */
function displayTweetDeleteCallback(tweets)
{
    window.console.log("displayTweetDeleteCallback() - start");
    var affiche = "<div class='list-group'><button type='button' id='wallTitle' class='custom-list-group list-group-item list-group-item-action active' ></button>"
    if (!tweets)
    {
        affiche +="<button class='list-group-item list-group-item-action'>Aucun tweet :(</button></div>";
    }
    else
    {
        try
        {
            var jarray = $.parseJSON(tweets);
            for (var i = 0 ; i < jarray.length ; i++)
            {
                var row= jarray[i];
                var id = row['id'];
                var tweet = row['tweet_content'];
                var writer = row['username'];
                // ajout de
                var ligne = "<button class='list-group-item list-group-item-action' id='tw"+id+"' >";
                ligne+= writer+" : "+tweet+"</button>"+
                    "<span id='bouton-envoyer' class='input-group-addon btn btn-primary'>Supprimer</span>";
                affiche += ligne;
            }
            affiche+="</div>";
        }
        catch (err)
        {
            window.console.log("wallCodiscipleCallBack() -err = "+err);
        }
    }
    $('#wall').html(affiche);
    wallTitle(g_wall);

    //ue fois la liste des id récupérer modifier les element twID pour ajouter un bouton supprimer

}
/**
 * Affiche un formulaire d'écriture de tweet
 * @param (int) g_wall : id du user sur lequel on écrit un tweet
 */
function displayTweetPrompt()
{
    // il faut remplacer la div des tweet par un formulaire
    var affiche = "<div class='list-group'><button type='button' id='wallTitle' class='custom-list-group list-group-item list-group-item-action active' ></button>";

    affiche+="<br/><div class='input-group'>" +
                "<textarea class='form-control custom-control' rows='3' style='resize:none'></textarea>" +
                "<span id='bouton-envoyer' class='input-group-addon btn btn-primary'>Envoyer</span>" +
             "</div>";

    affiche+="</div>";
    $('#wall').html(affiche);
    wallTitle(g_wall);
}

/**
 * Recupère les pubs par une requête Ajax vers le server
 * @return pubsCallback(publicite)
 */
function pubs() {
    window.console.log("pubs() -start");

    $.ajax({
        type : 'GET',
        url : 'bl/getPubs.php',
        success : pubsCallback
    });

}

/**
 * Affiche la publicité sur le mur
 * @param publicite : une string contenant la liste des pubs séparée par #
 * */
function pubsCallback(publicite) {
    window.console.log("pubsCallback() -start");

    var pubs = publicite.split("#");
    var pubHTML = '<div id="pubs">';
    for (i = 0; i < pubs.length; i++) {
        if (pubs[i].charAt(0) == "1") pubHTML += "<br/>" + pubs[i].substring(2);
    }
    pubHTML += "</div>"
    document.getElementById("wall").innerHTML = pubHTML;
}

/**
 * @param e
 * fonction déclenchée par le survole sur d'un élement  (event  : onmousemove)
 * Affiche : un pointeur de selection
 */
function overElement(e){
	e.style.cursor="pointer";
}

/**
 * @param e
 * fonction déclenchée par le survole hors d'un élément (event  : onmouseout)
 * Affiche : le pointeur par défault
 */
function outElement(e){
	e.style.cursor="default";
}