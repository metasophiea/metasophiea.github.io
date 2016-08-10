function automoveScript_clear(){automoveScript = [];}
function automoveScript_display(){
	for(var a = 0; a < automoveScript.length; a++){
		console.log(a +'|'+ JSON.stringify(automoveScript[a]));
	}
}
function automoveScript_push(position,details={'type':'none','duration':0}){ automoveScript.push({'position':position,'details':details});}
function automoveScript_get(index){return automoveScript[index];}
function automoveScript_getlength(){return automoveScript.length;}
function automoveScript_forwardStep(){if(automoveScript_step >= automoveScript.length-1){return;}
	automoveScript_step++;
	var temp = automoveScript[automoveScript_step]; 
	createPathTo( {'position':temp.position.position, 'zoom':temp.position.zoom, 'angle':temp.position.angle},{'type':temp.details.type,'duration':temp.details.duration} );
}

function automoveScript_reverseStep(){if(automoveScript_step == 0){return;}	
	automoveScript_step--;
	var temp = automoveScript[automoveScript_step]; var temp2 = automoveScript[automoveScript_step+1];
	createPathTo( {'position':temp.position.position, 'zoom':temp.position.zoom, 'angle':temp.position.angle},{'type':temp2.details.type,'duration':temp2.details.duration} );
}

function automoveScript_replace(index,data){
	if(data.hasOwnProperty('details')){automoveScript[index] = data;}
	else{automoveScript[index].position = data.position;}
}
function automoveScript_remove(index){
	if(automoveScript.length > 0){automoveScript.splice(index,1);}
	if(automoveScript.length == 0){automoveScript_push({'position':[0,0], 'zoom':0, 'angle':0},{'duration':2,'type':'cosin'}); return;}
}
function automoveScript_inject(index,data){automoveScript.splice(index+1,0,data);}
function automoveScript_goto(index){
	if(index < 0){index = 0;}else if(index >= automoveScript.length-1){index = automoveScript.length-1;}
	automoveScript_step = index; var temp = automoveScript[automoveScript_step];
	createPathTo( {'position':temp.position.position, 'zoom':temp.position.zoom, 'angle':temp.position.angle},{'type':temp.details.type,'duration':temp.details.duration} );
}

function automoveScript_gotoFirst(){
	var temp = automoveScript[0];
	createPathTo( {'position':temp.position.position, 'zoom':temp.position.zoom, 'angle':temp.position.angle},{'type':'cosin','duration':3} );
}
function automoveScript_gotoFirstInstantly(){
	var temp = automoveScript[0];
	createPathTo( {'position':temp.position.position, 'zoom':temp.position.zoom, 'angle':temp.position.angle},{'type':'none','duration':0} );
}