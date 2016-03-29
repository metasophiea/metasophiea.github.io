// Panning ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// >> Globals Required <<
	// XPosition (number) & YPosition (number)
	// - The current user view position. All canvas objects are positioned relitive to these values
var PositionInsideBox = [0,0]
var OldPosition = [0,0];
var NewPosition = [0,0];
  function Pan(event, object){
		object.setAttributeNS(null,"onmousemove","Pan_Calculate(event)");
		object.setAttributeNS(null,"onmouseout","Pan_Stop(this)");
		object.setAttributeNS(null,"onmouseup","Pan_Stop(this)");
		PositionInsideBox[0] = event.clientX;
		PositionInsideBox[1] = event.clientY;
		OldPosition[0] = XPosition;
		OldPosition[1] = YPosition;
	}
	function Pan_Calculate(event){
		XPosition = event.clientX-PositionInsideBox[0]+OldPosition[0];
		YPosition = event.clientY-PositionInsideBox[1]+OldPosition[1];
		NewPosition[0] = XPosition; NewPosition[1] = YPosition;
	}
	function Pan_Stop(object){
		object.removeAttributeNS(null, "onmousemove");
		object.removeAttributeNS(null, "onmouseout");
		object.removeAttributeNS(null, "onmouseup");
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// Zoom //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// >> Globals Required <<
	// XPosition (number) & YPosition (number)
	// - The current user view position. All canvas objects are positioned relitive to these values
	// ZoomAmount (number)
	// - Simply the zoom multiplier. This number is used with canvas object's positions to change their rendered size
	// - The number starts at 1, with anything lower resulting in the objects reducing in size, and vice versa
	function Zoom(data, object){	
		var BeforeZoom_CursorX = (data.clientX - XPosition)/ZoomAmount;
		var BeforeZoom_CursorY = (data.clientY - YPosition)/ZoomAmount;

		ZoomStep = ZoomAmount/8;
		if( data.deltaY > 0){//Zoom out
			ZoomAmount = ZoomAmount - ZoomStep;
			ZoomIndex--;
			if( ZoomAmount <= ZoomLimits[0]){ZoomAmount = ZoomLimits[0]; ZoomIndex++;}
		}
		else if( data.deltaY < 0 ){//Zoom in
			ZoomAmount = ZoomAmount + ZoomStep;
			ZoomIndex++;
			if( ZoomAmount >= ZoomLimits[1]){ZoomAmount = ZoomLimits[1]; ZoomIndex--;}
		}
		
	//Correction
		switch(ZoomIndex){
			case -16: ZoomAmount = 0.1; break;
			case -8: ZoomAmount = 0.3; break;
			case -4: ZoomAmount = 0.5; break;
			case -2: ZoomAmount = 0.75; break;
			case 0: ZoomAmount = 1; break;
			case 2: ZoomAmount = 1.25; break;
			case 4: ZoomAmount = 1.5; break;
			case 8: ZoomAmount = 2.5; break;
			case 16: ZoomAmount = 6.5; break;
		}

		var AfterZoom_CursorX = (data.clientX - XPosition)/ZoomAmount;
		var AfterZoom_CursorY = (data.clientY - YPosition)/ZoomAmount;

		XPosition = XPosition + (AfterZoom_CursorX-BeforeZoom_CursorX)*ZoomAmount;
  		YPosition = YPosition + (AfterZoom_CursorY-BeforeZoom_CursorY)*ZoomAmount;
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// Conversion Tools //////////////////////////////////////////////////////////////////////////////////////////////////////////
// These tools are for converting simple size and location values into the changing true values of position and scale
// - in this way, one can treat the canvas space in a more natural way; simply placing objects where they want them to be, 
// - not in relation to the userview, but in the space itself
	// >> Globals Required <<
	// XPosition (number) & YPosition (number)
	// - The current user view position. All canvas objects are positioned relitive to these values
	// ZoomAmount (number)
	// - Simply the zoom multiplier. This number is used with canvas object's positions to change their rendered size
	// - The number starts at 1, with anything lower resulting in the objects reducing in size, and vice versa

	function CanvasX(X){return (X*ZoomAmount)+XPosition;} // Converts CanvasSpace X, to true X
	function CanvasY(Y){return (Y*ZoomAmount)+YPosition;} // Converts CanvasSpace Y, to true Y
	function CanvasLength(Length){return Length*ZoomAmount;} // Converts a CanvasSpace Length, to true Length

	// Converts a client position (in the userview) to a position on the CanvasSpace	
	function ClientXToSpaceX(X){ return (X - XPosition)/ZoomAmount; }
	function ClientYToSpaceY(Y){ return (Y - YPosition)/ZoomAmount; }	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	function AdjustCanvasToFill(){
		document.getElementById('MainCanvas').height = window.innerHeight;
		document.getElementById('MainCanvas').width = window.innerWidth;
		Render();
	}
