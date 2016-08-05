function MouseClick(event,that){
	TempPosition = [View.Position[0],View.Position[1],View.Angle];
	that.setAttributeNS(null,"onmouseup","clearTimeout(ClickTimeout_ID);");

	SingleClick(event,that);
	ClickTimeout_ID = setTimeout(function(){
		if((TempPosition[0] == View.Position[0]) && (TempPosition[1] == View.Position[1]) && (TempPosition[2] == View.Angle)){DoubleClick(event,that);}  		
	},ClickTimeoutTime);
}

function SingleClick(event,that){
	IndexUpdater();
	var temp = PointToID(event.clientX,event.clientY); 
	if(temp != -1){ GetObjectFromID(temp).SingleClick(); }else{
		switch(Tool.Click){
			case "Pan": MousePan(event,that); break;
			case "Spin": MouseSpin(event,that); break;
		}
	}
}

function DoubleClick(event,that){
	IndexUpdater();
	var temp = PointToID(event.clientX,event.clientY); 
	if(temp != -1){ GetObjectFromID(temp).DoubleClick(); }else{
		switch(Tool.DoubleClick){
			case "MainUI": StartMenu(event.clientX,event.clientY); break;
		}
	}
}

function MouseWheel(event,that){
	IndexUpdater();
	var temp = PointToID(event.clientX,event.clientY); 
	if(temp != -1){ GetObjectFromID(temp).Wheel(event.deltaY); }else{
		switch(Tool.Wheel){
			case "Zoom": MouseZoom(event,that); break;		
		}		
	}
}