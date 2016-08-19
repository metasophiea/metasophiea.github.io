var baisc_8osc_synth = function(){
	//Create parts and connect
	var node_gain = new gainModule();
	var oscillators = [];
	for(var a = 0; a < 8; a++){ 
		oscillators[a] = new oscillator(); 
		oscillators[a].connectTo(node_gain);
	}
	//Module data
		var gain = 1;
		var oscillatorsInUse = [0,0,0,0,0,0,0,0];

		//Apply data
		node_gain.gain(gain);

	//Options
		this.wave = function(a=null){if(a==null){return oscillators[0].wave();}
			for(var i = 0; i < 8; i++){ oscillators[i].wave(a); }
		}
		this.waveShape = function(a=null){if(a==null){return oscillators[0].waveShape();}
			for(var i = 0; i < 8; i++){ oscillators[i].waveShape(a); }
		}


	//Methods
	this.play = function(freq,duration){
		for(var a = 0; a < oscillatorsInUse.length; a++){
			if(oscillatorsInUse[a] === 0){preformNoteOnOsc(freq,duration-10,a); adjustGainAccordingly(); return;}
		}
		
		console.log('max reached');
	}

	function preformNoteOnOsc(freq,duration,a){
		oscillatorsInUse[a] = 1;
		oscillators[a].freq(freq); oscillators[a].gain(1);


		setTimeout(function(){oscillators[a].gain(0);oscillatorsInUse[a] = 0;adjustGainAccordingly();},duration);
	}

	function adjustGainAccordingly(){
		var count = 1;
		for(var a = 0; a < oscillatorsInUse.length; a++){ if(oscillatorsInUse[a] == 1){count++;} }
		gain = 1/count; node_gain.gain(gain);
	}

	//External connections
		this.connectTo = function(connection){node_gain.connectTo(connection);}
}
