var globalOutputPort = function(){
		var node = _globalAudioContext.destination;

		this.getNode = function(){return node};
	}