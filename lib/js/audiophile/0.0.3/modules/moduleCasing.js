var moduleCasing = function(){
	//Set up nodes 
		var node_input = _globalAudioContext.createGain();
		var node_routeA = _globalAudioContext.createGain();	var node_routeB_send = _globalAudioContext.createGain();
									var node_routeB_receve = _globalAudioContext.createGain();	
		var node_output = _globalAudioContext.createGain();

	//Module data
		var AB = 0;

		//Apply data
			node_input.gain.value = 1; 
			node_routeA.gain.value = 1-AB; 	node_routeB_send.gain.value = 1; 
							node_routeB_receve.gain.value = AB;
			node_output.gain.value = 1;

	//Wire nodes together
		node_input.connect(node_routeA); node_input.connect(node_routeB_send);
		node_routeA.connect(node_output); node_routeB_receve.connect(node_output);

	//Internal slot connections
		this.internalConnect_send = function(connection){node_routeB_send.connect(connection);}
		this.internalConnect_receve = function(){return node_routeB_receve;}

	//AB mix
		this.AB = function(a=null){if(a==null){return AB;}
			if(a > 1){a = 1;}else if(a < 0){a = 0;} AB = a;
			node_routeA.gain.value = 1-AB; node_routeB_receve.gain.value = AB;
		}

	//External connections
		this.getNode = function(){return node_input;}
		this.connectTo = function(connection){node_output.connect(connection.getNode());}
}
