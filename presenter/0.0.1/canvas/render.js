function Render(){
	Viewport.clearRect(0, 0, ViewportElement.width, ViewportElement.height);
	SelectionMatrix.clearRect(0, 0, SelectionMatrixElement.width, SelectionMatrixElement.height);
	DrawList.Background.render();
	DrawList.Main.render();
}

function DrawBackground(){
	console.log("Drawing background..");

	DrawList.Background.add( new poly({ "InitialData":{"Points":[[0,0], [0,100], [100,100], [100,0]]}, "StyleData":{"R":255,"G":0,"B":0} }) );	
	DrawList.Background.add( new poly({ "InitialData":{"Points":[[0,-5000], [0,5000], [10,5000], [10,-5000]]} }) );
	DrawList.Background.add( new poly({ "InitialData":{"Points":[[-5000,0], [-5000,10], [5000,10], [5000,0]]} }) );
	DrawList.Background.add( new image({ "InitialData":{"Position":[200,200],"Anchor":[0.8,0.8],"Width":100,"Height":200,"Angle":Math.PI/4}, "StyleData":{"URL":"http://cdn.earthporm.com/wp-content/uploads/2014/08/amazing-trees-17.jpg"} }) );	
	DrawList.Background.add( new text({ "InitialData":{"Center":[200,200],"Width":300,"Height":200,"Angle":0}, "StyleData":{"Text":["Hello","hello again", "get outta here"], "Font":"Lucida Console", "Size":100, "R":255,"G":100,"B":200, "Thickness":5, "Align":"left", "LineSpacing":0.5} }) );	

	console.log("..finished");
	console.log("Background object count: " + DrawList.Background.length);
}




// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/render.js loaded"); BootCount++;