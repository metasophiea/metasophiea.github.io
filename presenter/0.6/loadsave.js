function getAllData(){
	return JSON.stringify(drawList.foreground.getAllData(), null, 2);
}

function loadData(data){ data = JSON.parse(data);
	for(a = 0; a < data.length; a++){
		switch(data[a].type){
			case 'superShape_adjustableRectangle':
				drawList.foreground.add( new superShape_adjustableRectangle({ "initialData":data[a].initialData, "styleData":data[a].styleData }) );	
			break;
			case 'superShape_adjustableImage':
				drawList.foreground.add( new superShape_adjustableImage({ "initialData":data[a].initialData, "styleData":data[a].styleData }) );	
			break;			
		}
	}
}

function downloadScene(){
	var a = document.createElement('a');
	var file = new Blob([getAllData()]);
	a.href = URL.createObjectURL(file);
	a.download = 'scene.presenter';
	document.body.appendChild(a);
	a.click();
}

function uploadData(){
}
