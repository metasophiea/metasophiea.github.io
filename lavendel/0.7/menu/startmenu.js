function lavendel_menu_startmenu(window,canvas,type){
//Check to see if this type of window is already open
	var elementList = lavendel_ContainerElement.getElementsByTagName('svg');
	for(var a = 0; a < elementList.length; a++){
		if(elementList[a].id == type){ console.error("Lavendel Error: Attempted to create UI item with ID that was already in use"); return; }
	}


	switch(type){
		case 'create': lavendel_menu_create(window,canvas); break;
	}

}




// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./startmenu.js loaded"); BootCount++;