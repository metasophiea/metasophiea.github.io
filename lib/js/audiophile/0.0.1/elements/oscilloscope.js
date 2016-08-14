var oscilloscope = function(canvasElement){
	var node = _globalAudioContext.createAnalyser();
	var bufferSize = 256; node.fftSize = bufferSize;
	var dataArray = new Uint8Array(node.fftSize);
	var canvas = canvasElement.getContext("2d");
	var scopeRefresh; var scopeRefresh_rate = 10; 
		
	function render(){
		node.getByteTimeDomainData(dataArray);
		canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
		canvas.fillStyle = 'rgb(0,0,0)'; canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);
		
		canvas.beginPath();
		canvas.strokeStyle = 'rgb(0,200,0)';
		canvas.moveTo(0,canvasElement.height*(dataArray[a]/256));	
	
		for(var a = 1; a < dataArray.length; a++){	
			canvas.lineTo(canvasElement.width*(a/dataArray.length),canvasElement.height*(dataArray[a]/256));
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