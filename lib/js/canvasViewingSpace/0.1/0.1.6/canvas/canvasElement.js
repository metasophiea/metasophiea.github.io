//----------------------------------------------------------------------------------------------------------------------------------------//

function getViewportElementDimensions(){ return [viewportElement.width,viewportElement.height];}
function adjustViewportElementToFill(){
	viewportElement.height = window.innerHeight; viewportElement.width = window.innerWidth;
	selectionMatrixElement.height = window.innerHeight; selectionMatrixElement.width = window.innerWidth;
}

//----------------------------------------------------------------------------------------------------------------------------------------//

function getViewportLength(length){return length/view.zoom.value;}
function getViewportPoint(fractionPoint){
	var dimensions = getViewportElementDimensions();
	var greenCross = [dimensions[0]*fractionPoint[0],dimensions[1]*fractionPoint[1]];
	var redCross = [ getViewportLength(greenCross[0])-view.position[0], getViewportLength(greenCross[1])-view.position[1] ];
	var polar = getPolarFrom(redCross); polar[1] = polar[1] - view.angle;
	return getCartesian(polar);
}
function getViewportPoint_fromPoint(point){
	return getViewportPoint([point[0]/viewportElement.width,point[1]/viewportElement.height]);
}

function getRealLength(length){return length*view.zoom.value;}
function getRealPoint(point){
	var polar = getPolarFrom(point); polar[1] = polar[1] + view.angle;
	var point = getCartesian(polar);
	return [getRealLength(point[0]+view.position[0]), getRealLength(point[1]+view.position[1])];
}

//----------------------------------------------------------------------------------------------------------------------------------------//

function getViewportDifference(diff){
	var output = [diff[0]*Math.cos(view.angle)+diff[1]*Math.sin(-view.angle),diff[0]*Math.sin(view.angle)+diff[1]*Math.cos(-view.angle)];
	return [getViewportLength(output[0]),getViewportLength(output[1])];
}
function getReverseViewportDifference(diff){
	var output = [getRealLength(diff[0]),getRealLength(diff[1])];
	
	return [output[0]/Math.cos(view.angle)+output[1]/Math.sin(-view.angle),output[0]/Math.sin(view.angle)+output[1]/Math.cos(-view.angle)];
}


function getObjectDifference(diff,angle){
 	return [diff[0]*Math.cos(angle)+diff[1]*Math.sin(-angle),diff[0]*Math.sin(angle)+diff[1]*Math.cos(-angle)];
}

//----------------------------------------------------------------------------------------------------------------------------------------//

function getColourFromID(ID){
	ID = (ID+1).toString(2).split('').reverse().join('').match(/.{1,8}/g);
	for(var a = 0; a < ID.length; a++){ ID[a] = parseInt(ID[a].split('').reverse().join(''), 2); } 
	if(ID[1] == undefined){ID[1]=0; ID[2]=0;}else if(ID[2] == undefined){ID[2]=0;}
	return "rgba("+ID[0]+","+ID[1]+","+ID[2]+",1)";
}
function getIDFromPoint(X,Y){ 
	var data = selectionMatrix.getImageData(X-1,Y-1,3,3).data;
	for(var a = 0; a < data.length-4; a+=4){
		if((data[a] != data[a+4]) || (data[a+1] != data[a+5]) || (data[a+2] != data[a+6]) ||  (data[a+3] != data[a+7])){return -1;}
	}
	return (256*256*data[2] + 256*data[1] + data[0])-1;
}

//----------------------------------------------------------------------------------------------------------------------------------------//
