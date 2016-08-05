function buildMenu_SVG(ID,index,point,width,height){
	var SVG_Element = document.createElementNS('http://www.w3.org/2000/svg','svg');
	SVG_Element.id = ID; SVG_Element.style.position = 'absolute'; 
	SVG_Element.style['z-index'] = index;
	SVG_Element.style.width = width+"px"; SVG_Element.style.height = height+"px";
	SVG_Element.style.left = point[0]+"px"; SVG_Element.style.top = point[1]+"px";
	return SVG_Element;
}

function buildMenu_rect(Class,point,width,height,ID=""){
	var shape = document.createElementNS('http://www.w3.org/2000/svg','rect');
	shape.setAttribute("class",Class); if(ID != ""){shape.setAttribute("Id", ID);}
	shape.style.x = point[0]; shape.style.y = point[1];
	shape.style.width = width; shape.style.height = height;
	return shape;
}

function buildMenu_text(Class,point,text,anchor,size,font,ID=""){
	var shape = document.createElementNS('http://www.w3.org/2000/svg','text');
	shape.setAttribute("class", Class); if(ID != ""){shape.setAttribute("Id", ID);}
	shape.setAttribute("x", point[0]); shape.setAttribute("y", point[1]);
	shape.setAttribute("text-anchor",anchor); shape.setAttribute("font-size",size+'px');
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

function buildMenu_textBox(Class,point,width,height,text,size,font,ID="",code=''){
	var foreignObject = document.createElementNS('http://www.w3.org/2000/svg','foreignObject');
		foreignObject.setAttribute("x", point[0]); foreignObject.setAttribute("y", point[1]);
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

	foreignObject.setAttribute('onkeyup',code);
	foreignObject.appendChild(shape);
	return foreignObject;
}
