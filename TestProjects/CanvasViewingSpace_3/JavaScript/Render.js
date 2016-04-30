function DrawBackground(){
	console.log("Drawing background..");

	var count = 45;
	for(var a = -count; a < count; a++){
		for(var b = -count; b < count; b++){
			BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[a*100+(0),b*100+(0)], [a*100+(0),b*100+(100)], [a*100+(100),b*100+(100)], [a*100+(100),b*100+(0)]]}, "StyleData":{"R":(Math.floor((256*Math.random()))),"G":(Math.floor((256*Math.random()))),"B":(Math.floor((256*Math.random())))} }) );
		}	
	}

	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[0,-5000], [0,5000], [10,5000], [10,-5000]]} }) );
	BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[-5000,0], [-5000,10], [5000,10], [5000,0]]} }) );

		

//	var size = 100;
//	for(var a = 0; a < size; a++){
//		BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[a*100+(0),0], [a*100+(0),size*100], [a*100+(10),size*100], [a*100+(10),0]]}, "StyleData":{"R":(Math.floor((256*Math.random()))),"G":(Math.floor((256*Math.random()))),"B":(Math.floor((256*Math.random())))} }) );
//		BackgroundDrawList.push( new poly({ "InitialData":{"Points":[[0,a*100+(0)], [size*100,a*100+(0)], [size*100,a*100+(10)], [0,a*100+(10)]]}, "StyleData":{"R":(Math.floor((256*Math.random()))),"G":(Math.floor((256*Math.random()))),"B":(Math.floor((256*Math.random())))} }) );
//	}

	console.log("..finished");
	console.log("object count: " + BackgroundDrawList.length);
	document.getElementById('readout').innerHTML = "object count: " + BackgroundDrawList.length;
}


var spin = 0;
function Render(){
	Canvas.clearRect(0, 0, document.getElementById('MainCanvas').width, document.getElementById('MainCanvas').height);
	spin = spin + 0.05; if(spin >= 2*Math.PI){spin = 0;}
	SpinViewPort(0.5,0.5,spin);

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








