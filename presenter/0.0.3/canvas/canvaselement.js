// Detect Change In Window Size /// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// ////
function AdjustCanvasToFill(){
	ViewportElement.height = window.innerHeight; ViewportElement.width = window.innerWidth;
	SelectionMatrixElement.height = window.innerHeight; SelectionMatrixElement.width = window.innerWidth;
}

// Rendering Calculations //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// ////
	function GetWidthAndHeightOfViewport(){ return [ViewportElement.width,ViewportElement.height]; }
	function CanvasLength(length){return length*view.zoom.value;} // Converts a ViewportSpace Length, to true window Length
	function ViewportLength(length){return length/view.zoom.value;} // Converts a true window Length, to a ViewportSpace Length
	function CanvasToViewport(X,Y){
		//Viewport Angle
			//Get distance from Zero
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

			//Add Angle
			Ang = Ang + view.angle;

			//Convert back to Cartesian
			X = (Dis*Math.cos(Ang)); Y = -(Dis*Math.sin(Ang)); 

		//Viewport Zoom and Pan
		X = CanvasLength(X+view.position[0]); Y = CanvasLength(Y+view.position[1]);

		return [X,Y];
	}

	function ViewportDifference(event,x,y){
		var output = [x*Math.cos(view.angle)+y*Math.sin(-view.angle),x*Math.sin(view.angle)+y*Math.cos(-view.angle)];
		return [ViewportLength(output[0]),ViewportLength(output[1])];
	}

	function ViewportPointsAt(X,Y){
		//X and Y are a number between 0 and 1, representing how far down or right they are
			var X = ViewportElement.width*X; var Y = ViewportElement.height*Y;			
			X = ViewportLength(X) - view.position[0]; Y = ViewportLength(Y) - view.position[1];	
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
				Ang = Ang - view.angle;
			X = (Dis*Math.cos(Ang)); Y = -(Dis*Math.sin(Ang));

		return [X,Y];
	}	



 // Positional Calculations //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 
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
	function GetCartesian(Ang,Dis){ return [(Dis*Math.cos(Ang)), -(Dis*Math.sin(Ang))]; }

 // ID Colouring for Selection Matrix //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 
	function ColourToID(RGBA){ return (256*256*RGBA[2] + 256*RGBA[1] + RGBA[0])-1; }
	function IDtoColour(ID){//Must remove 'a' value
		var temp = ID + 1;
		var R = 0; var G = 0; var B = 0;
		while(temp > 0){
			R++; temp--;
			if(R == 256){R = 0; G++;}
			if(G == 256){G = 0; B++;}
		}
		return "rgba("+R+","+G+","+B+",1)";
	}

	function PointToID(X,Y){ var data = SelectionMatrix.getImageData(X-1,Y-1,3,3).data;
		for(var a = 0; a < data.length-4; a+=4){
			if((data[a] != data[a+4]) || (data[a+1] != data[a+5]) || (data[a+2] != data[a+6]) ||  (data[a+3] != data[a+7])){return -1;}
		}
		return (256*256*data[2] + 256*data[1] + data[0])-1;
	}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/canvaselement.js loaded"); BootCount++;