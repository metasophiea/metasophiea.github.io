var gainModule = function(){
	//Set up nodes 
		var node_gain = _globalAudioContext.createGain();

	//Module data
		var gain = 1;

		//Apply data
			node_gain.gain.value = gain; 

	//Options
		this.gain = function(a=null){if(a==null){return gain;}
			gain = a; node_gain.gain.value = gain;
		}

	//External connections
		this.getNode = function(){return node_gain;}
		this.connectTo = function(connection){node_gain.connect(connection.getNode());}

}
