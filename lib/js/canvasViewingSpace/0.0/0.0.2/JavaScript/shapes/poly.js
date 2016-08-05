function poly(ID, StyleData, InitialData, Canvas, Adjusting){
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.ID = ID; this.Adjusting = Adjusting;
	this.Points = [];
	for(var a = 0; a < InitialData.Points.length; a++){
		this.Points.push(InitialData.Points[a]);
	}

	//Style
		this.Colour = 'rgba('+StyleData.R+', '+StyleData.G+', '+StyleData.B+', '+StyleData.A+')';
		this.LineColour = 'rgba('+StyleData.Line_R+', '+StyleData.Line_G+', '+StyleData.Line_B+', '+StyleData.Line_A+')';
		if(StyleData.Thickness === 0 || !StyleData.hasOwnProperty('Thickness')){ this.LineColour = 'rgba(0,0,0,0)'; this.Thickness = 0;}
		else{this.Thickness = StyleData.Thickness; this.LineColour = 'rgba('+StyleData.Line_R+', '+StyleData.Line_G+', '+StyleData.Line_B+', '+StyleData.Line_A+')';}
// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.test = function(){console.log(this);}
	this.set = function(Input, Value){
		switch(Value){
			case "Colour": this.Colour = Input; break;
			case "LineColour": this.LineColour = Input; break;
			case "Thickness": this.Thickness = Input; break;	
		}
	}

	this.setPoint = function(PointNumber, Data){this.Points[PointNumber] = Data;}
	this.removePoint = function(PointNumber){this.Points = this.Points.splice(PointNumber, 1);}
	this.LoadNewPoints = function(NewPoints){this.Points = NewPoints;}
	this.E_RGBA = function(RGBA, Value){ //ExtractValueFromRGBA
		var OutputArray = RGBA.substring(5,RGBA.length-1).split(',');
		switch(Value.toLowerCase()){
			case 'r': return OutputArray[0];
			case 'g': return OutputArray[1];
			case 'b': return OutputArray[2];
			case 'a': return OutputArray[3];
		}
	}

	this.Draw = function(){
		Canvas.fillStyle = this.Colour;
		Canvas.strokeStyle = this.LineColour;
		Canvas.lineWidth = CanvasLength(this.Thickness);

		Canvas.beginPath();
		Canvas.moveTo(CanvasX( this.Points[0][0] ),CanvasY( this.Points[0][1] ));
		for(var a = 1; a < InitialData.Points.length; a++){
			Canvas.lineTo(CanvasX( this.Points[a][0] ),CanvasY( this.Points[a][1] ));
		}

 		Canvas.closePath();
 		Canvas.fill(); 
		Canvas.stroke();	
	}
}
