var oscilloscope = function(audioContext){
	var node = audioContext.createAnalyser();
	var bufferSize = 256; node.fftSize = bufferSize;
	var dataArray = new Uint8Array(node.fftSize);
	
	this.getNode = function(){return node;}
	this.getBufferSize = function(){return bufferSize;}
	this.setBufferSize = function(newSize){
		bufferSize = newSize;
		node.fftSize = bufferSize;
		dataArray = new Uint8Array(node.fftSize);
	}
	this.connect = function(connection){node.pan.connect(connection.getNode());}
	this.getDataNow = function(){
		node.getByteTimeDomainData(dataArray);
		return dataArray;
	}
}

function drawScpoe(data,canvasElement){			
	canvas = canvasElement.getContext("2d");
	canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);			
	
	canvas.beginPath();
	canvas.strokeStyle = 'rgb(0,200,0)';
	canvas.moveTo(0,canvasElement.height/2);	

	for(var a = 0; a < data.length; a++){	
		canvas.lineTo(canvasElement.width*(a/data.length),canvasElement.height*(data[a]/256));
		canvas.stroke();
	}
}

var oscilloscope_adv = function(audioContext,canvasElement){
	var node = audioContext.createAnalyser();
	var bufferSize = 256; node.fftSize = bufferSize;
	var dataArray = new Uint8Array(node.fftSize);
	var canvas = canvasElement.getContext("2d");
	var scopeRefresh; var scopeRefresh_rate = 500; 
		
	function render(){
		canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);	
		canvas.beginPath();
		canvas.strokeStyle = 'rgb(0,200,0)';
		canvas.moveTo(0,canvasElement.height/2);	
	
		for(var a = 0; a < data.length; a++){	
			canvas.lineTo(canvasElement.width*(a/data.length),canvasElement.height*(data[a]/256));
			canvas.stroke();
		}
	}
	
	this.startScope = function(){scopeRefresh = setInterval(function(){render();},scopeRefresh_rate);}
	this.stopScope = function(){clearInterval(scopeRefresh);}	
	this.setScopeRefreshRate = function(){return scopeRefresh_Rate;}
	this.setScopeRefreshRate = function(rate){this.stopScope(); scopeRefresh_rate = rate; this.startScope();}
	this.getNode = function(){return node;}
	this.getBufferSize = function(){return bufferSize;}
	this.setBufferSize = function(newSize){
		bufferSize = newSize;
		node.fftSize = bufferSize;
		dataArray = new Uint8Array(node.fftSize);
	}
	this.connect = function(connection){node.pan.connect(connection.getNode());}
	this.getDataNow = function(){
		node.getByteTimeDomainData(dataArray);
		return dataArray;
	}
}