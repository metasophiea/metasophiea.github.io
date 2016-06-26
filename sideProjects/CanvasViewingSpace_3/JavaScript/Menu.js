function ClickTool(type, data, object){CloseAllMenu();
	switch(type){
		case "Pan": MousePan(data,object); break;
		case "Spin": MouseSpin(data,object); break;
	}
}

function DoubleClick(event, that){
	if(!MenuOpen.Main){MenuOpen.Main = true;  
		document.getElementById("Menu").style.left = event.clientX+"px"; document.getElementById("Menu").style.top = event.clientY+"px"; 
		document.getElementById("Menu").style.height = 200+"px"; document.getElementById("Menu").style.width = 100+"px"; 

		document.getElementById("Menu").innerHTML = document.getElementById("Menu").innerHTML + "<rect x=\"0\" y=\"0\" height=\"200\" width=\"100\" style=\"fill:rgb(120,120,120);\"></rect>";
		document.getElementById("Menu").innerHTML = document.getElementById("Menu").innerHTML + "<rect x=\"10\" y=\"10\" height=\"200\" width=\"100\" style=\"fill:rgb(230,210,255);\"></rect>";

		document.getElementById("Menu").innerHTML = document.getElementById("Menu").innerHTML + "<rect x=\"12\" y=\"12\" height=\"20\" width=\"86\" style=\"fill:rgb(200,200,200);\"></rect>";
		document.getElementById("Menu").innerHTML = document.getElementById("Menu").innerHTML + "<text x=\"35\" y=\"27\" font-family=\"Consolas\" text-anchor=\"start\">Pan</text>";
		document.getElementById("Menu").innerHTML = document.getElementById("Menu").innerHTML + "<rect class=\"MenuButtonCover\" x=\"12\" y=\"12\" height=\"20\" width=\"86\" onmousedown=\"ChangeTool(\'Pan\');\"></rect>";
	
		document.getElementById("Menu").innerHTML = document.getElementById("Menu").innerHTML + "<rect x=\"12\" y=\"34\" height=\"20\" width=\"86\" style=\"fill:rgb(200,200,200);\"></rect>";
		document.getElementById("Menu").innerHTML = document.getElementById("Menu").innerHTML + "<text x=\"35\" y=\"49\" font-family=\"Consolas\" text-anchor=\"start\">Spin</text>";
		document.getElementById("Menu").innerHTML = document.getElementById("Menu").innerHTML + "<rect class=\"MenuButtonCover\" x=\"12\" y=\"34\" height=\"20\" width=\"86\" onmousedown=\"ChangeTool(\'Spin\');\"></rect>";
	}
	else{CloseAllMenu();}
}

function CloseAllMenu(){
	if(MenuOpen.Main){MenuOpen.Main = false;
		document.getElementById("Menu").style.height = 0+"px";
		document.getElementById("Menu").style.width = 0+"px";
		document.getElementById("Menu").innerHTML = "";
	}
}

function ChangeTool(data){
	type = data;
	CloseAllMenu();
}