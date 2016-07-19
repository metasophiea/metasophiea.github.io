function text(inputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(inputData.hasOwnProperty('initialData')){var initialData = inputData.initialData;}else{var initialData = {};}
	if(inputData.hasOwnProperty('styleData')){var styleData = inputData.styleData;}else{var styleData = {};}
	if(inputData.hasOwnProperty('codeData')){var codeData = inputData.codeData;}else{var codeData = {};}	
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ID = -1; var IDcolour; var selected = false; var Z = 0; var detail = 100;
	var position = [0,0]; var anchor = [0,0]; var angle = 0;
	var text = []; var lineSpacing = 1; var fontFamily = 'serif'; var fontSize = 20; var fontVariant = ''; var fontItalics = false;
	var align = 'left';

	if(initialData.hasOwnProperty('position')){position = initialData.position;}
	if(initialData.hasOwnProperty('anchor')){anchor = initialData.anchor;}
	if(initialData.hasOwnProperty('angle')){angle = initialData.angle;}
	if(initialData.hasOwnProperty('text')){text = initialData.text;}

	//Style
		if(styleData.hasOwnProperty('lineSpacing')){lineSpacing = styleData.lineSpacing;}
		if(styleData.hasOwnProperty('fontFamily')){fontFamily = styleData.fontFamily;}
		if(styleData.hasOwnProperty('fontSize')){fontSize = styleData.fontSize;}
		if(styleData.hasOwnProperty('fontVariant')){fontVariant = styleData.fontVariant;}
		if(styleData.hasOwnProperty('fontItalics')){fontItalics = styleData.fontItalics;}
		if(styleData.hasOwnProperty('align')){align = styleData.align;}	

		//Main colour
		if(styleData.hasOwnProperty('R')){var R = styleData.R;}else{var R = 0;}
		if(styleData.hasOwnProperty('G')){var G = styleData.G;}else{var G = 0;}
		if(styleData.hasOwnProperty('B')){var B = styleData.B;}else{var B = 0;}
		if(styleData.hasOwnProperty('A')){var A = styleData.A;}else{var A = 1;}
		var colour = 'rgba('+R+', '+G+', '+B+', '+A+')';
		//Outline colour
		if(styleData.hasOwnProperty('line_R')){var line_R = styleData.line_R;}else{var line_R = 0;}
		if(styleData.hasOwnProperty('line_G')){var line_G = styleData.line_R;}else{var line_G = 0;}
		if(styleData.hasOwnProperty('line_B')){var line_B = styleData.line_R;}else{var line_B = 0;}
		if(styleData.hasOwnProperty('line_A')){var line_A = styleData.line_A;}else{var line_A = 1;}
		var lineColour = 'rgba('+line_R+', '+line_G+', '+line_B+', '+line_A+')';
		//Outline thickness
		if(styleData.lineThickness === 0 || !styleData.hasOwnProperty('lineThickness')){ var lineColour = 'rgba(0,0,0,0)'; var lineThickness = 0;}
		else{var lineThickness = styleData.lineThickness; var lineColour = 'rgba('+line_R+', '+line_G+', '+line_B+', '+line_A+')';}
// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Public
	this.WhatAreYou = function(){return 'text_'+ID;}
	this.getID = function(){return ID;}
	this.getAllData = function(){return {
		'type':'text',
		'ID':ID,
		'Z':MyZ(),
		'text':text,
		'Colour':colour,
		'lineColour':lineColour,
		'lineThickness':lineThickness,
		'code':codeData};}
	this.shift = function(point){position = [position[0]+point[0],position[1]+point[1]];}
	this.set = function(VariableName,newValue){
		switch(VariableName){
			case "ID": ID = newValue; IDColour = getColourFromID(ID); break;
			case "position": position = newValue; break;
			case "anchor": anchor = newValue; break;
			case "angle": angle = newValue; break;
			case "text": text = newValue; break;	
			case 'Z': Z = newValue; break;
			case 'R': R = newValue; colour = 'rgba('+R+', '+G+', '+B+', '+A+')'; break;
			case 'G': G = newValue; colour = 'rgba('+R+', '+G+', '+B+', '+A+')'; break;
			case 'B': B = newValue; colour = 'rgba('+R+', '+G+', '+B+', '+A+')'; break;
			case 'A': A = newValue; colour = 'rgba('+R+', '+G+', '+B+', '+A+')'; break;
			case 'colour': colour = newValue; break;
			case 'lineColour': lineColour = newValue; break;
			case 'lineThickness': lineThickness = newValue; if(lineThickness === 0){lineColour = 'rgba(0,0,0,0)';}else{lineColour = 'rgba('+line_R+', '+line_G+', '+line_B+', '+line_A+')';} break;
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
		//discover width and height of text
			viewport.textAlign = align;
			viewport.font = detail + "px " + fontFamily; var height = 0; var longest = 0; var width = 0;
			for(var a = 0; a < lineSpacing*(text.length-1); a++){ height += fontSize; }height += fontSize;
			for(var a = 0; a < text.length; a++){ if(viewport.measureText(text[a]).width > longest){longest = viewport.measureText(text[a]).width;} }
			width = longest*(fontSize/100);

		//get real position of anchor
			var realPosition = getRealPoint(position);

		//calculate bounding box points
			var dimention = [getRealLength(width),getRealLength(height)]; var windowLimits = getViewportElementDimensions();
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

		//count points outside viewport
			var count = [0,0];
			for(var a = 0; a < points.length; a++){for(var b = 0; b < points[a].length; b++){
				if(points[a][b] < 0){count[b]--;}
				else if(points[a][b] > windowLimits[b]){count[b]++;}
			}}
		
		//decide on draw
			if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){console.log('don\'t draw');}
			else{this.draw_viewport(realPosition,dimention); this.draw_selectionMatrix(realPosition,dimention);}
	}

	this.draw_viewport = function(realPosition,dimention){
		var scaleAdjust = getRealLength(fontSize)/detail; 
		var positionAdjust = [(-anchor[0]*dimention[0])/scaleAdjust,(anchor[1]*dimention[1])/scaleAdjust];

		if(fontItalics){viewport.font = 'italic ' + fontVariant + ' ' + detail + "px " + fontFamily;}
		else{viewport.font = fontVariant + ' ' + detail + "px " + fontFamily;}

		viewport.fillStyle = colour;
		viewport.strokeStyle = lineColour;
		viewport.lineWidth = lineThickness;
		viewport.textAlign = align;

		viewport.save();
		viewport.translate(realPosition[0],realPosition[1]);
		viewport.rotate(-view.angle-angle);
		viewport.scale(scaleAdjust,scaleAdjust);
		for(var a = 0; a < text.length; a++){
			viewport.fillText(text[a],positionAdjust[0],a*detail*lineSpacing-positionAdjust[1]+3*fontSize);
			viewport.strokeText(text[a],positionAdjust[0],a*detail*lineSpacing-positionAdjust[1]+3*fontSize);
		}
		viewport.restore();
	}
	this.draw_selectionMatrix = function(realPosition,dimention){
		var scaleAdjust = getRealLength(fontSize)/detail; 
		var positionAdjust = [(-anchor[0]*dimention[0])/scaleAdjust,(anchor[1]*dimention[1])/scaleAdjust];

		if(fontItalics){selectionMatrix.font = 'italic ' + fontVariant + ' ' + detail + "px " + fontFamily;}
		else{selectionMatrix.font = fontVariant + ' ' + detail + "px " + fontFamily;}

		selectionMatrix.fillStyle = IDColour;
		selectionMatrix.strokeStyle = IDColour;
		selectionMatrix.lineWidth = lineThickness+15;
		selectionMatrix.textAlign = align;

		selectionMatrix.save();
		selectionMatrix.translate(realPosition[0],realPosition[1]);
		selectionMatrix.rotate(-view.angle-angle);
		selectionMatrix.scale(scaleAdjust,scaleAdjust);
		for(var a = 0; a < text.length; a++){
			selectionMatrix.fillText(text[a],positionAdjust[0],a*detail*lineSpacing-positionAdjust[1]+3*fontSize);
			selectionMatrix.strokeText(text[a],positionAdjust[0],a*detail*lineSpacing-positionAdjust[1]+3*fontSize);
		}
		selectionMatrix.restore();
	}

// Mouse Methods //
	this.select = function(){ if(!selected){ this.set('A',A*(2/3)); } selected = true; }
	this.unselect = function(){ if(selected){ this.set('A',A*(3/2)); } selected = false; }	
	this.mouseover = function(point){}
	this.mouseout = function(){}
	this.mousedown = function(point){}
	this.click = function(x,y){this.pushToFront();}
	this.drag = function(point){if(selected){this.shift(point);}}
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
BootCount++; console.log("./canvas/shape/text.js");