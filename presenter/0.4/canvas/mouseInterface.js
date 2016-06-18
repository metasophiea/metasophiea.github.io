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
	viewportElement.setAttributeNS(null,"onmousedown","mouseInterfaceEvent(this,event);");
	viewportElement.setAttributeNS(null,"onmousemove","mouseInterfaceEvent(this,event);");	
	viewportElement.setAttributeNS(null,"onmouseout","mouseInterfaceEvent(this,event);");	
	viewportElement.setAttributeNS(null,"onmouseup","mouseInterfaceEvent(this,event);");	
	viewportElement.setAttributeNS(null,"onwheel","mouseInterfaceEvent(this,event);");
	viewportElement.setAttributeNS(null,"onclick","mouseInterfaceEvent(this,event);");	
	viewportElement.setAttributeNS(null,"ondblclick","mouseInterfaceEvent(this,event);");	
}


function mouseInterfaceEvent(that, event){
	var pointingID = getIDFromPoint(event.layerX,event.layerY);// console.log(event.type +"|"+ Mouse_Mousedown +"|"+ pointingID);
	if(event.type == "mousedown"){mouseInterface_Mousedown = true;}
	else if(event.type == "mouseup"){mouseInterface_Mousedown = false;}

	if(pointingID == -1){mouseInterfaceEvent_Viewport(event);}
	else{mouseInterfaceEvent_Object(pointingID, event);}
}


function mouseInterfaceEvent_Viewport(event){
	switch(event.type){
		case "click": mouseInterface_Selected.clear(); break;
		case "dbclick": mouseInterface_Selected.clear(); break;
		case "wheel": mouseInterface_Zoom(event); break;
		case "mousemove":
			if(mouseInterface_Mousedown){
				switch(tool.drag){
					case 'pan': mouseInterface_Pan(event); break;
					case 'spin': mouseInterface_Spin(event); break;
				}
			}
		break;
	}
}
function mouseInterfaceEvent_Object(ID,event){
	switch(event.type){
		case "click": mouseInterface_Selected.setID(ID); drawList.background.getObj(ID).click(event.layerX,event.layerY); break;
		case "mousemove":
			if(mouseInterface_Mousedown){
				removeMouseInterface(); 
				viewportElement.setAttributeNS(null,"onmousemove","drawList.background.getObj("+ID+").drag(getViewportDifference(event,event.movementX,event.movementY));");
				viewportElement.setAttributeNS(null,"onmouseout","setupMouseInterface();");
				viewportElement.setAttributeNS(null,"onmouseup","setupMouseInterface();");
			}			
		break;
	}
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
BootCount++; console.log("./canvas/mouseinterface.js");