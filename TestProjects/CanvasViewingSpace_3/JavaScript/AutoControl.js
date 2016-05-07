function MoveTo(InputData = {}){
	if(InputData.hasOwnProperty('X')){var X = InputData.X;}else{var X = View.Position[0] + ViewportLength(window.innerWidth)/2;}
	if(InputData.hasOwnProperty('Y')){var Y = InputData.Y;}else{var Y = View.Position[1] + ViewportLength(window.innerHeight)/2;}
	if(InputData.hasOwnProperty('Zoom')){var Zoom = InputData.Zoom;}else{var Zoom = View.Zoom;}
	if(InputData.hasOwnProperty('Angle')){var Angle = InputData.Angle;}else{var Angle = View.Angle;}
	if(InputData.hasOwnProperty('MoveType')){var MoveType = InputData.MoveType;}else{var MoveType = "none";}

	if(MoveType == "none"){
		View.Zoom = Zoom;
		View.Position[0] = (ViewportLength(window.innerWidth)/2 - X);
		View.Position[1] = (ViewportLength(window.innerHeight)/2 - Y);
		SpinViewPort(0.5,0.5,Angle);
	}
}