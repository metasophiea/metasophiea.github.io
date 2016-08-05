var keyBindings = {};

function removeKeyboardInterface(){
	document.body.removeAttributeNS(null,"onkeypress");
	keyBindings = {};
}

function setupKeyboardInterface(){
	removeKeyboardInterface();
	document.body.setAttribute("onkeypress","keyboardInterfaceEvent(event);");

	keyBindings = {'32':"console.log('spaceman');console.log('walk');"};
}







function keyboardInterfaceEvent(event){
	console.log(event.charCode +'|'+ String.fromCharCode(event.charCode));
	eval(keyBindings[event.charCode]);
}

function showKey(keyCode){
	console.log(keyBindings[keyCode].split(';'));
}

function addToKey(keyCode,CB){
	keyBindings[keyCode] += CB;
}

function clearKey(keyCode){delete keyBindings[keyCode];}
