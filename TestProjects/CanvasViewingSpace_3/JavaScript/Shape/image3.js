function image3(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;}
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = InputData.Adjusting;}else{this.Adjusting = false;}
	if(InputData.hasOwnProperty('StyleData')){var StyleData = InputData.StyleData;}else{var StyleData = {};}
	if(InputData.hasOwnProperty('InitialData')){var InitialData = InputData.InitialData;}else{var InitialData = {};}
// Values
	if(InputData.InitialData.hasOwnProperty('CenterAnchor')){this.CenterAnchor = InputData.InitialData.CenterAnchor;}
	if(InputData.InitialData.hasOwnProperty('Height')){this.Height = InputData.InitialData.Height;}
	if(InputData.InitialData.hasOwnProperty('Width')){this.Width = InputData.InitialData.Width;}

// Image	
	this.img = new Image();
	if(InputData.StyleData.hasOwnProperty('URL')){this.img.src = InputData.StyleData.URL;}else{Console.error("no URL for image object: " + this.ID);}

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.WhoAreYou = function(){return this;}
this.Set = function(Input,Value){
	switch(Value){
		case "CenterAnchor": this.CenterAnchor = Input; break;
		case "Height": this.Height = Input; this.Dimentions[1] = CanvasLength(this.Height); break;
		case "Width": this.Width = Input; this.Dimentions[0] = CanvasLength(this.Width); break;
		case "URL": this.img.src = Input; break;
	}
}

this.Draw = function(){ 
	this.Dimentions = [CanvasLength(this.Width),CanvasLength(this.Height)];
	var WorkingAnchor = CanvasToViewport(this.CenterAnchor[0],this.CenterAnchor[1]);

   	Canvas.save();
	Canvas.translate(this.Dimentions[0]/2 + CanvasLength(WorkingAnchor[0]+View.Position[0]),this.Dimentions[1]/2 + CanvasLength(WorkingAnchor[1]+View.Position[1]));
   	Canvas.rotate(-View.Angle);
	try{Canvas.drawImage(this.img,-this.Dimentions[0]/2,-this.Dimentions[1]/2,this.Dimentions[0],this.Dimentions[1]);}catch(e){console.error(e);}
	Canvas.restore();
}
}
