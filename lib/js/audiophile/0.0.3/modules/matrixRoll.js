var matrixRoll = function(){
	var connectionToSynth; var loopInterval; var matrix; var BPM = 60; var placeCount = 0;
	this.start = function(){
		if(connectionToSynth == null){return;}
		loopInterval = setInterval(function(){loop();},60000/BPM);
	}
	this.stop = function(){clearInterval(loopInterval);}
	this.matrix = function(a=null){if(a == null){return matrix;} matrix = a; }
	
	
	function loop(){	
		for(var a = 0; a < matrix[placeCount].length; a++){
			connectionToSynth.play(noteTodata(matrix[placeCount][a]),500);
		}
		
		placeCount++; if(placeCount >= matrix.length){placeCount = 0;}
	}
	
	this.connectNoteDataTo = function(connection){connectionToSynth = connection;}
}

