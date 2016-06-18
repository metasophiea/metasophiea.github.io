// Zoom /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mouseInterface_Zoom(event){
	var temp = view.zoom.index; var temp2 = getViewportElementDimensions();
	if( event.deltaY > 0){temp--;} else if( event.deltaY < 0){temp++;}	
	zoomToPosition(temp,[event.layerX/temp2[0],event.layerY/temp2[1]]);
}

// Pan //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mouseInterface_Pan_OldPointerPosition = [0,0]; var mouseInterface_Pan_OldViewportPosition = [0,0];
function mouseInterface_Pan(event){
	removeMouseInterface();
	viewportElement.setAttributeNS(null,"onmouseout","setupMouseInterface();");
	viewportElement.setAttributeNS(null,"onmouseup","setupMouseInterface();");
	viewportElement.setAttributeNS(null,"onmousemove","mouseInterface_Pan_Calculate(event);");

	mouseInterface_Pan_OldPointerPosition = [event.layerX,event.layerY];
	mouseInterface_Pan_OldViewportPosition = [view.position[0],view.position[1]];
}
function mouseInterface_Pan_Calculate(event){
	view.position[0] = getViewportLength(event.layerX-mouseInterface_Pan_OldPointerPosition[0]) + mouseInterface_Pan_OldViewportPosition[0];
	view.position[1] = getViewportLength(event.layerY-mouseInterface_Pan_OldPointerPosition[1]) + mouseInterface_Pan_OldViewportPosition[1];
}

// Spin /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mouseInterface_Spin_StartPosition = [0,0]; var mouseInterface_Spin_StartingAngle = 0; var mouseInterface_Spin_SpinRatio = 3;
function mouseInterface_Spin(event){
	removeMouseInterface();
	viewportElement.setAttributeNS(null,"onmouseout","setupMouseInterface();");
	viewportElement.setAttributeNS(null,"onmouseup","setupMouseInterface();");
	viewportElement.setAttributeNS(null,"onmousemove","mouseInterface_Spin_Calculate(event);");

	var temp = getViewportElementDimensions();
	mouseInterface_Spin_StartPosition = [(event.layerX/temp[0]),(event.layerY/temp[1])];
	mouseInterface_Spin_StartingAngle = view.angle;
}

function mouseInterface_Spin_Calculate(event){
	var temp = getViewportElementDimensions();
	spinAroundPoint((mouseInterface_Spin_StartingAngle - mouseInterface_Spin_SpinRatio*((event.layerY/temp[1])-mouseInterface_Spin_StartPosition[1])),mouseInterface_Spin_StartPosition);
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
BootCount++; console.log("./canvas/viewportControl/mouseInterfaceControls.js");