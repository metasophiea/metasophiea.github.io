var reverb = function(){
	var node_reverb = _globalAudioContext.createConvolver();
	var node_patchMixerBox = new patchMixerBox();	
	var reverbeRepoURL = 'http://metasophiea.com/lib/audio/impulseResponse/';
	var reverbType = 'Musikvereinsaal.wav';
	
	node_patchMixerBox.directConnect_patchOut(node_reverb); node_reverb.connect(node_patchMixerBox.connect_patchIn());
	setReverbType(reverbType);
	
	this.getNode = function(){return node_patchMixerBox.getNode();}
	this.connectTo = function(connection){node_patchMixerBox.connectTo(connection);}
	this.wetDry = function(a){node_patchMixerBox.wetdry(a);}	
	
	this.getReverbType = function(){return reverbType;}
	this.setReverbType = function(type){setReverbType(type);}
	this.getAllReverbTypes = function(callback){getReverbTypeList(callback);}		
		
	function setReverbType(type){
		var ajaxRequest = new XMLHttpRequest();
		ajaxRequest.open('GET', reverbeRepoURL+type, true);
		ajaxRequest.responseType = 'arraybuffer';
		ajaxRequest.onload = function() {
			_globalAudioContext.decodeAudioData(ajaxRequest.response, function(buffer) {node_reverb.buffer = buffer;}, function(e){"Error with decoding audio data" + e.err});
		}
		ajaxRequest.send();
	}	
	function getReverbTypeList(callback){
		var ajaxRequest = new XMLHttpRequest();
		ajaxRequest.open('GET', 'http://metasophiea.com/lib/audio/impulseResponse/available.list', true);
		ajaxRequest.onload = function() {
			var list = ajaxRequest.response.split(','); var temp = '';
			for(var a = 1; a < list.length; a++){
				temp = list[a].split('');temp.shift();
				list[a] = temp.join('');
			}	
			
			list[list.length-1] = list[list.length-1].split(''); 
			list[list.length-1].pop();
			list[list.length-1] = list[list.length-1].join('');		
			
			callback(list);
		}
		ajaxRequest.send();
	}
}
