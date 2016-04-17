function line(ID, X, Y, StyleData, InitialData, Canvas, Adjusting){ //not for real use
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Standards ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this.ID = ID; this.Type = '';
		this.X = X; this.Y = Y;
		this.Adjusting = Adjusting; // is the object being adjusted
		if(InitialData.hasOwnProperty('EndX')){ this.EndX = InitialData.EndX;} else{ this.EndX = 0; }
		if(InitialData.hasOwnProperty('EndY')){ this.EndY = InitialData.EndY;} else{ this.EndY = 0; }
		this.Colour = 'rgba('+StyleData.R+', '+StyleData.G+', '+StyleData.B+', '+StyleData.A+')';

		//Handle Outlining
		if(StyleData.Thickness === 0 || !StyleData.hasOwnProperty('Thickness')){ this.LineColour = 'rgba(0,0,0,0)'; this.Thickness = 0;}
		else{ 
			this.Thickness = StyleData.Thickness; 
			this.LineColour = 'rgba('+StyleData.Line_R+', '+StyleData.Line_G+', '+StyleData.Line_B+', '+StyleData.Line_A+')';
		}

	// More specific to this shape /////////////////////////////////////////////////////////////////////////////////////////////////
	// Sub-shapes //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this.setEndX = function(X){this.EndX = X;}
		this.setEndY = function(Y){this.EndY = Y;}
		this.UpdateValues = function(){}
		this.UpdateValues();

		this.Update = function(){
			if(Object.keys(InitialData).length === 0){
				this.UpdateValues();
			}
		}

		this.E_RGBA = function(RGBA, Value){ //ExtractValueFromRGBA
			var OutputArray = RGBA.substring(5,RGBA.length-1).split(','); 
			switch(Value.toLowerCase()){ 
				case 'r': return OutputArray[0]; 
				case 'g': return OutputArray[1]; 
				case 'b': return OutputArray[2]; 
				case 'a': return OutputArray[3]; 
			} 
		}

		this.Draw = function(){ this.UpdateValues();
			if(this.Adjusting){ 
				Canvas.strokeStyle = this.Colour; 
			}
			else{ 
				Canvas.strokeStyle = this.Colour;
			}

			Canvas.beginPath();
			Canvas.lineWidth = CanvasLength(this.Thickness);
			Canvas.moveTo(CanvasX(this.X),CanvasY(this.Y));
			Canvas.lineTo(CanvasX(this.EndX),CanvasY(this.EndY));
 			Canvas.closePath();
			Canvas.stroke();

		}
	}
