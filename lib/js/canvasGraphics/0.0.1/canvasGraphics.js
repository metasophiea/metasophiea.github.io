var includes = {
	'JS':[
		['./0.0.1/main.js']
	]
};
//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'http://metasophiea.com/lib/js/getJS/2.5.0/getJS.js';
	temp.setAttribute('onLoad','getJS.get(includes.JS);');
	document.head.appendChild(temp);

	/*
			var shapeType = 'rectangle';
			var data = {'height':100,'width':200,'position':{'x':100,'y':100},'anchor':{'x':0.5,'y':0.5},'angle':1};
			var style = {'bodyColour':'#ff00ff', 'outlineColour':'#ff0000', 'outlineThickness':10};
			canvasGraphics.basicShape(shapeType,data,style);

			var shapeType = 'poly';
			var data = {'points':[{'x':0,'y':0},{'x':100,'y':0},{'x':0,'y':100}]};
			var style = {'bodyColour':'#ff00ff', 'outlineColour':'#ff0000', 'outlineThickness':10};
			canvasGraphics.basicShape(shapeType,data,style);

			var shapeType = 'image';
			var data = {'height':100,'width':100,'position':{'x':200,'y':200},'anchor':{'x':0.5,'y':0.5},'angle':1};
			var style = {'imageURL':'https://upload.wikimedia.org/wikipedia/en/6/6a/MystCover.png'};
			canvasGraphics.basicShape(shapeType,data,style);

			var shapeType = 'square';
			var data = {'size':100,'position':{'x':100,'y':200},'anchor':{'x':0.5,'y':0.5},'angle':0.1};
			var style = {'bodyColour':'#ff00ff', 'outlineColour':'#ff0000', 'outlineThickness':10};
			canvasGraphics.basicShape(shapeType,data,style);

			var shapeType = 'poly';
			var data = {'points':[{'x':100,'y':200},{'x':200,'y':100},{'x':300,'y':300}]};
			var style = {'bodyColour':'#ff00ff', 'outlineColour':'#ff0000', 'outlineThickness':10};
			canvasGraphics.basicShape(shapeType,data,style);

			var shapeType = 'character';
			var data = {'character':'1','size':200,'position':{'x':300,'y':300},'scale':1};
			var style = {'font':'Lucida Console','bold':false,'italic':false,'bodyColour':'#ff00ff','outlineColour':'#ff0000','outlineThickness':0};
			canvasGraphics.basicShape(shapeType,data,style);
*/