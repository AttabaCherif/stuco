<?php
const USER = "Jean";
const PASS = "anje";
const PUBS = "1|Concombre->Le meilleur#1|Tomate->La plus rouge#0|Carotte->La plus longue#1|salade->La plus légère#1|Choux->La fleur#1|Le radis->Le noir#";
/**
 * Authentifie un login = (username, password)
 * @param string username
 * @param string password
 * @return boolean true si authentifié, false sinon
 */
function authenticate($username, $password){
	if ($username == USER && $password == PASS)
		return true;
	else
		return false;
}

function pubs(){
    return PUBS ;
}