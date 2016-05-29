function poly(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;} this.IDColour = IDtoColour(this.ID);
	if(InputData.hasOwnProperty('Selected')){this.Selected = InputData.Selected;}else{this.Selected = false;}
	if(InputData.hasOwnProperty('StyleData')){var StyleData = InputData.StyleData;}else{var StyleData = {};}
	if(InputData.hasOwnProperty('InitialData')){var InitialData = InputData.InitialData;}else{var InitialData = {};}
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.Points = [];
	if(InitialData.hasOwnProperty('Points')){
		for(var a = 0; a < InitialData.Points.length; a++){ this.Points.push(InitialData.Points[a]); }
	}	

	//Style
		//Main colour
		if(StyleData.hasOwnProperty('R')){this.R = StyleData.R;}else{this.R = 0;}
		if(StyleData.hasOwnProperty('G')){this.G = StyleData.G;}else{this.G = 0;}
		if(StyleData.hasOwnProperty('B')){this.B = StyleData.B;}else{this.B = 0;}
		if(StyleData.hasOwnProperty('A')){this.A = StyleData.A;}else{this.A = 1;}
		this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')';

		//Outline colour
		if(StyleData.hasOwnProperty('Line_R')){this.Line_R = StyleData.Line_R;}else{this.Line_R = 0;}
		if(StyleData.hasOwnProperty('Line_G')){this.Line_G = StyleData.Line_R;}else{this.Line_G = 0;}
		if(StyleData.hasOwnProperty('Line_B')){this.Line_B = StyleData.Line_R;}else{this.Line_B = 0;}
		if(StyleData.hasOwnProperty('Line_A')){this.Line_A = StyleData.Line_A;}else{this.Line_A = 0;}
		this.LineColour = 'rgba('+this.Line_R+', '+this.Line_G+', '+this.Line_B+', '+this.Line_A+')';

		//Outline thickness
		if(StyleData.Thickness === 0 || !StyleData.hasOwnProperty('Thickness')){ this.LineColour = 'rgba(0,0,0,0)'; this.Thickness = 0;}
		else{this.Thickness = StyleData.Thickness; this.LineColour = 'rgba('+StyleData.Line_R+', '+StyleData.Line_G+', '+StyleData.Line_B+', '+StyleData.Line_A+')';}

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.WhoAreYou = function(){return this;}
this.PapersPlease = function(){return "I'm "+ this.ID +" and I am a Poly\nPoints: " + this.Points + "\nMain Colour: " + this.Colour + "\nOutline Colour: " + this.LineColour}
this.displayPoints = function(){return this.Points;}
this.displayPoint = function(PointNumber){return this.Points[PointNumber];}
this.addPoint = function(NewPoint){this.Points.push(NewPoint);}
this.setPoint = function(PointNumber,NewPoint){if(NewPoint > this.Points.length){console.error("Poly.setPoint - PointNumber unreachable"); return;} this.Points[NewPoint] = NewPoint;}
this.removePoint = function(PointNumber){if(NewPoint > this.Points.length){console.error("Poly.removePoint - PointNumber unreachable"); return;}this.Points = this.Points.splice(PointNumber,1);}
this.replacePoints = function(NewPoints){this.Points = NewPoints;}
this.set = function(VariableName,NewValue){
	switch(VariableName){
		case "ID": this.ID = NewValue; break;
		case "R": this.R = NewValue; this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')'; break;
		case "G": this.G = NewValue; this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')'; break;
		case "B": this.B = NewValue; this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')'; break;
		case "A": this.A = NewValue; this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')'; break;
		case "Colour": this.Colour = Input; break;
		case "LineColour": this.LineColour = Input; break;
		case "Thickness": this.Thickness = Input; if(this.Thickness === 0){this.LineColour = 'rgba(0,0,0,0)';} break;		
	}
	this.IDColour = IDtoColour(this.ID);
}	
this.Draw = function(){
	//Develop Viewport points, and test whether these points are within the viewport's range, or if the shape stretches accross the viewport
		var DrawingPoints = []; var UnvisibleCount = [0,0];
		for(var a = 0; a < InitialData.Points.length; a++){
			DrawingPoints[a] = CanvasToViewport(this.Points[a][0],this.Points[a][1]);

			if( DrawingPoints[a][0] < 0 ){UnvisibleCount[0]++;} else if( (ViewportElement.width-DrawingPoints[a][0]) < 0 ){UnvisibleCount[0]--;}
			if( DrawingPoints[a][1] < 0 ){UnvisibleCount[1]++;} else if( (ViewportElement.height-DrawingPoints[a][1]) < 0 ){UnvisibleCount[1]--;}
		}
	//Assuming at least one point is within range; draw the object
		if(UnvisibleCount[0] < DrawingPoints.length && UnvisibleCount[1] < DrawingPoints.length && UnvisibleCount[0] > -DrawingPoints.length && UnvisibleCount[1] > -DrawingPoints.length){
			this.Draw_Viewport(DrawingPoints); this.Draw_SelectionMatrix(DrawingPoints);
		}
}

this.Draw_Viewport = function(DrawingPoints){
	Viewport.fillStyle = this.Colour;
	Viewport.strokeStyle = this.LineColour;
	Viewport.lineWidth = CanvasLength(this.Thickness);
	Viewport.beginPath(); Viewport.moveTo( DrawingPoints[0][0],DrawingPoints[0][1] );
	for(var a = 1; a < DrawingPoints.length; a++){ Viewport.lineTo( DrawingPoints[a][0],DrawingPoints[a][1] ); }
	Viewport.closePath(); Viewport.fill(); Viewport.stroke();
}
this.Draw_SelectionMatrix = function(DrawingPoints){
	SelectionMatrix.fillStyle = this.IDColour;
	if(this.Thickness === 0){ 
		SelectionMatrix.strokeStyle = this.IDColour;
		SelectionMatrix.lineWidth = 0.5;
	}else{
		SelectionMatrix.strokeStyle = this.IDColour;
		SelectionMatrix.lineWidth = CanvasLength(this.Thickness);
	}
	SelectionMatrix.beginPath(); SelectionMatrix.moveTo( DrawingPoints[0][0],DrawingPoints[0][1] );
	for(var a = 1; a < DrawingPoints.length; a++){ SelectionMatrix.lineTo( DrawingPoints[a][0],DrawingPoints[a][1] ); }
	SelectionMatrix.closePath(); SelectionMatrix.fill(); SelectionMatrix.stroke();
}
this.SingleClick = function(){
	this.set("R",Math.floor(Math.random()*255));
	this.set("G",Math.floor(Math.random()*255));
	this.set("B",Math.floor(Math.random()*255));
}

this.LongClick = function(){
	this.set("R",100);
	this.set("G",100);
	this.set("B",100);
}

this.Wheel = function(data){
	console.log(data);
}

}





// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Canvas/Shapes/ploy.js loaded"); BootCount++;