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
function getCartesian(polar){return [(polar[0]*Math.cos(polar[1])), -(polar[0]*Math.sin(polar[1]))];}


function createPath(type,start,end,stepcount){
	var toClass = {}.toString; 
	if(toClass.call( start ) == '[object Number]'){start = [start]; end = [end];}

	var outputArray = []; var temparray = [];
	switch(type){
		case 'linear':
			var diff = [];
			for(var a = 0; a < start.length; a++){
				diff[a] = (end[a]-start[a])/(stepcount-1);
			}

			for(var a = 0; a < stepcount; a++){temparray = [];
				for(var b = 0; b < start.length; b++){
					temparray.push(start[b]+diff[b]*a);
				}

				if(temparray.length == 1){outputArray.push(temparray[0]);}else{outputArray.push(temparray);}
			}
			return outputArray;
		break;
		case 'sin':
			var diff = [];
			for(var a = 0; a < start.length; a++){
				diff[a] = (end[a]-start[a]);
			}

			for(var a = 0; a < stepcount-1; a++){temparray = [];
				for(var b = 0; b < start.length; b++){
					temparray.push( start[b] +diff[b]*(Math.sin((Math.PI/2)*(a/stepcount))));
				}

				if(temparray.length == 1){outputArray.push(temparray[0]);}else{outputArray.push(temparray);}
			}

			temparray = [];
			for(var b = 0; b < start.length; b++){temparray.push(end[b]);}
			if(temparray.length == 1){outputArray.push(temparray[0]);}else{outputArray.push(temparray);}					
			return outputArray;
		break;
		case 'cos':
			var diff = [];
			for(var a = 0; a < start.length; a++){
				diff[a] = (end[a]-start[a]);
			}

			for(var a = 0; a < stepcount-1; a++){temparray = [];
				for(var b = 0; b < start.length; b++){
					temparray.push( start[b] +diff[b]*(1-Math.cos((Math.PI/2)*(a/stepcount))));
				}

				if(temparray.length == 1){outputArray.push(temparray[0]);}else{outputArray.push(temparray);}
			}

			temparray = [];
			for(var b = 0; b < start.length; b++){temparray.push(end[b]);}
			if(temparray.length == 1){outputArray.push(temparray[0]);}else{outputArray.push(temparray);}	
			return outputArray;
		break;

		case 'cosin':
			var diff = [];
			for(var a = 0; a < start.length; a++){
				diff[a] = (end[a]-start[a]);
			}

			for(var a = 0; a < stepcount/2; a++){temparray = [];
				for(var b = 0; b < start.length; b++){
					temparray.push( start[b] +(diff[b] - diff[b]*Math.cos((Math.PI/2)*(2*a/stepcount)))/2 );
				}
				if(temparray.length == 1){outputArray.push(temparray[0]);}else{outputArray.push(temparray);}
			}

			for(var a = stepcount/2; a < stepcount-1; a++){temparray = [];
				for(var b = 0; b < start.length; b++){
					temparray.push( start[b] + diff[b]/2 + (diff[b]*Math.sin((2*(a-stepcount/2)/stepcount)*(Math.PI/2)))/2 );
				}
				if(temparray.length == 1){outputArray.push(temparray[0]);}else{outputArray.push(temparray);}
			}

			temparray = [];
			for(var b = 0; b < start.length; b++){temparray.push(end[b]);}
			if(temparray.length == 1){outputArray.push(temparray[0]);}else{outputArray.push(temparray);}	
			return outputArray;
		break;
	}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./calculations.js loaded"); BootCount++;