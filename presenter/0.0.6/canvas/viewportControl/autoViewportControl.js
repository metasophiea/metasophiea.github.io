function autoControl(){
	if(activeViewportMovementScript.position.length != 0){ view.angle = 0;
		setViewportCenterPosition(activeViewportMovementScript.position.shift());
		exact_zoomToPosition(activeViewportMovementScript.zoom.shift(),[0.5,0.5]);
		spinAroundPoint(activeViewportMovementScript.angle.shift(),[0.5,0.5]);
	}
}

function getStartPosition(){
	if(activeViewportMovementScript.position.length === 0){
		var temp = getViewportPoint([0.5,0.5]);
		return {"position":[-temp[0],-temp[1]], "zoom":view.zoom.value, "angle":view.angle}; 
	}
	else{ return {"position":activeViewportMovementScript.position[activeViewportMovementScript.position.length-1], "zoom":activeViewportMovementScript.zoom[activeViewportMovementScript.zoom.length-1], "angle":activeViewportMovementScript.angle[activeViewportMovementScript.angle.length-1]}; }
}

function createPathTo(position,data={}){
	var Start = getStartPosition(); var End = getStartPosition();
	var producedArray = {"position":[], "angle":[], "zoom":[] };

	if(position.hasOwnProperty('position')){End.position = position.position;}
	if(position.hasOwnProperty('zoom')){End.zoom = getZoomValueFromIndex(position.zoom);}
	if(position.hasOwnProperty('angle')){End.angle = position.angle;}
	if(data.hasOwnProperty('type')){var type = data.type;}else{var type = "linear";}
	if(data.hasOwnProperty('duration')){var duration = data.duration;}else{var duration = 1;}

	var steps = duration*activeViewportMovementRefreshesPerSecond;

	if(type == 'none'){
		producedArray.position.push([End.position[0],End.position[1]]);
		producedArray.zoom.push(End.zoom);
		producedArray.angle.push(End.angle);
	}else{
		producedArray.position = producedArray.position.concat(createPath(type,Start.position,End.position,steps));
		producedArray.zoom = producedArray.zoom.concat(createPath(type,Start.zoom,End.zoom,steps));
		producedArray.angle = producedArray.angle.concat(createPath(type,Start.angle,End.angle,steps));
	}

	for(var a = 0; a < producedArray.position.length; a++){
		activeViewportMovementScript.position.push(producedArray.position[a]);
		activeViewportMovementScript.zoom.push(producedArray.zoom[a]);
		activeViewportMovementScript.angle.push(producedArray.angle[a]);
	}
}

function getPositionHere(){return {'position':getViewportPoint([0.5,0.5]), 'zoom':view.zoom.index, 'angle':view.angle};}