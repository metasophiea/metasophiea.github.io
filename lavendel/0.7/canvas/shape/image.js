function image(InputData = {}){
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
this.WhatAreYou = function(){return 'image_'+this.ID;}
this.PapersPlease = function(){return "I'm "+ this.ID +" and I am an Image\nURL: " + this.img.src + "\nWidth & Height: " + this.Width + "&" + this.Height + "\nAngle: " + this.Angle}
this.shift = function(x,y){this.Position = [this.Position[0]+x,this.Position[1]+y];}
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
	this.draw = function(){
		var realPosition = CanvasToViewport(this.Position[0],this.Position[1]);
		var Dimention = [CanvasLength(this.Width),CanvasLength(this.Height)];
		var WindowLimits = GetWidthAndHeightOfViewport();

		var left = (this.Anchor[0]*Dimention[0]); var down = (this.Anchor[1]*Dimention[1]);
		var right = ((1-this.Anchor[0])*Dimention[0]); var up = ((1-this.Anchor[1])*Dimention[1]);

		var H = Math.pow((Math.pow(left,2) + Math.pow(down,2)),0.5); var greenangle = Math.atan(down/left)-this.Angle
		var TopLeft = [realPosition[0]-H*Math.cos(greenangle),realPosition[1]-H*Math.sin(greenangle)];
		var H = Math.pow((Math.pow(right,2) + Math.pow(down,2)),0.5); var greenangle = this.Angle-Math.atan(right/down);
		var TopRight = [realPosition[0]-H*Math.sin(greenangle), realPosition[1]-H*Math.cos(greenangle)];
		var H = Math.pow((Math.pow(right,2) + Math.pow(up,2)),0.5); var greenangle = this.Angle-Math.atan(up/right);
		var BottomRight = [realPosition[0]+H*Math.cos(greenangle),realPosition[1]-H*Math.sin(greenangle)];
		var H = Math.pow((Math.pow(left,2) + Math.pow(up,2)),0.5); var greenangle = Math.atan(left/up)-this.Angle;
		var BottomLeft = [realPosition[0]-H*Math.sin(greenangle),realPosition[1]+H*Math.cos(greenangle)];

		var count = [0,0];
		if(TopLeft[0] < 0){count[0]--;}else if(TopLeft[0] > WindowLimits[0]){count[0]++;}
		if(TopRight[0] < 0){count[0]--;}else if(TopRight[0] > WindowLimits[0]){count[0]++;}
		if(BottomRight[0] < 0){count[0]--;}else if(BottomRight[0] > WindowLimits[0]){count[0]++;}
		if(BottomLeft[0] < 0){count[0]--;}else if(BottomLeft[0] > WindowLimits[0]){count[0]++;}
		if(TopLeft[1] < 0){count[1]--;}else if(TopLeft[1] > WindowLimits[1]){count[1]++;}
		if(TopRight[1] < 0){count[1]--;}else if(TopRight[1] > WindowLimits[1]){count[1]++;}
		if(BottomRight[1] < 0){count[1]--;}else if(BottomRight[1] > WindowLimits[1]){count[1]++;}
		if(BottomLeft[1] < 0){count[1]--;}else if(BottomLeft[1] > WindowLimits[1]){count[1]++;}

		if(Math.abs(count[0]) == 4 || Math.abs(count[1]) == 4){}
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
	this.select = function(type){}
	this.unselect = function(type){}
	this.click = function(x,y){}
	this.doubleclick = function(x,y){}
	this.pass = function(x,y){}
	this.drag = function(x,y){this.shift(x,y);}
	this.passout = function(){}
	this.out = function(){}
	this.wheel = function(a){}
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/shape/image.js loaded"); BootCount++;
