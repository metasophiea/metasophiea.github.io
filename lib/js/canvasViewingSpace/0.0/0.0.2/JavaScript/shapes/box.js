function box(ID, X, Y, StyleData, InitialData, Canvas, Adjusting){
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Standards ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this.ID = ID;
		this.Adjusting = Adjusting;
		//Positions
			this.Input = {"X":X, "Y":Y, "EndX":X, "EndY":Y};
			this.X = this.Input.X; this.Y = this.Input.Y; 
			if(InitialData.hasOwnProperty('EndX')){this.Input.EndX = InitialData.EndX;}
			if(InitialData.hasOwnProperty('EndY')){this.Input.EndY = InitialData.EndY;}
			if(InitialData.hasOwnProperty('Angle')){this.Angle = InitialData.Angle;}else{this.Angle = 0;}
			if(InitialData.hasOwnProperty('AnchorX')){this.AnchorX = InitialData.AnchorX;}else{this.AnchorX = 0;}
			if(InitialData.hasOwnProperty('AnchorY')){this.AnchorY = InitialData.AnchorY;}else{this.AnchorY = 0;}
	// More specific to this shape /////////////////////////////////////////////////////////////////////////////////////////////////
		var Points = [[0,0],[0,0],[0,0],[0,0]];
		if(InitialData.hasOwnProperty('Width')){this.Input.EndX = this.X + InitialData.Width;}
		if(InitialData.hasOwnProperty('Height')){this.Input.EndY = this.Y + InitialData.Height;}
	// Sub-shapes //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this.poly = new poly(0, StyleData, {'Points':[[this.X, this.Y],[this.EndX, this.Y],[this.EndX, this.EndY],[this.X, this.EndY]]}, Canvas, Adjusting);		
	// Finishing ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if( (this.Input.EndX-this.Input.X) < 0 ){this.EndX = this.Input.X; this.X = this.Input.EndX;}else{this.EndX = this.Input.EndX; this.X = this.Input.X;}
		if( (this.Input.EndY-this.Input.Y) < 0 ){this.EndY = this.Input.Y; this.Y = this.Input.EndY;}else{this.EndY = this.Input.EndY; this.Y = this.Input.Y;}

		this.Width = this.EndX-this.X;
		this.Height = this.EndY-this.Y;
// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.test = function(){console.log(this);}
	this.set = function(Input, Value){
		switch(Value){
			case "X": this.Input.X = Input; break;
			case "Y": this.Input.Y = Input; break;
			case "EndX": this.Input.EndX = Input; break;
			case "EndY": this.Input.EndY = Input; break;
			case "AnchorX": this.AnchorX = Input; break;
			case "AnchorY": this.AnchorY = Input; break;
			case "Angle": this.Angle = Input; break;		
			case "Colour": this.poly.set(Input, "Colour"); break;
			case "LineColour": this.poly.set(Input, "LineColour"); break;
			case "Thickness": this.poly.set(Input, "Thickness"); break;	
		}
		if( (this.Input.EndX-this.Input.X) < 0 ){this.EndX = this.Input.X; this.X = this.Input.EndX;}else{this.EndX = this.Input.EndX; this.X = this.Input.X;}
		if( (this.Input.EndY-this.Input.Y) < 0 ){this.EndY = this.Input.Y; this.Y = this.Input.EndY;}else{this.EndY = this.Input.EndY; this.Y = this.Input.Y;}

		this.Width = this.EndX-this.X;
		this.Height = this.EndY-this.Y;

		this.CalculatePoints();
	}

	this.CalculatePoints = function(){	
		//Gather together useful values
			if(typeof this.AnchorX == "string"){this.AnchorX = this.X+parseFloat(this.AnchorX)*this.Width;}
			if(typeof this.AnchorY == "string"){this.AnchorY = this.Y+parseFloat(this.AnchorY)*this.Height;}
			var InitialPoints = [[(this.X-this.AnchorX),(this.AnchorY-this.Y)], [(this.EndX-this.AnchorX),(this.AnchorY-this.Y)],[(this.EndX-this.AnchorX),(this.AnchorY-this.EndY)],[(this.X-this.AnchorX),(this.AnchorY-this.EndY)]];

		//Get Polar for each point relitive to anchor on shape //angle|distance// then do quick test and adjust for points left of center
			for(var a = 0; a < 4; a++){
				Points[a] = [-Math.atan( InitialPoints[a][1] / InitialPoints[a][0] ), Math.pow(Math.pow(InitialPoints[a][0],2)+Math.pow(InitialPoints[a][1],2),0.5) ];
				if( InitialPoints[a][0] < 0 ){ Points[a][1] = -Points[a][1]; } 
			}

		//Adjust for angle, convert Polar back to cartesian and give the points to the poly object
			for(var a = 0; a < 4; a++){ 
				if(isNaN(Points[a][0])){Points[a][0] = 0;}
				Points[a][0] = Points[a][0] + this.Angle; 
				this.poly.setPoint(a,[(this.AnchorX + Points[a][1]*Math.cos(Points[a][0])),(this.AnchorY + Points[a][1]*Math.sin(Points[a][0]))]);
			}
	}
	this.CalculatePoints();

	this.E_RGBA = function(RGBA, Value){ //ExtractValueFromRGBA
		var OutputArray = RGBA.substring(5,RGBA.length-1).split(',');
		switch(Value.toLowerCase()){
			case 'r': return OutputArray[0];
			case 'g': return OutputArray[1];
			case 'b': return OutputArray[2];
			case 'a': return OutputArray[3];
		}
	}

	this.StopAdjusting = function(){Adjusting = false; //Test to see if values are valid
		if( this.Width === 0 ){return false;} 
		else if( this.Height === 0 ){return false;}
		return true;
	}

	this.Draw = function(){
		this.poly.Draw();
	}
}
