Math.geometry = new function(){
	this.distance = function(point_1,point_a){ return Math.pow((Math.pow((point_a[0]-point_1[0]),2) + Math.pow((point_a[1]-point_1[1]),2)),0.5); }

	//Polar [distance,angle]
	//Cartesian [X,Y]
	this.polarToCartesian = function(polar){ return [(polar[0]*Math.cos(polar[1])), (polar[0]*Math.sin(polar[1]))]; }
	this.cartesianToPolar = function(point){
		var dis = Math.pow(Math.pow(point[0],2)+Math.pow(point[1],2),0.5); var ang = 0;

		if(point[0] === 0 ){
			if(point[1] === 0){ang = 0;}
			else if(point[1] > 0){ang = 0.5*Math.PI;}
			else{ang = 1.5*Math.PI;}
		}
		else if(point[1] === 0 ){
			if(point[0] >= 0){ang = 0;}else{ang = Math.PI;}
		}
		else if(point[0] >= 0){ ang = Math.atan(point[1]/point[0]); }
		else{ /*if(point[0] < 0)*/ ang = Math.atan(point[1]/point[0]) + Math.PI; }

		return [dis,ang];
	}
}
