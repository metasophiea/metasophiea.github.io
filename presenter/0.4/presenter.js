var BootCount = 0;
//Included Files
	var includeAddress = 'file:///H:/Documents/GitHub/metasophiea.github.io/presenter/0.4/';
	var includeFiles = {
		'CSS':[],
		'JS':[
			'calculations.js',

			'canvas/render.js',
			'canvas/canvasElement.js',
			'canvas/mouseInterface.js',

			'canvas/objects/drawlist.js',
			'canvas/objects/numberlist.js',
			'canvas/objects/shapes/poly.js',

			'canvas/viewportControl/pan.js',
			'canvas/viewportControl/zoom.js',
			'canvas/viewportControl/spin.js',
			'canvas/viewportControl/autoViewportControl.js',
			'canvas/viewportControl/mouseInterfaceControls.js'
		]
	};

//Container Element
	var containerElement;

//Canvas'es
	var viewportElement; var viewport;
	var selectionMatrixElement; var selectionMatrix;

//Render 
	var refreshesPerSecond = 30; var constantRenderInterval;
	var drawList = {"background":[],"main":[]};

//View Controls
	view = {'position':[0,0], 'angle':0, 'zoom':{'index':0, 'value':1}};
//Auto Movement
	var activeViewportMovementRefreshesPerSecond = refreshesPerSecond; var activeAutoViewportControlInterval;
	var activeViewportMovementScript = {"position":[], "angle":[], "zoom":[] };	

//Tool
	var tool = {'drag':'pan'};
//Mouse Interface
	var mouseInterface_Mousedown = false;
	var mouseInterface_Selected;



function Presenter_Start(){
//Error Check
	if(document.getElementById('PresenterWindow') == null){console.error("Error 0: There's no element for Presenter to run in");return;}

//Set up Elements
	containerElement = document.getElementById('PresenterWindow');
	viewportElement = document.createElement('canvas'); viewportElement.id = "viewportElement";
		viewportElement.style['z-index'] = 0; viewportElement.style.position = "relative";
		viewportElement.style.top = 0; viewportElement.style.left = 0;
		viewportElement.width = 0; viewportElement.height = 0;
		viewport = viewportElement.getContext('2d');
	selectionMatrixElement = document.createElement('canvas'); selectionMatrixElement.id = "selectionMatrixElement";
		selectionMatrixElement.width = 0; selectionMatrixElement.height = 0;
		selectionMatrix = selectionMatrixElement.getContext('2d');
	containerElement.appendChild(viewportElement); containerElement.appendChild(selectionMatrixElement);
	document.body.setAttribute("onresize","adjustViewportElementToFill();");

//Load Files
	var temp = '';
	for(var a = 0; a < Object.keys(includeFiles).length; a++){
		for(var b = 0; b < includeFiles[Object.keys(includeFiles)[a]].length; b++){
			temp = document.createElement("script");
			temp.type = "text/javascript"; temp.src = includeAddress + includeFiles[Object.keys(includeFiles)[a]][b];
			document.getElementsByTagName("head")[0].appendChild(temp);			
		}
	}
//Only load this file, when all the other files have been loaded and accounted for
	var BootStarter = setInterval(function(){
		if(BootCount == includeFiles.JS.length){
			clearInterval(BootStarter);
			temp = document.createElement("script");
			temp.type = "text/javascript"; temp.src = includeAddress +'boot.js'; 
			document.getElementsByTagName("head")[0].appendChild(temp);
		}
	},100);
}
