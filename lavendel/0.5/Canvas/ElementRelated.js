// Detect Change In Window Size /// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// ////
function DetectChangeInWindowSize(){
	if( ContainerElement.offsetWidth != ContainerElement_Dimensions[0] || ContainerElement.offsetHeight != ContainerElement_Dimensions[1] ){
		ContainerElement_Dimensions = [ContainerElement.offsetWidth,ContainerElement.offsetHeight];

		var TempWidth; var TempHeight;
		if(ContainerElement_Dimensions[0][ContainerElement_Dimensions[0].length-1] == "%"){TempWidth = ContainerElement.parentElement.offsetWidth*(parseInt(ContainerElement.style.width.slice(0,-1))/100);			}
		else{TempWidth = ContainerElement_Dimensions[0];}
		if(ContainerElement_Dimensions[1][ContainerElement_Dimensions[1].length-1] == "%"){TempHeight = ContainerElement.parentElement.offsetHeight*(parseInt(ContainerElement.style.height.slice(0,-1))/100); }
		else{TempHeight = ContainerElement_Dimensions[1];}

		ViewportElement.width = TempWidth; ViewportElement.height = TempHeight;
		SelectionMatrixElement.width = TempWidth; SelectionMatrixElement.height = TempHeight;
	}
}
//// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// ////


// Rendering Calculations //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 
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



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Canvas/ElementRelated.js loaded"); BootCount++;