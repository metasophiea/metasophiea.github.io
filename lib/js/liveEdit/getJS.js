var _com_metasophiea_lib_js_liveEdit_getJS_globals_bootCounter = 0;
function getJS(input){
	if(typeof input == 'string'){_com_metasophiea_lib_js_liveEdit_getJS_functions_string(input);return;}
	if(typeof input[0] == 'string'){_com_metasophiea_lib_js_liveEdit_getJS_functions_singleArray(input);return;}
	var a = 0; var bootCount = 0;
	var bootWait = setInterval(function(){
		if(_com_metasophiea_lib_js_liveEdit_getJS_globals_bootCounter == bootCount){
			bootCount = input[a].length;
			_com_metasophiea_lib_js_liveEdit_getJS_globals_bootCounter = 0;
			_com_metasophiea_lib_js_liveEdit_getJS_functions_singleArray(input[a]);
			a++; if(a >= input.length){clearInterval(bootWait);}
		}
	},10);
}

function _com_metasophiea_lib_js_liveEdit_getJS_functions_singleArray(JS_List){
	for(var a = 0; a < JS_List.length; a++){
		_com_metasophiea_lib_js_liveEdit_getJS_functions_string(JS_List[a]);
	}
}

function _com_metasophiea_lib_js_liveEdit_getJS_functions_string(string){
	var temp = document.createElement("script");
	temp.setAttribute('onLoad','_com_metasophiea_lib_js_liveEdit_getJS_globals_bootCounter++; console.log("%cgetJS successfully loaded: '+string+'", "color:rgb(202,136,202); font-style:italic;");');
	temp.type = "text/javascript"; 
	temp.src = string;
	document.head.appendChild(temp);
}

console.log("- please update to the correct directory -", "color:rgb(202,136,202); font-style:italic;");