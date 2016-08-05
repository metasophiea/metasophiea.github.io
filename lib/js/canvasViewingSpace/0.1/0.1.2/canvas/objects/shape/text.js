function text(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;} this.IDColour = IDtoColour(this.ID);
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = InputData.Adjusting;}else{this.Adjusting = false;}
	if(InputData.hasOwnProperty('StyleData')){var StyleData = InputData.StyleData;}else{var StyleData = {};}
	if(InputData.hasOwnProperty('InitialData')){var InitialData = InputData.InitialData;}else{var InitialData = {};}
// Values
	if(InputData.InitialData.hasOwnProperty('Center')){this.Center = InputData.InitialData.Center;}
	if(InputData.InitialData.hasOwnProperty('Angle')){this.Angle = InputData.InitialData.Angle;}else{this.Angle = 0;}
	if(InputData.InitialData.hasOwnProperty('Selected')){ var Selected = InputData.InitialData.Selected; }else{ var Selected = false; }

	if(InputData.StyleData.hasOwnProperty('Text')){this.Text = InputData.StyleData.Text;}else{this.Text = [];}
	if(InputData.StyleData.hasOwnProperty('Font')){this.Font = InputData.StyleData.Font;}else{this.Font = "Lucida Sans Unicode";}
	if(InputData.StyleData.hasOwnProperty('Size')){this.Size = InputData.StyleData.Size;}else{this.Size = 0;}
	if(InputData.StyleData.hasOwnProperty('Align')){this.Align = InputData.StyleData.Align.toLowerCase();}else{this.Align = "left";}
	if(InputData.StyleData.hasOwnProperty('LineSpacing')){this.LineSpacing = InputData.StyleData.LineSpacing;}else{this.LineSpacing = 1;}

	//Main colour
		if(InputData.StyleData.hasOwnProperty('R')){this.R = InputData.StyleData.R;}else{this.R = 0;}
		if(InputData.StyleData.hasOwnProperty('G')){this.G = InputData.StyleData.G;}else{this.G = 0;}
		if(InputData.StyleData.hasOwnProperty('B')){this.B = InputData.StyleData.B;}else{this.B = 0;}
		if(InputData.StyleData.hasOwnProperty('A')){this.A = InputData.StyleData.A;}else{this.A = 1;}
		this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')';
	//Outline colour
		if(InputData.StyleData.hasOwnProperty('Line_R')){this.Line_R = InputData.StyleData.Line_R;}else{this.Line_R = 0;}
		if(InputData.StyleData.hasOwnProperty('Line_G')){this.Line_G = InputData.StyleData.Line_G;}else{this.Line_G = 0;}
		if(InputData.StyleData.hasOwnProperty('Line_B')){this.Line_B = InputData.StyleData.Line_B;}else{this.Line_B = 0;}
		if(InputData.StyleData.hasOwnProperty('Line_A')){this.Line_A = InputData.StyleData.Line_A;}else{this.Line_A = 1;}
		this.LineColour = 'rgba('+this.Line_R+', '+this.Line_G+', '+this.Line_B+', '+this.Line_A+')';

	//Outline thickness
		if(InputData.StyleData.Thickness === 0 || !InputData.StyleData.hasOwnProperty('Thickness')){ this.LineColour = 'rgba(0,0,0,0)'; this.Thickness = 0;}
		else{this.Thickness = InputData.StyleData.Thickness;}

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.WhoAreYou = function(){return this;}
this.getID = function(){return this.ID;}
this.WhatAreYou = function(){return 'text_'+this.ID;}
this.PapersPlease = function(){return "I'm "+ this.ID +", I am Text and I say\n" + this.Text;}
this.shift = function(x,y){this.Center = [this.Center[0]+x,this.Center[1]+y];}
this.set = function(VariableName,NewValue){
	switch(VariableName){
		case "ID": this.ID = NewValue; break;
		case "R": this.R = NewValue; this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')'; break;
		case "G": this.G = NewValue; this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')'; break;
		case "B": this.B = NewValue; this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')'; break;
		case "A": this.A = NewValue; this.Colour = 'rgba('+this.R+', '+this.G+', '+this.B+', '+this.A+')'; break;
		case "center": this.Center = NewValue; break;
		case "height": this.Height = NewValue; break;
		case "width": this.Width = NewValue; break;
		case "angle": this.Angle = NewValue; break;
		case "URL": this.img.src = NewValue; break;
	}
	this.IDColour = IDtoColour(this.ID);
}

// Draw //
	this.draw = function(){
	//Create Size box
		var Height = CanvasLength(this.Size) + (this.Text.length-1)*CanvasLength(this.Size)*this.LineSpacing;
		var Width = 0; Viewport.measureText(this.Text[0]).width; for(var a = 0; a < this.Text.length; a++){if(Viewport.measureText(this.Text[a]).width > Width){Width = Viewport.measureText(this.Text[a]).width;}

		var realPosition = CanvasToViewport(this.Center[0],this.Center[1]);
		var Dimention = [CanvasLength(Width),CanvasLength(Height)];
		var objectReach = Math.pow((Math.pow(Dimention[0],2) + Math.pow(Dimention[1],2)),0.5);
		if( (realPosition[0]+objectReach) < 0 ){}
		else if( (realPosition[1]+objectReach) < 0 ){}
		else if( (realPosition[0]-objectReach) > ViewportElement.width ){}
		else if( (realPosition[1]-objectReach) > ViewportElement.height ){}
		else{ this.Draw_Viewport(realPosition); this.Draw_SelectionMatrix(realPosition); }
		}
	}
	this.Draw_Viewport = function(realPosition){
		Viewport.fillStyle = this.Colour;
		Viewport.strokeStyle = this.LineColour;
		Viewport.lineWidth = CanvasLength(this.Thickness);
		Viewport.font = CanvasLength(this.Size) + "px " + this.Font;
		Viewport.textAlign = this.Align;

		Viewport.save();
		Viewport.translate(realPosition[0],realPosition[1]);
		Viewport.rotate(-View.Angle-this.Angle);

		for(var a = 0; a < this.Text.length; a++){
			Viewport.fillText(this.Text[a],0,a*CanvasLength(this.Size)*this.LineSpacing);
			Viewport.strokeText(this.Text[a],0,a*CanvasLength(this.Size)*this.LineSpacing);
		}
		Viewport.restore();
	}
	this.Draw_SelectionMatrix = function(realPosition){
		SelectionMatrix.fillStyle = this.IDColour;
		SelectionMatrix.strokeStyle = this.IDColour;
		if(this.Thickness === 0){ 
			SelectionMatrix.strokeStyle = this.IDColour;
			SelectionMatrix.lineWidth = 0.5;
		}else{
			SelectionMatrix.strokeStyle = this.IDColour;
			SelectionMatrix.lineWidth = CanvasLength(this.Thickness);
		}
		SelectionMatrix.font = CanvasLength(this.Size) + "px " + this.Font;
		SelectionMatrix.textAlign = this.Align;

		SelectionMatrix.save();
		SelectionMatrix.translate(realPosition[0],realPosition[1]);
		SelectionMatrix.rotate(-View.Angle-this.Angle);

		for(var a = 0; a < this.Text.length; a++){
			SelectionMatrix.fillText(this.Text[a],0,a*CanvasLength(this.Size)*this.LineSpacing);
			SelectionMatrix.strokeText(this.Text[a],0,a*CanvasLength(this.Size)*this.LineSpacing);
		}
		SelectionMatrix.restore();
	}

// Mouse Methods //
	this.select = function(){
		if(!Selected){ console.log('select'); }
		Selected = true;
	}
	this.unselect = function(){
		if(Selected){ console.log('unselect'); }
		Selected = false;
	}	

	this.click = function(x,y){console.log(x+"|"+y);}
	this.drag = function(x,y){if(Selected){this.shift(x,y);}}
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/shape/text.js loaded"); BootCount++;