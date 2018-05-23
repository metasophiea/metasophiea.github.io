function MakeWindow_SVG(ID,index,x,y,width,height){
	var SVG_Element = document.createElementNS('http://www.w3.org/2000/svg','svg');
	SVG_Element.id = ID; SVG_Element.style.position = 'absolute'; 
	SVG_Element.style['z-index'] = index;
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

function MakeWindow_Text(Class,x,y,text,anchor,size,font,ID=""){
	var shape = document.createElementNS('http://www.w3.org/2000/svg','text');
	shape.setAttribute("class", Class); if(ID != ""){shape.setAttribute("Id", ID);}
	shape.setAttribute("x", x); shape.setAttribute("y", y);
	shape.setAttribute("text-anchor",anchor); shape.setAttribute("font-size",size);
	shape.setAttribute("font-family",font);
	shape.style["pointer-events"] = "none";

   	shape.style["-moz-user-select"] = "none";
   	shape.style["-khtml-user-select"] = "none";
   	shape.style["-webkit-user-select"] = "none";
   	shape.style["-ms-user-select"] = "none";
	shape.style["user-select"] = "none";

	shape.innerHTML = text;
	return shape;
}

function MakeWindow_TextBox(Class,x,y,width,height,text,size,font,ID=""){
	var foreignObject = document.createElementNS('http://www.w3.org/2000/svg','foreignObject');
		foreignObject.setAttribute("x", x); foreignObject.setAttribute("y", y);
		foreignObject.style.width = foreignObject; foreignObject.style.height = height;	

	var shape = document.createElement('textarea');
		shape.id = ID;
		shape.style.width = width+"px"; shape.style.height = height+"px";
		shape.style.border = "0px"; shape.style.padding = "0px";
		shape.value = text;
		shape.style['font-size'] = size+"px";
		shape.style['font-family'] = font;
		shape.style.resize = "none";
		shape.style.overflow = "hidden";	

	foreignObject.appendChild(shape);
	return foreignObject;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Menu/WindowShapes.js loaded"); BootCount++;