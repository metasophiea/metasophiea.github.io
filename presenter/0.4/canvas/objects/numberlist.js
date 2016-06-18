var numberlist = function(){
	var array = [];
	this.clear = function(){
		for(var a = 0; a < array.length; a++){ drawList.background.getObj(array[a]).unselect(); }
		array = [];
	}
	this.findID = function(ID){
		for(var a = 0; a < array.length; a++){ if(array[a] == ID){return a;} }
		return -1;
	}
	this.isThereID = function(ID){
		if(this.findID(ID) != -1){return true;}
		return false;
	}
	this.setID = function(ID){
		this.clear();
		array.push(ID);
		drawList.background.getObj(ID).select();
	}
	this.addID = function(newID){
		for(var a = 0; a < array.length; a++){
			if(array[a] > newID){array.splice(a,0,newID);return;}
		}
		array.push(newID);
		drawList.background.getObj(newID).select();
	}
	this.removeID = function(ID){array.splice(this.findID(ID),1); drawList.background.getObj(ID).unselect(); }
	this.dis = function(){console.log(array);}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
BootCount++; console.log("./canvas/object/numberlist.js");