function basicShape_image(canvas,width,height,position,anchor,angle,URL){
	var img = new Image(); img.src = URL;

	canvas.save();
	canvas.translate(position[0],position[1]);
	canvas.rotate(-view.angle-angle);
	try{canvas.drawImage(img,-anchor[0]*width,-anchor[1]*height,width,height);}
	catch(e){canvas.fillStyle = "rgb(50,50,50)";canvas.fillRect(-anchor[0]*width,-anchor[1]*height,width,height);}
	canvas.restore();
}
