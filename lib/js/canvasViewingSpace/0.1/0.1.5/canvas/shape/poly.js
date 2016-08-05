function poly(canvas,points,colour,outlineColour,outlineThickness){
	canvas.fillStyle = colour;
	canvas.strokeStyle = outlineColour;
	canvas.lineWidth = outlineThickness;

	canvas.beginPath(); 
	canvas.moveTo( points[0][0],points[0][1] );
	for(var a = 1; a < points.length; a++){ 
		canvas.lineTo( points[a][0],points[a][1] ); 
	}

	canvas.closePath(); canvas.fill(); canvas.stroke();
}