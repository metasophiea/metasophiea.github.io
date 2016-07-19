var PositionInsideBox = [0,0]
var OldPosition = [0,0];
function ViewportPan(){
	RemoveMouseInterface();

	ViewportElement.setAttributeNS(null,"onmousemove","MousePan_Calculate(event);");
	ViewportElement.setAttributeNS(null,"onmouseout","SetupMouseInterface();");
	ViewportElement.setAttributeNS(null,"onmouseup","SetupMouseInterface();");
	PositionInsideBox[0] = event.layerX;
	PositionInsideBox[1] = event.layerY;
	OldPosition[0] = view.position[0];
	OldPosition[1] = view.position[1];
}

function MousePan_Calculate(event){
	view.position[0] = ViewportLength(event.offsetX-PositionInsideBox[0])+OldPosition[0];
	view.position[1] = ViewportLength(event.offsetY-PositionInsideBox[1])+OldPosition[1];
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/ViewportControl/pan.js loaded"); BootCount++;