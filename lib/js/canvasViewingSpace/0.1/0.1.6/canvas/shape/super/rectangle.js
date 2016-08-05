function superShape_rectangle(inputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(inputData.hasOwnProperty('initialData')){var initialData = inputData.initialData;}else{var initialData = {};}
	if(inputData.hasOwnProperty('styleData')){var styleData = inputData.styleData;}else{var styleData = {};}
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ID = -1; var IDcolour; var selected = false; var hovering = false; var lastHover = -1; var Z = 0; 
	var width = 0; var height = 0; var anchor = [0,0];
	var origin = {'point':[0,0],'angle':0}; var axiom = {'point':[0,0],'angle':0};
	var defined = {'point':[0,0],'angle':0};
	var calculated = {'point':[0,0],'angle':0};

	if(initialData.hasOwnProperty('origin')){origin = initialData.origin;}
	if(initialData.hasOwnProperty('position')){defined.point = initialData.position;}
	if(initialData.hasOwnProperty('width')){width = initialData.width;}
	if(initialData.hasOwnProperty('height')){height = initialData.height;}
	if(initialData.hasOwnProperty('anchor')){anchor = initialData.anchor;}
	if(initialData.hasOwnProperty('angle')){defined.angle = initialData.angle;}
	calculated = {'point':[origin.point[0]+defined.point[0],origin.point[1]+defined.point[1]],'angle':(origin.angle + defined.angle)};
	axiom = {'point':getTopLeftPoint(width,height,calculated.point,anchor,calculated.angle),'angle':calculated.angle};

	//Style
		//Main colour
		if(styleData.hasOwnProperty('R')){var R = styleData.R;}else{var R = 0;}
		if(styleData.hasOwnProperty('G')){var G = styleData.G;}else{var G = 0;}
		if(styleData.hasOwnProperty('B')){var B = styleData.B;}else{var B = 0;}
		if(styleData.hasOwnProperty('A')){var A = styleData.A;}else{var A = 1;}
		var colour = 'rgba('+R+','+G+','+B+','+A+')';
		//Outline colour
		if(styleData.hasOwnProperty('line_R')){var line_R = styleData.line_R;}else{var line_R = 0;}
		if(styleData.hasOwnProperty('line_G')){var line_G = styleData.line_R;}else{var line_G = 0;}
		if(styleData.hasOwnProperty('line_B')){var line_B = styleData.line_R;}else{var line_B = 0;}
		if(styleData.hasOwnProperty('line_A')){var line_A = styleData.line_A;}else{var line_A = 0;}
		var lineColour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')';
		//Outline thickness
		if(styleData.lineThickness === 0 || !styleData.hasOwnProperty('lineThickness')){ var lineColour = 'rgba(0,0,0,0)'; var lineThickness = 0;}
		else{var lineThickness = styleData.lineThickness;}
// SubShapes /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var subShapeList = new drawlist();
	subShapeList.add( new regularShape_rectangle({ "initialData":{'origin':axiom,"position":[0,0],"anchor":[0,0],"width":width,"height":height,"angle":0}, "styleData":styleData }) );	
	subShapeList.add( new regularShape_rectangle({ "initialData":{'origin':axiom,"position":[10,10],"anchor":[0,0],"width":width/2,"height":height/2,"angle":0}, "styleData":{"R":200,"G":200,"B":200} }) );	

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Public
	this.WhatAreYou = function(){return 'superShape_rectangle - '+ID;}
	this.getID = function(){return ID;}
	this.shift = function(point){
		defined.point = [defined.point[0]+point[0],defined.point[1]+point[1]];
		calculated = {'point':[origin.point[0]+defined.point[0],origin.point[1]+defined.point[1]],'angle':(origin.angle + defined.angle)};
		axiom = {'point':getTopLeftPoint(width,height,calculated.point,anchor,calculated.angle),'angle':calculated.angle};
		subShapeList.updateOrigin(axiom);
	}
	this.set = function(VariableName,newValue){
		switch(VariableName){
			case "ID": ID = newValue; IDcolour = getColourFromID(ID); break;
			case 'Z': Z = newValue; break;
			case 'R': R = newValue; colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
			case 'G': G = newValue; colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
			case 'B': B = newValue; colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
			case 'A': A = newValue; colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
			case 'line_R': line_R = newValue; colour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')'; break;
			case 'line_G': line_G = newValue; colour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')'; break;
			case 'line_B': line_B = newValue; colour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')'; break;
			case 'line_A': line_A = newValue; colour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')'; break;
			case 'origin': origin = newValue; break;
			case "position": defined.point = newValue; break;
			case "height": height = newValue; break;
			case "width": width = newValue; break;
			case "anchor": anchor = newValue; break;
			case "angle": defined.angle = newValue; break;
			case 'lineThickness': lineThickness = newValue; if(lineThickness === 0){lineColour = 'rgba(0,0,0,0)';}else{lineColour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')';} break;	
		}
		calculated = {'point':[origin.point[0]+defined.point[0],origin.point[1]+defined.point[1]],'angle':(origin.angle + defined.angle)};
		axiom = {'point':getTopLeftPoint(width,height,calculated.point,anchor,calculated.angle),'angle':calculated.angle};
		subShapeList.updateOrigin(axiom);
	}
	this.pushToFront = function(){drawList.foreground.pushToFront(ID);}
	this.pushToBack = function(){drawList.foreground.pushToBack(ID);}
	this.pushForward = function(){drawList.foreground.pushForward(ID);}
	this.pushBackward = function(){drawList.foreground.pushBackward(ID);}

	function getSubShape(point){
		subShapeList.render(); var temp = getIDFromPoint(point[0],point[1]); subShapeList.render_withID(ID);
		if(temp == -1){return 0;}
		return temp;
	}

// Draw //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.draw = function(){ subShapeList.render_withID(ID); }
	this.draw_withID = function(ID){ subShapeList.render_withID(ID); }
// Mouse Methods /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.select = function(point){
		if(!selected){this.set('A',A*(2/3));  selected = true;}
		var temp = getSubShape(point);
		subShapeList.getObj(temp).select();
	}
	this.unselect = function(){
		if(selected){
			this.set('A',A*(3/2)); selected = false;
			subShapeList.unselectAll();
		}
	}	
	this.mouseover = function(point){
		var temp = getSubShape(point);
		//Watch for hovering
			if(temp == -1){
				if(lastHover != -1){subShapeList.getObj(lastHover).mouseout();}
				lastHover = temp;
			}
			else if(lastHover != temp){
				if(lastHover != -1){subShapeList.getObj(lastHover).mouseout();}
				subShapeList.getObj(temp).mouseover(point);
				lastHover = temp;
			}
			else{subShapeList.getObj(temp).mouseover(point);}
	}
	this.mouseout = function(){subShapeList.mouseoutAll();}
	this.mousedown = function(point){}
	this.click = function(x,y){this.pushToFront();}
	this.dragStart = function(){}
	this.drag = function(point){
		if(selected){
			if(lastHover == 0){this.shift(point);}
			else{subShapeList.getObj(lastHover).drag(getObjectDifference(point,calculated.angle));}
		}
	}
	this.dragEnd = function(){}
}
