var tool_frequencyResponseAnalyser = function(canvasElement){
	var canvas = canvasElement.getContext("2d");
	var filter; var freqRange = {'bottom':100,'top':3000,'step':10};
	var scopeRefresh = null; var refreshRate = 1; 
	

	this.power = function(){
		if(scopeRefresh == null){scopeRefresh = setInterval(function(){render();},1000/refreshRate);}
		else{clearInterval(scopeRefresh);scopeRefresh = null;}
	}
	this.refreshRate = function(a=null){if(a==null){return refreshRate;} refreshRate = a; this.power(); this.power(); }	
	this.connectToFilter = function(connection){filter = connection;}
	this.startFreq = function(a=null){if(a==null){return freqRange.bottom;} freqRange.bottom = a;}
	this.endFreq = function(a=null){if(a==null){return freqRange.top;} freqRange.top = a;}	
	this.step = function(a=null){if(a==null){return freqRange.step;} if(a<=0){a=1;} freqRange.step = a;}
	

	function render(){
		var data = filter.getFrequencyResponse(freqRange.bottom,freqRange.top,freqRange.step);
		var height = canvasElement.getBoundingClientRect().height; var width = canvasElement.getBoundingClientRect().width;	
		
		//Clear and draw background
			canvas.clearRect(0, 0, width, height); canvas.fillStyle = 'rgb(0,0,0)'; canvas.fillRect(0, 0, width, height);
			
			canvas.beginPath();
			canvas.strokeStyle = 'rgb(0,100,0)';
			canvas.moveTo(0,height/2);
			canvas.lineTo(width,height/2);
			canvas.stroke();		
			
			
			
			
			
		//Draw data
		var unit = height/3;
		
			
			
			canvas.beginPath();
			canvas.strokeStyle = 'rgb(200,200,0)';
			

			var temp = height/2 - unit*(data[0][0]-1); var step = width/data[0].length;
			canvas.moveTo(0*step,temp);	
			for(var a = 1; a < data[0].length; a++){
				temp = height/2 - unit*(data[0][a]-1);
				canvas.lineTo(a*step,temp);
			}	
			canvas.stroke();			
			
		
	}







/*
	function render(){if(filter == undefined){return;}
		var data = filter.getFrequencyResponse(freqRange.bottom,freqRange.top,freqRange.step);
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
	*/
}
