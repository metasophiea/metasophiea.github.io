var oscillator = function(){
		var node_generator = _globalAudioContext.createOscillator();
		var node_gain = _globalAudioContext.createGain();
		var node_pan = _globalAudioContext.createPanner();
		node_generator.connect(node_gain);
		node_gain.connect(node_pan);	

			node_generator.type = 'sine';
			node_generator.frequency.value = 0;
			node_gain.gain.value = 0;
			node_pan.setPosition(0,0,1);
			node_generator.start(0);
			var customPeriodicWave = {'sin':[0],'cos':[0]};

		this.gain = function(a=null){if(a==null){return node_gain.gain.value;}
			node_gain.gain.value = a;
		}
		this.freq = function(a=null){if(a==null){return node_generator.frequency.value;}
			node_generator.frequency.value = a;
		}
		this.wave = function(a=null){if(a==null){return node_generator.type;}
			node_generator.type = a;
		}
		this.customWaveShape = function(a=null){if(a==null){return {'sin':customPeriodicWave.sin,'cos':customPeriodicWave.cos};}
			customPeriodicWave.sin = new Float32Array(a.sin); customPeriodicWave.cos = new Float32Array(a.cos);
			var newWave = _globalAudioContext.createPeriodicWave(customPeriodicWave.sin,customPeriodicWave.cos);
			node_generator.setPeriodicWave(newWave);
		}

		this.connectAudioTo = function(connection){node_pan.connect(connection.getNode());}
}