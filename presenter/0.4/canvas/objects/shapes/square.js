function square(inputData = []){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(inputData.hasOwnProperty('initialData')){var initialData = inputData.initialData;}else{var initialData = {};}
	if(inputData.hasOwnProperty('styleData')){var styleData = inputData.styleData;}else{var styleData = {};}
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ID = -1; var IDcolour; var selected = false; var Z = 0;
	var width = 0; var height = 0; var anchor = [0,0]; var position = [0,0]; var angle = 0;
	var subsquare = -1;

	if(initialData.hasOwnProperty('position')){position = initialData.position;}
	if(initialData.hasOwnProperty('anchor')){anchor = initialData.anchor;}
	if(initialData.hasOwnProperty('width')){width = initialData.width;}
	if(initialData.hasOwnProperty('height')){height = initialData.height;}
	if(initialData.hasOwnProperty('angle')){angle = initialData.angle;}

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
		else{var lineThickness = styleData.lineThickness; var lineColour = 'rgba('+line_R+', '+line_G+', '+line_B+', '+line_A+')';}
// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Public
		this.WhatAreYou = function(){return 'square_'+ID;}
		this.getID = function(){return ID;}
		this.shift = function(point){position = [position[0]+point[0],position[1]+point[1]];}
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
				case "position": position = newValue; break;
				case "anchor": anchor = newValue; break;
				case "height": height = newValue; break;
				case "width": width = newValue; break;
				case "angle": angle = newValue; break;
				case "URL": img.src = newValue; break;	
				case 'lineThickness': lineThickness = newValue; if(lineThickness === 0){lineColour = 'rgba(0,0,0,0)';}else{lineColour = 'rgba('+line_R+','+line_G+','+line_B+','+line_A+')';} break;	
			}
		}
		this.getAllData = function(){return {
			'type':'square',
			'ID':ID,
			'Z':MyZ(),
			'width':width,'height':height,
			'Colour':colour,
			'lineColour':lineColour,
			'lineThickness':lineThickness
			};}

		this.pushToFront = function(){drawList.background.pushToFront(ID);}
		this.pushToBack = function(){drawList.background.pushToBack(ID);}
		this.pushForward = function(){drawList.background.pushForward(ID);}
		this.pushBackward = function(){drawList.background.pushBackward(ID);}
	//Private
		function MyZ(){return drawList.background.getObjDrawPosition(ID);}
		function getCornerPoints(realPosition,dimention){
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
			return points;
		}
		function distaceFromPoints(point){ var ans = [];
			var realPosition = getRealPoint(position); var dimention = [getRealLength(width),getRealLength(height)]; var windowLimits = getViewportElementDimensions();
			var points = getCornerPoints(realPosition,dimention);
			for(var a = 0; a < points.length; a++){ ans[a] = distanceBetweenTwoPoints(point,points[a]); }
			return ans;
		}
		function closestPointToPoint(point){ var temp = distaceFromPoints(point); var ans = 0;
			for(var a = 1; a < temp.length; a++){ if(temp[a] < temp[ans]){ans = a;} }
			if(temp[ans] >= 50){return -1;}
			return ans;
		}
		
// Draw //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.draw = function(){
		var realPosition = getRealPoint(position); var dimention = [getRealLength(width),getRealLength(height)]; var windowLimits = getViewportElementDimensions();
		var points = getCornerPoints(realPosition,dimention);

		var count = [0,0]; 
		for(var a = 0; a < points.length; a++){for(var b = 0; b < points[a].length; b++){			
			if(points[a][b] < 0){count[b]--;}
			else if(points[a][b] > windowLimits[b]){count[b]++;}
		}}

		if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){}
		else{this.draw_viewport(realPosition,dimention); this.draw_selectionMatrix(realPosition,dimention);}


		viewport.strokeStyle = 'rgb(255,0,0)';
		viewport.lineWidth = 2;
		for(var a = 0; a < 4; a++){
			viewport.beginPath(); viewport.moveTo( points[a][0]-10,points[a][1] );viewport.lineTo( points[a][0]+10,points[a][1] ); viewport.closePath(); viewport.stroke();
			viewport.beginPath(); viewport.moveTo( points[a][0],points[a][1]-10 );viewport.lineTo( points[a][0],points[a][1]+10 ); viewport.closePath(); viewport.stroke();
		}
	}

	this.draw_viewport = function(realPosition,dimention){
		viewport.fillStyle = colour;
		viewport.strokeStyle = lineColour;
		viewport.lineWidth = getRealLength(lineThickness);

		viewport.save();
		viewport.translate(realPosition[0],realPosition[1]);
		viewport.rotate(-view.angle-angle);
		viewport.fillRect(-anchor[0]*dimention[0],-anchor[1]*dimention[1],dimention[0],dimention[1]);
		viewport.restore();

		var temp = 50; var temp2 = height; if(width > height){temp2 = width;}
		if(getRealLength(temp2)/2 < temp){temp = getRealLength(temp2/2);}
		switch(subsquare){
			case 0:
				viewport.fillStyle = 'rgba(255,255,255,0.5)';
				viewport.save();
				viewport.translate(realPosition[0],realPosition[1]);
				viewport.rotate(-view.angle-angle);
				viewport.fillRect(-anchor[0]*dimention[0],-anchor[1]*dimention[1],temp,temp);
				viewport.restore();			
			break;
			case 1:
				viewport.fillStyle = 'rgba(255,255,255,0.5)';
				viewport.save();
				viewport.translate(realPosition[0],realPosition[1]);
				viewport.rotate(-view.angle-angle);
				viewport.fillRect(-anchor[0]*dimention[0]+dimention[0]-temp,-anchor[1]*dimention[1],temp,temp);
				viewport.restore();			
			break;
			case 2:
				viewport.fillStyle = 'rgba(255,255,255,0.5)';
				viewport.save();
				viewport.translate(realPosition[0],realPosition[1]);
				viewport.rotate(-view.angle-angle);
				viewport.fillRect(-anchor[0]*dimention[0]+dimention[0]-temp,-anchor[1]*dimention[1]+dimention[1]-temp,temp,temp);
				viewport.restore();			
			break;
			case 3:
				viewport.fillStyle = 'rgba(255,255,255,0.5)';
				viewport.save();
				viewport.translate(realPosition[0],realPosition[1]);
				viewport.rotate(-view.angle-angle);
				viewport.fillRect(-anchor[0]*dimention[0],-anchor[1]*dimention[1]+dimention[1]-temp,temp,temp);
				viewport.restore();			
			break;
		}
	}
	this.draw_selectionMatrix = function(realPosition,dimention){
		selectionMatrix.fillStyle = IDcolour;
		selectionMatrix.save();
		selectionMatrix.translate(realPosition[0],realPosition[1]);
		selectionMatrix.rotate(-view.angle-angle);
		selectionMatrix.fillRect(-anchor[0]*dimention[0],-anchor[1]*dimention[1],dimention[0],dimention[1]);
		selectionMatrix.restore();
	}

// Mouse Methods /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.select = function(){if(!selected){ this.set('A',A*(2/3)); } selected = true;}
	this.unselect = function(){if(selected){ this.set('A',A*(3/2)); }selected = false;}	
	this.mouseover = function(point){subsquare = closestPointToPoint(point);}
	this.mouseout = function(){subsquare = -1;}
	this.mousedown = function(point){}
	this.click = function(x,y){this.pushToFront();}
	this.drag = function(point){
		if(selected){
			if(subsquare == -1){this.shift(point);}
			else{point = getObjectDifference(point,angle);
				switch(subsquare){
					case 0: break;
					case 1: break;
					case 2: width+=point[0]; height+=point[1]; break;
					case 3: break;
				}
			}
		}
	}
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("./canvas/objects/shape/square.js"); BootCount++;