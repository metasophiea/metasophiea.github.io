var effect_filter = function(){
	var node_moduleCasing = new moduleCasing();
	var node_filterCircuit = _globalAudioContext.createBiquadFilter();
	
	node_moduleCasing.internalConnect_send(node_filterCircuit); node_filterCircuit.connect(node_moduleCasing.internalConnect_receve()); 
	node_filterCircuit.type = "highpass";
	node_filterCircuit.frequency.value = 1000;
	node_filterCircuit.gain.value = 0.1;
	node_filterCircuit.Q.value = 10000;		
	
	this.type = function(a=null){if(a == null){return node_filterCircuit.type;} node_filterCircuit.type = a;}
	this.freq = function(a=null){if(a == null){return node_filterCircuit.frequency.value;} node_filterCircuit.frequency.value = a;}
	this.gain = function(a=null){if(a == null){return node_filterCircuit.gain.value;} node_filterCircuit.gain.value = a;}
	this.q = function(a=null){if(a == null){return node_filterCircuit.Q.value;} node_filterCircuit.Q.value = a;}
	
	this.AB = function(a=null){if(a==null){return node_moduleCasing.AB();} node_moduleCasing.AB(a);}
		
	this.getNode = function(){return node_moduleCasing.getNode();}
	this.connectAudioTo = function(connection){node_moduleCasing.connectAudioTo(connection);}
	
	
	this.getFrequencyResponse = function(start,end,step){
		var frequencyArray = [];
		for(var a = start; a < end; a += step){frequencyArray.push(a);}
	
		var Float32_frequencyArray = new Float32Array(frequencyArray);
		var magResponseOutput = new Float32Array(Float32_frequencyArray.length);
		var phaseResponseOutput = new Float32Array(Float32_frequencyArray.length);
	
		node_filterCircuit.getFrequencyResponse(Float32_frequencyArray,magResponseOutput,phaseResponseOutput);
		return [magResponseOutput,frequencyArray];
	}
}

//lowpass, highpass, bandpass
//lowshelf, highshelf, peaking, notch, allpass