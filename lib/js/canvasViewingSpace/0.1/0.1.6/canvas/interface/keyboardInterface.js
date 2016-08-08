var keyBindings = {};

function removeKeyboardInterface(){
	document.body.removeAttributeNS(null,"onkeypress");
	keyBindings = {};
}

function setupKeyboardInterface(){
	removeKeyboardInterface();
	document.body.setAttribute("onkeypress","keyboardInterfaceEvent(event);");

	//addToKey(32,"console.log('spaceman');console.log('walk');");
}







function keyboardInterfaceEvent(event){
//	console.log(event.charCode +'|'+ String.fromCharCode(event.charCode));
	eval(keyBindings[event.charCode]);
}

function showKey(keyCode){
	console.log(keyBindings[keyCode].split(';'));
}

function showAllKeys(){
	var temp = Object.keys(keyBindings);
	for(var a = 0; a < temp.length; a++){
		console.log(temp[a] +'|'+ keyBindings[temp[a]]);
	}
}

function addToKey(keyCode,CB){
	if(keyBindings[keyCode] == undefined){keyBindings[keyCode] = CB;}
	else{keyBindings[keyCode] += CB;}
}

function clearKey(keyCode){delete keyBindings[keyCode];}
