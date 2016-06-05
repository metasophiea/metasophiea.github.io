// // // // // // // // // // // // // // // // // // // Startup stuff //
function lavendel_interface_mouse_setup(){
	ViewportElement.setAttributeNS(null,"onmousedown","lavendel_interface_mouse('down',event);");
	ViewportElement.setAttributeNS(null,"onmousemove","lavendel_interface_mouse('move',event);");	
	ViewportElement.setAttributeNS(null,"onmouseout","lavendel_interface_mouse('out',event);");	
	ViewportElement.setAttributeNS(null,"onmouseup","lavendel_interface_mouse('up',event);");	
	ViewportElement.setAttributeNS(null,"onwheel","lavendel_interface_mouse('wheel',event);");
	ViewportElement.setAttributeNS(null,"onclick","lavendel_interface_mouse('click',event);");	
	ViewportElement.setAttributeNS(null,"ondblclick","lavendel_interface_mouse('doubleclick',event);");	
	lavendel_interface_mouse_mousedown = false;
}

function lavendel_interface_mouse_destruction(){
	ViewportElement.removeAttributeNS(null,"onmousedown");
	ViewportElement.removeAttributeNS(null,"onmousemove");	
	ViewportElement.removeAttributeNS(null,"onmouseout");	
	ViewportElement.removeAttributeNS(null,"onmouseup");	
	ViewportElement.removeAttributeNS(null,"onwheel");
	ViewportElement.removeAttributeNS(null,"onclick");	
	ViewportElement.removeAttributeNS(null,"ondblclick");	
}

//// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 
function lavendel_interface_mouse(action,event){
	var pointingID = PointToID(event.layerX,event.layerY);	
	if(action == 'down'){lavendel_interface_mouse_mousedown = true;}else if(action == 'up'){lavendel_interface_mouse_mousedown = false;}
	if(pointingID == -1){lavendel_interface_mouse_viewportcontrol(action,event);}
	else{lavendel_interface_mouse_objectcontrol(pointingID,action,event);}
}

// // // // // // // // // // // // // // // // // // /////////////
// // // // // // // // // // // // // // // // // // // Objects //
// // // // // // // // // // // // // // // // // // /////////////
function lavendel_interface_mouse_objectcontrol(pointingID,action,event){
	switch(action){
		case 'click':
			DrawList.Background.getObj(pointingID).click(event.layerX,event.layerY);
			if(lavendel_interface_mouse_selectedID != pointingID){
				try{DrawList.Background.getObj(lavendel_interface_mouse_selectedID).unselect('click');}catch(e){}
				DrawList.Background.getObj(pointingID).select('click');
				lavendel_interface_mouse_selectedID = pointingID;
			}			
		break;
		case 'doubleclick': 
			DrawList.Background.getObj(pointingID).doubleclick(event.layerX,event.layerY); 
			if(lavendel_interface_mouse_selectedID != pointingID){
				try{DrawList.Background.getObj(lavendel_interface_mouse_selectedID).unselect('click');}catch(e){}
				DrawList.Background.getObj(pointingID).select('click');
				lavendel_interface_mouse_selectedID = pointingID;
			}		
		break;
		case 'down': lavendel_interface_mouse_mousedown = true; break;
		case 'up': lavendel_interface_mouse_mousedown = false; break;
		case 'move':
			if(lavendel_interface_mouse_mousedown){
				lavendel_interface_mouse_destruction();
				ViewportElement.setAttributeNS(null,"onmousemove","DrawList.Background.getObj("+pointingID+").drag(ViewportLength(event.movementX),ViewportLength(event.movementY));");
				ViewportElement.setAttributeNS(null,"onmouseup","lavendel_interface_mouse_setup();");	
				ViewportElement.setAttributeNS(null,"onmouseout","lavendel_interface_mouse_setup();");	
			}
			else{
				if(lavendel_interface_mouse_lastpassID != pointingID){DrawList.Background.getObj(pointingID).passout();}
				lavendel_interface_mouse_lastpassID = pointingID;
				DrawList.Background.getObj(pointingID).pass(event.layerX,event.layerY);
			}
		break;
		case 'wheel': DrawList.Background.getObj(pointingID).wheel(event.deltaY/100); break;
		case 'out': try{DrawList.Background.getObj(lavendel_interface_mouse_selectedID).out();}catch(e){} break;
	}
}

// // // // // // // // // // // // // // // // // // //////////////////////
// // // // // // // // // // // // // // // // // // // Viewport Control //
// // // // // // // // // // // // // // // // // // //////////////////////
var PositionInsideBox = [0,0]; var OldPosition = [0,0]; 	//panning
var StartPosition = [0,0]; var EndPosition = [0,0]; var StartingAngle = 0; var SpinAmount = 3;	//spinning
function lavendel_interface_mouse_viewportcontrol(action,event){
	switch(action){
		case 'click':
			try{DrawList.Background.getObj(lavendel_interface_mouse_selectedID).unselect('click');}catch(e){}
			lavendel_interface_mouse_selectedID = -1			
		break;
		case 'doubleclick':
			try{DrawList.Background.getObj(lavendel_interface_mouse_selectedID).unselect('click');}catch(e){}
			lavendel_interface_mouse_selectedID = -1	
			lavendel_menu_create([event.clientX,event.clientY],ViewportPointsAt(event.layerX/GetWidthAndHeightOfViewport()[0],event.layerY/GetWidthAndHeightOfViewport()[1]),'create'); 			
		break;
		case 'down': lavendel_interface_mouse_mousedown = true; break;
		case 'up': lavendel_interface_mouse_mousedown = false; break;
		case 'move': 
			if(lavendel_interface_mouse_mousedown){
				if(tool.click == 'pan'){lavendel_interface_mouse_destruction();
					ViewportElement.setAttributeNS(null,"onmousemove","lavendel_interface_mouse_MousePan_Calculate(event);");
					ViewportElement.setAttributeNS(null,"onmouseout","lavendel_interface_mouse_setup();");
					ViewportElement.setAttributeNS(null,"onmouseup","lavendel_interface_mouse_setup();");
					PositionInsideBox[0] = event.layerX;
					PositionInsideBox[1] = event.layerY;
					OldPosition[0] = View.Position[0];
					OldPosition[1] = View.Position[1];
				}
				else if(tool.click == 'spin'){lavendel_interface_mouse_destruction();
					ViewportElement.setAttributeNS(null,"onmousemove","lavendel_interface_mouse_MouseSpin_Calculate(event);");
					ViewportElement.setAttributeNS(null,"onmouseout","lavendel_interface_mouse_setup();");
					ViewportElement.setAttributeNS(null,"onmouseup","lavendel_interface_mouse_setup();");
					StartPosition = [(event.layerX/ViewportElement.width),(event.layerY/ViewportElement.height)];
					StartingAngle = View.Angle;
				}
			}			
		break;
		case 'wheel': 
			var NewZoomIndex = View.Zoom.Index; var cap = (Object.keys(ZoomHash).length - 1)/2;
			if( event.deltaY > 0){ NewZoomIndex--; if(NewZoomIndex < -cap){NewZoomIndex = -cap;} } //Zoom out
			else if( event.deltaY < 0 ){ NewZoomIndex++; if(NewZoomIndex > cap){NewZoomIndex = cap;} } //Zoom in	
			lavendel_viewportcontrol_Zoom_WithViewportPosition(NewZoomIndex,event.layerX/ViewportElement.width,event.layerY/ViewportElement.height);	
		break;
		case 'out': break;
	}
}

// Panning 
function lavendel_interface_mouse_MousePan_Calculate(event){
	lavendel_viewportcontrol_setViewportPosition(ViewportLength(event.layerX-PositionInsideBox[0])+OldPosition[0],ViewportLength(event.layerY-PositionInsideBox[1])+OldPosition[1]);
}

//Spinning
function lavendel_interface_mouse_MouseSpin_Calculate(data){
	EndPosition = [(data.layerX/ViewportElement.width),(data.layerY/ViewportElement.height)];
	lavendel_viewportcontrol_SpinViewPort(StartPosition[0],StartPosition[1],(StartingAngle - SpinAmount*(EndPosition[1]-StartPosition[1]))); //only using EndPosition[1] as we're only looking at y movement
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./mouse.js loaded"); BootCount++;