function getTopLeftPoint(width,height,position,anchor,angle){
	var left = (anchor[0]*width); var down = (anchor[1]*height); var right = ((1-anchor[0])*width); var up = ((1-anchor[1])*height);

	var temp = 0; var greenangle = 0; var points = [[0,0],[0,0],[0,0],[0,0]]; 
	temp = Math.pow((Math.pow(left,2) + Math.pow(down,2)),0.5); if(down===0){greenangle = 0-angle;}else{greenangle = Math.atan(down/left)-angle;}
	return [position[0]-temp*Math.cos(greenangle),position[1]-temp*Math.sin(greenangle)]; 
}

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

