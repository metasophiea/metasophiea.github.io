//Included Files
	var presenterRepositoryURL = 'http://metasophiea.com/presenter/0.5/';
	var includeFiles = {
		'CSS':[],
		'JS':[
			[	'file:///H:/Documents/GitHub/metasophiea.github.io/code/js/math/geometry.js',
				'file:///H:/Documents/GitHub/metasophiea.github.io/code/js/math/numberProgression.js',
				presenterRepositoryURL+'canvas/canvasElement.js',
				presenterRepositoryURL+'canvas/render.js',
				presenterRepositoryURL+'canvas/mouseInterface.js'
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

//get, getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'file:///H:/Documents/GitHub/metasophiea.github.io/code/js/liveEdit/getJS.js';
	temp.setAttribute('onLoad','getJS(includeFiles.JS);');
	document.head.appendChild(temp);	
}
