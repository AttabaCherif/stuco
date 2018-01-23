<?php
const USER = "Jean";
const PASS = "anje";
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