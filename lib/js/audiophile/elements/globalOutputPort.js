var globalOutputPort = function(audioContext){
		var node = audioContext.destination;

		this.getNode = function(){return node};
	}