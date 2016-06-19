function render(){
	drawList.main.clear(); var temp = getViewportPoint([0.5,0.5]);
	drawList.main.add( new poly({ "initialData":{"points":[[temp[0]+0,temp[1]+0], [temp[0]+0,temp[1]+100], [temp[0]+100,temp[1]+100], [temp[0]+100,temp[1]+0]]}, "styleData":{"R":255,"G":200,"B":200} }) );

	var temp = getViewportElementDimensions();
	viewport.clearRect(0, 0, temp[0], temp[1]);
	selectionMatrix.clearRect(0, 0, temp[0], temp[1]);

	temp = Object.keys(drawList)
	for(var a = 0; a < temp.length; a++){
		drawList[temp[a]].render();
	}
}
function drawBackground(){
	drawList.background.add( new poly({ "initialData":{"points":[[0,0], [0,-100], [-100,-100], [-100,0]]}, "styleData":{"R":255,"G":0,"B":0} }) );
	drawList.background.add( new poly({ "initialData":{"points":[[10,-10], [10,-110], [110,-110], [110,-10]]}, "styleData":{"R":255,"G":255,"B":0} }) );
	
	drawList.background.add( new poly({ "initialData":{"points":[[0,0], [0,100], [100,100], [100,0]]}, "styleData":{"R":255,"G":0,"B":255} }) );	
	drawList.background.add( new poly({ "initialData":{"points":[[-50,-50], [-50,50], [50,50], [50,-50]]}, "styleData":{"R":255,"G":100,"B":100} }) );	
	drawList.background.add( new poly({ "initialData":{"points":[[100,100], [100,200], [200,200], [200,100]]}, "styleData":{"R":0,"G":255,"B":0} }) );	

	drawList.background.add( new image({ "initialData":{"position":[200,200],"anchor":[0.8,0.8],"width":100,"height":200,"angle":Math.PI/4}, "styleData":{"URL":"http://cdn.earthporm.com/wp-content/uploads/2014/08/amazing-trees-17.jpg"} }) );	

}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
BootCount++; console.log("./canvas/render.js");