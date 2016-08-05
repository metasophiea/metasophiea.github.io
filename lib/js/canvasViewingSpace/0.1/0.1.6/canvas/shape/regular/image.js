function regularShape_image(inputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(inputData.hasOwnProperty('initialData')){var initialData = inputData.initialData;}else{var initialData = {};}
	if(inputData.hasOwnProperty('styleData')){var styleData = inputData.styleData;}else{var styleData = {};}
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ID = -1; var IDcolour; var selected = false; var hovering = false; var Z = 0; 
	var width = 0; var height = 0; var anchor = [0,0];
	var origin = {'point':[0,0],'angle':0}; 
	var defined = {'point':[0,0],'angle':0};
	var calculated = {'point':[0,0],'angle':0};

	var URL = '';

	if(initialData.hasOwnProperty('origin')){origin = initialData.origin;}
	if(initialData.hasOwnProperty('position')){defined.point = initialData.position;}
	if(initialData.hasOwnProperty('width')){width = initialData.width;}
	if(initialData.hasOwnProperty('height')){height = initialData.height;}
	if(initialData.hasOwnProperty('anchor')){anchor = initialData.anchor;}
	if(initialData.hasOwnProperty('angle')){defined.angle = initialData.angle;}
	if(styleData.hasOwnProperty('URL')){URL = styleData.URL;}

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

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Public
	this.WhatAreYou = function(){return 'regularShape_image - '+ID;}
	this.getID = function(){return ID;}
	this.shift = function(point){
		defined.point = [defined.point[0]+point[0],defined.point[1]+point[1]];
		updateCalculated();
	}
	this.set = function(VariableName,newValue){
		switch(VariableName){
			case "ID": ID = newValue; IDcolour = getColourFromID(ID); break;
			case 'Z': Z = newValue; break;
			case 'R': R = parseFloat(newValue); colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
			case 'G': G = parseFloat(newValue); colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
			case 'B': B = parseFloat(newValue); colour = 'rgba('+R+','+G+','+B+','+A+')'; break;
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
			case 'URL': 
					URL = newValue; 
					var img = new Image(); img.src = URL;
					img.setAttribute("isfine",true); img.setAttribute('onerror','this.setAttribute("isfine",false);');

					setTimeout(function(){
						if(img.getAttribute('isfine') == 'true'){}
						else{URL = '';}
					},500);

			break;
		}
		updateCalculated();
	}
	this.pushToFront = function(){drawList.foreground.pushToFront(ID);}
	this.pushToBack = function(){drawList.foreground.pushToBack(ID);}
	this.pushForward = function(){drawList.foreground.pushForward(ID);}
	this.pushBackward = function(){drawList.foreground.pushBackward(ID);}

	this.getData = function(){
		return {
			'type':'regularShape_Image',
			'initialData':{'position':defined.point,'anchor':anchor,'width':width,'height':height,'angle':defined.angle},
			'styleData':{'URL':URL}
		};
	}

//Private
	function getCornerPoints(width,height,position,anchor,angle){
		var left = (anchor[0]*width); var down = (anchor[1]*height); var right = ((1-anchor[0])*width); var up = ((1-anchor[1])*height);

		var temp = 0; var greenangle = 0; var points = [[0,0],[0,0],[0,0],[0,0]]; 
		temp = Math.pow((Math.pow(left,2) + Math.pow(down,2)),0.5); if(down===0){greenangle = 0-angle-view.angle;}else{greenangle = Math.atan(down/left)-angle-view.angle;}
		points[0] = [position[0]-temp*Math.cos(greenangle),position[1]-temp*Math.sin(greenangle)]; 
		temp = Math.pow((Math.pow(right,2) + Math.pow(down,2)),0.5); if(right===0){greenangle = angle+view.angle;}else{greenangle = angle+view.angle-Math.atan(right/down);}
		points[1] = [position[0]-temp*Math.sin(greenangle),position[1]-temp*Math.cos(greenangle)]; 
		temp = Math.pow((Math.pow(right,2) + Math.pow(up,2)),0.5); if(up===0){greenangle = angle+view.angle;}else{greenangle = angle+view.angle-Math.atan(up/right);}
		points[2] = [position[0]+temp*Math.cos(greenangle),position[1]-temp*Math.sin(greenangle)];
		temp = Math.pow((Math.pow(left,2) + Math.pow(up,2)),0.5); if(left===0){greenangle = 0-angle-view.angle;}else{greenangle = Math.atan(left/up)-angle-view.angle;}
		points[3] = [position[0]-temp*Math.sin(greenangle),position[1]+temp*Math.cos(greenangle)];
		return points;
	}

	function updateCalculated(){
		var temp  = getPolarFrom(defined.point); temp[1] = temp[1] + origin.angle; temp = getCartesian(temp);
		calculated = {'point':[origin.point[0]+temp[0],origin.point[1]+temp[1]],'angle':(origin.angle + defined.angle)}	
	}

// Draw //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.draw = function(){
		var realPosition = getRealPoint(calculated.point); var dimention = [getRealLength(width),getRealLength(height)]; 
		var windowLimits = getViewportElementDimensions();
		var points = getCornerPoints(dimention[0],dimention[1],realPosition,anchor,calculated.angle);

		var count = [0,0]; 
		for(var a = 0; a < points.length; a++){
			for(var b = 0; b < points[a].length; b++){			
				if(points[a][b] < 0){count[b]--;}
				else if(points[a][b] > windowLimits[b]){count[b]++;}
			}
		}

		if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){}
		else{
			if(URL != ''){basicShape_image(viewport,dimention[0],dimention[1],realPosition,anchor,calculated.angle,URL);}
			else{basicShape_image(viewport,dimention[0],dimention[1],realPosition,anchor,calculated.angle,'http://metasophiea.com/lib/image/noimageimage.png');}
			basicShape_rectangle(selectionMatrix,dimention[0],dimention[1],realPosition,anchor,calculated.angle,IDcolour,IDcolour,getRealLength(lineThickness));
		}
	}
	this.draw_withID = function(ID){ID = getColourFromID(ID);
		var realPosition = getRealPoint(calculated.point); var dimention = [getRealLength(width),getRealLength(height)]; 
		var windowLimits = getViewportElementDimensions();
		var points = getCornerPoints(dimention[0],dimention[1],realPosition,anchor,calculated.angle);

		var count = [0,0]; 
		for(var a = 0; a < points.length; a++){
			for(var b = 0; b < points[a].length; b++){			
				if(points[a][b] < 0){count[b]--;}
				else if(points[a][b] > windowLimits[b]){count[b]++;}
			}
		}

		if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){}
		else{
			if(URL != ''){basicShape_image(viewport,dimention[0],dimention[1],realPosition,anchor,calculated.angle,URL);}
			else{basicShape_image(viewport,dimention[0],dimention[1],realPosition,anchor,calculated.angle,'http://metasophiea.com/lib/image/noimageimage.png');}
			basicShape_rectangle(selectionMatrix,dimention[0],dimention[1],realPosition,anchor,calculated.angle,ID,ID,getRealLength(lineThickness));
		}
	}
	this.draw_selectionMatrixOnly = function(){
		var realPosition = getRealPoint(calculated.point); var dimention = [getRealLength(width),getRealLength(height)]; 
		var windowLimits = getViewportElementDimensions();
		var points = getCornerPoints(dimention[0],dimention[1],realPosition,anchor,calculated.angle);

		var count = [0,0]; 
		for(var a = 0; a < points.length; a++){
			for(var b = 0; b < points[a].length; b++){			
				if(points[a][b] < 0){count[b]--;}
				else if(points[a][b] > windowLimits[b]){count[b]++;}
			}
		}

		if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){}
		else{basicShape_rectangle(selectionMatrix,dimention[0],dimention[1],realPosition,anchor,calculated.angle,IDcolour,IDcolour,getRealLength(lineThickness));}
	}
	this.draw_selectionMatrixOnly_withID = function(ID){ID = getColourFromID(ID);
		var realPosition = getRealPoint(calculated.point); var dimention = [getRealLength(width),getRealLength(height)]; 
		var windowLimits = getViewportElementDimensions();
		var points = getCornerPoints(dimention[0],dimention[1],realPosition,anchor,calculated.angle);

		var count = [0,0]; 
		for(var a = 0; a < points.length; a++){
			for(var b = 0; b < points[a].length; b++){			
				if(points[a][b] < 0){count[b]--;}
				else if(points[a][b] > windowLimits[b]){count[b]++;}
			}
		}

		if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){}
		else{basicShape_rectangle(selectionMatrix,dimention[0],dimention[1],realPosition,anchor,calculated.angle,ID,ID,getRealLength(lineThickness));}
	}

// Mouse Methods /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.select = function(){selected = true;}
	this.unselect = function(){selected = false;}	
	this.mouseover = function(point){
		if(!hovering){
			this.set('R',R*(2.5/2)); this.set('G',G*(2.5/2)); this.set('B',B*(2.5/2));
			hovering = true;
		}
	}
	this.mouseout = function(){
		if(hovering){
			this.set('R',R*(2/2.5));this.set('G',G*(2/2.5));this.set('B',B*(2/2.5));
			hovering = false;
		}
	}
	this.mousedown = function(point){}
	this.click = function(x,y){this.pushToFront();}
	this.dragStart = function(){}
	this.drag = function(point){
		if(selected){
			this.shift(point);
		}
	}
	this.dragEnd = function(){}
}
