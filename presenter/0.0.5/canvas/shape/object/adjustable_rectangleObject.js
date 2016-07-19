function adjustable_rectangleObject(inputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(inputData.hasOwnProperty('initialData')){var initialData = inputData.initialData;}else{var initialData = {};}
	if(inputData.hasOwnProperty('styleData')){var styleData = inputData.styleData;}else{var styleData = {};}
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ID = -1; var IDcolour; var selected = false; var Z = 0; 
	var width = 0; var height = 0; var anchor = [0,0]; 
	var parentAngle = 0; var angle = 0; var trueAngle = 0;
	var origin = [0,0]; var position = [0,0]; var truePosition = [0,0]; var axiom = [0,0];

	if(initialData.hasOwnProperty('origin')){origin = initialData.origin;}
	if(initialData.hasOwnProperty('position')){position = initialData.position;}
	if(initialData.hasOwnProperty('anchor')){anchor = initialData.anchor;}
	if(initialData.hasOwnProperty('width')){width = initialData.width;}
	if(initialData.hasOwnProperty('height')){height = initialData.height;}
	if(initialData.hasOwnProperty('angle')){angle = initialData.angle;}
	if(initialData.hasOwnProperty('parentAngle')){parentAngle = initialData.parentAngle;}
	truePosition = [origin[0]+position[0],origin[1]+position[1]];
	axiom = getTopLeftPoint(width,height,truePosition,anchor,angle);

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

// Sub Shapes ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var subShapeList = new drawlist(); var lastHover = -1;
	subShapeList.add(new rectangleObject({ "initialData":{'origin':axiom,'parentAngle':angle,'position':[0,0],"anchor":[0,0],"width":width,"height":height,"angle":0}, "styleData":styleData }) );

	subShapeList.add(new rectangleObject({ "initialData":{'origin':axiom,'parentAngle':angle,'position':[0,0],"anchor":[0,0],"width":50,"height":50,"angle":0}, "styleData":{"R":250,"G":200,"B":200}}) );
	subShapeList.add(new rectangleObject({ "initialData":{'origin':axiom,'parentAngle':angle,'position':[width-50,0],"anchor":[0,0],"width":50,"height":50,"angle":0}, "styleData":{"R":250,"G":200,"B":200}}) );
	subShapeList.add(new rectangleObject({ "initialData":{'origin':axiom,'parentAngle':angle,'position':[width-50,height-50],"anchor":[0,0],"width":50,"height":50,"angle":0}, "styleData":{"R":250,"G":200,"B":200}}) );
	subShapeList.add(new rectangleObject({ "initialData":{'origin':axiom,'parentAngle':angle,'position':[0,height-50],"anchor":[0,0],"width":50,"height":50,"angle":0}, "styleData":{"R":250,"G":200,"B":200}}) );

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Public
		this.WhatAreYou = function(){return 'super_rectangleObject_'+ID;}
		this.getID = function(){return ID;}
		this.shift = function(point){ 
			position = [position[0]+point[0],position[1]+point[1]]; 
			truePosition = [origin[0]+position[0],origin[1]+position[1]];
			reassesAxiom();
		}
		
		this.set = function(VariableName,newValue){
			if(VariableName == 'ID'){ID = newValue; IDcolour = getColourFromID(ID); return;}
			switch(VariableName){
				case 'Z': Z = newValue; break;
				case 'R': R = newValue; colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
				case 'G': G = newValue; colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
				case 'B': B = newValue; colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
				case 'A': A = newValue; colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
				case 'line_R': line_R = newValue; colour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')'; break;
				case 'line_G': line_G = newValue; colour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')'; break;
				case 'line_B': line_B = newValue; colour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')'; break;
				case 'line_A': line_A = newValue; colour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')'; break;
				case 'origin': origin = newValue; truePosition = [origin[0]+position[0],origin[1]+position[1]]; break;
				case "position": position = newValue; truePosition = [origin[0]+position[0],origin[1]+position[1]]; break;
				case "anchor": anchor = newValue; break;
				case "height": height = newValue; break;
				case "width": width = newValue; break;
				case "angle": angle = newValue; break;
				case 'lineThickness': lineThickness = newValue; if(lineThickness === 0){lineColour = 'rgba(0,0,0,0)';}else{lineColour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')';} break;	
			}

			switch(VariableName){
				case 'width': case 'height':
					subShapeList.getObj(0).set(VariableName,newValue);
					subShapeList.getObj(1).set('position',[0,0]);	
					subShapeList.getObj(2).set('position',[width-50,0]);	
					subShapeList.getObj(3).set('position',[width-50,height-50]);	
					subShapeList.getObj(4).set('position',[0,height-50]);				
				break;
			}
			reassesAxiom();
		}
	
		this.pushToFront = function(){drawList.foreground.pushToFront(ID);}
		this.pushToBack = function(){drawList.foreground.pushToBack(ID);}
		this.pushForward = function(){drawList.foreground.pushForward(ID);}
		this.pushBackward = function(){drawList.foreground.pushBackward(ID);}

		function reassesAxiom(){
			axiom = getTopLeftPoint(width,height,truePosition,anchor,angle); 
			var temp = subShapeList.getAllObjectIDs()
			for(var a = 0; a < temp.length; a++){ 
				subShapeList.getObj(temp[a]).set('origin',axiom);
				subShapeList.getObj(temp[a]).set('parentAngle',angle);
			}
		}

		function getSubShape(point){
			subShapeList.render_selectionOnly(); var temp = getIDFromPoint(point[0],point[1]); 

			var realPosition = getRealPoint(position); var dimention = [getRealLength(width),getRealLength(height)]; var windowLimits = getViewportElementDimensions();
			var points = getCornerPoints(dimention[0],dimention[1],realPosition,anchor,angle);
			rectangle(selectionMatrix,dimention[0],dimention[1],realPosition,anchor,angle,IDcolour,IDcolour,lineThickness);

			if(temp == -1){return 0;}
			return temp;
		}

// Draw //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.draw = function(){
		var realPosition = getRealPoint(position); var dimention = [getRealLength(width),getRealLength(height)]; var windowLimits = getViewportElementDimensions();
		var points = getCornerPoints(dimention[0],dimention[1],realPosition,anchor,angle);

		var count = [0,0]; 
		for(var a = 0; a < points.length; a++){for(var b = 0; b < points[a].length; b++){			
			if(points[a][b] < 0){count[b]--;}
			else if(points[a][b] > windowLimits[b]){count[b]++;}
		}}

		if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){}
		else{	
			subShapeList.render();
			rectangle(selectionMatrix,dimention[0],dimention[1],realPosition,anchor,angle,IDcolour,IDcolour,lineThickness);
		}
	}
// Mouse Methods /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.select = function(point){
		if(!selected){this.set('A',A*(2/3));  selected = true;}
		var temp = getSubShape(point);
		subShapeList.getObj(temp).select();
	}
	this.unselect = function(){
		if(selected){
			this.set('A',A*(3/2)); selected = false;
			var temp = subShapeList.getAllObjectIDs()
			for(var a = 0; a < temp.length; a++){ subShapeList.getObj(temp[a]).unselect(); }
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
	this.mouseout = function(){
		var temp = subShapeList.getAllObjectIDs()
		for(var a = 0; a < temp.length; a++){ subShapeList.getObj(temp[a]).mouseout(); }
	}
	this.mousedown = function(point){}
	this.click = function(x,y){this.pushToFront();}
	this.drag = function(point){
		if(selected){
			if(lastHover == 0){this.shift(point);}//subShapeList.getObj(lastHover).drag(point);}
			else{
				switch(lastHover){
					case 1: console.log(point); this.set('height',height-point[0]); this.set('width',width-point[1]); break;
					case 2: break;
					case 3: break;
					case 4: break;				
				}
			}
		}
	}
}
