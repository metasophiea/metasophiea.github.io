var getJS = new function(){
	this.get = function(input){workThrough(input);}
	this.gottenScripts = function(){
		var scripts = document.getElementsByTagName('script');
		var result = [];
		for(var a = 0; a < scripts.length; a++){
			var temp = scripts[a].id.split('|');
			if(temp [0] == 'getJS'){result.push(temp[1]);}
		}
		return result;
	}
	this.remove = function(URL){
		var scripts = document.getElementsByTagName('script');
		for(var a = 0; a < scripts.length; a++){
			var temp = scripts[a].id.split('|');
			if(temp[0] == 'getJS' && temp[1] == URL){
				document.head.removeChild(document.getElementById(temp[0]+'|'+temp[1]));
				return;
			}
		}
	}

	function workThrough(input){
		if(typeof input != 'string'){
			for(var a = 0; a < input.length; a++){
				workThrough(input[a]);
			}
		}else{include(input);}
	}

	function include(URL){
		var temp = document.createElement("script");
		temp.setAttribute('onLoad','console.log("%cgetJS successfully loaded: '+URL+'", "color:rgb(202,136,202); font-style:italic;");this.removeAttribute("onload");');
		temp.type = "text/javascript"; 
		temp.src = URL;
		temp.id = 'getJS|'+URL;
		document.head.appendChild(temp);
	}
}
console.log("%cgetJS v2.0.0 successfully loaded", "color:rgb(202,136,202); font-style:italic;");
