var patchMixerBox = function(){
	var inputNode = _globalAudioContext.createGain();
	var gain_1 = _globalAudioContext.createGain();
	var gain_2_a = _globalAudioContext.createGain();var gain_2_b = _globalAudioContext.createGain();	
	var outputNode = _globalAudioContext.createGain();

	inputNode.connect(gain_1); inputNode.connect(gain_2_a);
	gain_1.connect(outputNode); gain_2_b.connect(outputNode);	
	
	inputNode.gain.value = 1; outputNode.gain.value = 1;
	gain_1.gain.value = 1; gain_2_a.gain.value = 1; gain_2_b.gain.value = 0;		
	
	this.getNode = function(){return inputNode;}
	this.connectTo = function(connection){outputNode.connect(connection.getNode());}
	this.wetdry = function(a){
		if(a > 1){a = 1;}else if(a < 0){a = 0;}
		gain_1.gain.value = 1-a; gain_2_b.gain.value = a;
	}
	
	this.directConnect_patchOut = function(connection){gain_2_a.connect(connection);}
	this.connect_patchOut = function(connection){gain_2_a.connect(connection.getNode());}
	this.connect_patchIn = function(){return gain_2_b;}
}