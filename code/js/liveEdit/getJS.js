var _metasophiea_code_js_liveEdit_getJS_globals_bootCounter = 0;
function getJS(input){
	if(typeof input == 'string'){_getJS_string(input);return;}
	if(typeof input[0] == 'string'){_getJS_singleArray(input);return;}
	var a = 0; var bootCount = 0;
	var bootWait = setInterval(function(){
		if(_metasophiea_code_js_liveEdit_getJS_globals_bootCounter == bootCount){
			bootCount = input[a].length;
			_metasophiea_code_js_liveEdit_getJS_globals_bootCounter = 0;
			_getJS_singleArray(input[a]);
			a++; if(a >= input.length){clearInterval(bootWait);}
		}
	},10);
}

function _getJS_singleArray(JS_List){
	for(var a = 0; a < JS_List.length; a++){
		_getJS_string(JS_List[a]);
	}
}

function _getJS_string(string){
	var temp = document.createElement("script");
	temp.setAttribute('onLoad','_metasophiea_code_js_liveEdit_getJS_globals_bootCounter++;');
	temp.type = "text/javascript"; 
	temp.src = string;
	document.head.appendChild(temp);
}