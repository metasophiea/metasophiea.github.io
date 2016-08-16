var distortionModule = function(){
	//Create parts and connect
	var node_moduleCasing = new moduleCasing();
	var node_distortionCircuit = _globalAudioContext.createWaveShaper();
	node_moduleCasing.internalConnect_send(node_distortionCircuit); node_distortionCircuit.connect(node_moduleCasing.internalConnect_receve()); 

	//Module data
		var AB = 0;
		var distortionAmount = 0;	var oversample = '2x';	var resolution = 100;

		var curve = new Float32Array(math_curve.s(resolution,distortionAmount));

		//Apply data
			node_distortionCircuit.curve = curve;
			node_distortionCircuit.oversample = oversample;

	//Options
		this.get = function(type){
			switch(type){
				case 'distortionAmount': return distortionAmount; break;
				case 'oversample': return oversample; break;
				case 'resolution': return resolution; break;
			}
		}
		this.set = function(type,data){
			switch(type){
				case 'distortionAmount': 
					distortionAmount = data;
					curve = new Float32Array(math_curve.s(resolution,distortionAmount));
					node_distortionCircuit.curve = curve;
				break;
				case 'oversample': oversample = data; node_distortionCircuit.oversample = oversample; break;
				case 'resolution': 
					resolution = data;
					curve = new Float32Array(math_curve.s(resolution,distortionAmount));
					node_distortionCircuit.curve = curve;
				break;
			}
		}

	//AB mix
		this.getAB =function(){return AB;}
		this.AB = function(a){node_moduleCasing.AB(a);}
	//External connections
		this.getNode = function(){return node_moduleCasing.getNode();}
		this.connectTo = function(connection){node_moduleCasing.connectTo(connection);}
}
