var oscilloscope = function(canvasElement){
	var node = _globalAudioContext.createAnalyser();
	var bufferSize = 256; node.fftSize = bufferSize;
	var dataArray = new Uint8Array(node.fftSize);
	var canvas = canvasElement.getContext("2d");
	var scopeRefresh; var scopeRefresh_rate = 1000/30; 
		
	function render(){
		var height = canvasElement.getBoundingClientRect().height; var width = canvasElement.getBoundingClientRect().width;	
		
	
		node.getByteTimeDomainData(dataArray);
		canvas.clearRect(0, 0, width, height);
		canvas.fillStyle = 'rgb(0,0,0)'; canvas.fillRect(0, 0, width, height);

		canvas.strokeStyle = 'rgb(0,0,200)';
			canvas.beginPath();canvas.moveTo(0,height*0.33); canvas.lineTo(width,height*0.33);canvas.stroke();	
		canvas.beginPath();canvas.moveTo(0,height*0.5); canvas.lineTo(width,height*0.5);canvas.stroke();
		canvas.beginPath();canvas.moveTo(0,height*0.66); canvas.lineTo(width,height*0.66);canvas.stroke();			

		
		canvas.beginPath();
		canvas.strokeStyle = 'rgb(0,200,0)';
		canvas.moveTo(0,height*(dataArray[a]/bufferSize));	
	
		for(var a = 1; a < dataArray.length; a++){	
			canvas.lineTo(width*(a/dataArray.length),height*(dataArray[a]/256));
			canvas.stroke();
		}
	}
	
	this.startScope = function(){scopeRefresh = setInterval(function(){render();},scopeRefresh_rate);}
	this.stopScope = function(){clearInterval(scopeRefresh);}	
	this.getScopeRefreshRate = function(){return scopeRefresh_Rate;}
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
	
	
	this.drawFrequencyResponse = function(data){
		var height = canvasElement.getBoundingClientRect().height; var width = canvasElement.getBoundingClientRect().width;	
		var v_adjust = 0.8;
	//Clear and draw background
		canvas.clearRect(0, 0, width, height); canvas.fillStyle = 'rgb(0,0,0)'; canvas.fillRect(0, 0, width, height);

		canvas.beginPath();
		canvas.strokeStyle = 'rgb(0,50,0)';	canvas.fillStyle = 'rgb(0,100,0)';
		canvas.font = "10px Arial"; 
		//vertical	
		for(var a = 0; a < data[0].length; a+=10){
			canvas.moveTo(width*(a/data[0].length),0);
			canvas.lineTo(width*(a/data[0].length),height);
			canvas.stroke();	
			canvas.fillText(data[1][a],width*(a/data[0].length),height-10);
		}
		//horizontal
		var limit = 11;
		for(var a = 0; a <= limit; a+=1){
			var val = height*((a/10)*v_adjust)
			canvas.moveTo(0,height-val);
			canvas.lineTo(width,height-val);	
			canvas.stroke();	
		}

		
		
		canvas.beginPath();
		canvas.strokeStyle = 'rgb(200,200,0)';
		canvas.moveTo(0,height-(height*data[0]));	
		for(var a = 1; a < data[0].length; a++){
			canvas.lineTo(width*(a/data[0].length),(height-(height*(data[0][a]*v_adjust))));
			canvas.stroke();
		}	
	}	
}

