//unfinished
function buildMenu_scrollableList(plateClass,textClass,point,width,height,items,ID=""){
	var fontSize = 10; var font = 'Lucida Console';

	var SVG_Element = document.createElementNS('http://www.w3.org/2000/svg','svg');
		SVG_Element.style.width = width+"px"; SVG_Element.style.height = height+"px";
		SVG_Element.style.left = point[0]+"px"; SVG_Element.style.top = point[1]+"px";
	
	//clipping
		var shape = document.createElementNS('http://www.w3.org/2000/svg','rect');	
			shape.setAttribute('x',point[0]); shape.setAttribute('y',point[1]);
			shape.setAttribute('width',width); shape.setAttribute('height',height);
		var clippath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
			clippath.setAttribute('id','cut-off-bottom');
			clippath.appendChild(shape);
		var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
			defs.appendChild(clippath);
	SVG_Element.appendChild(defs);



	var shape = document.createElementNS('http://www.w3.org/2000/svg','rect');
		shape.setAttribute("class",plateClass); if(ID != ""){shape.setAttribute("Id", ID);}
		shape.style.x = point[0]; shape.style.y = point[1];
		shape.style.width = width; shape.style.height = height;
	SVG_Element.appendChild(shape);

	var shape = document.createElementNS('http://www.w3.org/2000/svg','rect');
		shape.setAttribute("class",plateClass); if(ID != ""){shape.setAttribute("Id", ID);}
		shape.style.x = point[0]; shape.style.y = point[1];
		shape.style.width = width; shape.style.height = height;
	SVG_Element.appendChild(shape);








	var shape = document.createElementNS('http://www.w3.org/2000/svg','text');
		shape.setAttribute("class", textClass); if(ID != ""){shape.setAttribute("id", ID);}
		shape.setAttribute("x", point[0]+5); shape.setAttribute("y", point[1]+5);
		shape.setAttribute("text-anchor",'start'); shape.setAttribute("font-size",fontSize+'px');
		shape.setAttribute("font-family",font);
		shape.style["pointer-events"] = "none";
  	 	shape.style["-moz-user-select"] = "none";
   		shape.style["-khtml-user-select"] = "none";
   		shape.style["-webkit-user-select"] = "none";
   		shape.style["-ms-user-select"] = "none";
		shape.style["user-select"] = "none";
		shape.setAttribute('clip-path',"url(#cut-off-bottom)");
		shape.innerHTML = 'hello';
	SVG_Element.appendChild(shape);













	return SVG_Element;
}