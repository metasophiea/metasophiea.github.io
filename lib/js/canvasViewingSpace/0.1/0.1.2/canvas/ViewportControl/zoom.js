function ViewportZoom(event){
	var NewZoomIndex = View.Zoom.Index; var cap = (Object.keys(ZoomHash).length - 1)/2;
	if( event.deltaY > 0){ NewZoomIndex--; if(NewZoomIndex < -cap){NewZoomIndex = -cap;} } //Zoom out
	else if( event.deltaY < 0 ){ NewZoomIndex++; if(NewZoomIndex > cap){NewZoomIndex = cap;} } //Zoom in	
	Zoom_WithViewportPosition(NewZoomIndex,event.layerX/ViewportElement.width,event.layerY/ViewportElement.height);
}

function Zoom_WithViewportPosition(Index,X,Y){ //X and Y are a number between 0 and 1, representing how far down or right they are
	if( X < 0 ){X = 0;}else if( X > 1 ){X = 1;} if( Y < 0 ){Y = 0;}else if( Y > 1 ){Y = 1;} 

	//Collect Centre points before and after the zooom, while doing the zoom
		var OldPoints = ViewportPointsAt(X,Y);
		View.Zoom.Index = Index; View.Zoom.Value = ZoomHash[View.Zoom.Index];
		var NewPoints = ViewportPointsAt(X,Y);	
	//Gather polar coords for these points and add the Viewport angle
		OldPoints = [(GetPolar(OldPoints[0],OldPoints[1])[0]+View.Angle),(GetPolar(OldPoints[0],OldPoints[1])[1])];
		NewPoints = [(GetPolar(NewPoints[0],NewPoints[1])[0]+View.Angle),(GetPolar(NewPoints[0],NewPoints[1])[1])];
	//convert back to Cartesian
		OldPoints = GetCartesian(OldPoints[0],OldPoints[1]);
		NewPoints = GetCartesian(NewPoints[0],NewPoints[1]);
	//Adjust Viewport accordingly
		View.Position[0] = View.Position[0] + (NewPoints[0]-OldPoints[0]);
		View.Position[1] = View.Position[1] + (NewPoints[1]-OldPoints[1]);
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/ViewportControl/zoom.js loaded"); BootCount++;