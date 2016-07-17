function mouseInterface_drawRectangle(event){
	removeMouseInterface();

	var originPoint = getViewportPoint_fromPoint([event.layerX,event.layerY]);
	drawList.temp.add( new regularShape_rectangle({ "initialData":{"position":originPoint,"anchor":[0,0],"width":0,"height":0,"angle":-view.angle}, "styleData":{"R":Math.floor(Math.random()*255),"G":Math.floor(Math.random()*255),"B":Math.floor(Math.random()*255)} }) );	

	viewportElement.setAttributeNS(null,"onmousemove","mouseInterface_drawRectangle_drag(["+[event.layerX,event.layerY]+"],event);");
	viewportElement.setAttributeNS(null,"onmouseout","mouseInterface_drawRectangle_finish();setupMouseInterface();");
	viewportElement.setAttributeNS(null,"onmouseup","mouseInterface_drawRectangle_finish();setupMouseInterface();");
}

function mouseInterface_drawRectangle_drag(originPoint,event){
	drawList.temp.getObj(0).set('width',getViewportLength(event.layerX-originPoint[0]));
	drawList.temp.getObj(0).set('height',getViewportLength(event.layerY-originPoint[1]));
}
function mouseInterface_drawRectangle_finish(){
	var data = drawList.temp.getObj(0).getData();

	if(data.initialData.width < 0){
		data.initialData.position[0] = data.initialData.position[0] + data.initialData.width;
		data.initialData.width = -data.initialData.width;
	}
	var temp = getPolarFrom( [data.initialData.width/2,data.initialData.height/2] );
	temp[1] += data.initialData.angle;
	temp = getCartesian(temp);

	data.initialData.position = [data.initialData.position[0]+temp[0] , data.initialData.position[1]+temp[1]];
	data.initialData.anchor = [0.5,0.5];
	drawList.foreground.add( new superShape_adjustableRectangle({ "initialData":data.initialData, "styleData":data.styleData }) );	
	drawList.temp.removeAll();
}