function zoomToPosition(index,point){
	if( point[0] < 0 ){point[0] = 0;}else if( point[0] > 1 ){point[0] = 1;} 
	if( point[1] < 0 ){point[1] = 0;}else if( point[1] > 1 ){point[1] = 1;} 
	
	var OldPoints = getViewportPoint(point);
	view.zoom.index = index; view.zoom.value = getZoomValueFromIndex(index);
	var NewPoints = getViewportPoint(point);

	OldPoints = [getPolarFrom(OldPoints)[0],getPolarFrom(OldPoints)[1]+view.angle];
	NewPoints = [getPolarFrom(NewPoints)[0],getPolarFrom(NewPoints)[1]+view.angle];

	OldPoints = getCartesian(OldPoints);
	NewPoints = getCartesian(NewPoints);

	view.position[0] = view.position[0] + (NewPoints[0]-OldPoints[0]);
	view.position[1] = view.position[1] + (NewPoints[1]-OldPoints[1]);
}

function exact_zoomToPosition(value,point){
	if( point[0] < 0 ){point[0] = 0;}else if( point[0] > 1 ){point[0] = 1;} 
	if( point[1] < 0 ){point[1] = 0;}else if( point[1] > 1 ){point[1] = 1;} 
	
	var OldPoints = getViewportPoint(point);
	view.zoom.index = getClosestZoomIndexFromValue(value); view.zoom.value = value;
	var NewPoints = getViewportPoint(point);

	OldPoints = [getPolarFrom(OldPoints)[0],getPolarFrom(OldPoints)[1]+view.angle];
	NewPoints = [getPolarFrom(NewPoints)[0],getPolarFrom(NewPoints)[1]+view.angle];

	OldPoints = getCartesian(OldPoints);
	NewPoints = getCartesian(NewPoints);

	view.position[0] = view.position[0] + (NewPoints[0]-OldPoints[0]);
	view.position[1] = view.position[1] + (NewPoints[1]-OldPoints[1]);
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("./canvas/viewportControl/zoom.js"); BootCount++;