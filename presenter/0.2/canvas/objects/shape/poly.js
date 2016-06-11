function poly(inputData = []){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(inputData.hasOwnProperty('initialData')){var initialData = inputData.initialData;}else{var initialData = {};}
	if(inputData.hasOwnProperty('styleData')){var styleData = inputData.styleData;}else{var styleData = {};}
	if(inputData.hasOwnProperty('codeData')){var codeData = inputData.codeData;}else{var codeData = {};}	
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ID = -1; var IDcolour; var Selected = false; var Z = 0;

	var points = [];
	if(initialData.hasOwnProperty('points')){
		for(var a = 0; a < initialData.points.length; a++){ points.push(initialData.points[a]); }
	}

	//Style
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
		if(styleData.hasOwnProperty('line_A')){var line_A = styleData.line_A;}else{var line_A = 0;}
		var lineColour = 'rgba('+line_R+', '+line_G+', '+line_B+', '+line_A+')';
		//Outline thickness
		if(styleData.lineThickness === 0 || !styleData.hasOwnProperty('lineThickness')){ var lineColour = 'rgba(0,0,0,0)'; var lineThickness = 0;}
		else{var lineThickness = styleData.lineThickness; var lineColour = 'rgba('+line_R+', '+line_G+', '+line_B+', '+line_A+')';}

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Public
	this.WhatAreYou = function(){return 'poly_'+ID;}
	this.getID = function(){return ID;}
	this.getAllData = function(){return {
		'type':'poly',
		'ID':ID,
		'Z':MyZ(),
		'points':points,
		'Colour':colour,
		'lineColour':lineColour,
		'lineThickness':lineThickness,
		'code':codeData};}
	this.getPoints = function(){return points;} 
	this.getPoint = function(pointNumber){return points[pointNumber];}
	this.getColour = function(){return [R,G,B,A];} 
	this.getLineColour = function(){return [line_R,line_G,line_B,line_A];}

	this.addPoint = function(newPoint){points.push(newPoint);} 
	this.setPoint = function(pointNumber,newPoint){points[pointNumber] = newPoint;}
	this.replacePoints = function(newPoints){points = newPoints;}
	this.removePoint = function(pointNumber){points = points.splice(pointNumber,1);}
	this.shiftPoint = function(pointNumber,shiftX,shiftY){points[pointNumber] = [points[pointNumber][0]+shiftX,points[pointNumber][1]+shiftY];}
	this.set = function(variableName,newValue){
		switch(variableName){
			case 'ID': ID = newValue; IDcolour = IDtoColour(ID); break;
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

	this.pushToFront = function(){DrawList.Background.pushToFront(ID);}
	this.pushToBack = function(){DrawList.Background.pushToBack(ID);}
	this.pushForward = function(){DrawList.Background.pushForward(ID);}
	this.pushBackward = function(){DrawList.Background.pushBackward(ID);}

//Private
	function MyZ(){return DrawList.Background.getObjDrawPosition(ID);}

// Drawing ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.draw = function(){
	//Develop Viewport points, and test whether these points are within the viewport's range, or if the shape stretches accross the viewport
		var DrawingPoints = []; var UnvisibleCount = [0,0];
		for(var a = 0; a < points.length; a++){
			DrawingPoints[a] = CanvasToViewport(points[a][0],points[a][1]);

			if( DrawingPoints[a][0] < 0 ){UnvisibleCount[0]++;} else if( (ViewportElement.width-DrawingPoints[a][0]) < 0 ){UnvisibleCount[0]--;}
			if( DrawingPoints[a][1] < 0 ){UnvisibleCount[1]++;} else if( (ViewportElement.height-DrawingPoints[a][1]) < 0 ){UnvisibleCount[1]--;}
		}
	//Assuming at least one point is within range; draw the object
		if(UnvisibleCount[0] < DrawingPoints.length && UnvisibleCount[1] < DrawingPoints.length && UnvisibleCount[0] > -DrawingPoints.length && UnvisibleCount[1] > -DrawingPoints.length){
			this.Draw_Viewport(DrawingPoints); this.Draw_SelectionMatrix(DrawingPoints);
		}
}
this.Draw_Viewport = function(DrawingPoints){
	Viewport.fillStyle = colour;
	Viewport.strokeStyle = lineColour;
	Viewport.lineWidth = CanvasLength(lineThickness);
	Viewport.beginPath(); Viewport.moveTo( DrawingPoints[0][0],DrawingPoints[0][1] );
	for(var a = 1; a < DrawingPoints.length; a++){ Viewport.lineTo( DrawingPoints[a][0],DrawingPoints[a][1] ); }
	Viewport.closePath(); Viewport.fill(); Viewport.stroke();
}
this.Draw_SelectionMatrix = function(DrawingPoints){
	SelectionMatrix.fillStyle = IDcolour;
	if(this.Thickness === 0){ 
		SelectionMatrix.strokeStyle = IDcolour;
		SelectionMatrix.lineWidth = 0.5;
	}else{
		SelectionMatrix.strokeStyle = IDcolour;
		SelectionMatrix.lineWidth = CanvasLength(lineThickness);
	}
	SelectionMatrix.beginPath(); SelectionMatrix.moveTo( DrawingPoints[0][0],DrawingPoints[0][1] );
	for(var a = 1; a < DrawingPoints.length; a++){ SelectionMatrix.lineTo( DrawingPoints[a][0],DrawingPoints[a][1] ); }
	SelectionMatrix.closePath(); SelectionMatrix.fill(); SelectionMatrix.stroke();
}
// Click Code ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.select = function(){
		if(!Selected){ this.set('A',this.getColour()[3]*(2/3)); }
		Selected = true;
	}
	this.unselect = function(){
		if(Selected){ this.set('A',this.getColour()[3]*(3/2)); }
		Selected = false;
	}	

	this.click = function(){this.pushToFront();}
	this.drag = function(x,y){ 
		if(Selected){ for(var a = 0; a < points.length; a++){this.shiftPoint(a,x,y);} } 
	}


}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/objects/shape/poly2.js loaded"); BootCount++;