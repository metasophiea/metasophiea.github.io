function DrawBackground(){
	console.log("Drawing background..");

	var count = 5;
	for(var a = -count; a < count; a++){
		for(var b = -count; b < count; b++){
			BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[a*100+(0),b*100+(0)], [a*100+(0),b*100+(100)], [a*100+(100),b*100+(100)], [a*100+(100),b*100+(0)]]}, "StyleData":{"R":(Math.floor((256*Math.random()))),"G":(Math.floor((256*Math.random()))),"B":(Math.floor((256*Math.random())))} }) );
		}	
	}

	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[0,-5000], [0,5000], [10,5000], [10,-5000]]} }) );
	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[-5000,0], [-5000,10], [5000,10], [5000,0]]} }) );

	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[0,0], [0,100], [100,100], [100,0]]}, "StyleData":{"R":255,"G":0,"B":0} }) );
	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[60,60], [60,160], [160,160], [160,60]]}, "StyleData":{"R":255,"G":0,"B":0} }) );
	BackgroundDrawList.push( new image({"ID":101, "InitialData":{"Center":[100,100],"Width":100,"Height":200,"Angle":Math.PI/4}, "StyleData":{"URL":"https://fanart.tv/fanart/music/a173a2b0-a6c0-403b-911a-1d01c82918a6/albumcover/myst-iv-revelation-4e1e6ad73cb90.jpg"} }) );	
	BackgroundDrawList.push( new image({"ID":102, "InitialData":{"Center":[-100,-200],"Width":300,"Height":200,"Angle":0}, "StyleData":{"URL":"http://www.computing.co.uk/IMG/313/205313/cookies.jpg"} }) );	
	BackgroundDrawList.push( new image({"ID":103, "InitialData":{"Center":[-200,100],"Width":300,"Height":200,"Angle":0}, "StyleData":{"URL":"http://i.imgur.com/Yk8AgYk.gif"} }) );	
	BackgroundDrawList.push( new text({"ID":104, "InitialData":{"Center":[200,200],"Width":300,"Height":200,"Angle":0}, "StyleData":{"Text":["Hello","hello again", "get outta here"], "Font":"Lucida Sans Unicode", "Size":100, "R":255,"G":100,"B":200, "Thickness":5, "Align":"left", "LineSpacing":0.5} }) );	

	console.log("..finished");
	console.log("object count: " + BackgroundDrawList.length);
}


var spin = 0;
function Render(){
	Canvas.clearRect(0, 0, document.getElementById('MainCanvas').width, document.getElementById('MainCanvas').height);

	for(var a = 0; a < BackgroundDrawList.length; a++){
		BackgroundDrawList[a].Draw();
	}

	for(var a = 0; a < DrawList.length; a++){
		DrawList[a].Draw();
	}

	for(var a = 0; a < TempDrawList.length; a++){
		TempDrawList[a].Draw();
	}
}








