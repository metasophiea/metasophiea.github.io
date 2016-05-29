function IndexUpdater(ListName){
	switch(ListName){
		case "Background":
			DrawList.BackgroundIndex = []; 
			for(var a = 0; a < DrawList.Background.length; a++){DrawList.BackgroundIndex[DrawList.Background[a].ID] = a;}
		break;
		case "Main": 
			DrawList.MainIndex = []; 
			for(var a = 0; a < DrawList.Main.length; a++){DrawList.MainIndex[DrawList.Main[a].ID] = a;}
		break;
		case "Temp": 
			DrawList.TempIndex = []; 
			for(var a = 0; a < DrawList.Temp.length; a++){DrawList.TempIndex[DrawList.Temp[a].ID] = a;}
		break;
		default:
			DrawList.BackgroundIndex = []; DrawList.MainIndex = []; DrawList.TempIndex = [];
			for(var a = 0; a < DrawList.Background.length; a++){DrawList.BackgroundIndex[DrawList.Background[a].ID] = a;}	
			for(var a = 0; a < DrawList.Main.length; a++){DrawList.MainIndex[DrawList.Main[a].ID] = a;}	
			for(var a = 0; a < DrawList.Temp.length; a++){DrawList.TempIndex[DrawList.Temp[a].ID] = a;}
		break;		
	}
}

function GetNextID(ListName){
	switch(ListName){
		case "Background": IndexUpdater("Background");
			for(var a = 0; a <= DrawList.BackgroundIndex.length; a++){ if(DrawList.BackgroundIndex[a] == undefined){return a;} } break;
		case "Main": IndexUpdater("Main");
			for(var a = 0; a <= DrawList.MainIndex.length; a++){ if(DrawList.MainIndex[a] == undefined){return a;} } break;
		case "Temp": IndexUpdater("Temp"); 
			for(var a = 0; a <= DrawList.TempIndex.length; a++){ if(DrawList.TempIndex[a] == undefined){return a;} } break;
	}
}

//Canvas Interaction //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 
	function ColourToID(RGBA){ return (256*256*RGBA[2] + 256*RGBA[1] + RGBA[0])-1; }
	function IDtoColour(ID){//Must remove 'a' value
		var temp = ID + 1;
		var R = 0; var G = 0; var B = 0;
		while(temp > 0){
			R++; temp--;
			if(R == 256){R = 0; G++;}
			if(G == 256){G = 0; B++;}
		}
		return "rgba("+R+","+G+","+B+",1)";
	}

	function PointToID(X,Y){ var data = SelectionMatrix.getImageData(X-1,Y-1,3,3).data;
		for(var a = 0; a < data.length-4; a+=4){
			if((data[a] != data[a+4]) || (data[a+1] != data[a+5]) || (data[a+2] != data[a+6]) ||  (data[a+3] != data[a+7])){return -1;}
		}
		return (256*256*data[2] + 256*data[1] + data[0])-1;
	}

	function GetObjectFromID(ID){ return DrawList.Background[DrawList.BackgroundIndex[ID]]; }
 //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 