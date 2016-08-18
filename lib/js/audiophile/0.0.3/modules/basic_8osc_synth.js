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
		this.gain = function(a=null){if(a==null){return gain;}
			gain = a; node_gain.gain(a);		
		}
		this.wave = function(a=null){if(a==null){return oscillators[0].wave();}
			oscillators[0].wave(a);
		}
		this.waveShape = function(a=null){if(a==null){return oscillators[0].waveShape();}
			oscillators[0].waveShape(a);
		}


	//Methods
	this.play = function(freq,duration){
		for(var a = 0; a < oscillatorsInUse.length; a++){
			if(oscillatorsInUse[a] === 0){preformNoteOnOsc(freq,duration,a); return;}
		}
		console.log('max reached');
	}

	function preformNoteOnOsc(freq,duration,a){
		oscillatorsInUse[a] = 1;
		oscillators[a].freq(freq); oscillators[a].gain(1);


		setTimeout(function(){oscillators[a].gain(0);oscillatorsInUse[a] = 0;},duration);
	}

	

	//External connections
		this.connectTo = function(connection){node_gain.connectTo(connection);}
}
