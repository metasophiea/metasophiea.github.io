function newScene(){
	var i = Object.keys(drawList);
	for(var a = 0; a < i.length; a++){
		drawList[i[a]].removeAll();
	}
}

function downloadScene(title){
	var output = {
		'foreground':drawList.foreground.getAllData(),
		'background':drawList.background.getAllData(),
		'automove_script':automoveScript
	};

	downloadData(title,'presenter',JSON.stringify(output));
}

function uploadScene(){
	newScene();
	uploadData(loadScene);
}

function loadScene(data){data = JSON.parse(data);
	automoveScript = data.automove_script;
	for(a = 0; a < data.background.length; a++){
		switch(data.background[a].type){
			case 'regularShape_Rectangle':
				drawList.background.add( new regularShape_rectangle({ "initialData":data.background[a].initialData, "styleData":data.background[a].styleData }) );	
			break;		
			case 'regularShape_Image':
				drawList.background.add( new regularShape_image({ "initialData":data.background[a].initialData, "styleData":data.background[a].styleData }) );	
			break;	
		}
	}

	for(a = 0; a < data.foreground.length; a++){
		switch(data.foreground[a].type){
			case 'superShape_adjustableRectangle':
				drawList.foreground.add( new superShape_adjustableRectangle({ "initialData":data.foreground[a].initialData, "styleData":data.foreground[a].styleData }) );	
			break;
			case 'superShape_adjustableImage':
				drawList.foreground.add( new superShape_adjustableImage({ "initialData":data.foreground[a].initialData, "styleData":data.foreground[a].styleData }) );	
			break;			
		}
	}
}








