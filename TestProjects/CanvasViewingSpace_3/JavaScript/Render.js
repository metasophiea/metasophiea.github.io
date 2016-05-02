function DrawBackground(){
	console.log("Drawing background..");

//	var count = 5;
//	for(var a = -count; a < count; a++){
//		for(var b = -count; b < count; b++){
//			BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[a*100+(0),b*100+(0)], [a*100+(0),b*100+(100)], [a*100+(100),b*100+(100)], [a*100+(100),b*100+(0)]]}, "StyleData":{"R":(Math.floor((256*Math.random()))),"G":(Math.floor((256*Math.random()))),"B":(Math.floor((256*Math.random())))} }) );
//		}	
//	}

//	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[0,-5000], [0,5000], [10,5000], [10,-5000]]} }) );
//	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[-5000,0], [-5000,10], [5000,10], [5000,0]]} }) );

//	BackgroundDrawList.push( new image({"ID":100, "InitialData":{"TopLeft":[0,0],"BottomRight":[200,200]}, "StyleData":{"URL":"https://fanart.tv/fanart/music/a173a2b0-a6c0-403b-911a-1d01c82918a6/albumcover/myst-iv-revelation-4e1e6ad73cb90.jpg"} }) );	

	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[0,0], [0,100], [100,100], [100,0]]}, "StyleData":{"R":255,"G":0,"B":0} }) );
	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[60,60], [60,160], [160,160], [160,60]]}, "StyleData":{"R":255,"G":0,"B":0} }) );
	BackgroundDrawList.push( new image3({"ID":101, "InitialData":{"CenterAnchor":[0,0],"Width":100,"Height":100}, "StyleData":{"URL":"https://fanart.tv/fanart/music/a173a2b0-a6c0-403b-911a-1d01c82918a6/albumcover/myst-iv-revelation-4e1e6ad73cb90.jpg"} }) );	

//	var size = 100;
//	for(var a = 0; a < size; a++){
//		BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[a*100+(0),0], [a*100+(0),size*100], [a*100+(10),size*100], [a*100+(10),0]]}, "StyleData":{"R":(Math.floor((256*Math.random()))),"G":(Math.floor((256*Math.random()))),"B":(Math.floor((256*Math.random())))} }) );
//		BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[0,a*100+(0)], [size*100,a*100+(0)], [size*100,a*100+(10)], [0,a*100+(10)]]}, "StyleData":{"R":(Math.floor((256*Math.random()))),"G":(Math.floor((256*Math.random()))),"B":(Math.floor((256*Math.random())))} }) );
//	}

	console.log("..finished");
	console.log("object count: " + BackgroundDrawList.length);
}


var spin = 0;
function Render(){
	Canvas.clearRect(0, 0, document.getElementById('MainCanvas').width, document.getElementById('MainCanvas').height);
	spin = spin + 0.05; if(spin >= 2*Math.PI){spin = 0;}
	SpinViewPort(0,0,spin);
	
//	BackgroundDrawList[GetObjectDrawArrayPositionByID(100,BackgroundDrawList)].set(spin,"Angle");

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








