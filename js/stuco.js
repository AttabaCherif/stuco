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
	var logUsername=document.getElementById("logUsername");
	var logPassword=document.getElementById("logPassword");
	var btConnection = document.getElementById("btConnexion");
	var frontUsername = document.getElementById("frontUsername");
	if (g_isConnected) {
		pubs();
		btConnection.innerHTML = "Connexion";
		frontUsername.innerHTML="";
		g_isConnected = false;
	} else {
		authenticate(logUsername.value,logPassword.value);
	}
}



function authenticateCallBack(ret){
	var logUsername=document.getElementById("logUsername");
	var logPassword=document.getElementById("logPassword");
	var btConnection = document.getElementById("btConnexion");
	var frontUsername = document.getElementById("frontUsername");
	if (ret==1){
		btConnection.innerHTML = "Deconnexion";
		document.getElementById("wall").innerHTML = '';
		frontUsername.innerHTML="Welcome " +logUsername.value+"!";
		logUsername.value="";
		logPassword.value="";
		g_isConnected = true;
	}else
	{
		alert("Mot de passe incorrect")
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
	
	//creation of object XLMHttpRequest
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange =
		function ()
		{ //callback called a every readyState (1,2,3 and 4)
			if(xhr.readyState == 4 && xhr.status == 200)
			{
				// Assign the response of php function (true or false)
				var ret = xhr.responseText;
				// function to define later (cf. Labo)
				authenticateCallBack(ret);
			}
		}
	// transition readyState 0->1 : request initalisation
	xhr.open("GET","bl/authenticate.php?username="+username+"&password="+password,true);
	// transition readyState 1->2 : send the request 
	xhr.send(null);	
		
}


/**
 * Création d'un moteur AJAX adapté au navigateur client
 * @returns res le moteur AJAX
 */
function createXHR() {
	var res = null;
	try {// navigateurs Mozilla, Opera...
		res = new XMLHttpRequest();
	}
	catch (e) {
		try {// navigateurs Internet Explorer > 5.0
			res = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {// navigateur Internet Explorer 5.0
				res = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				res = null;
			}
		}
	}
	return res;
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
	//
	var publicite = "1|Concombre->Le meilleur#1|Tomate->La plus rouge#0|Carotte->La plus longue#1|salade->La plus légère#1|Choux->La fleur#1|Le radis->Le noir#";
	var pubs = publicite.split("#");
	var pubHTML = '<div id="pubs">';
	for (i = 0; i < pubs.length; i++) {
		if (pubs[i].charAt(0) == "1") pubHTML += "<br/>" + pubs[i].substring(2);
	}
	pubHTML += "</div>"
	document.getElementById("wall").innerHTML = pubHTML;
	//
	window.console.log("pubs() -end");
}