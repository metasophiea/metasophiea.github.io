function image(inputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(inputData.hasOwnProperty('initialData')){var initialData = inputData.initialData;}else{var initialData = {};}
	if(inputData.hasOwnProperty('styleData')){var styleData = inputData.styleData;}else{var styleData = {};}
	if(inputData.hasOwnProperty('codeData')){var codeData = inputData.codeData;}else{var codeData = {};}	
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ID = -1; var IDColour; var selected = false; var Z = 0;
	var position = [0,0]; var anchor = [0,0];
	var width = 0; var height = 0; var angle = 0; 

	if(initialData.hasOwnProperty('position')){position = initialData.position;}
	if(initialData.hasOwnProperty('anchor')){anchor = initialData.anchor;}
	if(initialData.hasOwnProperty('width')){width = initialData.width;}
	if(initialData.hasOwnProperty('height')){height = initialData.height;}
	if(initialData.hasOwnProperty('angle')){angle = initialData.angle;}
// Image	
	var img = new Image();
	if(styleData.hasOwnProperty('URL')){img.src = styleData.URL;}else{Console.error("no URL for image object: " + ID);}

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.WhatAreYou = function(){return 'image_'+ID;}
	this.getID = function(){return ID;}
	this.getAllData = function(){return {
		'type':'image',
		'ID':ID,
		'Z':MyZ(),
		'position':position,
		'anchor':anchor,
		'width':width,
		'height':height,
		'angle':angle,
		'code':codeData};}
	this.shift = function(point){position = [position[0]+point[0],position[1]+point[1]];}
	this.set = function(VariableName,NewValue){
		switch(VariableName){
			case "ID": ID = NewValue; IDColour = getColourFromID(ID); break;
			case "position": position = NewValue; break;
			case "anchor": anchor = NewValue; break;
			case "height": height = NewValue; break;
			case "width": width = NewValue; break;
			case "angle": angle = NewValue; break;
			case "URL": img.src = NewValue; break;	
		}
	}

	this.pushToFront = function(){drawList.background.pushToFront(ID);}
	this.pushToBack = function(){drawList.background.pushToBack(ID);}
	this.pushForward = function(){drawList.background.pushForward(ID);}
	this.pushBackward = function(){drawList.background.pushBackward(ID);}

//Private
	function MyZ(){return drawList.background.getObjDrawPosition(ID);}

// Draw //
	this.draw = function(){
		var realPosition = getRealPoint(position); var dimention = [getRealLength(width),getRealLength(height)]; var windowLimits = getViewportElementDimensions();
		var left = (anchor[0]*dimention[0]); var down = (anchor[1]*dimention[1]); var right = ((1-anchor[0])*dimention[0]); var up = ((1-anchor[1])*dimention[1]);

		var temp = 0; var greenangle = 0; var points = [[0,0],[0,0],[0,0],[0,0]]; 
		temp = Math.pow((Math.pow(left,2) + Math.pow(down,2)),0.5); if(down===0){greenangle = 0-angle-view.angle;}else{greenangle = Math.atan(down/left)-angle-view.angle;}
		points[0] = [realPosition[0]-temp*Math.cos(greenangle),realPosition[1]-temp*Math.sin(greenangle)]; 
		temp = Math.pow((Math.pow(right,2) + Math.pow(down,2)),0.5); if(right===0){greenangle = angle+view.angle;}else{greenangle = angle+view.angle-Math.atan(right/down);}
		points[1] = [realPosition[0]-temp*Math.sin(greenangle),realPosition[1]-temp*Math.cos(greenangle)]; 
		temp = Math.pow((Math.pow(right,2) + Math.pow(up,2)),0.5); if(up===0){greenangle = angle+view.angle;}else{greenangle = angle+view.angle-Math.atan(up/right);}
		points[2] = [realPosition[0]+temp*Math.cos(greenangle),realPosition[1]-temp*Math.sin(greenangle)];
		temp = Math.pow((Math.pow(left,2) + Math.pow(up,2)),0.5); if(left===0){greenangle = 0-angle-view.angle;}else{greenangle = Math.atan(left/up)-angle-view.angle;}
		points[3] = [realPosition[0]-temp*Math.sin(greenangle),realPosition[1]+temp*Math.cos(greenangle)];

		var count = [0,0]; 
		for(var a = 0; a < points.length; a++){for(var b = 0; b < points[a].length; b++){			
			if(points[a][b] < 0){count[b]--;}
			else if(points[a][b] > windowLimits[b]){count[b]++;}
		}}

		if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){}
		else{this.draw_viewport(realPosition,dimention); this.draw_selectionMatrix(realPosition,dimention);}
	}

	this.draw_viewport = function(realPosition,dimention){
		viewport.save();
		viewport.translate(realPosition[0],realPosition[1]);
		viewport.rotate(-view.angle-angle);
		try{viewport.drawImage(img,-anchor[0]*dimention[0],-anchor[1]*dimention[1],dimention[0],dimention[1]);}
		catch(e){viewport.fillStyle = "rgb(50,50,50)";viewport.fillRect(-anchor[0]*dimention[0],-anchor[1]*dimention[1],dimention[0],dimention[1]);}
		viewport.restore();
	}
	this.draw_selectionMatrix = function(realPosition,dimention){
		selectionMatrix.fillStyle = IDColour;
		selectionMatrix.save();
		selectionMatrix.translate(realPosition[0],realPosition[1]);
		selectionMatrix.rotate(-view.angle-angle);
		selectionMatrix.fillRect(-anchor[0]*dimention[0],-anchor[1]*dimention[1],dimention[0],dimention[1]);
		selectionMatrix.restore();
	}
// Mouse Methods //
	this.select = function(){if(!selected){ console.log('select'); } selected = true;}
	this.unselect = function(){if(selected){ console.log('unselect'); } selected = false;}	
	this.mouseover = function(point){}
	this.mouseout = function(){}
	this.mousedown = function(point){}
	this.click = function(x,y){this.pushToFront();}
	this.drag = function(point){if(selected){this.shift(point);}}
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
BootCount++; console.log("./canvas/shape/image.js");
