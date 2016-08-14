var reverb = function(){
	var node_reverb = _globalAudioContext.createConvolver();
	var node_patchMixerBox = new patchMixerBox();	
	var reverbeRepoURL = 'http://metasophiea.com/lib/audio/impulseResponse/';
	var reverbType = 'Musikvereinsaal.wav';
	
	node_patchMixerBox.directConnect_patchOut(node_reverb); node_reverb.connect(node_patchMixerBox.connect_patchIn());
	
	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.open('GET', reverbeRepoURL+reverbType, true);
	ajaxRequest.responseType = 'arraybuffer';
	ajaxRequest.onload = function() {
		_globalAudioContext.decodeAudioData(ajaxRequest.response, function(buffer) {node_reverb.buffer = buffer;}, function(e){"Error with decoding audio data" + e.err});
	}
	
	ajaxRequest.send();
	
	
	this.getNode = function(){return node_patchMixerBox.getNode();}
	this.connectTo = function(connection){node_patchMixerBox.connectTo(connection);}
	this.wetDry = function(a){node_patchMixerBox.wetdry(a);}	
	
	this.getReverbType = function(){
		console.log('reverbeRepoURL: \t' + reverbeRepoURL);
		console.log('reverbType: \t\t' + reverbType);

		var ajaxRequest = new XMLHttpRequest();
		ajaxRequest.open('GET', 'http://metasophiea.com/lib/audio/impulseResponse/available.list', true);
		ajaxRequest.onload = function() {
			console.log(JSON.parse(ajaxRequest.response));
		}
		ajaxRequest.send();
	}
}
