var StartPosition = [0,0];
var temp;

function MouseClick(event,that){ //console.log(ViewportLength(event.layerX) +"|"+ ViewportLength(event.layerY));
	IndexUpdater(); temp = PointToID(event.layerX,event.layerY);

	TempPosition = [View.Position[0],View.Position[1],View.Angle];
	that.setAttributeNS(null,"onmouseup","clearTimeout(ClickTimeout_ID); this.removeAttributeNS(null, 'onmouseup'); this.removeAttributeNS(null, 'onmousemove');");
	that.setAttributeNS(null,"onmouseout","clearTimeout(ClickTimeout_ID); this.removeAttributeNS(null, 'onmouseup'); this.removeAttributeNS(null, 'onmousemove');");
	that.setAttributeNS(null,"onmousemove","clearTimeout(ClickTimeout_ID); MouseDrag(event,this);");

	SingleClick(event,that);
	ClickTimeout_ID = setTimeout(function(){
		if((TempPosition[0] == View.Position[0]) && (TempPosition[1] == View.Position[1]) && (TempPosition[2] == View.Angle)){LongClick(event,that);}  		
	},ClickTimeoutTime);
}

function SingleClick(event,that){ StartPosition = [event.layerX,event.layerY];
	if(temp != -1){ GetObjectFromID(temp).singleclick(event); }else{
		switch(Tool.Click){
			case "Pan": MousePan(event,that); break;
			case "Spin": MouseSpin(event,that); break;
		}
	}
}

function LongClick(event,that){
	if(temp != -1){ GetObjectFromID(temp).longclick(event); }else{
		switch(Tool.DoubleClick){
			case "MainUI": CreateWindowWithID('MainMenu','Main',event.clientX,event.clientY); break;
		}
	}
}

function MouseDrag(event,that){
	GetObjectFromID(temp).clickanddrag(StartPosition,[event.layerX,event.layerY],[event.movementX,event.movementY]);
}

function MouseWheel(event,that){
	temp = PointToID(event.layerX,event.layerY);
	if(temp != -1){ GetObjectFromID(temp).wheel(event.deltaY); }else{
		switch(Tool.Wheel){
			case "Zoom": MouseZoom(event,that); break;		
		}		
	}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./mouse.js loaded"); BootCount++;