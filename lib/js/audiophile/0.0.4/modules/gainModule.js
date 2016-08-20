var gainModule = function(){
		var node_gain = _globalAudioContext.createGain();
		node_gain.gain.value = 1; 

		this.gain = function(a=null){if(a==null){return node_gain.gain.value;} node_gain.gain.value = a; }

		this.getNode = function(){return node_gain;}
		this.connectTo = function(connection){node_gain.connect(connection.getNode());}
}
