function poly(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;}
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = InputData.Adjusting;}else{this.Adjusting = false;}
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
	this.set = function(Input, Value){
		switch(Value){
			case "Colour": this.Colour = Input; break;
			case "LineColour": this.LineColour = Input; break;
			case "Thickness": this.Thickness = Input; break;	
		}
	}

	this.displayPoints = function(){return this.Points;}
	this.addPoint = function(Data){this.Points.push(Data);}
	this.setPoint = function(PointNumber, Data){this.Points[PointNumber] = Data;}
	this.removePoint = function(PointNumber){this.Points = this.Points.splice(PointNumber, 1);}
	this.replacePoints = function(NewPoints){this.Points = NewPoints;}
	
	this.Draw = function(){
		Canvas.fillStyle = this.Colour;
		Canvas.strokeStyle = this.LineColour;
		Canvas.lineWidth = CanvasLength(this.Thickness);

	//Develop Viewport points, and test whether these points are within the viewport's range, or if the shape stretches accross the viewport
		var DrawingPoints = []; var UnvisibleCount = [0,0];
		for(var a = 0; a < InitialData.Points.length; a++){
			DrawingPoints[a] = CanvasToViewport(this.Points[a][0],this.Points[a][1]);

			if( DrawingPoints[a][0] < 0 ){UnvisibleCount[0]++;}
			else if( (document.getElementById('MainCanvas').width-DrawingPoints[a][0]) < 0 ){UnvisibleCount[0]--;}
			if( DrawingPoints[a][1] < 0 ){UnvisibleCount[1]++;}
			else if( (document.getElementById('MainCanvas').height-DrawingPoints[a][1]) < 0 ){UnvisibleCount[1]--;}
		}

	//Assuming at least one point is within range; draw the object
		if(UnvisibleCount[0] < DrawingPoints.length && UnvisibleCount[1] < DrawingPoints.length && UnvisibleCount[0] > -DrawingPoints.length && UnvisibleCount[1] > -DrawingPoints.length){
			Canvas.beginPath(); Canvas.moveTo( DrawingPoints[0][0],DrawingPoints[0][1] );
			for(var a = 1; a < DrawingPoints.length; a++){ Canvas.lineTo( DrawingPoints[a][0],DrawingPoints[a][1] ); }
			Canvas.closePath(); Canvas.fill(); Canvas.stroke();	
		}
	}
}