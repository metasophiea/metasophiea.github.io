function RemoveMouseInterface(){
	ViewportElement.removeAttributeNS(null,"onmousedown");
	ViewportElement.removeAttributeNS(null,"onmousemove");	
	ViewportElement.removeAttributeNS(null,"onmouseout");	
	ViewportElement.removeAttributeNS(null,"onmouseup");	
	ViewportElement.removeAttributeNS(null,"onwheel");
	ViewportElement.removeAttributeNS(null,"onclick");	
	ViewportElement.removeAttributeNS(null,"ondblclick");	
	Mouse_Mousedown = false;
}

function SetupMouseInterface(){
	RemoveMouseInterface();
	ViewportElement.setAttributeNS(null,"onmousedown","MouseEvent(this,event);");
	ViewportElement.setAttributeNS(null,"onmousemove","MouseEvent(this,event);");	
	ViewportElement.setAttributeNS(null,"onmouseout","MouseEvent(this,event);");	
	ViewportElement.setAttributeNS(null,"onmouseup","MouseEvent(this,event);");	
	ViewportElement.setAttributeNS(null,"onwheel","MouseEvent(this,event);");
	ViewportElement.setAttributeNS(null,"onclick","MouseEvent(this,event);");	
	ViewportElement.setAttributeNS(null,"ondblclick","MouseEvent(this,event);");	
}

function MouseEvent(that, event){
	var pointingID = PointToID(event.layerX,event.layerY); //console.log(event.type +"|"+ Mouse_Mousedown +"|"+ pointingID);
	if(event.type == "mousedown"){Mouse_Mousedown = true;}else if(event.type == "mouseup"){Mouse_Mousedown = false;}

	if(pointingID == -1){MouseEvent_Viewport(event);}
	else{MouseEvent_Object(pointingID, event);}
}

function MouseEvent_Viewport(event){
	switch(event.type){
		case "click": Mouse_Selected.clear(); break;
		case "dbclick": Mouse_Selected.clear(); break;
		case "wheel": ViewportZoom(event); break;
		case "mousemove": 
			if(Mouse_Mousedown){
				switch(tool.click){
					case 'poly': CreateShape('poly',ViewportPointsAt(event.layerX/window.innerWidth,event.layerY/window.innerHeight)); break;
					case 'pan': ViewportPan(); break;
					case 'spin': ViewportSpin(event); break;
				}	
			} 
		break;
	}
}
function MouseEvent_Object(ID,event){
	switch(event.type){
		case "click": Mouse_Selected.setID(ID); DrawList.Background.getObj(ID).click(event.layerX,event.layerY); break;
		case "mousemove":
			if(Mouse_Mousedown){
				RemoveMouseInterface(); 
				ViewportElement.setAttributeNS(null,"onmousemove","DrawList.Background.getObj("+ID+").drag(ViewportDifference(event,event.movementX,event.movementY));");
				ViewportElement.setAttributeNS(null,"onmouseout","SetupMouseInterface();");
				ViewportElement.setAttributeNS(null,"onmouseup","SetupMouseInterface();");
			}			
		break;
	}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/mouseinterface.js loaded"); BootCount++;