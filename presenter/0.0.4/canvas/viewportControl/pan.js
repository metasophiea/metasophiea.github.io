function setViewportPosition(newPosition){
	view.position = newPosition;
}

function setViewportCenterPosition(newPosition){
	var temp = getViewportElementDimensions();

	view.position[0] = newPosition[0] + getViewportLength(temp[0]/2);
	view.position[1] = newPosition[1] + getViewportLength(temp[1]/2);
}











//////////////////////////////////////////////////////////////////////////////////////////////////////////////
BootCount++; console.log('./canvas/viewportControl/pan.js');