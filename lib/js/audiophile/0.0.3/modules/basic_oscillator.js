var oscillator = function(){
	var gain = 0; var freq = 0; var wave = {'type':'sine','sin':[],'cos':[]};
	var node_generator = _globalAudioContext.createOscillator();
	var node_gain = _globalAudioContext.createGain();
	var node_pan = _globalAudioContext.createPanner();	
	
		node_generator.type = wave.type;
		node_generator.frequency.value = freq;
		node_generator.start(0);
		node_gain.gain.value = gain;
		node_pan.setPosition(0,0,1);
		
	node_generator.connect(node_gain);
	node_gain.connect(node_pan);	
		
	this.getFreq = function(){return freq;}	
	this.setFreq = function(a){freq = a;node_generator.frequency.value = freq;}
	this.getGain = function(){return gain;}
	this.setGain = function(a){gain = a;node_gain.gain.value = gain;}
	
	this.connectTo = function(connection){node_pan.connect(connection.getNode());}
	this.getWaveType = function(){return wave.type;}
	this.getWaveData = function(){return {'sin':wave.sin,'cos':wave.cos};}
	this.customWaveType = function(sin,cos){
		wave.type = 'custom'; wave.sin = new Float32Array(sin); wave.cos = new Float32Array(cos);
		var newWave = _globalAudioContext.createPeriodicWave(wave.sin,wave.cos);
		node_generator.setPeriodicWave(newWave);
	}
}