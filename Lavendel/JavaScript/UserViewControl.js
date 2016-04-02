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

	function AutoPan(EndX,EndY,TimeToTake){ var StartX = XPosition; var StartY = YPosition;
		var PanningRoute = {"X":[],"Y":[]}; var Frames = TimeToTake*RefreshCount; var FrameCount = 0;
		if(MovementFrames.X[MovementFrames.X.length-1] != null){ 
			StartX = MovementFrames.X[MovementFrames.X.length-1];
			StartY = MovementFrames.Y[MovementFrames.Y.length-1];
		}

		PanningRoute.X = RouteCurveMaker(StartX, EndX, Frames, 'cosin');
		PanningRoute.Y = RouteCurveMaker(StartY, EndY, Frames, 'cosin');

		//Attached frames to end of current reel
			MovementFrames.X.push.apply(MovementFrames.X,PanningRoute.X);
			MovementFrames.Y.push.apply(MovementFrames.Y,PanningRoute.Y);
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Zoom //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// >> Globals Required <<
	// XPosition (number) & YPosition (number)
	// - The current userview position. All canvas objects are positioned relitive to these values
	// ZoomAmount (number)
	// - Simply the zoom multiplier. This number is used with canvas object's positions to change their rendered size
	// - The number starts at 1, with anything lower resulting in the objects reducing in size, and vice versa
	// ZoomIndex (number) & Zoom_Index (array of numbers)

	function Zoom(Index){
		var cap = (Zoom_Index.length - 1)/2;
		if(ZoomIndex < -cap){ZoomIndex = -cap;}else if(ZoomIndex > cap){ZoomIndex = cap;}
		ZoomIndex = Index; ZoomAmount = Zoom_Index[Index+cap];
	}
	function SimpleZoom(Index){Zoom_WithPercentage(Index,0.5,0.5);}
	function Zoom_WithPercentage(Index,X,Y){
		if(X > 1){X = 1;}else if(X < 0){X = 0;}
		if(Y > 1){Y = 1;}else if(Y < 0){Y = 0;}
		Zoom_WithViewportPosition(Index,document.getElementById('MainCanvas').width*X,document.getElementById('MainCanvas').height*Y);
	}
	function Zoom_WithViewportPosition(Index,X,Y){
		if(X > document.getElementById('MainCanvas').width){X = document.getElementById('MainCanvas').width;}else if(X < 0){X = 0;}
		if(Y > document.getElementById('MainCanvas').height){Y = document.getElementById('MainCanvas').height;}else if(Y < 0){Y = 0;}

		var BeforeZoom_CursorX = (X - XPosition)/ZoomAmount;
		var BeforeZoom_CursorY = (Y - YPosition)/ZoomAmount;

		Zoom(Index);

		var AfterZoom_CursorX = (X - XPosition)/ZoomAmount;
		var AfterZoom_CursorY = (Y - YPosition)/ZoomAmount;

		XPosition = XPosition + (AfterZoom_CursorX-BeforeZoom_CursorX)*ZoomAmount;
  		YPosition = YPosition + (AfterZoom_CursorY-BeforeZoom_CursorY)*ZoomAmount;	
	}

	// Machine Control ////////// ////////// ////////// ////////// ////////// ////////// ////////// ////////// ////////// //////////
	function AutoZoom(FinishIndex, TimeToTake){var StartIndex = ZoomIndex;
		if(FinishIndex < -cap){FinishIndex = -cap;}else if(FinishIndex > cap){FinishIndex = cap;}
		var cap = (Zoom_Index.length - 1)/2;
		var ZoomingRoute = []; var Frames = TimeToTake*RefreshCount; var FrameCount = 0;

		if(MovementFrames.Zoom[MovementFrames.Zoom.length-1] != null){ 
			StartIndex = FindClosestIndex(MovementFrames.Zoom[MovementFrames.Zoom.length-1]);
		}

		ZoomingRoute = RouteCurveMaker(Zoom_Index[StartIndex+cap], Zoom_Index[FinishIndex+cap], Frames, 'cosin');

		//Attached frames to end of current reel
			for(var a = 0; a < ZoomingRoute.length; a++){
				MovementFrames.Zoom.push(ZoomingRoute[a]);
			}
	}

	// Mouse Control / ////////// ////////// ////////// ////////// ////////// ////////// ////////// ////////// ////////// //////////
	function MouseZoom(data, object){
		var NewZoomIndex = ZoomIndex;
		if( data.deltaY > 0){//Zoom out
			NewZoomIndex--; if(NewZoomIndex < -16){NewZoomIndex = -16;}
		}
		else if( data.deltaY < 0 ){//Zoom in
			NewZoomIndex++; if(NewZoomIndex > 16){NewZoomIndex = 16;}
		}
		Zoom_WithViewportPosition(NewZoomIndex,data.clientX,data.clientY);
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
