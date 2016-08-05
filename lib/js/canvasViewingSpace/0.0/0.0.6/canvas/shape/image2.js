function image2(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;} this.IDColour = IDtoColour(this.ID);
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = InputData.Adjusting;}else{this.Adjusting = false;}
	if(InputData.hasOwnProperty('StyleData')){var StyleData = InputData.StyleData;}else{var StyleData = {};}
	if(InputData.hasOwnProperty('InitialData')){var InitialData = InputData.InitialData;}else{var InitialData = {};}
// Values
	if(InputData.InitialData.hasOwnProperty('Position')){this.Position = InputData.InitialData.Position;}
	if(InputData.InitialData.hasOwnProperty('Anchor')){this.Anchor = InputData.InitialData.Anchor;}
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
		case "position": this.Position = NewValue; break;
		case "anchor": this.Anchor = NewValue; break;
		case "height": this.Height = NewValue; break;
		case "width": this.Width = NewValue; break;
		case "angle": this.Angle = NewValue; break;
		case "URL": this.img.src = NewValue; break;	
	}
	this.IDColour = IDtoColour(this.ID);
}

// Draw //
	this.Draw = function(){ 
		var realPosition = CanvasToViewport(this.Position[0],this.Position[1]);
		var Dimention = [CanvasLength(this.Width),CanvasLength(this.Height)];
		var BoundingPoints = [	[(this.Position[0]-(this.Width*this.Anchor[0])*Math.cos(this.Angle)-(this.Height*this.Anchor[1])*Math.sin(this.Angle)),    (this.Position[1]+(this.Width*this.Anchor[0])*Math.sin(this.Angle)-(this.Height*this.Anchor[1])*Math.cos(this.Angle))],
						[(this.Position[0]+(this.Width*(1-this.Anchor[0]))*Math.cos(this.Angle)-(this.Height*this.Anchor[1])*Math.sin(this.Angle)),(this.Position[1]-(this.Width*(1-this.Anchor[0]))*Math.sin(this.Angle)-(this.Height*this.Anchor[1])*Math.cos(this.Angle))],
						[(this.Position[0]+(this.Width*(1-this.Anchor[0]))*Math.cos(this.Angle)+(this.Height*(1-this.Anchor[1]))*Math.sin(this.Angle)),(this.Position[1]-(this.Width*(1-this.Anchor[0]))*Math.sin(this.Angle)+(this.Height*(1-this.Anchor[1]))*Math.cos(this.Angle))],
						[(this.Position[0]-(this.Width*this.Anchor[0])*Math.cos(this.Angle)+(this.Height*(1-this.Anchor[1]))*Math.sin(this.Angle)),(this.Position[1]+(this.Width*this.Anchor[0])*Math.sin(this.Angle)+(this.Height*(1-this.Anchor[1]))*Math.cos(this.Angle))]];

		var count = [0,0]; var WindowLimits = GetWidthAndHeightOfViewport();
		for(var a = 0; a < BoundingPoints.length; a++){
			if(BoundingPoints[a][0]+View.Position[0] < 0){count[0]--;}
			else if(BoundingPoints[a][0]+View.Position[0] > WindowLimits[0]){count[0]++;}
			if(BoundingPoints[a][1]+View.Position[1] < 0){count[1]--;}
			else if(BoundingPoints[a][1]+View.Position[1] > WindowLimits[1]){count[1]++;}		
		}

		if(count[0] == -4 || count[1] == -4 || count[0] == 4 || count[1] == 4 ){}
		else{this.Draw_Viewport(realPosition,Dimention); this.Draw_SelectionMatrix(realPosition,Dimention);}
	}
	this.Draw_Viewport = function(realPosition,Dimention){
		Viewport.save();
		Viewport.translate(realPosition[0],realPosition[1]);
		Viewport.rotate(-View.Angle-this.Angle);
		try{Viewport.drawImage(this.img,-this.Anchor[0]*Dimention[0],-this.Anchor[1]*Dimention[1],Dimention[0],Dimention[1]);}
		catch(e){Viewport.fillStyle = "rgb(50,50,50)";Viewport.fillRect(-this.Anchor[0]*Dimention[0],-this.Anchor[1]*Dimention[1],Dimention[0],Dimention[1]);}
		Viewport.restore();
	}
	this.Draw_SelectionMatrix = function(realPosition,Dimention){
		SelectionMatrix.fillStyle = this.IDColour;
		SelectionMatrix.save();
		SelectionMatrix.translate(realPosition[0],realPosition[1]);
		SelectionMatrix.rotate(-View.Angle-this.Angle);
		SelectionMatrix.fillRect(-this.Anchor[0]*Dimention[0],-this.Anchor[1]*Dimention[1],Dimention[0],Dimention[1]);
		SelectionMatrix.restore();
	}

// Mouse Methods //
	this.singleclick = function(event){
		console.log("click");
	}
	this.longclick = function(event){
		console.log("longclick");
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
console.log("-> ./canvas/shape/image2.js loaded"); BootCount++;
