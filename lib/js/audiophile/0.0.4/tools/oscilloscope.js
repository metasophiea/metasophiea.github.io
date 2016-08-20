var oscilloscope = function(canvasElement){
	var canvas = canvasElement.getContext("2d");

	var node_analyser = _globalAudioContext.createAnalyser();
		node_analyser.fftSize = 256
		var dataArray = new Uint8Array(node_analyser.fftSize);
		
	var scopeRefresh = null; var refreshRate = 30; 
	

	this.power = function(){
		if(scopeRefresh == null){scopeRefresh = setInterval(function(){render();},1000/refreshRate);}
		else{clearInterval(scopeRefresh);scopeRefresh = null;}
	}
	this.refreshRate = function(a=null){if(a==null){return refreshRate;} refreshRate = a; this.power(); this.power(); }	
	this.bufferSize = function(a=null){if(a==null){return node_analyser.fftSize;} node_analyser.fftSize = a; dataArray = new Uint8Array(node_analyser.fftSize); }
	this.getNode = function(){return node_analyser;}

	function render(){
		var height = canvasElement.getBoundingClientRect().height; var width = canvasElement.getBoundingClientRect().width;	
			
		//Background
		canvas.clearRect(0, 0, width, height);
		canvas.fillStyle = 'rgb(0,0,0)'; canvas.fillRect(0, 0, width, height);
		canvas.strokeStyle = 'rgb(0,0,200)'; canvas.lineWidth = 1;
			var positions = [1/10,1/9,1/8,1/7,1/6,1/5,1/4,1/3,1/2,2/3,3/4,4/5,5/6,6/7,7/8,8/9,9/10];
			for(var a = 0; a < positions.length; a++){ canvas.beginPath();canvas.moveTo(0,height*positions[a]); canvas.lineTo(width,height*positions[a]);canvas.stroke(); }				

		//Graph
		node_analyser.getByteTimeDomainData(dataArray);
		canvas.beginPath();
		var light = Math.round(Math.random()*90) + 166;
		canvas.strokeStyle = 'rgb('+light+','+light+','+light+')';
		canvas.lineWidth = 2;
		var horizontalStep = width*1/(dataArray.length-1);
		canvas.moveTo(horizontalStep*0,height*(dataArray[0]/256));
		for(var a = 1; a < dataArray.length; a++){	
			canvas.lineTo(horizontalStep*a,height*(dataArray[a]/256));	
		}
		canvas.stroke();
	}
}