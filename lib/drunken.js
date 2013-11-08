
var validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_-+={}[]|:;",.?'
var timeoutID; 
var length = 17; // default password length

function getPass(e){

	if (timeoutID) {
		clearTimeout(timeoutID);
		timeoutID = undefined;
	}
	var site = document.getElementById('site').value;
	var userid = document.getElementById('userid').value;
	var salt = document.getElementById('salt').value;
	
	var passDiv = document.getElementById('pass');

	var passHash = gimmeapass(site, userid, salt);

	document.getElementById('salt').value = '';

	passHash = passHash.toString().substring(0,length*2);

	var pass = getCharsFromHash(passHash);
	passDiv.innerHTML=pass;



	timeoutId = setTimeout(function (){
		passDiv.innerHTML = 'And it\'s gone!'
	}, 5000);

	return false;
}

function gimmeapass(site, userid, salt){

	var md5 = CryptoJS.MD5(site + (userid || '') + salt);
	var sha3 = CryptoJS.SHA3(md5.toString());
	return sha3;

}

function getPassChar(n){
	return validChars.charAt(n % validChars.length);
}

function getCharsFromHash(hash){
	//hash = 55 9d 10 71

	var chars = '';
	while (hash.length >1){
		var s = hash.substring(0,2);
		hash = hash.substring(2);
		chars += getPassChar(parseInt(s, 16))
	}
	return chars;

}

