var BootCount = 0;
function Lavendel_Start(){
//Error Check
	if(document.getElementById('LavendelWindow') == null){console.error("Error 0: There's no element for Lavendel to run in");return;}
//Load Globals
	var Globals_Script = document.createElement("script");
	Globals_Script.type = "text/javascript";
	Globals_Script.src = 'file:///C:/Users/Brandon/Desktop/Lavendel_0.5/Globals.js'; 
	document.getElementsByTagName("head")[0].appendChild(Globals_Script);

//Set up Elements
	ContainerElement = document.getElementById('LavendelWindow');
		ContainerElement.setAttribute("onmouseover","document.getElementsByTagName('html')[0].style.overflowX = 'hidden'; document.getElementsByTagName('html')[0].style.overflowY = 'hidden';");
		ContainerElement.setAttribute("onmouseout","document.getElementsByTagName('html')[0].style.overflowX = 'auto'; document.getElementsByTagName('html')[0].style.overflowY = 'auto';");

	ViewportElement = document.createElement('canvas'); ViewportElement.id = "ViewportElement";
		ViewportElement.style['z-index'] = 0; ViewportElement.style.position = "relative";
		ViewportElement.style.top = 0; ViewportElement.style.left = 0;
		ViewportElement.width = 0; ViewportElement.height = 0;
		ViewportElement.setAttributeNS(null,"onmousedown","MouseClick(event,this);");
		ViewportElement.setAttributeNS(null,"onwheel","MouseWheel(event,this);");
		Viewport = ViewportElement.getContext('2d');
	SelectionMatrixElement = document.createElement('canvas'); SelectionMatrixElement.id = "SelectionMatrixElement";
		SelectionMatrixElement.width = 0; SelectionMatrixElement.height = 0;
		SelectionMatrix = SelectionMatrixElement.getContext('2d');
		
	ContainerElement.appendChild(ViewportElement);

	LoadAndBoot();
}

function LoadAndBoot(){
	var temp; var Address = "https://metasophiea.com/Lavendel/0.5/";
	var CSSList = [
		'CSS/Menu/default.css'
	];
	var ScriptList = [	
		'MouseInteraction.js',
		'Canvas/ElementRelated.js',
		'Canvas/Render.js',
		'Canvas/ID.js',
		'Canvas/ViewportControl.js',
		'Canvas/Shape/poly.js',
		'Canvas/Shape/image.js',
		'Canvas/Shape/text.js',
		'Menu/Menu.js',
		'Menu/WindowShapes.js',
		'Menu/window/main.js',
		'Menu/window/imagemenu.js',
	];


	for(var a = 0; a < CSSList.length; a++){
		temp = document.createElement("link");
		temp.rel = "stylesheet"; temp.type = "text/css"; temp.href = Address+CSSList[a];
		document.getElementsByTagName("head")[0].appendChild(temp);
	}

	for(var a = 0; a < ScriptList.length; a++){
		temp = document.createElement("script");
		temp.type = "text/javascript"; temp.src = Address+ScriptList[a];
		document.getElementsByTagName("head")[0].appendChild(temp)
	}

	var BootStarter = setInterval(function(){ 
		if(BootCount == ScriptList.length){
			clearInterval(BootStarter);
			temp = document.createElement("script");
			temp.type = "text/javascript"; temp.src = Address+'Boot.js'; 
			document.getElementsByTagName("head")[0].appendChild(temp);
		}
	},100);
}








// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Lavendel.js loaded");