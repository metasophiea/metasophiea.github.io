function zoomToPosition(index,point){
	if( point[0] < 0 ){point[0] = 0;}else if( point[0] > 1 ){point[0] = 1;} 
	if( point[1] < 0 ){point[1] = 0;}else if( point[1] > 1 ){point[1] = 1;} 
	
	var OldPoints = getViewportPoint(point);
	view.zoom.index = index; view.zoom.value = getZoomValueFromIndex(index);
	var NewPoints = getViewportPoint(point);

	OldPoints = [getPolarFrom(OldPoints)[0],getPolarFrom(OldPoints)[1]+view.angle];
	NewPoints = [getPolarFrom(NewPoints)[0],getPolarFrom(NewPoints)[1]+view.angle];

	OldPoints = getCartesian(OldPoints);
	NewPoints = getCartesian(NewPoints);

	view.position[0] = view.position[0] + (NewPoints[0]-OldPoints[0]);
	view.position[1] = view.position[1] + (NewPoints[1]-OldPoints[1]);
}

function exact_zoomToPosition(value,point){
	if( point[0] < 0 ){point[0] = 0;}else if( point[0] > 1 ){point[0] = 1;} 
	if( point[1] < 0 ){point[1] = 0;}else if( point[1] > 1 ){point[1] = 1;} 
	
	var OldPoints = getViewportPoint(point);
	view.zoom.index = getClosestZoomIndexFromValue(value); view.zoom.value = value;
	var NewPoints = getViewportPoint(point);

	OldPoints = [getPolarFrom(OldPoints)[0],getPolarFrom(OldPoints)[1]+view.angle];
	NewPoints = [getPolarFrom(NewPoints)[0],getPolarFrom(NewPoints)[1]+view.angle];

	OldPoints = getCartesian(OldPoints);
	NewPoints = getCartesian(NewPoints);

	view.position[0] = view.position[0] + (NewPoints[0]-OldPoints[0]);
	view.position[1] = view.position[1] + (NewPoints[1]-OldPoints[1]);
}








function getZoomValueFromIndex(index){
	if(index > 16){index = 16;}else if(index < -16){index = -16;}
	var ZoomHash = {	"-16":0.1, "-15":0.11, "-14":0.13, "-13":0.15, "-12":0.17, "-11":0.2, "-10":0.22, "-9":0.26, 
				"-8":0.3, "-7":0.33, "-6":0.38, "-5":0.43, "-4":0.5, "-3":0.65, "-2":0.75, "-1":0.875, 
				"0":1, 
				"1":1.25, "2":1.3, "3":1.4, "4":1.5, "5":1.68, "6":1.8, "7":2.1, "8":2.5, 
				"9":2.8, "10":3.1, "11":3.5, "12":3.8, "13":4.2, "14":4.8, "15":5.7, "16":6.5 };
	return ZoomHash[index];
}
function getClosestZoomIndexFromValue(exact){
	if(getZoomValueFromIndex(0) == exact){ return 0;}
	else if(getZoomValueFromIndex(0) < exact){
		for(var a = 0; a < 16+1; a++){
			if(getZoomValueFromIndex(a) >= exact){return a-1;}
		}return 16;
	}
	else{
		for(var a = 0; a > -16-1; a--){
			if(getZoomValueFromIndex(a) < exact){return a+1;}
		}return -16;
	}
}



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("./canvas/viewportControl/zoom.js"); BootCount++;