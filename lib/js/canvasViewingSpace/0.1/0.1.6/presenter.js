//Included Files
	var presenterRepositoryURL ='http://metasophiea.com/lib/js/canvasViewingSpace/0.1/0.1.6/';
	var includeFiles = {
		'CSS':[
			presenterRepositoryURL+'css/menu/default.css'
		],
		'JS':[
			[	
				'http://metasophiea.com/lib/js/math/geometry.js',
				'http://metasophiea.com/lib/js/math/numberProgression.js',
				'http://metasophiea.com/lib/js/io/loadsave.js',

				presenterRepositoryURL+'menu/start.js',
				presenterRepositoryURL+'menu/windowMotion.js',
				presenterRepositoryURL+'menu/parts/basic.js',
				presenterRepositoryURL+'menu/parts/advanced.js',
				presenterRepositoryURL+'menu/present.js',
				presenterRepositoryURL+'menu/automoveScriptEditor.js',
				presenterRepositoryURL+'menu/automoveScriptElementEditor.js',				

				presenterRepositoryURL+'canvas/canvasElement.js',
				presenterRepositoryURL+'canvas/render.js',

				presenterRepositoryURL+'canvas/interface/file.js',
				presenterRepositoryURL+'canvas/interface/mouseInterface.js',
				presenterRepositoryURL+'canvas/interface/keyboardInterface.js',
				presenterRepositoryURL+'canvas/interface/automoveScript.js',

				presenterRepositoryURL+'dataStructure/drawlist.js',
				presenterRepositoryURL+'dataStructure/numberlist.js',

				presenterRepositoryURL+'canvas/viewportControl/autoViewportControl.js',
				presenterRepositoryURL+'canvas/viewportControl/mouseInterfaceControls.js',
				presenterRepositoryURL+'canvas/viewportControl/pan.js',
				presenterRepositoryURL+'canvas/viewportControl/spin.js',
				presenterRepositoryURL+'canvas/viewportControl/zoom.js',

				presenterRepositoryURL+'canvas/shape/basic/poly.js',
				presenterRepositoryURL+'canvas/shape/basic/rectangle.js',
				presenterRepositoryURL+'canvas/shape/basic/square.js',
				presenterRepositoryURL+'canvas/shape/basic/character.js',
				presenterRepositoryURL+'canvas/shape/basic/image.js',
				presenterRepositoryURL+'canvas/shape/regular/rectangle.js',
				presenterRepositoryURL+'canvas/shape/regular/rectangle_hover.js',
				presenterRepositoryURL+'canvas/shape/regular/image.js',
				presenterRepositoryURL+'canvas/shape/super/extraStuff.js',
				presenterRepositoryURL+'canvas/shape/super/adjustableImage.js',
				presenterRepositoryURL+'canvas/shape/super/adjustableRectangle.js',
				presenterRepositoryURL+'canvas/shape/mouseInterface_draw/rectangle.js',
				presenterRepositoryURL+'canvas/shape/mouseInterface_draw/image.js'
			],[presenterRepositoryURL+'boot.js']		
		]
	};

//Container Element
	var containerElement;
//Canvas'es
	var viewportElement; var viewport;
	var selectionMatrixElement; var selectionMatrix;

//Render 
	var refreshesPerSecond = 30; var constantRenderInterval;
	var drawList = {};
//View Controls
	var view = {'position':[0,0], 'angle':0, 'zoom':{'index':0, 'value':1}};
//Auto Movement
	var activeViewportMovementRefreshesPerSecond = refreshesPerSecond; var activeAutoViewportControlInterval;
	var activeViewportMovementScript = {"position":[], "angle":[], "zoom":[] };	
	var automoveScript = []; var automoveScript_step = -1;

//Tool
	var tool = {'drag':'pan'};
//Mouse Interface
	var mouseInterface_Mousedown = false;
	var mouseInterface_Selected; var mouseInterface_Hover;


function Presenter_Start(){
//Check for element for presenter
	if(document.getElementById('presenterWindow') == null){console.error("Error 0: There's no element for Presenter to run in");return;}

//Set up Elements
	containerElement = document.getElementById('presenterWindow');
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

//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'http://metasophiea.com/lib/js/liveEdit/getJS.js';
	temp.setAttribute('onLoad','getJS(includeFiles.JS);');
	document.head.appendChild(temp);	

//get getCSS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'http://metasophiea.com/lib/js/liveEdit/getCSS.js';
	temp.setAttribute('onLoad','getCSS(includeFiles.CSS);');
	document.head.appendChild(temp);
}
