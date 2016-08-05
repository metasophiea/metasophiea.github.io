function drawlist(){	 
	var list = []; var index = [];

	this.showIndex = function(){var temp; 
		for(var a = 0; a < index.length; a++){
			try{temp = list[index[a]].WhatAreYou();}catch(e){temp = 'none';}
			console.log(a+"|"+ index[a] +"|"+ temp);
		}
	}
	this.showObjAndID = function(){ for(var a = 0; a < list.length; a++){ console.log(list[a].WhatAreYou() +"|"+ list[a].getID()); } }
	this.getNextId = function(){ for(var a = 0; a <= index.length; a++){ if(index[a] == undefined){return a;} } }
	this.refreshIndex = function(from=0){ for(var a = from; a < list.length; a++){ index[list[a].getID()] = a; } }
	this.clear = function(){list = []; index = [];}
	this.setSuperID = function(superID){superID = superID;}
	this.add = function(obj,superID=-1){
		var newID = this.getNextId();
		obj.set('ID',newID);
		list.push(obj);
		index[newID] = list.length-1;
		return newID;
	}
	this.plopAdd = function(obj,position){
		var newID = this.getNextId();
		obj.set('ID',newID);
		list.splice(position,0,obj);
		this.refreshIndex(position);	
		return newID;
	}
	this.remove = function(position){
		index[list[position].getID()] = undefined;
		list.splice(position,1);	
		this.refreshIndex();
	}
	this.removeByID = function(ID){ this.remove(index[ID]); }
	this.swap = function(position1,position2){
		var temp = list[position1];
		list[position1] = list[position2];
		list[position2] = temp;
		
		index[list[position1].getID()] = position1;
		index[list[position2].getID()] = position2;
	}
	this.pushForward = function(ID){
		if(index[ID] == list.length-1){return;}
		this.swap(index[ID],(index[ID]+1));
	}
	this.pushBackward = function(ID){
		if(index[ID] == 0){return;}
		this.swap(index[ID],(index[ID]-1));
	}
	this.pushToFront = function(ID){
		var temp = list[index[ID]]; 
		list.splice(index[ID],1); 
		list.push(temp); 
		this.refreshIndex();
	}
	this.pushToBack = function(ID){
		var temp = list[index[ID]]; 
		list.splice(index[ID],1); 
		list.unshift(temp); 
		this.refreshIndex();
	}

	this.swapByID = function(ID1,ID2){ this.swap(index[ID1],index[ID2]); }
	this.getObjDrawPosition = function(ID){return index[ID];}
	this.getObj = function(ID){ return list[index[ID]]; }
	this.length = function(){return list.length;}
	this.getAllObjectIDs = function(){var output = [];
		for(var a = 0; a < list.length; a++){
			output += list[a].getID();
		}
		return output;
	}
	this.render = function(){ for(var a = 0; a < list.length; a++){ list[a].draw(); } }
	this.render_selectionOnly = function(){ for(var a = 0; a < list.length; a++){ list[a].draw_selectionOnly(); } }
}