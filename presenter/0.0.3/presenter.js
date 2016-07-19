var BootCount = 0;
//Container Element
	var ContainerElement;
	var ContainerElement_Dimensions = [0,0];

//Canvas'es
	var ViewportElement; var Viewport;
	var SelectionMatrixElement; var SelectionMatrix;

//Viewport Control
	var view = { "position":[0,0], "angle":0, "zoom":{"index":0,"value":1} };
	var ZoomHash = {	"-16":0.1, "-15":0.11, "-14":0.13, "-13":0.15, "-12":0.17, "-11":0.2, "-10":0.22, "-9":0.26, 
				"-8":0.3, "-7":0.33, "-6":0.38, "-5":0.43, "-4":0.5, "-3":0.65, "-2":0.75, "-1":0.875, 
				"0":1, 
				"1":1.25, "2":1.25, "3":1.4, "4":1.5, "5":1.68, "6":1.8, "7":2.1, "8":2.5, 
				"9":2.8, "10":3.1, "11":3.5, "12":4, "13":4.2, "14":4.5, "15":5.7, "16":6.5 };
//Render
	var RefreshPerSecond = 30; var ConstantRenderInterval;
	var DrawList = {"Background":[],"Main":[],"Temp":[]};
//Auto Movement
	var ActiveViewportMovementRefreshPerSecond = RefreshPerSecond; var ActiveAutoControlInterval;
	var ActiveViewportMovementScript = {"position":[], "angle":[], "zoom":[] };		

//Tool
	var tool = {"click":"poly", "DoubleClick":"MainUI", "wheel":"zoom"};
	var freshObject;

//Mouse
	var Mouse_Mousedown = false;
	var Mouse_Selected;


function Presenter_Start(){
//Error Check
	if(document.getElementById('PresenterWindow') == null){console.error("Error 0: There's no element for Lavendel to run in");return;}

//Set up Elements
	ContainerElement = document.getElementById('PresenterWindow');
	ViewportElement = document.createElement('canvas'); ViewportElement.id = "ViewportElement";
		ViewportElement.style['z-index'] = 0; ViewportElement.style.position = "relative";
		ViewportElement.style.top = 0; ViewportElement.style.left = 0;
		ViewportElement.width = 0; ViewportElement.height = 0;
		Viewport = ViewportElement.getContext('2d');
	SelectionMatrixElement = document.createElement('canvas'); SelectionMatrixElement.id = "SelectionMatrixElement";
		SelectionMatrixElement.width = 0; SelectionMatrixElement.height = 0;
		SelectionMatrix = SelectionMatrixElement.getContext('2d');
	ContainerElement.appendChild(ViewportElement);

	document.body.setAttribute("onresize","AdjustCanvasToFill();");

//Load Files
var BootAddress = "http://metasophiea.com/presenter/0.0.3/";
	var CSSList = [
	];
	var ScriptList = [
		'canvas/objects/drawlist.js',
		'canvas/objects/numberlist.js',
		'canvas/canvaselement.js',
		'canvas/render.js',
		'canvas/mouseinterface.js',
		'canvas/ViewportControl/pan.js',
		'canvas/ViewportControl/spin.js',
		'canvas/ViewportControl/zoom.js',
		'canvas/ViewportControl/autocontrol.js',

		'canvas/objects/shape/poly.js',//'canvas/objects/shape/poly2.js',
		'canvas/objects/shape/image.js',
		'canvas/objects/shape/text.js',

		'canvas/elementmanagement/create.js'
	];

	var temp;
	for(var a = 0; a < CSSList.length; a++){
		temp = document.createElement("link");
		temp.rel = "stylesheet"; temp.type = "text/css"; temp.href = BootAddress+CSSList[a];
		document.getElementsByTagName("head")[0].appendChild(temp);
	}

	for(var a = 0; a < ScriptList.length; a++){
		temp = document.createElement("script");
		temp.type = "text/javascript"; temp.src = BootAddress+ScriptList[a];
		document.getElementsByTagName("head")[0].appendChild(temp)
	}

//Only load this file, when all the other files have been loaded and accounted for
	var BootStarter = setInterval(function(){
		if(BootCount == ScriptList.length){
			clearInterval(BootStarter);
			temp = document.createElement("script");
			temp.type = "text/javascript"; temp.src = BootAddress+'boot.js'; 
			document.getElementsByTagName("head")[0].appendChild(temp);
		}
	},100);
}
