var StartPosition = [0,0]; var EndPosition = [0,0];
var StartingAngle = 0; var SpinAmount = 3;

function ViewportSpin(){
	RemoveMouseInterface(event);
	ViewportElement.setAttributeNS(null,"onmousemove","MouseSpin_Calculate(event)");
	ViewportElement.setAttributeNS(null,"onmouseout","SetupMouseInterface();");
	ViewportElement.setAttributeNS(null,"onmouseup","SetupMouseInterface();");

	StartPosition = [(event.layerX/ViewportElement.width),(event.layerY/ViewportElement.height)];
	StartingAngle = view.angle;
}

function MouseSpin_Calculate(data){
	EndPosition = [(data.layerX/ViewportElement.width),(data.layerY/ViewportElement.height)];
	SpinViewPort(StartPosition[0],StartPosition[1],(StartingAngle - SpinAmount*(EndPosition[1]-StartPosition[1]))); //only using EndPosition[1] as we're only looking at y movement
}

function SpinViewPort(X,Y,Angle){
	//X and Y are a number between 0 and 1, representing how far down or right they are
	//Collect Centre points before and after the spin, while doing the spin
		var OldPoints = ViewportPointsAt(X,Y);
		view.angle = Angle;
		var NewPoints = ViewportPointsAt(X,Y);	
	//Gather polar coords for these points and add the Viewport angle
		OldPoints = [(GetPolar(OldPoints[0],OldPoints[1])[0]+view.angle),(GetPolar(OldPoints[0],OldPoints[1])[1])];
		NewPoints = [(GetPolar(NewPoints[0],NewPoints[1])[0]+view.angle),(GetPolar(NewPoints[0],NewPoints[1])[1])];
	//convert back to Cartesian
		OldPoints = GetCartesian(OldPoints[0],OldPoints[1]);
		NewPoints = GetCartesian(NewPoints[0],NewPoints[1]);
	//Adjust Viewport accordingly
		view.position[0] = view.position[0] + (NewPoints[0]-OldPoints[0]);
		view.position[1] = view.position[1] + (NewPoints[1]-OldPoints[1]);			
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/ViewportControl/spin.js loaded"); BootCount++;