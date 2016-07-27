var _metasophiea_code_css_liveEdit_getCSS_globals_bootCounter = 0;
function getCSS(input){
	if(typeof input == 'string'){_getCSS_string(input);return;}
	if(typeof input[0] == 'string'){_getCSS_singleArray(input);return;}
	var a = 0; var bootCount = 0;
	var bootWait = setInterval(function(){
		if(_metasophiea_code_css_liveEdit_getCSS_globals_bootCounter == bootCount){
			bootCount = input[a].length;
			_metasophiea_code_css_liveEdit_getCSS_globals_bootCounter = 0;
			_getCSS_singleArray(input[a]);
			a++; if(a >= input.length){clearInterval(bootWait);}
		}
	},10);
}

function _getCSS_singleArray(CSS_List){
	for(var a = 0; a < CSS_List.length; a++){
		_getCSS_string(CSS_List[a]);
	}
}

function _getCSS_string(string){
	var temp = document.createElement("link");
	temp.setAttribute('onLoad','_metasophiea_code_css_liveEdit_getCSS_globals_bootCounter++; console.log("%cgetCSS successfully loaded: '+string+'", "color:rgb(202,136,202); font-style:italic;");');
	temp.type = "text/css"; temp.rel = "stylesheet";
	temp.href = string;
	document.head.appendChild(temp);
}
