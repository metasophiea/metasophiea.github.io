function poly(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = ID;}else{this.ID = 0;}
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = Adjusting;}else{this.Adjusting = false;}
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

		Canvas.beginPath();

		//var temp = CanvasAngle(CanvasX(this.Points[0][0]), CanvasY(this.Points[0][1]));
		//var temp = CanvasAngle(this.Points[0][0],this.Points[0][1]);
		//temp[0] = CanvasX(temp[0]); temp[1] = CanvasY(temp[1]); 
		var temp = CanvasToViewport(this.Points[0][0],this.Points[0][1]);
		Canvas.moveTo( temp[0],temp[1] );
		for(var a = 1; a < InitialData.Points.length; a++){
			//temp = CanvasAngle(CanvasX(this.Points[a][0]), CanvasY(this.Points[a][1]));
			//temp = CanvasAngle(this.Points[a][0],this.Points[a][1]);
			//temp[0] = CanvasX(temp[0]); temp[1] = CanvasY(temp[1]); 
			temp = CanvasToViewport(this.Points[a][0],this.Points[a][1]);
			Canvas.lineTo( temp[0],temp[1] );
		}

		Canvas.closePath();
 		Canvas.fill(); 
		Canvas.stroke();	
	}
}