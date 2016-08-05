function BuildMenu(){
	document.getElementById("UI").innerHTML = ""
		+ "<rect id='BackingPlate' x='0' y='0' width='100%' height='100%' opacity='0' class='BackingPlate'/>"
		+ "<rect id='FrontingPlate_1' x='1%' y='12%' width='98%' height='86%' opacity='0' class='FrontingPlate'/>"
		+ "<rect id='FrontingPlate_2' x='1%' y='2%' width='98%' height='8%' opacity='0' class='FrontingPlate'/>"
		+ "<rect id='ExitButton'  x='1%' y='2%' width='5%' height='8%' opacity='0' class='ExitButton' onmousedown='CloseMenu();'/>"
		;
}

function StartMenu(X,Y){
//Setup SVG Element
	document.getElementById("UI").style.top = Y + "px";
	document.getElementById("UI").style.left = X + "px";
	document.getElementById("UI").style.width = 400;
	document.getElementById("UI").style.height = 250;
	
	RandomFlashIn(document.getElementById("BackingPlate"));
	document.getElementById("FrontingPlate_1").style.opacity = 1;
	document.getElementById("FrontingPlate_2").style.opacity = 1;
	document.getElementById("ExitButton").style.opacity = 1;	
}

function CloseMenu(){
	document.getElementById("UI").style.width = 0;
	document.getElementById("UI").style.height = 0;
	document.getElementById("BackingPlate").style.opacity = 0;
	document.getElementById("FrontingPlate_1").style.opacity = 0;
	document.getElementById("FrontingPlate_2").style.opacity = 0;
	document.getElementById("ExitButton").style.opacity = 0;	
}

function RandomFlashIn(data){
	setTimeout(function(){ data.style.opacity = 1 },0);
	setTimeout(function(){ data.style.opacity = 0 },100);
	setTimeout(function(){ data.style.opacity = 1 },200);
	setTimeout(function(){ data.style.opacity = 0 },300);
	setTimeout(function(){ data.style.opacity = 1 },400);
}






