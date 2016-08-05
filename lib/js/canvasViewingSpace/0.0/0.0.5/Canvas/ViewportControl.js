// Calculation /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function GetPolar(X,Y){
		var Dis = Math.pow(Math.pow((X),2)+Math.pow((Y),2),0.5);

		if(X === 0 && Y === 0){var Ang = 0;}
		else if( X === 0 ){ if(Y >= 0){var Ang = 1.5*Math.PI;}else{var Ang = 0.5*Math.PI;} }
		else if( Y === 0 ){ if(X >= 0){var Ang = 0;}else{var Ang = Math.PI;} }
		else if(Y >= 0 && X >= 0){ var Ang = -Math.atan( (Y)/(X) ); }
		else if(Y < 0 && X >= 0){ var Ang = -Math.atan( (Y)/(X) ); }
		else if(Y < 0 && X < 0){ var Ang = -Math.atan( (Y)/(X) ) + Math.PI; }
		else if(Y >= 0 && X < 0){ var Ang = -Math.atan( (Y)/(X) ) + Math.PI; }
		if(isNaN(Ang)){Ang = 0;} if(Ang >= 2*Math.PI){Ang = Ang - 2*Math.PI;}
		return [Ang,Dis];
	}
	function GetCartesian(Ang,Dis){
		return [(Dis*Math.cos(Ang)), -(Dis*Math.sin(Ang))];
	}

	function ViewportPointsAt(X,Y){
		//X and Y are a number between 0 and 1, representing how far down or right they are
			var X = ViewportElement.width*X; var Y = ViewportElement.height*Y;			
			X = ViewportLength(X) - View.Position[0]; Y = ViewportLength(Y) - View.Position[1];	
				var Dis = Math.pow(Math.pow((X),2)+Math.pow((Y),2),0.5);

			//Calculate Angle (catching odd calculations)
				if(X === 0 && Y === 0){var Ang = 0;}
				else if( X === 0 ){ if(Y >= 0){var Ang = 1.5*Math.PI;}else{var Ang = 0.5*Math.PI;} }
				else if( Y === 0 ){ if(X >= 0){var Ang = 0;}else{var Ang = Math.PI;} }
				else if(Y >= 0 && X >= 0){ var Ang = -Math.atan( (Y)/(X) ); }
				else if(Y < 0 && X >= 0){ var Ang = -Math.atan( (Y)/(X) ); }
				else if(Y < 0 && X < 0){ var Ang = -Math.atan( (Y)/(X) ) + Math.PI; }
				else if(Y >= 0 && X < 0){ var Ang = -Math.atan( (Y)/(X) ) + Math.PI; }
				if(isNaN(Ang)){Ang = 0;} if(Ang >= 2*Math.PI){Ang = Ang - 2*Math.PI;}
				Ang = Ang - View.Angle;
			X = (Dis*Math.cos(Ang)); Y = -(Dis*Math.sin(Ang));

		return [X,Y];
	}	

// Panning /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var PositionInsideBox = [0,0]
var OldPosition = [0,0];
  	function MousePan(event, object){
		object.setAttributeNS(null,"onmousemove","MousePan_Calculate(event)");
		object.setAttributeNS(null,"onmouseout","MousePan_Stop(this)");
		object.setAttributeNS(null,"onmouseup","MousePan_Stop(this)");
		PositionInsideBox[0] = event.offsetX;
		PositionInsideBox[1] = event.offsetY;
		OldPosition[0] = View.Position[0];
		OldPosition[1] = View.Position[1];
	}
	function MousePan_Calculate(event){
		View.Position[0] = ViewportLength(event.offsetX-PositionInsideBox[0])+OldPosition[0];
		View.Position[1] = ViewportLength(event.offsetY-PositionInsideBox[1])+OldPosition[1];
	}
	function MousePan_Stop(object){
		object.removeAttributeNS(null, "onmousemove");
		object.removeAttributeNS(null, "onmouseout");
		object.removeAttributeNS(null, "onmouseup");
		clearTimeout(ClickTimeout_ID);
	}

// Rotation ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var StartPosition = [0,0];
var EndPosition = [0,0];
var StartingAngle = 0; var SpinAmount = 3;
	function MouseSpin(data, object){
		object.setAttributeNS(null,"onmousemove","MouseSpin_Calculate(event)");
		object.setAttributeNS(null,"onmouseout","MouseSpin_Stop(this)");
		object.setAttributeNS(null,"onmouseup","MouseSpin_Stop(this)");
		StartPosition = [(data.offsetX/ViewportElement.width),(data.offsetY/ViewportElement.height)];
		StartingAngle = View.Angle;
	}

	function MouseSpin_Calculate(data){
		EndPosition = [(data.offsetX/ViewportElement.width),(data.offsetY/ViewportElement.height)];
		SpinViewPort(StartPosition[0],StartPosition[1],(StartingAngle - SpinAmount*(EndPosition[1]-StartPosition[1])));
	}

	function MouseSpin_Stop(object){ 
		object.removeAttributeNS(null, "onmousemove");
		object.removeAttributeNS(null, "onmouseout");
		object.removeAttributeNS(null, "onmouseup");
		clearTimeout(ClickTimeout_ID);
	}

	function SpinViewPort(X,Y,Angle){
		//X and Y are a number between 0 and 1, representing how far down or right they are
		//Collect Centre points before and after the spin, while doing the spin
			var OldPoints = ViewportPointsAt(X,Y);
			View.Angle = Angle;
			var NewPoints = ViewportPointsAt(X,Y);	
		//Gather polar coords for these points and add the Viewport angle
			OldPoints = [(GetPolar(OldPoints[0],OldPoints[1])[0]+View.Angle),(GetPolar(OldPoints[0],OldPoints[1])[1])];
			NewPoints = [(GetPolar(NewPoints[0],NewPoints[1])[0]+View.Angle),(GetPolar(NewPoints[0],NewPoints[1])[1])];
		//convert back to Cartesian
			OldPoints = GetCartesian(OldPoints[0],OldPoints[1]);
			NewPoints = GetCartesian(NewPoints[0],NewPoints[1]);
		//Adjust Viewport accordingly
			View.Position[0] = View.Position[0] + (NewPoints[0]-OldPoints[0]);
			View.Position[1] = View.Position[1] + (NewPoints[1]-OldPoints[1]);			
	}

// Zoom //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MouseZoom(data, object){
		var NewZoomIndex = View.Zoom.Index; var cap = (Object.keys(ZoomHash).length - 1)/2;
		if( data.deltaY > 0){ NewZoomIndex--; if(NewZoomIndex < -cap){NewZoomIndex = -cap;} } //Zoom out
		else if( data.deltaY < 0 ){ NewZoomIndex++; if(NewZoomIndex > cap){NewZoomIndex = cap;} } //Zoom in	
		Zoom_WithViewportPosition(NewZoomIndex,data.offsetX/ViewportElement.width,data.offsetY/ViewportElement.height);
	}	

	function Zoom_WithViewportPosition(Index,X,Y){ //X and Y are a number between 0 and 1, representing how far down or right they are
		if( X < 0 ){X = 0;}else if( X > 1 ){X = 1;} if( Y < 0 ){Y = 0;}else if( Y > 1 ){Y = 1;} 
		
		//Collect Centre points before and after the zooom, while doing the zoom
			var OldPoints = ViewportPointsAt(X,Y);
			View.Zoom.Index = Index; View.Zoom.Value = ZoomHash[View.Zoom.Index];
			var NewPoints = ViewportPointsAt(X,Y);	
		//Gather polar coords for these points and add the Viewport angle
			OldPoints = [(GetPolar(OldPoints[0],OldPoints[1])[0]+View.Angle),(GetPolar(OldPoints[0],OldPoints[1])[1])];
			NewPoints = [(GetPolar(NewPoints[0],NewPoints[1])[0]+View.Angle),(GetPolar(NewPoints[0],NewPoints[1])[1])];
		//convert back to Cartesian
			OldPoints = GetCartesian(OldPoints[0],OldPoints[1]);
			NewPoints = GetCartesian(NewPoints[0],NewPoints[1]);
		//Adjust Viewport accordingly
			View.Position[0] = View.Position[0] + (NewPoints[0]-OldPoints[0]);
			View.Position[1] = View.Position[1] + (NewPoints[1]-OldPoints[1]);
	}

	function DirectControlZoom_WithViewportPosition(Exact,X,Y){ //X and Y are a number between 0 and 1, representing how far down or right they are
		if( X < 0 ){X = 0;}else if( X > 1 ){X = 1;} if( Y < 0 ){Y = 0;}else if( Y > 1 ){Y = 1;} 
		
		//Collect Centre points before and after the zooom, while doing the zoom
			var OldPoints = ViewportPointsAt(X,Y);
			View.Zoom.Value = Exact; View.Zoom.Index = ClosestZoomIndex(Exact);
			var NewPoints = ViewportPointsAt(X,Y);	
		//Gather polar coords for these points and add the Viewport angle
			OldPoints = [(GetPolar(OldPoints[0],OldPoints[1])[0]+View.Angle),(GetPolar(OldPoints[0],OldPoints[1])[1])];
			NewPoints = [(GetPolar(NewPoints[0],NewPoints[1])[0]+View.Angle),(GetPolar(NewPoints[0],NewPoints[1])[1])];
		//convert back to Cartesian
			OldPoints = GetCartesian(OldPoints[0],OldPoints[1]);
			NewPoints = GetCartesian(NewPoints[0],NewPoints[1]);
		//Adjust Viewport accordingly
			View.Position[0] = View.Position[0] + (NewPoints[0]-OldPoints[0]);
			View.Position[1] = View.Position[1] + (NewPoints[1]-OldPoints[1]);
	}

	function ClosestZoomIndex(exact){
		var array = Object.keys(ZoomHash);
		var closestDistance = 10; var ans = 0;
		for(var a = 0; a < array.length; a++){
			if(Math.abs(ZoomHash[array[a]]-exact) === 0){return array[a];}
			if(Math.abs(ZoomHash[array[a]]-exact) < closestDistance){
				ans = array[a]; closestDistance = Math.abs(ZoomHash[array[a]]-exact);
			}
		}
		return ans;
	}




// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Canvas/ViewportControl loaded"); BootCount++;