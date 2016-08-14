var oscillator	= function(){
	var gain = 0;	var freq = 0; 
	var wave = {'type':'sine','sin':[],'cos':[]};
	var position = {'x':0,'y':0,'z':10};
	var node = {};		
		node.oscillator = _globalAudioContext.createOscillator();
			node.oscillator.type = wave.type;
			node.oscillator.frequency.value = freq;
			node.oscillator.start(0);			
		node.pan = _globalAudioContext.createPanner();
			node.pan.setPosition(0,0,10);		
		node.gain = _globalAudioContext.createGain();					
			node.gain.gain.value = gain;
		node.oscillator.connect(node.gain);
		node.gain.connect(node.pan);

	this.connect = function(connection){node.pan.connect(connection.getNode());}
	this.freq = function(input){freq = input;node.oscillator.frequency.value = freq;}
	this.gain = function(input){gain = input;node.gain.gain.value = gain;}	
	this.panX = function(input){position.x = input;node.pan.setPosition(position.x,position.y,position.z);}
	this.panY = function(input){position.y = input;node.pan.setPosition(position.x,position.y,position.z);}	
	this.panZ = function(input){position.z = input;node.pan.setPosition(position.x,position.y,position.z);}
	this.waveType = function(input){wave.type = input;node.oscillator.type = wave.type;}
	this.customWaveType = function(sin,cos){
		wave.type = 'custom'; wave.sin = new Float32Array(sin); wave.cos = new Float32Array(cos);
		var newWave = _globalAudioContext.createPeriodicWave(wave.sin,wave.cos);
		node.oscillator.setPeriodicWave(newWave);
	}		
}