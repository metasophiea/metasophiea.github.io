function MouseClick(event,that){
	TempPosition = [View.Position[0],View.Position[1],View.Angle];
	that.setAttributeNS(null,"onmouseup","clearTimeout(ClickTimeout_ID); this.removeAttributeNS(null, 'onmouseup');");

	SingleClick(event,that);
	ClickTimeout_ID = setTimeout(function(){
		if((TempPosition[0] == View.Position[0]) && (TempPosition[1] == View.Position[1]) && (TempPosition[2] == View.Angle)){LongClick(event,that);}  		
	},ClickTimeoutTime);
}

function SingleClick(event,that){
	IndexUpdater();
	var temp = PointToID(event.layerX,event.layerY); 
	if(temp != -1){ GetObjectFromID(temp).SingleClick(event); }else{
		switch(Tool.Click){
			case "Pan": MousePan(event,that); break;
			case "Spin": MouseSpin(event,that); break;
		}
	}
}

function LongClick(event,that){
	IndexUpdater();
	var temp = PointToID(event.layerX,event.layerY); 
	if(temp != -1){ GetObjectFromID(temp).LongClick(event); }else{
		switch(Tool.DoubleClick){
			case "MainUI": CreateWindowWithID('MainMenu','Main',event.clientX,event.clientY); break;
		}
	}
}

function MouseWheel(event,that){
	IndexUpdater();
	var temp = PointToID(event.layerX,event.layerY); 
	if(temp != -1){ GetObjectFromID(temp).Wheel(event.deltaY); }else{
		switch(Tool.Wheel){
			case "Zoom": MouseZoom(event,that); break;		
		}		
	}
}



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./MouseInteraction.js loaded"); BootCount++;