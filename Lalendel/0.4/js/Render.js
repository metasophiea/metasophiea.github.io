function Render(){
	Viewport.clearRect(0, 0, document.getElementById('Viewport').width, document.getElementById('Viewport').height);
	SelectionMatrix.clearRect(0, 0, document.getElementById('SelectionMatrix').width, document.getElementById('SelectionMatrix').height);

	for(var a = 0; a < DrawList.Background.length; a++){DrawList.Background[a].Draw();}
	for(var a = 0; a < DrawList.Main.length; a++){DrawList.Main[a].Draw();}
	for(var a = 0; a < DrawList.Temp.length; a++){DrawList.Temp[a].Draw();}	
}

function DrawBackground(){
	console.log("Drawing background..");

	DrawList.Background.push( new poly({ "ID":GetNextID("Background"), "InitialData":{"Points":[[0,0], [0,100], [100,100], [100,0]]}, "StyleData":{"R":255,"G":0,"B":0} }) );	
	DrawList.Background.push( new poly({ "ID":GetNextID("Background"), "InitialData":{"Points":[[0,-5000], [0,5000], [10,5000], [10,-5000]]} }) );
	DrawList.Background.push( new poly({ "ID":GetNextID("Background"), "InitialData":{"Points":[[-5000,0], [-5000,10], [5000,10], [5000,0]]} }) );
	DrawList.Background.push( new image({"ID":GetNextID("Background"), "InitialData":{"Center":[100,100],"Width":100,"Height":200,"Angle":Math.PI/4}, "StyleData":{"URL":"http://img.timeinc.net/time/photoessays/2008/trees/franklin_trees_01.jpg"} }) );	
	DrawList.Background.push( new text({ "ID":GetNextID("Background"), "InitialData":{"Center":[200,200],"Width":300,"Height":200,"Angle":0}, "StyleData":{"Text":["Hello","hello again", "get outta here"], "Font":"Lucida Sans Unicode", "Size":100, "R":255,"G":100,"B":200, "Thickness":5, "Align":"left", "LineSpacing":0.5} }) );	



	console.log("..finished");
	console.log("Background object count: " + DrawList.Background.length);
}