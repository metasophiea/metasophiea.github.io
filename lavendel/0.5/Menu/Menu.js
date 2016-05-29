function CreateWindowWithID(ID,Type,X,Y,data={}){
	var elementList = ContainerElement.getElementsByTagName('svg');
	for(var a = 0; a < elementList.length; a++){
		if(elementList[a].id == ID){ console.error("Lavendel Error: Attempted to create UI item with ID that was already in use"); return; }
	}

	var NewElement;
	switch(Type){
		case "Main": NewElement = MainMenu(ID,X,Y);  break;
		case "ImageData": NewElement = ImageMenu(ID,X,Y,data); break;
	}
	ContainerElement.appendChild(NewElement);
	BringForward(NewElement);
}

function DeleteWindowWithID(that){ ContainerElement.removeChild(that.parentElement); }

// Window Motion //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// 
var OldPosition = [0,0];
var OldPointerPosition = [0,0];
function MoveWindowWithID(event,that){BringForward(that.parentElement);
	that.parentElement.parentElement.setAttributeNS(null,"onmousemove","MoveWindowWithID_MousePan_Calculate(event,this,'"+that.parentElement.id+"')");
	that.parentElement.parentElement.setAttributeNS(null,"onmouseup","MoveWindowWithID_MousePan_Stop(this)");
	OldPointerPosition = [event.clientX,event.clientY];
	OldPosition[0] = parseInt(that.parentElement.style.left.slice(0, -2));
	OldPosition[1] = parseInt(that.parentElement.style.top.slice(0, -2));	
}
function MoveWindowWithID_MousePan_Calculate(event,that,objectID){
	var elementList = ContainerElement.getElementsByTagName('svg');
	for(var a = 0; a < elementList.length; a++){
		if(elementList[a].id == objectID){
			elementList[a].style.left  = OldPosition[0] + (event.clientX-OldPointerPosition[0]) + "px";
			elementList[a].style.top = OldPosition[1] + (event.clientY-OldPointerPosition[1]) + "px";
		}
	}
}
function MoveWindowWithID_MousePan_Stop(object){
	object.removeAttributeNS(null, "onmousemove");
	object.removeAttributeNS(null, "onmouseup");
	clearTimeout(ClickTimeout_ID);
}

function BringForward(that){
	var temp = that.parentElement.getElementsByTagName('svg');
	var highest = 0; var lowest = temp[0].style['z-index'];
	for(var a = 0; a < temp.length; a++){
		if(temp[a].style['z-index'] > highest){highest = parseInt(temp[a].style['z-index']);}
		if(temp[a].style['z-index'] < lowest){lowest = parseInt(temp[a].style['z-index']);}
	}

	for(var a = 0; a < temp.length; a++){
		temp[a].style['z-index'] = temp[a].style['z-index']-lowest;
	}
	
	that.style['z-index'] = highest+1-lowest;
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Menu/Menu.js loaded"); BootCount++;
