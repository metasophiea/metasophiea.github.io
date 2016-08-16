var oscillator = function(){
	//Create parts and connect
		var node_generator = _globalAudioContext.createOscillator();
		var node_gain = _globalAudioContext.createGain();
		var node_pan = _globalAudioContext.createPanner();
		node_generator.connect(node_gain);
		node_gain.connect(node_pan);	

	//Module data
		var gain = 0; 
		var freq = 0; 
		var wave = {'type':'sine','sin':[],'cos':[]};

		//Apply data
			node_generator.type = wave.type;
			node_generator.frequency.value = freq;
			node_gain.gain.value = gain;
			node_pan.setPosition(0,0,1);
			node_generator.start(0);

	//Options
		this.get = function(type){
			switch(type){
				case 'gain': return gain; break;
				case 'freq': return freq; break;
				case 'wave': return wave.type; break;
				case 'waveData': return {'sin':wave.sin,'cos':wave.cos}; break;
			}
		}
		this.set = function(type,data){
			switch(type){
				case 'gain': gain = data; node_gain.gain.value = gain; break;
				case 'freq': freq = data; node_generator.frequency.value = freq; break;
				case 'wave': wave.type = data; node_generator.type = wave.type; break;
				case 'waveData': 
					wave.type = 'custom';
					wave.sin = new Float32Array(data.sin); wave.cos = new Float32Array(data.cos);
					var newWave = _globalAudioContext.createPeriodicWave(wave.sin,wave.cos);
					node_generator.setPeriodicWave(newWave);
				break;
			}
		}

	//External connections
		this.connectTo = function(connection){node_pan.connect(connection.getNode());}
}
