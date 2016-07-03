function rectangle(canvas,width,height,position,anchor,angle,colour,outlineColour,outlineThickness){
	canvas.fillStyle = colour;
	canvas.strokeStyle = outlineColour;
	canvas.lineWidth = outlineThickness;

	canvas.save();
	canvas.translate(position[0],position[1]);
	canvas.rotate(-view.angle-angle);
	canvas.fillRect(-anchor[0]*width,-anchor[1]*height,width,height);
	canvas.strokeRect(-anchor[0]*width,-anchor[1]*height,width,height);	
	canvas.restore();
}