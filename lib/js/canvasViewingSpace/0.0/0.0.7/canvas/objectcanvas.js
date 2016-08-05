// Detect Change In Window Size /// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// ////
function DetectChangeInWindowSize(){
	if( lavendel_ContainerElement.offsetWidth != lavendel_ContainerElement_Dimensions[0] || lavendel_ContainerElement.offsetHeight != lavendel_ContainerElement_Dimensions[1] ){
		lavendel_ContainerElement_Dimensions = [lavendel_ContainerElement.offsetWidth,lavendel_ContainerElement.offsetHeight];

		var TempWidth; var TempHeight;
		if(lavendel_ContainerElement_Dimensions[0][lavendel_ContainerElement_Dimensions[0].length-1] == "%"){TempWidth = lavendel_ContainerElement.parentElement.offsetWidth*(parseInt(lavendel_ContainerElement.style.width.slice(0,-1))/100);			}
		else{TempWidth = lavendel_ContainerElement_Dimensions[0];}
		if(lavendel_ContainerElement_Dimensions[1][lavendel_ContainerElement_Dimensions[1].length-1] == "%"){TempHeight = lavendel_ContainerElement.parentElement.offsetHeight*(parseInt(lavendel_ContainerElement.style.height.slice(0,-1))/100); }
		else{TempHeight = lavendel_ContainerElement_Dimensions[1];}

		ViewportElement.width = TempWidth; ViewportElement.height = TempHeight;
		SelectionMatrixElement.width = TempWidth; SelectionMatrixElement.height = TempHeight;
	}
}
//// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// ////


// Rendering Calculations //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 
	function GetWidthAndHeightOfViewport(){ return [ViewportElement.width,ViewportElement.height]; }
	function CanvasLength(Length){return Length*View.Zoom.Value;} // Converts a ViewportSpace Length, to true window Length
	function ViewportLength(Length){return Length/View.Zoom.Value;} // Converts a true window Length, to a ViewportSpace Length
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
			Ang = Ang + View.Angle;

			//Convert back to Cartesian
			X = (Dis*Math.cos(Ang)); Y = -(Dis*Math.sin(Ang)); 

		//Viewport Zoom and Pan
		X = CanvasLength(X+View.Position[0]); Y = CanvasLength(Y+View.Position[1]);

		return [X,Y];
	}
 //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 

 // ID Colouring for Selection Matrix
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

	function PointToID(X,Y){ var data = SelectionMatrix.getImageData(X-1,Y-1,1,1).data;
		for(var a = 0; a < data.length-4; a+=4){
			if((data[a] != data[a+4]) || (data[a+1] != data[a+5]) || (data[a+2] != data[a+6]) ||  (data[a+3] != data[a+7])){return -1;}
		}
		return (256*256*data[2] + 256*data[1] + data[0])-1;
	}
//// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// ////



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/objectcanvas.js loaded"); BootCount++;