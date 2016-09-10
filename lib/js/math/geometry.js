function distanceBetweenTwoPoints(point_1,point_A){
	return Math.pow((Math.pow((point_A[0]-point_1[0]),2) + Math.pow((point_A[1]-point_1[1]),2)),0.5);
}

function getPolarFrom(point){
	var dis = Math.pow(Math.pow(point[0],2)+Math.pow(point[1],2),0.5);
	var ang = 0;

	if(point[0] === 0 && point[1] === 0){ang = 0;}
	else if(point[0] === 0 ){if(point[1] >= 0){ang = 1.5*Math.PI;}else{ang = 0.5*Math.PI;}}
	else if(point[1] === 0 ){if(point[0] >= 0){ang = 0;}else{ang = Math.PI;}}
	else if(point[1] >= 0 && point[0] >= 0){ang = -Math.atan(point[1]/point[0]);}
	else if(point[1] < 0 && point[0] >= 0){ang = -Math.atan(point[1]/point[0]);}
	else if(point[1] < 0 && point[0] < 0){ang = -Math.atan(point[1]/point[0]) + Math.PI;}
	else if(point[1] >= 0 && point[0] < 0){ang = -Math.atan(point[1]/point[0]) + Math.PI;}

	if(isNaN(ang)){ang = 0;} 
	if(ang >= 2*Math.PI){ang = ang - 2*Math.PI;}

	return [dis,ang];
}
function getCartesian(polar){
	return [(polar[0]*Math.cos(polar[1])), -(polar[0]*Math.sin(polar[1]))];
}

console.log("- please update to the correct directory -", "color:rgb(202,136,202); font-style:italic;");