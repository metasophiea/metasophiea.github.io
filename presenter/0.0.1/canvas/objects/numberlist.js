var numberlist = function(){
	var array = [];
	this.clear = function(){
		for(var a = 0; a < array.length; a++){ DrawList.Background.getObj(array[a]).unselect(); }
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
	this.addID = function(newID){
		for(var a = 0; a < array.length; a++){
			if(array[a] > newID){array.splice(a,0,newID);return;}
		}
		array.push(newID);
		DrawList.Background.getObj(newID).select();
	}
	this.removeID = function(ID){array.splice(this.findID(ID),1); DrawList.Background.getObj(ID).unselect(); }
	this.dis = function(){console.log(array);}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/object/numberlist.js loaded"); BootCount++;