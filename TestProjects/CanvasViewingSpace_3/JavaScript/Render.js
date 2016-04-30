var DrawList = []; var TempDrawList = [];

function DrawBackground(){
	console.log("Drawing background..");

	DrawList.push( new poly({ "InitialData":{"Points":[[0,0], [0,-100], [-100,-100], [-100,0]]}, "StyleData":{"B":255} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[0,-100], [0,-200], [-100,-200], [-100,-100]]}, "StyleData":{"R":100,"G":100,"B":255} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[-100,0], [-100,-100], [-200,-100], [-200,0]]}, "StyleData":{"R":100,"G":100,"B":255} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[-100,-100], [-100,-200], [-200,-200], [-200,-100]]}, "StyleData":{"R":150,"G":150,"B":255} }) );

	DrawList.push( new poly({ "InitialData":{"Points":[[0,0], [0,100], [-100,100], [-100,0]]}, "StyleData":{"G":255} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[0,100], [0,200], [-100,200], [-100,100]]}, "StyleData":{"R":100,"G":255,"B":100} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[-100,0], [-100,100], [-200,100], [-200,0]]}, "StyleData":{"R":100,"G":255,"B":100} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[-100,100], [-100,200], [-200,200], [-200,100]]}, "StyleData":{"R":150,"G":255,"B":150} }) );

	DrawList.push( new poly({ "InitialData":{"Points":[[0,0], [0,-100], [100,-100], [100,0]]}, "StyleData":{"R":255} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[0,-100], [0,-200], [100,-200], [100,-100]]}, "StyleData":{"R":255,"G":100,"B":100} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[100,0], [100,-100], [200,-100], [200,0]]}, "StyleData":{"R":255,"G":100,"B":100} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[100,-100], [100,-200], [200,-200], [200,-100]]}, "StyleData":{"R":255,"G":150,"B":150} }) );

	DrawList.push( new poly({ "InitialData":{"Points":[[0,0], [0,100], [100,100], [100,0]]} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[100,100], [100,200], [200,200], [200,100]]} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[200,200], [200,300], [300,300], [300,200]]} }) );
	DrawList.push( new poly({ "InitialData":{"Points":[[300,300], [300,400], [400,400], [400,300]]} }) );

	console.log(DrawList);
	console.log("..finished");
}

function Render(){
	//SpinViewPort(0.25,0.25,0.01);

	Canvas.clearRect(0, 0, document.getElementById('MainCanvas').width, document.getElementById('MainCanvas').height);

	for(var a = 0; a < DrawList.length; a++){
		DrawList[a].Draw();
	}

	DrawTempObjects();
	for(var a = 0; a < TempDrawList.length; a++){
		TempDrawList[a].Draw();
	}
}




function DrawTempObjects(){
	TempDrawList = [];

	var Middle = ViewportPointsAt(0.25,0.25);
	TempDrawList.push( new poly({ "InitialData":{"Points":[[Middle[0],Middle[1]], [Middle[0],Middle[1]+100], [Middle[0]+100,Middle[1]+100], [Middle[0]+100,Middle[1]]]}, "StyleData":{"R":255} }) );
	TempDrawList.push( new poly({ "InitialData":{"Points":[[Middle[0],Middle[1]], [Middle[0],Middle[1]-100], [Middle[0]-100,Middle[1]-100], [Middle[0]-100,Middle[1]]]}, "StyleData":{"R":255} }) );

}

function Spin(){
	var PositionsBefore = ViewportPointsAt();
	View.Angle = View.Angle + 0.1;
	if(View.Angle >= Math.PI*2){View.Angle = 0;}
	var PositionsAfter = ViewportPointsAt();
	
	DrawTempObjects();
}

function Spin_test(){
	var PositionsBefore = ViewportPointsAt();
	View.Angle = View.Angle + 0.1;
	if(View.Angle >= Math.PI*2){View.Angle = 0;}
	var PositionsAfter = ViewportPointsAt();

	var Middle = ViewportPointsAt();
	TempDrawList = [];
	TempDrawList.push( new poly({ "InitialData":{"Points":[[Middle[0],Middle[1]], [Middle[0],Middle[1]+100], [Middle[0]+100,Middle[1]+100], [Middle[0]+100,Middle[1]]]}, "StyleData":{"R":255} }) );
	TempDrawList.push( new poly({ "InitialData":{"Points":[[Middle[0],Middle[1]], [Middle[0],Middle[1]-100], [Middle[0]-100,Middle[1]-100], [Middle[0]-100,Middle[1]]]}, "StyleData":{"R":255} }) );
	

	console.log("Current X:" + View.Position[0] + " Y:" + View.Position[1]);
	console.log("Before: " + PositionsBefore + " | After: " + PositionsAfter);
	console.log( "Difference of: " + (PositionsAfter[0]-PositionsBefore[0]) +","+ (PositionsAfter[1]-PositionsBefore[1]) );
	View.Position[0] = View.Position[0] + (PositionsAfter[0]-PositionsBefore[0]);
	View.Position[1] = View.Position[1] + (PositionsAfter[1]-PositionsBefore[1]);
	console.log("Current X:" + View.Position[0] + " Y:" + View.Position[1]);

	DrawTempObjects();
}








