var keyBindings = {};

function removeKeyboardInterface(){
	document.body.removeAttributeNS(null,"onkeypress");
	keyBindings = {};
}

function setupKeyboardInterface(){
	removeKeyboardInterface();
	document.body.setAttribute("onkeypress","keyboardInterfaceEvent(event);");

	keyBindings = {'32':function(){console.log('spaceman');}};
}




function keyboardInterfaceEvent(event){
	console.log(event.charCode +'|'+ String.fromCharCode(event.charCode));
	keyBindings[event.charCode]();
}


function addToKey(keyCode,CB){
	console.log(keyBindings[keyCode]);

	keyBindings[keyCode] += CB;

	console.log(keyBindings[keyCode]);
}
function clearKey(keyCode,CB){
}
