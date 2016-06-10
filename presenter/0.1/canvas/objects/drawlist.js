function drawlist(){	 
	this.list = [];
	this.index = [];

	this.showObjAndID = function(){
		for(var a = 0; a < this.list.length; a++){
			console.log(this.list[a].WhatAreYou() +"|"+ this.list[a].ID);
		}
	}
	this.getNextId = function(){
		for(var a = 0; a <= this.index.length; a++){
			if(this.index[a] == undefined){return a;}
		}
	}
	this.refreshIndex = function(from=0){
		for(var a = from; a < this.list.length; a++){
			this.index[this.list[a].ID] = a;
		}
	}
	this.add = function(obj){
		var newID = this.getNextId();
		obj.set('ID',newID);
		this.list.push(obj);
		this.index[newID] = this.list.length-1;
	}
	this.plopAdd = function(obj,position){
		var newID = this.getNextId();
		obj.set('ID',newID);
		this.list.splice(position,0,obj);
		this.refreshIndex(position);	
	}
	this.remove = function(position){
		this.index[this.list[position].ID] = undefined;
		this.list.splice(position,1);	
		this.refreshIndex(position);
	}
	this.removeByID = function(ID){
		this.remove(this.index[ID]);
	}
	this.swap = function(position1,position2){
		var temp = this.list[position1];
		this.list[position1] = this.list[position2];
		this.list[position2] = temp;
		
		this.index[this.list[position1].ID] = position1;
		this.index[this.list[position2].ID] = position2;
	}
	this.swapByID = function(ID1,ID2){
		this.swap(this.index[ID1],this.index[ID2]);
	}
	this.getObj = function(ID){
		return this.list[this.index[ID]];
	}
	this.render = function(){
		for(var a = 0; a < this.list.length; a++){
			this.list[a].draw();
		}
	}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/object/drawlist.js loaded"); BootCount++;