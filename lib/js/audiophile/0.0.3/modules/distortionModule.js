var distortionModule = function(){
	//Create parts and connect
	var node_moduleCasing = new moduleCasing();
	var node_distortionCircuit = _globalAudioContext.createWaveShaper();
	node_moduleCasing.internalConnect_send(node_distortionCircuit); node_distortionCircuit.connect(node_moduleCasing.internalConnect_receve()); 

	//Module data
		var AB = 0;
		var distortionAmount = 0;	var oversample = '2x';	

		var curve = makeDistortionCurve(distortionAmount);

		//Apply data
			node_distortionCircuit.curve = curve;
			node_distortionCircuit.oversample = oversample;

	//Options
		this.get = function(type){
			switch(type){
				case 'distortionAmount': return distortionAmount; break;
				case 'oversample': return oversample; break;
			}
		}
		this.set = function(type,data){
			switch(type){
				case 'distortionAmount': 
					distortionAmount = data;
					curve = makeDistortionCurve(distortionAmount);
					node_distortionCircuit.curve = curve;
				break;
				case 'oversample': 
					oversample = data; node_distortionCircuit.oversample = oversample;
				break;
			}
		}

	//AB mix
		this.getAB =function(){return AB;}
		this.AB = function(a){node_moduleCasing.AB(a);}
	//External connections
		this.getNode = function(){return node_moduleCasing.getNode();}
		this.connectTo = function(connection){node_moduleCasing.connectTo(connection);}





	//Circuitry
	function makeDistortionCurve(amount) {
		var k = 50; if(typeof amount === 'number'){k = amount;}
			
		var n_samples = 44100;
		var curve = new Float32Array(n_samples);
		var deg = Math.PI / 180;
		var x = 0;

		for (var a = 0; a < n_samples; ++a ) {
			x = a * 2 / n_samples - 1;
			curve[a] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
		}
		return curve;
	}
}
