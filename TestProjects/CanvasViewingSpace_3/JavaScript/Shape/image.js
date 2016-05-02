function image(InputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(InputData.hasOwnProperty('ID')){this.ID = InputData.ID;}else{this.ID = 0;}
	if(InputData.hasOwnProperty('Adjusting')){this.Adjusting = InputData.Adjusting;}else{this.Adjusting = false;}
	if(InputData.hasOwnProperty('StyleData')){var StyleData = InputData.StyleData;}else{var StyleData = {};}
	if(InputData.hasOwnProperty('InitialData')){var InitialData = InputData.InitialData;}else{var InitialData = {};}
// Values
	this.Input = {"TopLeft":[0,0], "BottomRight":[0,0], "Angle":0};
	if(InitialData.hasOwnProperty('TopLeft')){this.Input.TopLeft = InitialData.TopLeft;}
	if(InitialData.hasOwnProperty('BottomRight')){this.Input.BottomRight = InitialData.BottomRight;}
	if(InitialData.hasOwnProperty('Angle')){this.Input.Angle = InitialData.Angle;}
	this.width = this.Input.BottomRight[0] - this.Input.TopLeft[0];
	this.height = this.Input.BottomRight[1] - this.Input.TopLeft[1];

	this.SubCanvasElement = document.createElement('canvas');
	this.SubCanvasElement.setAttribute("id", "canvas1");					//
	document.getElementById("SubCanvases").appendChild(this.SubCanvasElement);	//
	this.SubCanvasElement = document.getElementById("canvas1");				//

	this.SubCanvas = this.SubCanvasElement.getContext("2d");
	this.img = new Image();
	if(StyleData.hasOwnProperty('URL')){this.img.src = StyleData.URL;}
	
// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.WhoAreYou = function(){return this;} 
	this.set = function(Input, Value){
		switch(Value){
			case "TopLeft": this.Input.TopLeft = Input; break;
			case "BottomRight": this.Input.BottomRight = Input; break;
			case "URL": this.img.src  = Input; break;
			case "Angle": this.Input.Angle = Input; break;
		}
	}

	this.UpdateImage = function(){
		//Gather together special vars
			var SpacingAngle = this.Input.Angle - View.Angle;
			X_Adjust = 0; Y_Adjust = 0; 
			this.TotalCanvasWidthAndHeight = Math.pow((Math.pow(this.height,2) + Math.pow(this.width,2)),0.5);
		//Get a SpacingAngle that's between 0 and Pi/2
			while( SpacingAngle >= Math.PI/2 ){ SpacingAngle = SpacingAngle - Math.PI/2; }
		//Adjust height and width of SubCanvas
			this.SubCanvasElement.height = CanvasLength(Math.pow((Math.pow(this.height,2) + Math.pow(this.width,2)),0.5));
			this.SubCanvasElement.width = this.SubCanvasElement.height;
			if(this.SubCanvasElement.height > document.getElementById('MainCanvas').height){this.SubCanvasElement.height = document.getElementById('MainCanvas').height;}
			if(this.SubCanvasElement.width > document.getElementById('MainCanvas').width){this.SubCanvasElement.width = document.getElementById('MainCanvas').width;}

		//Do the rotation
 	   		this.SubCanvas.save();
			this.SubCanvas.translate(CanvasLength(this.TotalCanvasWidthAndHeight/2-X_Adjust),CanvasLength(this.TotalCanvasWidthAndHeight/2-Y_Adjust));
	   		this.SubCanvas.rotate(this.Input.Angle - View.Angle);
			try{this.SubCanvas.drawImage(this.img,CanvasLength(-this.width/2),CanvasLength(-this.height/2),CanvasLength(this.width),CanvasLength(this.height));}catch(e){console.log("Image object " + this.ID + " - image not found, or not loaded");}
			this.SubCanvas.restore();	
	}
	this.UpdateImage();

	this.Draw = function(){
		this.UpdateImage();
		var Dis = Math.pow((Math.pow(this.SubCanvasElement.height/ZoomIndex[View.Zoom],2) + Math.pow(this.SubCanvasElement.width/ZoomIndex[View.Zoom],2)),0.5);

		var RealBottomRight = GetCartesian(View.Angle-Math.PI/4,Dis);
		var RealCentralPoint = [ this.Input.TopLeft[0]+(RealBottomRight[0]-this.Input.TopLeft[0])/2, this.Input.TopLeft[1]+(RealBottomRight[1]-this.Input.TopLeft[1])/2];		
		var RequiredCentralPoint = [ this.Input.TopLeft[0]+(this.Input.BottomRight[0]-this.Input.TopLeft[0])/2, this.Input.TopLeft[1]+(this.Input.BottomRight[1]-this.Input.TopLeft[1])/2];

		var AdjustBy = [RequiredCentralPoint[0]-RealCentralPoint[0],RequiredCentralPoint[1]-RealCentralPoint[1]];

		DrawingPoints = CanvasToViewport(this.Input.TopLeft[0]+AdjustBy[1],this.Input.TopLeft[1]+AdjustBy[0]);
		Canvas.drawImage(this.SubCanvasElement,DrawingPoints[0],DrawingPoints[1],this.SubCanvasElement.width,this.SubCanvasElement.height);
	}
}