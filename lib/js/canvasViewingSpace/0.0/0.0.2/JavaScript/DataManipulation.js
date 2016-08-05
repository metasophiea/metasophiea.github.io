function ChangeOneThingInJSONObject(Object, Thing, NewValue){
	Object[Thing] = NewValue; return Object;
}

function GetListPosition_FromID(ID, DrawList){
	for(var a = 0; a < DrawList.length; a++){
		if( DrawList[a].ID == ID){ return a; }
	}
	return -1;
}

function FindClosestIndex(val){
	var AdjustSize = (Zoom_Index.length-1)/2;

	for(var a = 0; a < Zoom_Index.length-1; a++){
		if(Zoom_Index[a+1] >= val){
			if(val-Zoom_Index[a] < Zoom_Index[a+1]-val){return a-AdjustSize;}else{return a+1-AdjustSize;}
		}
	}
	return 0;
}

function RouteCurveMaker(Start, End, Frames, Type){
	var OutputArray = [Start];
	switch(Type){
		case 'linear': 
			var step = (End - Start)/Frames;
			for(var a = 1; a < Frames-1; a++){
				OutputArray[a] = OutputArray[a-1] + step;	
			}		
		break;
		
		case 'sin':
			var dif = End - Start;
			for(var a = 1; a < Frames-1; a++){ 
				OutputArray[a] = Start + dif*Math.sin((a/Frames)*(Math.PI/2));   	
			}			
		break;

		case 'cos':
			var dif = End - Start;
			for(var a = 1; a < Frames-1; a++){ 
				OutputArray[a] = Start + dif - dif*Math.cos((a/Frames)*(Math.PI/2));   	
			}			
		break;

		case 'cosin':
			var dif = End - Start;
			for(var a = 1; a < Frames/2; a++){ 
				OutputArray[a] = Start + (dif - dif*Math.cos((2*a/Frames)*(Math.PI/2)))/2;     	
			}	
			for(var a = Frames/2; a < Frames-1; a++){ 	
				OutputArray[a] = Start + dif/2 + (dif*Math.sin((2*(a-Frames/2)/Frames)*(Math.PI/2)))/2;
			}


		break;
	}

	//console.log(OutputArray);	
	OutputArray[OutputArray.length] = End; 
	return OutputArray;
}
