function text(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;}
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = InputData.Adjusting;}else{this.Adjusting = false;}
	if(InputData.hasOwnProperty('StyleData')){var StyleData = InputData.StyleData;}else{var StyleData = {};}
	if(InputData.hasOwnProperty('InitialData')){var InitialData = InputData.InitialData;}else{var InitialData = {};}
// Values
	if(InputData.InitialData.hasOwnProperty('Center')){this.Center = InputData.InitialData.Center;}
	if(InputData.InitialData.hasOwnProperty('Angle')){this.Angle = InputData.InitialData.Angle;}else{this.Angle = 0;}

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
//Create Size box
	var Height = CanvasLength(this.Size) + (this.Text.length-1)*CanvasLength(this.Size)*this.LineSpacing;
	var Width = 0; Canvas.measureText(this.Text[0]).width; for(var a = 0; a < this.Text.length; a++){if(Canvas.measureText(this.Text[a]).width > Width){Width = Canvas.measureText(this.Text[a]).width;}}

	var realPosition = CanvasToViewport(this.Center[0],this.Center[1]);
	var Dimention = [CanvasLength(Width),CanvasLength(Height)];
	var objectReach = Math.pow((Math.pow(Dimention[0],2) + Math.pow(Dimention[1],2)),0.5);
	if( (realPosition[0]+objectReach) < 0 ){}
	else if( (realPosition[1]+objectReach) < 0 ){}
	else if( (realPosition[0]-objectReach) > document.getElementById('MainCanvas').width ){}
	else if( (realPosition[1]-objectReach) > document.getElementById('MainCanvas').height ){}
	else{
		Canvas.fillStyle = this.Colour;
		Canvas.strokeStyle = this.LineColour;
		Canvas.lineWidth = CanvasLength(this.Thickness);
		Canvas.font = CanvasLength(this.Size) + "px " + this.Font;
		Canvas.textAlign = this.Align;

 		Canvas.save();
		Canvas.translate(realPosition[0],realPosition[1]);
		Canvas.rotate(-View.Angle-this.Angle);

		for(var a = 0; a < this.Text.length; a++){
			Canvas.fillText(this.Text[a],0,a*CanvasLength(this.Size)*this.LineSpacing);
			Canvas.strokeText(this.Text[a],0,a*CanvasLength(this.Size)*this.LineSpacing);
		}
		Canvas.restore();
	}
}
}
