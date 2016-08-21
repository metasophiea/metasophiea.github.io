var effect_distortion = function(){
	var node_moduleCasing = new moduleCasing();
	var node_distortionCircuit = _globalAudioContext.createWaveShaper();
	var distortionAmount = 0;	var oversample = '2x';	var resolution = 100;
	var curve = new Float32Array(Math.curve.s(resolution,distortionAmount));
		
		
	node_moduleCasing.internalConnect_send(node_distortionCircuit); node_distortionCircuit.connect(node_moduleCasing.internalConnect_receve()); 
	node_distortionCircuit.curve = curve;
	node_distortionCircuit.oversample = oversample;


	this.amount = function(a=null){if(a == null){return distortionAmount;}
		distortionAmount = a;
		curve = new Float32Array(Math.curve.s(resolution,distortionAmount));
		node_distortionCircuit.curve = curve;
	}
	this.oversample = function(a=null){if(a == null){return oversample;}
		oversample = a; 
		node_distortionCircuit.oversample = oversample;
	}
	this.resolution = function(a=null){if(a == null){return resolution;}
		resolution = a;
		curve = new Float32Array(Math.curve.s(resolution,distortionAmount));
		node_distortionCircuit.curve = curve;
	}
	this.AB = function(a=null){if(a==null){return node_moduleCasing.AB();} node_moduleCasing.AB(a);}

	this.getNode = function(){return node_moduleCasing.getNode();}
	this.connectAudioTo = function(connection){node_moduleCasing.connectAudioTo(connection);}
}
