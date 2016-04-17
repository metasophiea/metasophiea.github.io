function image(ID, X, Y, StyleData, InitialData, Canvas, Adjusting){
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
	// More specific to this type of shape /////////////////////////////////////////////////////////////////////////////////////////////////
		if(InitialData.hasOwnProperty('Width')){this.Input.EndX = this.X + InitialData.Width;}
		if(InitialData.hasOwnProperty('Height')){this.Input.EndY = this.Y + InitialData.Height;}
	// Finishing ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if( (this.Input.EndX-this.Input.X) < 0 ){this.EndX = this.Input.X; this.X = this.Input.EndX;}else{this.EndX = this.Input.EndX; this.X = this.Input.X;}
		if( (this.Input.EndY-this.Input.Y) < 0 ){this.EndY = this.Input.Y; this.Y = this.Input.EndY;}else{this.EndY = this.Input.EndY; this.Y = this.Input.Y;}

		this.Width = this.EndX-this.X;
		this.Height = this.EndY-this.Y;
	// Imaging /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this.SubCanvasElement = document.createElement('canvas');
		this.SubCanvas = this.SubCanvasElement.getContext("2d");
		this.img = new Image();
		this.img.src = "https://fanart.tv/fanart/music/a173a2b0-a6c0-403b-911a-1d01c82918a6/albumcover/myst-iv-revelation-4e1e6ad73cb90.jpg";

		this.TotalCanvasWidthAndHeight = Math.pow((Math.pow(this.Height,2) + Math.pow(this.Width,2)),0.5);
// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.test = function(){console.log(this);}
	this.set = function(Input, Value){
		switch(Value){
			case "X": this.Input.X = Input; break;
			case "Y": this.Input.Y = Input; break;
			case "EndX": this.Input.EndX = Input; break;
			case "EndY": this.Input.EndY = Input; break;
			case "Angle": this.Angle = Input; break;	
			case "Image": this.img = Input; break;	
		}
		if( (this.Input.EndX-this.Input.X) < 0 ){this.EndX = this.Input.X; this.X = this.Input.EndX;}else{this.EndX = this.Input.EndX; this.X = this.Input.X;}
		if( (this.Input.EndY-this.Input.Y) < 0 ){this.EndY = this.Input.Y; this.Y = this.Input.EndY;}else{this.EndY = this.Input.EndY; this.Y = this.Input.Y;}

		this.Width = this.EndX-this.X;
		this.Height = this.EndY-this.Y;
	}

	this.StopAdjusting = function(){Adjusting = false; //Test to see if values are valid
		if( this.Width === 0 ){return false;}else if( this.Height === 0 ){return false;}
		return true;
	}

	this.UpdateImage = function(){
		//Gather together special vars
			var SpacingAngle = this.Angle;
			var X_Adjust = 0; var Y_Adjust = 0; 
			this.TotalCanvasWidthAndHeight = Math.pow((Math.pow(this.Height,2) + Math.pow(this.Width,2)),0.5);

		//Get a SpacingAngle that's between 0 and Pi/2
			while( SpacingAngle >= Math.PI/2 ){ SpacingAngle = SpacingAngle - Math.PI/2; }

		//Adjust height and width of SubCanvas
			this.SubCanvasElement.height = CanvasLength(Math.pow((Math.pow(this.Height,2) + Math.pow(this.Width,2)),0.5));
			this.SubCanvasElement.width = this.SubCanvasElement.height;
			if(this.SubCanvasElement.height > document.getElementById('MainCanvas').height){this.SubCanvasElement.height = document.getElementById('MainCanvas').height;}
			if(this.SubCanvasElement.width > document.getElementById('MainCanvas').width){this.SubCanvasElement.width = document.getElementById('MainCanvas').width;}

		//Check for cutoffs
			if( this.SubCanvasElement.height == document.getElementById('MainCanvas').height ){  
				Y_Adjust = -YPosition/ZoomAmount - this.Input.Y;
				if(Y_Adjust < 0 || Y_Adjust > this.TotalCanvasWidthAndHeight ){Y_Adjust = 0;}
			}this.Y = this.Input.Y + Y_Adjust;

			if( this.SubCanvasElement.width  == document.getElementById('MainCanvas').width  ){  
				X_Adjust = -XPosition/ZoomAmount - this.Input.X;
				if(X_Adjust < 0 || X_Adjust > this.TotalCanvasWidthAndHeight ){X_Adjust = 0;}
			}this.X = this.Input.X + X_Adjust;

		//Do the rotation
 	   		this.SubCanvas.save(); 
			this.SubCanvas.translate(CanvasLength(this.TotalCanvasWidthAndHeight/2-X_Adjust),CanvasLength(this.TotalCanvasWidthAndHeight/2-Y_Adjust));
    			this.SubCanvas.rotate(this.Angle);
			this.SubCanvas.drawImage(this.img,CanvasLength(-this.Width/2),CanvasLength(-this.Height/2),CanvasLength(this.Width),CanvasLength(this.Height));
			this.SubCanvas.restore();	
	}
	this.UpdateImage();

	this.Draw = function(){ //Check if object is within userview bounds (and don't render if not)
		if( this.X  <= (-XPosition+document.getElementById('MainCanvas').width)/ZoomAmount && this.Y <= (-YPosition+document.getElementById('MainCanvas').height)/ZoomAmount && (this.Input.Y + this.TotalCanvasWidthAndHeight > -YPosition/ZoomAmount) && (this.Input.X + this.TotalCanvasWidthAndHeight > -XPosition/ZoomAmount) ){
			this.UpdateImage();
			Canvas.drawImage(this.SubCanvasElement,CanvasX(this.X),CanvasY(this.Y),this.SubCanvasElement.width,this.SubCanvasElement.height);
		}
	}	
}
