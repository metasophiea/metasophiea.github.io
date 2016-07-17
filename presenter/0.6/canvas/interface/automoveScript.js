function automoveScript_clear(){automoveScript = [];}
function automoveScript_display(){
	for(var a = 0; a < automoveScript.length; a++){
		console.log(a +'|'+ JSON.stringify(automoveScript[a]));
	}
}
function automoveScript_push(position,details={'type':'none','duration':0}){
	automoveScript.push({'position':position,'details':details});
}

function automoveScript_forwardStep(){if(automoveScript_step == automoveScript.length){return;}	
	automoveScript_step++;
	var temp = automoveScript[automoveScript_step]; 
	createPathTo( {'position':temp.position.position, 'zoom':temp.position.zoom, 'angle':temp.position.angle},{'type':temp.details.type,'duration':temp.details.duration} );
}

function automoveScript_reverseStep(){if(automoveScript_step == 0){return;}	
	automoveScript_step--;
	var temp = automoveScript[automoveScript_step];
	createPathTo( {'position':temp.position.position, 'zoom':temp.position.zoom, 'angle':temp.position.angle},{'type':temp.details.type,'duration':temp.details.duration} );
}