var synth_basic = function(){
	var node_preGain = new gainModule();
	var node_gain = new gainModule();
	var oscillators = {}; var keys = Object.keys(_availableNotes);
	var oscillatorsCount = keys.length; var oscillatorsInUse = 0;
	for(var a = 0; a < oscillatorsCount; a++){
		oscillators[keys[a]] = new oscillator(); 
		oscillators[keys[a]].freq(_availableNotes[keys[a]]);
		oscillators[keys[a]].connectTo(node_preGain);	
	}	 
	node_preGain.connectTo(node_gain);
	
	
	this.play = function(note,duration){if(keys.indexOf(note) == -1){console.log('key "'+note+'" not found');console.log(keys);return;}
		oscillators[note].gain(1); oscillatorsInUse++; adjustGainAccordingly();

		setTimeout(function(){
			oscillators[note].gain(0); oscillatorsInUse--; adjustGainAccordingly();
			},duration);		
	}
	this.gain = function(a){return node_gain.gain(a);}
	this.wave = function(a=null){if(a==null){return oscillators[keys[0]].wave();}
		for(var i = 0; i < oscillatorsCount; i++){ oscillators[keys[i]].wave(a); }
	}
	this.customWaveShape = function(a=null){if(a==null){return oscillators[keys[0]].customWaveShape();}
		for(var i = 0; i < oscillatorsCount; i++){ oscillators[keys[i]].customWaveShape(a); }
	}
	this.connectTo = function(connection){node_gain.connectTo(connection);}
	
	function adjustGainAccordingly(){
		node_preGain.gain(1/(1+oscillatorsInUse));
	}
}