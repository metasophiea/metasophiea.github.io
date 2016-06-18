function getViewportElementDimensions(){ return [viewportElement.width,viewportElement.height];}
function adjustViewportElementToFill(){
	viewportElement.height = window.innerHeight; viewportElement.width = window.innerWidth;
	selectionMatrixElement.height = window.innerHeight; selectionMatrixElement.width = window.innerWidth;
}

function getViewportLength(length){return length/view.zoom.value;}
function getRealLength(length){return length*view.zoom.value;}
function getRealPoint(point){
	var polar = getPolarFrom(point); polar[1] = polar[1] + view.angle;
	var point = getCartesian(polar);
	return [getRealLength(point[0]+view.position[0]), getRealLength(point[1]+view.position[1])];
}
function getViewportPoint(fractionPoint){
	var dimensions = getViewportElementDimensions();
	greenCross = [dimensions[0]*fractionPoint[0],dimensions[1]*fractionPoint[1]];
	redCross = [ getViewportLength(greenCross[0])-view.position[0], getViewportLength(greenCross[1])-view.position[1] ];
	var polar = getPolarFrom(redCross); polar[1] = polar[1] - view.angle;
	return getCartesian(polar);	
}


function getColourFromID(ID){
	ID = ID.toString(2).split('').reverse().join('').match(/.{1,8}/g);
	for(var a = 0; a < ID.length; a++){ ID[a] = parseInt(ID[a].split('').reverse().join(''), 2); }
	return "rgba("+ID[0]+","+ID[1]+","+ID[2]+",1)";
}

function getZoomValueFromIndex(index){
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
BootCount++; console.log('./canvas/canvasElement.js');