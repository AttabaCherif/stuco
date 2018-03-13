/**
 * stuco v0.1
 */

//var global
var g_username;
var g_password;
var g_isConnected;


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
    wallCoDisciple(0);
}

function fetchCodisciples()
{
    window.console.log("fetchCodisciples() - start Ajax -> bl/fetchCodisciples.php");
    $.ajax({
        type :'GET',
        url : 'bl/fetchCodisciples.php',
        success : fetchCodisciplesCallback
    });
}

function fetchCodisciplesCallback(ret) {
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
                "' onclick='wallCoDisciple(this.id.substring(2),this.innerHTML);'"+
            " onmousemove='overElement(this);' onmouseout='outElement(this);'>"
            ligne+= username+"</button>";
            affiche += ligne;
        }
    }catch (err){window.console.log("fetchCoDisciplesCallBack -err = "+err);}
    affiche+="</div>";

    $('#page').html(affiche);



    window.console.log("fetchCodisciplesCallback(ret) -start");
}


function wallCoDisciple(id)
{
    window.console.log("wallCoDisciple() - start Ajax -> bl/fetchTweets.php");

    $.ajax({
        type :'GET',
        url : 'bl/fetchTweets.php',
        data : 'id='+id,
        success : fetchTweetsCallback
    });

}

function fetchTweetsCallback(tweets)
{
    window.console.log("wallCoDiscipleCallBack() - start");
    try
    {
        var jarray = $.parseJSON(tweets);
        // var lol = jarray[0];
        var wall_owner = (jarray[0])['wall_owner_id'];
        var affiche = "<div id='wall_list_title' class='list-group'><button type='button' class='custom-list-group list-group-item list-group-item-action active' >Mur  de "+wall_owner+" </button>";

        for (var i = 0 ; i < jarray.length ; i++)
        {
            var row= jarray[i];
            var id = row['id'];
            var tweet = row['tweet_content'];
            var ligne = "<button class='list-group-item list-group-item-action' id='tw"+id+"' >";
            ligne+= id+" : "+tweet+"</button>";
            affiche += ligne;
        }

        // ajouter la div de fin correspondante a celle utilisée lors de l'initialisation de affiche
        affiche+="</div>";
        $('#wall').html(affiche);
    }
    catch (err)
    {
        window.console.log("wallCodiscipleCallBack() -err = "+err);
    }

}

/*


*/

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

	window.console.log("pubs() -end");
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
    window.console.log("pubsCallback() -stop");
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