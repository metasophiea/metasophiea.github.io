// Draw List // - Format: "id", "type", data...
	var DrawList = []; var TempDrawList = []; var BackGroundList = [];
	var Spin = 0;

//// Background Graphics //////////////////////////////////////////////////////////
	function DrawBackground(){
		//var img = new Image;
		//img.src = "https://fanart.tv/fanart/music/a173a2b0-a6c0-403b-911a-1d01c82918a6/albumcover/myst-iv-revelation-4e1e6ad73cb90.jpg";
		//Canvas.drawImage(img,CanvasX(0),CanvasY(0),CanvasLength(500),CanvasLength(500));
		//Canvas.fillRect(CanvasX(0), CanvasY(0), CanvasLength(50), CanvasLength(50));
		//Canvas.fillRect(CanvasX(20), CanvasY(380), CanvasLength(50), CanvasLength(50));
		//Canvas.fillRect(CanvasX(380), CanvasY(20), CanvasLength(50), CanvasLength(50));
		//Canvas.fillRect(CanvasX(380), CanvasY(380), CanvasLength(50), CanvasLength(50));

		BackGroundList = [];

		//Draw graph
		count = 100; spacing = 100; thickness = 1;
		for(var a = 0; a <= count; a++){
			BackGroundList.push(new line(0, spacing*a, 0, {'R':200, 'G':200, 'B':200, 'A':1, 'Thickness':thickness, 'Line_R':100, 'Line_G':100, 'Line_B':100, 'Line_A':1}, {'EndX':spacing*a, 'EndY':spacing*count}, Canvas, false));
			BackGroundList.push(new line(0, 0, spacing*a, {'R':200, 'G':200, 'B':200, 'A':1, 'Thickness':thickness, 'Line_R':100, 'Line_G':100, 'Line_B':100, 'Line_A':1}, {'EndX':spacing*count, 'EndY':spacing*a}, Canvas, false));
		}
	
		BackGroundList.push(new box(0, 150, 150, {'R':200, 'G':240, 'B':250, 'A':1, 'Thickness':10, 'Line_R':100, 'Line_G':100, 'Line_B':100, 'Line_A':0}, {'Height':100, 'Width':300, 'Angle':0}, Canvas, false));
		BackGroundList.push(new box(0, 150, 150, {'R':200, 'G':240, 'B':0, 'A':1, 'Thickness':10, 'Line_R':100, 'Line_G':100, 'Line_B':100, 'Line_A':0}, {'Height':100, 'Width':300, 'Angle':1, 'AnchorX':'0', 'AnchorY':'0.5'}, Canvas, false));
		BackGroundList.push(new box(0, 150, 150, {'R':100, 'G':240, 'B':0, 'A':1, 'Thickness':10, 'Line_R':100, 'Line_G':100, 'Line_B':100, 'Line_A':0}, {'Height':100, 'Width':300, 'Angle':-1, 'AnchorX':'1', 'AnchorY':'0.5'}, Canvas, false));
		BackGroundList.push(new box(1, 150, 150, {'Image':"https://fanart.tv/fanart/music/a173a2b0-a6c0-403b-911a-1d01c82918a6/albumcover/myst-iv-revelation-4e1e6ad73cb90.jpg", 'R':100, 'G':140, 'B':150, 'A':1, 'Thickness':10, 'Line_R':100, 'Line_G':100, 'Line_B':100, 'Line_A':0}, {'Height':100, 'Width':300, 'Angle':0, 'AnchorX':'0.5', 'AnchorY':'0.5'}, Canvas, false));
		BackGroundList.push(new image(2, 1000, 150, {}, {'Height':300, 'Width':300, 'Angle':0.785}, Canvas, false));
	}

//// Main Render //////////////////////////////////////////////////////////
	function Render(){ Canvas.clearRect(0, 0, document.getElementById('MainCanvas').width, document.getElementById('MainCanvas').height);
		Spin = Spin + 0.1; if( Spin >= Math.PI*2 ){ Spin = 0; }
		if( (temp = GetListPosition_FromID(1,BackGroundList)) != -1 ){BackGroundList[temp].set(Spin,"Angle");}
		if( (temp = GetListPosition_FromID(2,BackGroundList)) != -1 ){BackGroundList[temp].set(Spin,"Angle");}

	//Draws background objects first (in the order they appear in the draw list)
		for(var a = 0; a < BackGroundList.length; a++){ 
			BackGroundList[a].Draw(); 
		}

	//Draws placed objects
		for(var a = 0; a < DrawList.length; a++){ DrawList[a].Draw(); }

	//Draws objects being placed
		for(var a = 0; a < TempDrawList.length; a++){ TempDrawList[a].Draw(); }
	}

//// Draw List //////////////////////////////////////////////////////////
	function ClearTempDrawList(){ TempDrawList = []; }
	function GetNewId(){
		var counter = 0;
		for(var a = 0; a < DrawList.length; a++){
			if( counter == DrawList[a][0] ){counter++;}
			else{return counter;}
		}
		return counter;
	}
