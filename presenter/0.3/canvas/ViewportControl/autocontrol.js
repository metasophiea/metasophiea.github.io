function AutoControl(){
	if(ActiveViewportMovementScript.position.length != 0){
		view.position[0] = view.position[0] - (ActiveViewportMovementScript.position[0][0] - ViewportPointsAt(0.5,0.5)[0]); 
		view.position[1] = view.position[1] - (ActiveViewportMovementScript.position.shift()[1] - ViewportPointsAt(0.5,0.5)[1]); 
		SpinViewPort(0.5,0.5,ActiveViewportMovementScript.angle.shift());	
		DirectControlZoom_WithViewportPosition(ActiveViewportMovementScript.zoom.shift(),0.5,0.5);
	}
}

function GetStartPosition(){
	if(ActiveViewportMovementScript.position.length === 0){ 
		return {"position":ViewportPointsAt(0.5,0.5), "zoom":view.zoom.index, "angle":view.angle}; 
	}
	else{ return {"position":ActiveViewportMovementScript.position[ActiveViewportMovementScript.position-1], "zoom":ActiveViewportMovementScript.zoom[ActiveViewportMovementScript.zoom-1], "angle":ActiveViewportMovementScript.angle[ActiveViewportMovementScript.angle-1]}; }
}

function CreatePathTo(position,data={}){
	var Start = GetStartPosition(); var End = GetStartPosition(); Start.zoom = ZoomHash[Start.zoom];
	if(position.hasOwnProperty('position')){End.position = position.position;}
	if(position.hasOwnProperty('zoom')){End.zoom = ZoomHash[position.zoom];}
	if(position.hasOwnProperty('angle')){End.angle = position.angle;}
	if(data.hasOwnProperty('type')){var type = data.type;}else{var type = "none";}
	if(data.hasOwnProperty('duration')){var duration = data.duration;}else{var duration = 1;}
	var ProducedArray = {"position":[], "angle":[], "zoom":[] };
	var steps = (duration*ActiveViewportMovementRefreshPerSecond)-2;

	switch(type){ 
		case "cosin":
			var X_Diff = End.position[0]-Start.position[0]; var Y_Diff = End.position[1]-Start.position[1];
			var Zoom_Diff = End.zoom-Start.zoom; var Angle_Diff = End.angle-Start.angle;
			var calc = 0;

			for(var a = 1; a < steps/2; a++){ 
				calc = Math.cos((Math.PI/2)*(2*a/steps));
				ProducedArray.position.push([Start.position[0]+(X_Diff - X_Diff*calc)/2,Start.position[1]+(Y_Diff - Y_Diff*calc)/2]);
				ProducedArray.zoom.push(Start.zoom+(Zoom_Diff - Zoom_Diff*calc)/2);
				ProducedArray.angle.push(Start.angle+(Angle_Diff - Angle_Diff*calc)/2);  	
			}	
			for(var a = steps/2; a < steps-1; a++){ 	
				calc = Math.sin((2*(a-steps/2)/steps)*(Math.PI/2));
				ProducedArray.position.push([(Start.position[0]+ X_Diff/2 + (X_Diff*calc)/2),(Start.position[1]+ Y_Diff/2 + (Y_Diff*calc)/2)]);
				ProducedArray.zoom.push(Start.zoom + Zoom_Diff/2 + (Zoom_Diff*calc)/2);
				ProducedArray.angle.push(Start.angle + Angle_Diff/2 + (Angle_Diff*calc)/2); 
			}
		break;

		case "sin":
			var X_Diff = End.position[0]-Start.position[0]; var Y_Diff = End.position[1]-Start.position[1];
			var Zoom_Diff = End.zoom-Start.zoom; var Angle_Diff = End.angle-Start.angle;
			var calc = 0;

			for(var a = 0; a <= steps-1; a++){
				calc = Math.sin((Math.PI/2)*(a/steps));
				ProducedArray.position.push([(Start.position[0]+X_Diff*calc),(Start.position[1]+Y_Diff*calc)]);
				ProducedArray.zoom.push(Start.zoom+Zoom_Diff*calc);
				ProducedArray.angle.push(Start.angle+Angle_Diff*calc);
			}
		break;

		case "linear": //Create simple slide to location
			var Xstep = (End.position[0]-Start.position[0])/steps; var Ystep = (End.position[1]-Start.position[1])/steps;
			var Zoomstep = (End.zoom-Start.zoom)/steps; var Anglestep = (End.angle-Start.angle)/steps;

			ProducedArray.position.push([Start.position[0],Start.position[1]]);
			ProducedArray.zoom.push(Start.zoom);
			ProducedArray.angle.push(Start.angle);
			for(var a = 0; a <= steps-1; a++){
				Start.position[0] += Xstep; Start.position[1] += Ystep;
				Start.zoom += Zoomstep;
				Start.angle += Anglestep;
				
				ProducedArray.position.push([Start.position[0],Start.position[1]]);	
				ProducedArray.zoom.push(Start.zoom);
				ProducedArray.angle.push(Start.angle);	
			}	
			ProducedArray.position.push([End.position[0],End.position[1]]);	
			ProducedArray.zoom.push(End.zoom);
			ProducedArray.angle.push(End.angle);			
		break;

		case "none": default: //Create simple jump-cut to location
			//for(var a = 0; a < steps; a++){
				ProducedArray.position.push(End.position);
				ProducedArray.zoom.push(End.zoom);
				ProducedArray.angle.push(End.angle);
			//}
		break;
	}

	//paste to ActiveViewportMovementScript
	for(var a = 0; a < ProducedArray.position.length; a++){
		ActiveViewportMovementScript.position[ActiveViewportMovementScript.position.length] = ProducedArray.position[a];
		ActiveViewportMovementScript.zoom[ActiveViewportMovementScript.zoom.length] = ProducedArray.zoom[a];
		ActiveViewportMovementScript.angle[ActiveViewportMovementScript.angle.length] = ProducedArray.angle[a];
	}
}

function GetPositionHere(){
	return {"position":ViewportPointsAt(0.5,0.5), "zoom":view.zoom.index, "angle":view.angle};
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/ViewportControl/autocontrol.js loaded"); BootCount++;