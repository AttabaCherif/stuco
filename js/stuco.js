/**
 * studentCo.v011
 */

//login autorisé
const USER = "Jean";
const PASS = 'anje';

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
 * Appelé quand click le bouton de la boîte de connexion
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
 * @param ret : 1 ou 0 selon réussite ou echec du log in
* */
function authenticateCallBack(ret){
	var logUsername=$("#logUsername");
	var logPassword=$("#logPassword");

	if (ret==1){
		$('#btConnexion').html('Deconnexion');
		$('#wall').html('');
		$('#frontUsername').html("Welcome " +logUsername.val()+"!");

		logUsername.val("");
		logPassword.val("");
		g_isConnected = true;
	}else
	{
		alert("Mot de passe incorrect")
	}
}

/**
 * Affiche la publicité sur le mur
 * Une pub est affichée seulement si 1er caractère est 1
 * Appelé par initApp à la fin du chargement de la page
 * Conseil utilisation :
 * Disparait quand connecté et réapparait quand déconnecté
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
