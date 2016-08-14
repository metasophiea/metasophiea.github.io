var reverb = function(){
	var node = _globalAudioContext.createConvolver();
	
	var soundSource, concertHallBuffer;

	ajaxRequest = new XMLHttpRequest();
	ajaxRequest.open('GET', 'https://raw.githubusercontent.com/metasophiea/metasophiea.github.io/master/lib/html/examples/WebAudio/Musikvereinsaal.wav', true);
	ajaxRequest.responseType = 'arraybuffer';
	ajaxRequest.onload = function() {
		var audioData = ajaxRequest.response;
		_globalAudioContext.decodeAudioData(audioData, function(buffer) {
			concertHallBuffer = buffer;
			soundSource = _globalAudioContext.createBufferSource();
				soundSource.buffer = concertHallBuffer;
				node.buffer = concertHallBuffer;
		}, function(e){"Error with decoding audio data" + e.err});
	}

	ajaxRequest.send();
	
	this.getNode = function(){return node;}
	this.connect = function(connection){node.connect(connection.getNode());}
}