var curve = new function(){
	this.linear = function(stepCount){
		stepCount = Math.abs(stepCount)-1; var outputArray = [0];
		for(var a = 1; a < stepCount; a++){ outputArray.push(a/stepCount); }
		outputArray.push(1); return outputArray;
	}

	this.reverse_linear = function(stepCount){
		stepCount = Math.abs(stepCount) - 1; var outputArray = [1];
		for(var a = stepCount-1; a > 0; a--){ outputArray.push(a/stepCount); }
		outputArray.push(0); return outputArray;
	}

	this.sin = function(stepCount,start=0,distance=1){
		stepCount = Math.abs(stepCount) -1;
		var outputArray = [];
		var progressPercentage = 0;
		var useablePeriod = 2*Math.PI*distance; 
		
		for(var a = 0; a <= stepCount; a++){
			progressPercentage = a/stepCount;
			outputArray.push(Math.sin(progressPercentage*useablePeriod + 2*Math.PI*start));
		}
		return outputArray;		
	}

	this.cos = function(stepCount,start=0,distance=1){
		stepCount = Math.abs(stepCount) -1;
		var outputArray = [];
		var progressPercentage = 0;
		var useablePeriod = 2*Math.PI*distance; 
		
		for(var a = 0; a <= stepCount; a++){
			progressPercentage = a/stepCount;
			outputArray.push(Math.cos(progressPercentage*useablePeriod + 2*Math.PI*start));
		}
		return outputArray;		
	}
	this.s = function(stepCount,sharpness){
		var a = 62; var curve = [0];
		
		while(curve[0] > -1){ curve = produceCurve(stepCount,sharpness,a); a--;}	
	
		return produceCurve(stepCount,sharpness,a++);
	
		function produceCurve(stepCount,sharpness,size){
			var curve = new Float32Array(stepCount);
			var deg = Math.PI/size; var x = 0;
			for (var a = 0; a < stepCount; ++a ) {
				x = ((a*2)/stepCount)-1;
				curve[a] = 20*x*sharpness*deg/(Math.PI+(sharpness*Math.abs(x)));
			}
			return curve;
		}
	}
}

