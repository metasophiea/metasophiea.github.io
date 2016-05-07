function image(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;}
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = InputData.Adjusting;}else{this.Adjusting = false;}
	if(InputData.hasOwnProperty('StyleData')){var StyleData = InputData.StyleData;}else{var StyleData = {};}
	if(InputData.hasOwnProperty('InitialData')){var InitialData = InputData.InitialData;}else{var InitialData = {};}
// Values
	if(InputData.InitialData.hasOwnProperty('Center')){this.Center = InputData.InitialData.Center;}
	if(InputData.InitialData.hasOwnProperty('Height')){this.Height = InputData.InitialData.Height;}else{this.Height = 0;}
	if(InputData.InitialData.hasOwnProperty('Width')){this.Width = InputData.InitialData.Width;}else{this.Width = 0;}
	if(InputData.InitialData.hasOwnProperty('Angle')){this.Angle = InputData.InitialData.Angle;}else{this.Angle = 0;}
// Image	
	this.img = new Image();
	if(InputData.StyleData.hasOwnProperty('URL')){this.img.src = InputData.StyleData.URL;}else{Console.error("no URL for image object: " + this.ID);}

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.WhoAreYou = function(){return this;}
this.Set = function(Input,Value){
	switch(Value){
		case "Center": this.Center = Input; break;
		case "Height": this.Height = Input; break;
		case "Width": this.Width = Input; break;
		case "Angle": this.Angle = Input; break;
		case "URL": this.img.src = Input; break;
	}
}

this.Draw = function(){ 
	var realPosition = CanvasToViewport(this.Center[0],this.Center[1]);
	var HalfDimention = [CanvasLength(this.Width)/2,CanvasLength(this.Height)/2];
	var objectReach = Math.pow((Math.pow(HalfDimention[0],2) + Math.pow(HalfDimention[1],2)),0.5);

	if( (realPosition[0]+objectReach) < 0 ){}
	else if( (realPosition[1]+objectReach) < 0 ){}
	else if( (realPosition[0]-objectReach) > document.getElementById('MainCanvas').width ){}
	else if( (realPosition[1]-objectReach) > document.getElementById('MainCanvas').height ){}
	else{
  	 	Canvas.save();
		Canvas.translate(realPosition[0],realPosition[1]);
		Canvas.rotate(-View.Angle-this.Angle);
		try{Canvas.drawImage(this.img,-HalfDimention[0],-HalfDimention[1],2*HalfDimention[0],2*HalfDimention[1]);}catch(e){console.error(e);}
		Canvas.restore();
	}
}
}