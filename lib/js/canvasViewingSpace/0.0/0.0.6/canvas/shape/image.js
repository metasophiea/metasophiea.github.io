function image(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;} this.IDColour = IDtoColour(this.ID);
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
this.PapersPlease = function(){return "I'm "+ this.ID +" and I am an Image\nURL: " + this.img.src + "\nWidth & Height: " + this.Width + "&" + this.Height + "\nAngle: " + this.Angle}
this.set = function(VariableName,NewValue){
	switch(VariableName){
		case "ID": this.ID = NewValue; break;
		case "Center": this.Center = NewValue; break;
		case "Height": this.Height = NewValue; break;
		case "Width": this.Width = NewValue; break;
		case "Angle": this.Angle = NewValue; break;
		case "URL": this.img.src = NewValue; break;	
	}
	this.IDColour = IDtoColour(this.ID);
}

// Draw //
	this.Draw = function(){ 
		var realPosition = CanvasToViewport(this.Center[0],this.Center[1]);
		var HalfDimention = [CanvasLength(this.Width)/2,CanvasLength(this.Height)/2];
		var objectReach = Math.pow((Math.pow(HalfDimention[0],2) + Math.pow(HalfDimention[1],2)),0.5);

		if( (realPosition[0]+objectReach) < 0 ){}
		else if( (realPosition[1]+objectReach) < 0 ){}
		else if( (realPosition[0]-objectReach) > ViewportElement.width ){}
		else if( (realPosition[1]-objectReach) > ViewportElement.height ){}
		else{ this.Draw_Viewport(realPosition,HalfDimention); this.Draw_SelectionMatrix(realPosition,HalfDimention); }
	}
	this.Draw_Viewport = function(realPosition,HalfDimention){
 		Viewport.save();
		Viewport.translate(realPosition[0],realPosition[1]);
		Viewport.rotate(-View.Angle-this.Angle);
		try{Viewport.drawImage(this.img,-HalfDimention[0],-HalfDimention[1],2*HalfDimention[0],2*HalfDimention[1]);}
		catch(e){Viewport.fillStyle = "rgb(50,50,50)";Viewport.fillRect(-HalfDimention[0],-HalfDimention[1],2*HalfDimention[0],2*HalfDimention[1]);}
		Viewport.restore();
	}
	this.Draw_SelectionMatrix = function(realPosition,HalfDimention){
		SelectionMatrix.fillStyle = this.IDColour;
 		SelectionMatrix.save();
		SelectionMatrix.translate(realPosition[0],realPosition[1]);
		SelectionMatrix.rotate(-View.Angle-this.Angle);
		SelectionMatrix.fillRect(-HalfDimention[0],-HalfDimention[1],2*HalfDimention[0],2*HalfDimention[1]);
		SelectionMatrix.restore();
	}

// Mouse Methods //
	this.singleclick = function(event){
		console.log("click");
	}
	this.longclick = function(event){
		CreateWindowWithID(this.ID,"ImageData",event.clientX,event.clientY,{"Center":this.Center,"Height":this.Height,"Width":this.Width,"Angle":this.Angle,"URL":this.img.src});
	}
	this.clickanddrag = function(Start,End){
		console.log("Starting from X:" + Start[0] + " Y:" + Start[1] + " - Ending at X" + End[0] + " Y:" + End[1]);
	}
	this.wheel = function(data){
		if(data > 0){this.Center[1]+=10;}
		else{	this.Center[1]-=10;}
	}
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/shape/image.js loaded"); BootCount++;