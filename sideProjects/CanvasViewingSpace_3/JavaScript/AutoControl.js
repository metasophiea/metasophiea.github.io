function AutoControl(){
	if(ActiveViewportMovementScript.Position.length != 0){
		View.Position[0] = View.Position[0] - (ActiveViewportMovementScript.Position[0][0] - ViewportPointsAt(0.5,0.5)[0]); 
		View.Position[1] = View.Position[1] - (ActiveViewportMovementScript.Position.shift()[1] - ViewportPointsAt(0.5,0.5)[1]); 
		SpinViewPort(0.5,0.5,ActiveViewportMovementScript.Angle.shift());	
		DirectControlZoom_WithViewportPosition(ActiveViewportMovementScript.Zoom.shift(),0.5,0.5);
	}else{}
}

function GetStartPosition(){
	if(ActiveViewportMovementScript.Position.length === 0){ 
		return {"Position":ViewportPointsAt(0.5,0.5), "Zoom":View.Zoom, "Angle":View.Angle}; 
	}
	else{ return {"Position":ActiveViewportMovementScript.Position[ActiveViewportMovementScript.Position-1], "Zoom":ActiveViewportMovementScript.Zoom[ActiveViewportMovementScript.Zoom-1], "Angle":ActiveViewportMovementScript.Angle[ActiveViewportMovementScript.Angle-1]}; }
}

function CreatePathTo(InputData = {}){
	if(InputData.hasOwnProperty('X')){var X = InputData.X;}else{var X = View.Position[0] + ViewportLength(window.innerWidth)/2;}
	if(InputData.hasOwnProperty('Y')){var Y = InputData.Y;}else{var Y = View.Position[1] + ViewportLength(window.innerHeight)/2;}
	if(InputData.hasOwnProperty('Zoom')){var Zoom = InputData.Zoom;}else{var Zoom = View.Zoom;}
	if(InputData.hasOwnProperty('Angle')){var Angle = InputData.Angle;}else{var Angle = View.Angle;}
	if(InputData.hasOwnProperty('MoveType')){var MoveType = InputData.MoveType;}else{var MoveType = "none";}
	if(InputData.hasOwnProperty('Duration')){var Duration = InputData.Duration;}else{var Duration = 1;}
	var Start = GetStartPosition(); var End = {"Position":[X,Y], "Zoom":Zoom, "Angle":Angle};
	var ProducedArray = {"Position":[], "Angle":[], "Zoom":[] };
	var Steps = Duration*ActiveViewportMovementRefreshPerSecond;

//	console.log("Starting from: XY " + Start.Position +" | Zoom "+ Start.Zoom +" | Angle "+ Start.Angle);
//	console.log("Ending at: XY " + End.Position +" | Zoom "+ End.Zoom +" | Angle "+ End.Angle);

	switch(MoveType){ 
		case "cosin":
			var X_Diff = End.Position[0]-Start.Position[0]; var Y_Diff = End.Position[1]-Start.Position[1];
			var Zoom_Diff = ZoomIndex[End.Zoom]-ZoomIndex[Start.Zoom]; var Angle_Diff = End.Angle-Start.Angle;
			var calc = 0;

			for(var a = 1; a < Steps/2; a++){ 
				calc = Math.cos((Math.PI/2)*(2*a/Steps));
				ProducedArray.Position.push([Start.Position[0]+(X_Diff - X_Diff*calc)/2,Start.Position[1]+(Y_Diff - Y_Diff*calc)/2]);
				ProducedArray.Zoom.push(ZoomIndex[Start.Zoom]+(Zoom_Diff - Zoom_Diff*calc)/2);
				ProducedArray.Angle.push(Start.Angle+(Angle_Diff - Angle_Diff*calc)/2);  	
			}	
			for(var a = Steps/2; a < Steps-1; a++){ 	
				calc = Math.sin((2*(a-Steps/2)/Steps)*(Math.PI/2));
				ProducedArray.Position.push([(Start.Position[0]+ X_Diff/2 + (X_Diff*calc)/2),(Start.Position[1]+ Y_Diff/2 + (Y_Diff*calc)/2)]);
				ProducedArray.Zoom.push(ZoomIndex[Start.Zoom] + Zoom_Diff/2 + (Zoom_Diff*calc)/2);
				ProducedArray.Angle.push(Start.Angle + Angle_Diff/2 + (Angle_Diff*calc)/2); 
			}
		break;

		case "sin":
			var X_Diff = End.Position[0]-Start.Position[0]; var Y_Diff = End.Position[1]-Start.Position[1];
			var Zoom_Diff = ZoomIndex[End.Zoom]-ZoomIndex[Start.Zoom]; var Angle_Diff = End.Angle-Start.Angle;
			var calc = 0;

			for(var a = 0; a <= Steps-1; a++){
				calc = Math.sin((Math.PI/2)*(a/Steps));
				ProducedArray.Position.push([(Start.Position[0]+X_Diff*calc),(Start.Position[1]+Y_Diff*calc)]);
				ProducedArray.Zoom.push(ZoomIndex[Start.Zoom]+Zoom_Diff*calc);
				ProducedArray.Angle.push(Start.Angle+Angle_Diff*calc);
			}
		break;

		case "linear": //Create simple slide to location
			var Xstep = (End.Position[0]-Start.Position[0])/Steps; var Ystep = (End.Position[1]-Start.Position[1])/Steps;
			var Zoomstep = (ZoomIndex[End.Zoom]-ZoomIndex[Start.Zoom])/Steps; var Anglestep = (End.Angle-Start.Angle)/Steps;
			Start.Zoom = ZoomIndex[Start.Zoom];

			ProducedArray.Position.push([Start.Position[0],Start.Position[1]]);
			ProducedArray.Zoom.push(Start.Zoom);
			ProducedArray.Angle.push(Start.Angle);
			for(var a = 0; a <= Steps-1; a++){
				Start.Position[0] += Xstep; Start.Position[1] += Ystep;
				Start.Zoom += Zoomstep;
				Start.Angle += Anglestep;
				
				ProducedArray.Position.push([Start.Position[0],Start.Position[1]]);	
				ProducedArray.Zoom.push(Start.Zoom);
				ProducedArray.Angle.push(Start.Angle);	
			}			
		break;
		case "none": default: //Create simple jump-cut to location
			for(var a = 0; a < steps; a++){
				ProducedArray.Position.push(End.Position);
				ProducedArray.Zoom.push(End.Zoom);
				ProducedArray.Angle.push(End.Angle);
			}
		break;
	}

	//paste to ActiveViewportMovementScript
	for(var a = 0; a < ProducedArray.Position.length; a++){
		ActiveViewportMovementScript.Position[ActiveViewportMovementScript.Position.length] = ProducedArray.Position[a];
		ActiveViewportMovementScript.Zoom[ActiveViewportMovementScript.Zoom.length] = ProducedArray.Zoom[a];
		ActiveViewportMovementScript.Angle[ActiveViewportMovementScript.Angle.length] = ProducedArray.Angle[a];
	}
}