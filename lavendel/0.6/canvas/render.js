function Render(){DetectChangeInWindowSize();
	Viewport.clearRect(0, 0, ViewportElement.width, ViewportElement.height);
	SelectionMatrix.clearRect(0, 0, SelectionMatrixElement.width, SelectionMatrixElement.height);

	for(var a = 0; a < DrawList.Background.length; a++){DrawList.Background[a].Draw();}
	for(var a = 0; a < DrawList.Main.length; a++){DrawList.Main[a].Draw();}
	for(var a = 0; a < DrawList.Temp.length; a++){DrawList.Temp[a].Draw();}	

	//spin += 0.03; if(spin >= Math.PI*2){spin = 0;}
	//GetObjectFromID(stemp).set('angle',spin);


}

var stemp; var spin = 0;
function DrawBackground(){
	console.log("Drawing background..");

	DrawList.Background.push( new poly({ "ID":GetNextID("background"), "InitialData":{"Points":[[0,0], [0,100], [100,100], [100,0]]}, "StyleData":{"R":255,"G":0,"B":0} }) );	
//	DrawList.Background.push( new poly({ "ID":GetNextID("background"), "InitialData":{"Points":[[0,-5000], [0,5000], [10,5000], [10,-5000]]} }) );
//	DrawList.Background.push( new poly({ "ID":GetNextID("background"), "InitialData":{"Points":[[-5000,0], [-5000,10], [5000,10], [5000,0]]} }) );
	//DrawList.Background.push( new image({"ID":GetNextID("background"), "InitialData":{"Center":[100,100],"Width":100,"Height":200,"Angle":Math.PI/4}, "StyleData":{"URL":"http://cdn.earthporm.com/wp-content/uploads/2014/08/amazing-trees-17.jpg"} }) );	

	stemp = GetNextID("background");
	DrawList.Background.push( new image2({"ID":stemp, "InitialData":{"Position":[200,200],"Anchor":[0,0],"Width":100,"Height":200,"Angle":Math.PI/5}, "StyleData":{"URL":"http://cdn.earthporm.com/wp-content/uploads/2014/08/amazing-trees-17.jpg"} }) );	


	DrawList.Background.push( new text({ "ID":GetNextID("background"), "InitialData":{"Center":[200,200],"Width":300,"Height":200,"Angle":0}, "StyleData":{"Text":["Hello","hello again", "get outta here"], "Font":"Lucida Console", "Size":100, "R":255,"G":100,"B":200, "Thickness":5, "Align":"left", "LineSpacing":0.5} }) );	



	console.log("..finished");
	console.log("Background object count: " + DrawList.Background.length);
}




// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/render.js loaded"); BootCount++;