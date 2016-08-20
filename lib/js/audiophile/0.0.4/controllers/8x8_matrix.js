var controller_8x8_matrix = function(){
	var synth;
	var notesMatrix = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]; 
	var BPM = 120; var octave = 5; var duration = 1;
	var interval_loop = null; var interval_loop_step = 0;

	this.step = function(){step();}	
	this.autoLoop = function(){
		if(interval_loop == null){step();interval_loop = setInterval(function(){step();},60000/BPM);}
		else{clearInterval(interval_loop);interval_loop = null;}
	}

	this.octave = function(a=null){if(a==null){return octave;} octave = a;}
	this.BPM = function(a=null){if(a==null){return BPM;} BPM = a; if(interval_loop != null){this.autoLoop();this.autoLoop();}}
	this.duration = function(a=null){if(a==null){return duration;}
		if(a < 0){a = 0;}else if(a > 1){a = 1;} duration = a;
	}
	this.toggleNote = function(x,y){if(notesMatrix[x][y]){notesMatrix[x][y] = 0;}else{notesMatrix[x][y] = 1;}}
	this.viewNote = function(x,y){return notesMatrix[x][y];}	
	this.matrix = function(a=null){if(a==null){return notesMatrix;}
		for(var i = 0; i < 8; i++){for(var j = 0; j < 8; j++){
			if(a[i][j]){notesMatrix[i][j] = 1;}else{notesMatrix[i][j] = 0;}
		}}
	}
	
	this.connectDataTo = function(connection){ synth = connection;}
	
	function step(){
		var temp = (60000*duration*0.9)/BPM;
		if(notesMatrix[interval_loop_step][0]){synth.play(octave+'C',temp);}
		if(notesMatrix[interval_loop_step][1]){synth.play(octave+'D',temp);}
		if(notesMatrix[interval_loop_step][2]){synth.play(octave+'E',temp);}	
		if(notesMatrix[interval_loop_step][3]){synth.play(octave+'F',temp);}
		if(notesMatrix[interval_loop_step][4]){synth.play(octave+'G',temp);}
		if(notesMatrix[interval_loop_step][5]){synth.play(octave+'A',temp);}
		if(notesMatrix[interval_loop_step][6]){synth.play(octave+'B',temp);}
		if(notesMatrix[interval_loop_step][7]){synth.play((octave+1)+'C',temp);}
		
		interval_loop_step++; if(interval_loop_step > 7){interval_loop_step = 0;}
	}
}