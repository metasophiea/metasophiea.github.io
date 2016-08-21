var controller_8x8_matrix = function(){
	var dataOutputs = [];;
	var notesMatrix = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]; 
	var octave = 5; var duration = 1000;
	var interval_loop = null; var interval_loop_step = 0;

	this.step = function(){step();}	

	this.octave = function(a=null){if(a==null){return octave;} octave = a;}
	this.duration = function(a=null){if(a==null){return duration;}duration = a;}
	this.toggleNote = function(x,y){if(notesMatrix[x][y]){notesMatrix[x][y] = 0;}else{notesMatrix[x][y] = 1;}}
	this.viewNote = function(x,y){return notesMatrix[x][y];}	
	this.matrix = function(a=null){if(a==null){return notesMatrix;}
		for(var i = 0; i < 8; i++){for(var j = 0; j < 8; j++){
			if(a[i][j]){notesMatrix[i][j] = 1;}else{notesMatrix[i][j] = 0;}
		}}
	}
	
	this.connectDataTo = function(connection){dataOutputs.push(connection);}
	this.disconnectDataTo = function(connection){
		var index = dataOutputs.indexOf(connection);
		dataOutputs.splice(index,1);
	}
	
	function step(){
		for(var a = 0; a < dataOutputs.length; a++){
			if(notesMatrix[interval_loop_step][0]){dataOutputs[a].play(octave+'C',duration);}
			if(notesMatrix[interval_loop_step][1]){dataOutputs[a].play(octave+'D',duration);}
			if(notesMatrix[interval_loop_step][2]){dataOutputs[a].play(octave+'E',duration);}	
			if(notesMatrix[interval_loop_step][3]){dataOutputs[a].play(octave+'F',duration);}
			if(notesMatrix[interval_loop_step][4]){dataOutputs[a].play(octave+'G',duration);}
			if(notesMatrix[interval_loop_step][5]){dataOutputs[a].play(octave+'A',duration);}
			if(notesMatrix[interval_loop_step][6]){dataOutputs[a].play(octave+'B',duration);}
			if(notesMatrix[interval_loop_step][7]){dataOutputs[a].play((octave+1)+'C',duration);}
		}
		interval_loop_step++; if(interval_loop_step > 7){interval_loop_step = 0;}
	}
}