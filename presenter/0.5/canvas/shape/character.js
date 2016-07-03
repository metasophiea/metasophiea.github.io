function character(canvas,position,angle,colour,outlineColour,size,font,outlineThickness,character,bold,italic){
	canvas.fillStyle = colour;
	canvas.strokeStyle = outlineColour;
	canvas.lineWidth = outlineThickness;
	canvas.font = '100pt ' + font;
	canvas.textBaseline = 'hanging';
	if(bold){canvas.font = 'bold ' + canvas.font;}
	if(italic){canvas.font = 'italic ' + canvas.font;}

	var scaleAdjust = size/100; 

	var div = document.createElement("div");
		div.innerHTML = character;
		div.style.position = 'absolute';
		div.style.top  = '-9999px';
		div.style.left = '-9999px';
		div.style.fontFamily = font;
		div.style.fontWeight = bold ? 'bold' : 'normal';
		div.style['font-style'] = italic ? 'italic' : 'normal';
		div.style.fontSize = size + 'pt';
	document.body.appendChild(div);
	size = div.offsetHeight/2;
	document.body.removeChild(div);

	canvas.save();
	canvas.translate(position[0],position[1]);
	canvas.rotate(-view.angle-angle);
	canvas.scale(scaleAdjust,scaleAdjust);
	canvas.fillText(character,position[0],position[1]);
	canvas.strokeText(character,position[0],position[1]);
	canvas.restore();

	return [canvas.measureText(character).width/3,size];
}