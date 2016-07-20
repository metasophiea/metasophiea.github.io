function removeMouseInterface(){
	viewportElement.removeAttributeNS(null,"onmousedown");
	viewportElement.removeAttributeNS(null,"onmousemove");	
	viewportElement.removeAttributeNS(null,"onmouseout");	
	viewportElement.removeAttributeNS(null,"onmouseup");	
	viewportElement.removeAttributeNS(null,"onwheel");
	viewportElement.removeAttributeNS(null,"onclick");	
	viewportElement.removeAttributeNS(null,"ondblclick");	
	mouseInterface_Mousedown = false;
}

function setupMouseInterface(){
	removeMouseInterface();
	viewportElement.setAttributeNS(null,"onmousedown","mouseInterfaceEvent(event);");
	viewportElement.setAttributeNS(null,"onmousemove","mouseInterfaceEvent(event);");	
	viewportElement.setAttributeNS(null,"onmouseout","mouseInterfaceEvent(event);");	
	viewportElement.setAttributeNS(null,"onmouseup","mouseInterfaceEvent(event);");	
	viewportElement.setAttributeNS(null,"onwheel","mouseInterfaceEvent(event);");
	viewportElement.setAttributeNS(null,"onclick","mouseInterfaceEvent(event);");	
	viewportElement.setAttributeNS(null,"ondblclick","mouseInterfaceEvent(event);");	
}


function mouseInterfaceEvent(event){
	var pointingID = getIDFromPoint(event.layerX,event.layerY);  //console.log('mouse pointing at ' + pointingID);
	if(event.type == "mousedown"){mouseInterface_Mousedown = true;}
	else if(event.type == "mouseup"){mouseInterface_Mousedown = false;}

	//Watch for hovering
		if(pointingID == -1){
			if(mouseInterface_Hover != -1){
				if(drawList.foreground.getObj(mouseInterface_Hover) != undefined){
					drawList.foreground.getObj(mouseInterface_Hover).mouseout();
				}
			}
			mouseInterface_Hover = pointingID;
		}
		else if(mouseInterface_Hover != pointingID){
			if(mouseInterface_Hover != -1){drawList.foreground.getObj(mouseInterface_Hover).mouseout();}
			drawList.foreground.getObj(pointingID).mouseover([event.layerX,event.layerY]);
			mouseInterface_Hover = pointingID;
		}
		else{drawList.foreground.getObj(pointingID).mouseover([event.layerX,event.layerY]);}

	if(pointingID == -1){mouseInterfaceEvent_Viewport(event);}
	else{mouseInterfaceEvent_Object(pointingID, event);}
}


function mouseInterfaceEvent_Viewport(event){
	switch(event.type){
		case "click": mouseInterface_Selected.clear(); break;
		case "dblclick": mouseInterface_Selected.clear(); startMenu('main',[event.layerX,event.layerY]); break;
		case "wheel": mouseInterface_Zoom(event); break;
		case "mousemove":
			if(mouseInterface_Mousedown){
				switch(tool.drag){
					case 'pan': mouseInterface_Pan(event); break;
					case 'spin': mouseInterface_Spin(event); break;
					case 'rectangle': mouseInterface_drawRectangle(event); break;
				}
			}
		break;
	}
}
function mouseInterfaceEvent_Object(ID,event){
	switch(event.type){
		case "click": mouseInterface_Selected.setID(ID,[event.layerX,event.layerY]); drawList.foreground.getObj(ID).click(event.layerX,event.layerY); break;
		case 'dblclick': startMenu('object',[event.layerX,event.layerY],ID); break;
		case "mousedown": 
			var temp = getViewportElementDimensions();
			drawList.foreground.getObj(ID).mousedown(getViewportPoint([event.layerX/temp[0],event.layerY/temp[1]])); 
		break;
		case "mousemove":
			if(mouseInterface_Mousedown){
				removeMouseInterface(); 
				drawList.foreground.getObj(ID).dragStart();
				viewportElement.setAttributeNS(null,"onmousemove","drawList.foreground.getObj("+ID+").drag(getViewportDifference([event.movementX,event.movementY]));");
				viewportElement.setAttributeNS(null,"onmouseout","drawList.foreground.getObj("+ID+").dragEnd();setupMouseInterface();");
				viewportElement.setAttributeNS(null,"onmouseup","drawList.foreground.getObj("+ID+").dragEnd();setupMouseInterface();");
			}
		break;
	}
}
