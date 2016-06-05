function lavendel_menu_create(window,canvas){var shape;
	var NewElement = MakeWindow_SVG('createMenu',window[0],window[1],120,120);
	NewElement.appendChild(MakeWindow_Rect("BackingPlate",0,0,"100%","100%"));
	
	shape = MakeWindow_Rect("Plate_1","10%","10%","80%","80%");
	code = ''+
		'console.log("making square");'+
		'DeleteWindowWithID(this);'+
		'DrawList.Background.add( new poly({ "InitialData":{"Points":[['+canvas[0]+','+canvas[1]+'], ['+canvas[0]+','+canvas[1]+'+100], ['+canvas[0]+'+100,'+canvas[1]+'+100], ['+canvas[0]+'+100,'+canvas[1]+']],"selected":true}, "StyleData":{"R":255,"G":0,"B":0} }) );'+
		'';
	shape.setAttribute("onmousedown",code);
	NewElement.appendChild(shape);

	lavendel_ContainerElement.appendChild(NewElement);
}

function MakeWindow_SVG(ID,x,y,width,height){
	var SVG_Element = document.createElementNS('http://www.w3.org/2000/svg','svg');
	SVG_Element.id = ID; SVG_Element.style.position = 'absolute'; 
	SVG_Element.style.width = width+"px"; SVG_Element.style.height = height+"px";
	SVG_Element.style.left = x+"px"; SVG_Element.style.top = y+"px";
	return SVG_Element;
}
function MakeWindow_Rect(Class,x,y,width,height,ID=""){
	var shape = document.createElementNS('http://www.w3.org/2000/svg','rect');
	shape.setAttribute("class",Class); if(ID != ""){shape.setAttribute("Id", ID);}
	shape.style.x = x; shape.style.y = y;
	shape.style.width = width; shape.style.height = height;
	return shape;
}

function DeleteWindowWithID(that){ lavendel_ContainerElement.removeChild(that.parentElement); }


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./create.js loaded"); BootCount++;