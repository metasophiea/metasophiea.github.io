var numberlist = function(){
	var array = [];
	this.clear = function(){
		for(var a = 0; a < array.length; a++){ drawList.background.getObj(array[a]).unselect(); }
		array = [];
	}
	this.unhover = function(){
		for(var a = 0; a < array.length; a++){ drawList.background.getObj(array[a]).mouseout(); }
		array = [];
	}

	this.findID = function(ID){
		for(var a = 0; a < array.length; a++){ if(array[a] == ID){return a;} }
		return -1;
	}

	this.isThereID = function(ID){return isThereID_rec(ID,array.slice());}
	function isThereID_rec(ID,workingArray){var temp = Math.floor(workingArray.length/2);
		if(workingArray[temp] > ID){ workingArray.splice(temp,workingArray.length); }
		else{ workingArray.splice(0,temp); }
		
		if(workingArray.length == 1){
			if(workingArray[0] == ID){return true;}else{return false;}
		}else{return isThereID_rec(ID,workingArray);}
	}
	this.setID = function(ID){
		this.clear();
		if(ID == -1){return;} 
		array.push(ID);
		drawList.background.getObj(ID).select();
	}
	this.addID = function(newID){
		for(var a = 0; a < array.length; a++){
			if(array[a] > newID){array.splice(a,0,newID); drawList.background.getObj(newID).select(); return;}
		}
		array.push(newID);
		drawList.background.getObj(newID).select();
	}
	this.removeID = function(ID){array.splice(this.findID(ID),1); drawList.background.getObj(ID).unselect(); }
	this.dis = function(){console.log(array);}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
BootCount++; console.log("./canvas/object/numberlist.js");