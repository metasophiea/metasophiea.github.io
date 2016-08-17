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
		this.gain = function(a=null){if(a==null){return gain;}
			gain = a; node_gain.gain.value = gain;
		}
		this.freq = function(a=null){if(a==null){return freq;}
			freq = a; node_generator.frequency.value = freq;
		}
		this.wave = function(a=null){if(a==null){return wave.type;}
			wave.type = a; node_generator.type = wave.type;
		}
		this.waveShape = function(a=null){if(a==null){return {'sin':wave.sin,'cos':wave.cos};}
			wave.type = 'custom';
			wave.sin = new Float32Array(a.sin); wave.cos = new Float32Array(a.cos);
			var newWave = _globalAudioContext.createPeriodicWave(wave.sin,wave.cos);
			node_generator.setPeriodicWave(newWave);
		}

	//External connections
		this.connectTo = function(connection){node_pan.connect(connection.getNode());}
}
