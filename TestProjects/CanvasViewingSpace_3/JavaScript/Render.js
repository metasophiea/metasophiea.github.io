var DrawList = [];

function DrawBackground(){
	console.log("Drawing background..");
	DrawList.push( new poly({ "InitialData":{"Points":[[100,100], [100,200], [200,200], [200,100]]} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[0,0], [0,100], [100,100], [100,0]]} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[1327,417],[1427,417],[1427,517],[1327,517]]} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[1227,317],[1327,317],[1327,417],[1227,417]]} }) );
	console.log("..finished");
}

function Render(){
	Canvas.clearRect(0, 0, document.getElementById('MainCanvas').width, document.getElementById('MainCanvas').height);

	for(var a = 0; a < DrawList.length; a++){
		DrawList[a].Draw();
	}


	//View.Angle = View.Angle + 0.05;
	//if(View.Angle >= Math.PI*2){View.Angle = 0;}
}