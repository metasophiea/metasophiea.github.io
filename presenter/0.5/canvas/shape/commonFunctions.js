function getMyZ(ID){return drawList.foreground.getObjDrawPosition(ID);}

function getCornerPoints(width,height,position,anchor,angle){
	var left = (anchor[0]*width); var down = (anchor[1]*height); var right = ((1-anchor[0])*width); var up = ((1-anchor[1])*height);

	var temp = 0; var greenangle = 0; var points = [[0,0],[0,0],[0,0],[0,0]]; 
	temp = Math.pow((Math.pow(left,2) + Math.pow(down,2)),0.5); if(down===0){greenangle = 0-angle-view.angle;}else{greenangle = Math.atan(down/left)-angle-view.angle;}
	points[0] = [position[0]-temp*Math.cos(greenangle),position[1]-temp*Math.sin(greenangle)]; 
	temp = Math.pow((Math.pow(right,2) + Math.pow(down,2)),0.5); if(right===0){greenangle = angle+view.angle;}else{greenangle = angle+view.angle-Math.atan(right/down);}
	points[1] = [position[0]-temp*Math.sin(greenangle),position[1]-temp*Math.cos(greenangle)]; 
	temp = Math.pow((Math.pow(right,2) + Math.pow(up,2)),0.5); if(up===0){greenangle = angle+view.angle;}else{greenangle = angle+view.angle-Math.atan(up/right);}
	points[2] = [position[0]+temp*Math.cos(greenangle),position[1]-temp*Math.sin(greenangle)];
	temp = Math.pow((Math.pow(left,2) + Math.pow(up,2)),0.5); if(left===0){greenangle = 0-angle-view.angle;}else{greenangle = Math.atan(left/up)-angle-view.angle;}
	points[3] = [position[0]-temp*Math.sin(greenangle),position[1]+temp*Math.cos(greenangle)];
	return points;
}

function markPoints(points){
	viewport.strokeStyle = 'rgb(255,0,0)';
	viewport.lineWidth = 2;
	for(var a = 0; a < 4; a++){
		viewport.beginPath(); viewport.moveTo( points[a][0]-10,points[a][1] );viewport.lineTo( points[a][0]+10,points[a][1] ); viewport.closePath(); viewport.stroke();
		viewport.beginPath(); viewport.moveTo( points[a][0],points[a][1]-10 );viewport.lineTo( points[a][0],points[a][1]+10 ); viewport.closePath(); viewport.stroke();
	}
}

function getTopLeftPoint(width,height,position,anchor,angle){
	var left = (anchor[0]*width); var down = (anchor[1]*height); var right = ((1-anchor[0])*width); var up = ((1-anchor[1])*height);

	var temp = 0; var greenangle = 0; var points = [[0,0],[0,0],[0,0],[0,0]]; 
	temp = Math.pow((Math.pow(left,2) + Math.pow(down,2)),0.5); if(down===0){greenangle = 0-angle;}else{greenangle = Math.atan(down/left)-angle;}
	return [position[0]-temp*Math.cos(greenangle),position[1]-temp*Math.sin(greenangle)]; 
}









//		function distaceFromPoints(point){ var ans = [];
//			var realPosition = getRealPoint(position); var dimention = [getRealLength(width),getRealLength(height)]; var windowLimits = getViewportElementDimensions();
//			var points = getCornerPoints(dimention[0],dimention[1],realPosition,anchor,angle);
//			for(var a = 0; a < points.length; a++){ ans[a] = distanceBetweenTwoPoints(point,points[a]); }
//			return ans;
//		}
//		function closestPointToPoint(point){ var temp = distaceFromPoints(point); var ans = 0;
//			for(var a = 1; a < temp.length; a++){ if(temp[a] < temp[ans]){ans = a;} }
//			if(temp[ans] >= 50){return -1;}
//			return ans;
//		}