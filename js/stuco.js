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
 * Appelé quand click sur le bouton de la boîte de connexion
 * si g_isConnected = true : on est déjà connecté et l'utilisateur doit être déconnecté
 * si g_isConnected = false : authenticate(username, password) décide si connection ou non
 */
function doConnect() {
	window.console.log("doConnect() -start/return");

	if (g_isConnected) {
		pubs();
        $('#btConnexion').html("Connexion");
        $('#frontUsername').html("");
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
        success : authenticateCallBack
    });
}

/**
* Réalise l'affichage en fonction de la valeur de retour de authenticate
 * @param response : 1 ou 0 selon réussite ou echec du log in
* */
function authenticateCallBack(response){
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

    $.ajax({
        type :'GET',
        url : 'bl/fetchCodisciples.php',
        success : fetchCodisciplesCallback
    });

    var logUsername=$("#logUsername");
    var logPassword=$("#logPassword");

    $('#btConnexion').html('Deconnexion');
    $('#wall').html('');
    $('#frontUsername').html("Welcome " +logUsername.val()+"!");

    logUsername.val("");
    logPassword.val("");

    g_isConnected = true;
}

function fetchCodisciplesCallback(ret)
{
    window.console.log("fetchCodisciplesCallback(ret) -start");
    $('#page').html(ret);
    window.console.log("fetchCodisciplesCallback(ret) -start");
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

	window.console.log("pubs() -end");
}

/**
 * Affiche la publicité sur le mur
 * @param publicite : une string contenant la liste des pubs séparée par #
 * */
function pubsCallback(publicite)
{
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
 * fonction déclenchée par le survole sur d'un élement
 * Affiche : un pointeur de selection
 */
function overElement(e){
	e.style.cursor="pointer";
}

/**
 * @param e
 * fonction déclenchée par le survole hors d'un élément
 * Affiche : le pointeur par défault
 */
function outElement(e){
	e.style.cursor="default";
}