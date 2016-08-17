var reverbModule = function(){
	//Create parts and connect
		var node_moduleCasing = new moduleCasing();
		var node_reverbCircuit = _globalAudioContext.createConvolver();
		node_moduleCasing.internalConnect_send(node_reverbCircuit); node_reverbCircuit.connect(node_moduleCasing.internalConnect_receve());

	//Module data
		var reverb_repoURL = 'http://metasophiea.com/lib/audio/impulseResponse/';
		var reverb_type = 'Musikvereinsaal.wav';

		//Apply data
		setReverbType(reverb_repoURL,reverb_type);

	//Options
		this.type = function(a=null){if(a == null){return reverb_type;} reverb_type = a; setReverbType(reverb_repoURL,reverb_type);}
		this.reverb_repoURL = function(a=null){if(a == null){return reverb_repoURL;} reverb_repoURL = a; setReverbType(reverb_repoURL,reverb_type);}
		this.getTypes = function(callback){return getReverbTypeList(reverb_repoURL,callback);}

	//AB mix
		this.AB = function(a=null){if(a==null){return node_moduleCasing.AB();} node_moduleCasing.AB(a);}
	//External connections
		this.getNode = function(){return node_moduleCasing.getNode();}
		this.connectTo = function(connection){node_moduleCasing.connectTo(connection);}




	function setReverbType(repoURL,type){
		var ajaxRequest = new XMLHttpRequest();
		ajaxRequest.open('GET', repoURL+type, true);
		ajaxRequest.responseType = 'arraybuffer';
		ajaxRequest.onload = function() {_globalAudioContext.decodeAudioData(ajaxRequest.response, function(buffer) {node_reverbCircuit.buffer = buffer;}, function(e){"Error with decoding audio data" + e.err});}
		ajaxRequest.send();
	}
	function getReverbTypeList(repoURL,callback=null){
		var ajaxRequest = new XMLHttpRequest();
		ajaxRequest.open('GET', reverb_repoURL+'available.list', true);
		ajaxRequest.onload = function() {
			var list = ajaxRequest.response.split(','); var temp = '';
			for(var a = 1; a < list.length; a++){
				temp = list[a].split('');temp.shift();
				list[a] = temp.join('');
			}	
			
			list[list.length-1] = list[list.length-1].split(''); 
			list[list.length-1].pop();
			list[list.length-1] = list[list.length-1].join('');		
			
			if(callback == null){console.log(list);}
			else{callback(list);}
		}
		ajaxRequest.send();
	}	
}
