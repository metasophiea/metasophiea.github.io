//// Mouse Down /////////////////////////////////////////////////////////////
		function MouseDown(event, data){
			if(ToolMenu_Open){DoubleClick(event, data);}
			if(CurserType == 'move'){Pan(event, data);}
			else{
				DrawObject(event, data);
			}
		}

//// Drawing /////////////////////////////////////////////////////////////
	var StartPosition = [0,0];
	var EndPosition = [0,0];
		function DrawObject(event, object){
			object.setAttributeNS(null,"onmousemove","DrawObject_Calculate(event)");
			object.setAttributeNS(null,"onmouseout","DrawObject_Error(this)");
			object.setAttributeNS(null,"onmouseup","DrawObject_Stop(event, this)");
			StartPosition[0] = ClientXToSpaceX(event.clientX);
			StartPosition[1] = ClientYToSpaceY(event.clientY);

			if(Snap){
				var SnapIndex = 10/ZoomAmount;
				StartPosition[0] = Math.floor(StartPosition[0]/SnapIndex)*SnapIndex;
				StartPosition[1] = Math.floor(StartPosition[1]/SnapIndex)*SnapIndex;
			}

			WorkingDrawElement = new CurserType(0, StartPosition[0], StartPosition[1], StyleData, InitialData, Canvas, true);
		}
		
		function DrawObject_Calculate(event){
			EndPosition[0] = ClientXToSpaceX(event.clientX);
			EndPosition[1] = ClientYToSpaceY(event.clientY);
			if(Snap){
				var SnapIndex = 10/ZoomAmount;
				EndPosition[0] = Math.floor(EndPosition[0]/SnapIndex)*SnapIndex;
				EndPosition[1] = Math.floor(EndPosition[1]/SnapIndex)*SnapIndex;
			}
			ClearTempDrawList();
			WorkingDrawElement.set(EndPosition[0], "EndX"); WorkingDrawElement.set(EndPosition[1], "EndY");
			TempDrawList.push(WorkingDrawElement);
		}
		
		function DrawObject_Error(object){
			object.removeAttributeNS(null, "onmousemove");
			object.removeAttributeNS(null, "onmouseout");
			object.removeAttributeNS(null, "onmouseup");
			ClearTempDrawList();
		}
		
		function DrawObject_Stop(event, object){
			object.removeAttributeNS(null, "onmousemove");
			object.removeAttributeNS(null, "onmouseout");
			object.removeAttributeNS(null, "onmouseup");
			ClearTempDrawList();	
			
			if( WorkingDrawElement.StopAdjusting() && (EndPosition[0] != StartPosition[0] || EndPosition[1] != StartPosition[1]) ){
				DrawList.push(WorkingDrawElement);	
			}
			console.log(DrawList);			
		}
