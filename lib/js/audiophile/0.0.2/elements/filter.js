var filter = function(){
	var node_filter = _globalAudioContext.createBiquadFilter();
	var node_patchMixerBox = new patchMixerBox();	
	
	node_patchMixerBox.directConnect_patchOut(node_filter); node_filter.connect(node_patchMixerBox.connect_patchIn());
	
	node_filter.type = "highshelf";
	node_filter.frequency.value = 1000;
	node_filter.gain.value = 1;
	node_filter.Q.value = 10000;	
	
	
	this.setFilterType = function(){
		//lowpass, highpass, bandpass
		//lowshelf, highshelf, peaking, notch, allpass
	}
	
	
	this.getFrequencyResponse = function(start,end,step){
		var frequencyArray = [];
		for(var a = start; a < end; a += step){frequencyArray.push(a);}
	
		var Float32_frequencyArray = new Float32Array(frequencyArray);
		var magResponseOutput = new Float32Array(Float32_frequencyArray.length);
		var phaseResponseOutput = new Float32Array(Float32_frequencyArray.length);
	
		node_filter.getFrequencyResponse(Float32_frequencyArray,magResponseOutput,phaseResponseOutput);
		return [magResponseOutput,frequencyArray];
	}
	
	this.getNode = function(){return node_patchMixerBox.getNode();}
	this.connectTo = function(connection){node_patchMixerBox.connectTo(connection);}
	this.wetDry = function(a){node_patchMixerBox.wetdry(a);}
}