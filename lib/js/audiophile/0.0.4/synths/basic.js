var synth_basic = function(){
	var node_preGain = new effect_gain();
	var node_gain = new effect_gain();
	var oscillators = {}; var keys = Object.keys(_availableNotes);
	var oscillatorsCount = keys.length; var oscillatorsInUse = 0;
	for(var a = 0; a < oscillatorsCount; a++){
		oscillators[keys[a]] = new oscillator(); 
		oscillators[keys[a]].freq(_availableNotes[keys[a]]);
		oscillators[keys[a]].connectAudioTo(node_preGain);	
	}	 
	node_preGain.connectAudioTo(node_gain);
	
	
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
	this.connectAudioTo = function(connection){node_gain.connectAudioTo(connection);}
	
	function adjustGainAccordingly(){
		node_preGain.gain(1/(1+oscillatorsInUse));
	}
}

//Organy = {'sin':[0,0,1,0,0,0,1,0],'cos':[0,1,1,1,0,0,0,0]}