function image2(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;}
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = InputData.Adjusting;}else{this.Adjusting = false;}
	if(InputData.hasOwnProperty('StyleData')){var StyleData = InputData.StyleData;}else{var StyleData = {};}
	if(InputData.hasOwnProperty('InitialData')){var InitialData = InputData.InitialData;}else{var InitialData = {};}
// Values
	if(InputData.InitialData.hasOwnProperty('CenterAnchor')){this.CenterAnchor = InputData.InitialData.CenterAnchor;}
	if(InputData.InitialData.hasOwnProperty('Height')){this.Height = InputData.InitialData.Height;}
	if(InputData.InitialData.hasOwnProperty('Width')){this.Width = InputData.InitialData.Width;}
	
// Sub canvas


	this.SubCanvasElement = document.createElement('canvas');
	this.SubCanvasElement.setAttribute("id", "canvas1");					//
	document.getElementById("SubCanvases").appendChild(this.SubCanvasElement);	//
	this.SubCanvasElement = document.getElementById("canvas1");				//

	this.SubCanvas = this.SubCanvasElement.getContext("2d");
	this.img = new Image();
	if(InputData.StyleData.hasOwnProperty('URL')){this.img.src = InputData.StyleData.URL;}else{Console.error("no URL for image object: " + this.ID);}

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.WhoAreYou = function(){return this;}
this.Set = function(Input,Value){
	switch(Value){
		case "CenterAnchor": this.CenterAnchor = Input; break;
		case "Height": this.Height = Input; break;
		case "Width": this.Width = Input; break;
		case "URL": this.img.src = Input; break;
	}
}

this.Draw = function(){ 
	//Adjust SubCanvas Size
		//Math.pow((Math.pow(this.Width/2,2) + Math.pow(this.Height/2,2)),0.5)/Math.sin(View.Angle);

		this.SubCanvasElement.width = this.Width;
		this.SubCanvasElement.height = this.Height;
	//Print SubCanvas
		this.SubCanvas.clearRect(0, 0, this.SubCanvasElement.width, this.SubCanvasElement.height);
   		this.SubCanvas.save();
		this.SubCanvas.translate(this.Width/2,this.Height/2);
   		this.SubCanvas.rotate(-View.Angle);
		this.SubCanvas.drawImage(this.img,-this.Width/2,-this.Height/2,this.Width,this.Height);
		this.SubCanvas.restore();


}
}