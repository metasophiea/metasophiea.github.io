var spin = 0;
function render(){
//	drawList.foreground.clear(); var temp = getViewportPoint([0.5,0.5]);
//	drawList.foreground.add( new poly({ "initialData":{"points":[[temp[0]+0,temp[1]+0], [temp[0]+0,temp[1]+100], [temp[0]+100,temp[1]+100], [temp[0]+100,temp[1]+0]]}, "styleData":{"R":255,"G":200,"B":200} }) );

	var temp = getViewportElementDimensions();
	viewport.clearRect(0, 0, temp[0], temp[1]);
	selectionMatrix.clearRect(0, 0, temp[0], temp[1]);

	spin += 0.1; if(spin > 2*Math.PI){spin = 0;}
	drawList.background.getObj(5).set('angle',spin);

	temp = Object.keys(drawList);
	for(var a = 0; a < temp.length; a++){
		drawList[temp[a]].render();
	}
}
function drawBackground(){
	drawList.background.add( new poly({ "initialData":{"points":[[0,0], [0,-100], [-100,-100], [-100,0]]}, "styleData":{"R":255,"G":0,"B":0} }) );
	drawList.background.add( new poly({ "initialData":{"points":[[10,-10], [10,-110], [110,-110], [110,-10]]}, "styleData":{"R":255,"G":255,"B":0} }) );
	
	drawList.background.add( new poly({ "initialData":{"points":[[0,0], [0,100], [100,100], [100,0]]}, "styleData":{"R":255,"G":0,"B":255} }) );	
//	drawList.background.add( new poly({ "initialData":{"points":[[-50,-50], [-50,50], [50,50], [50,-50]]}, "styleData":{"R":255,"G":100,"B":100} }) );	
	drawList.background.add( new poly({ "initialData":{"points":[[100,100], [100,200], [200,200], [200,100]]}, "styleData":{"R":0,"G":255,"B":0} }) );	

	drawList.background.add( new image({ "initialData":{"position":[335.25,300],"anchor":[0.5,0.5],"width":200,"height":200,"angle":1}, "styleData":{"URL":"http://cdn.earthporm.com/wp-content/uploads/2014/08/amazing-trees-17.jpg"} }) );	

	drawList.background.add( new text({ "initialData":{"position":[0,0],"anchor":[0.5,0.5],"angle":0,"text":['so let it out and let it in','hey jude begin','the movement you need','is on your shoulder','','and any time you feel the pain','hay jude, refrain','don\'t carry this world','upon your shoulders']}, "styleData":{"fontSize":25,"R":0,"G":255,"B":200,"line_R":100,"line_G":255,"line_B":0,"lineThickness":4} }) );	
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
BootCount++; console.log("./canvas/render.js");
