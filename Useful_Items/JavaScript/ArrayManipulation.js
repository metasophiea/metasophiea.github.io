//Places 'Object' into 'Array', with the finishing position of 'Position'//////////////////////////////////////////////////////////////
	function PlopObjectIntoArray(Object, Array, Position){
		var OutputArray = []; var OutputArray_Count = 0;
		for(var a = 0; a < Array.length; a++){
			if(a == Position){
				OutputArray[OutputArray_Count] = Object;
				OutputArray_Count++;
			}
			OutputArray[OutputArray_Count] = Array[a];
			OutputArray_Count++;
		}
		return OutputArray;
	}
	
// Goes into provided 'Array', and pulls out the appropiate* object at 'Position'//////////////////////////////////////////////////////
// - *function checks to see if item requested for removal, matches 'object'. 
// - if no object is provided ('Object' == "") this check is not done
	function PullObjectOutOfArray(Object, Array, Position){
		var OutputArray = []; var OutputArray_Count = 0;
		if(Object == ""){Object = Array[Position];}
		for(var a = 0; a < Array.length; a++){
			if(a == Position && Array[a] == Object){a++;}
			OutputArray[OutputArray_Count] = Array[a];
			OutputArray_Count++;
		}
		return OutputArray;
	}
