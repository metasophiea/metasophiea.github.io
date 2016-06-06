var imageboxTransitioner;
function ShowMainMenu(){
//Main SVG
	var SVG_Element = document.createElementNS('http://www.w3.org/2000/svg','svg');
	SVG_Element.id = "MainMenuSVG"; SVG_Element.style.position = 'absolute'; var temp = 0;
	if(window.innerWidth > window.innerHeight){temp = window.innerHeight; SVG_Element.style.left = (window.innerWidth-temp)/2+"px"; SVG_Element.style.top = 0;}
	else{temp = window.innerWidth; SVG_Element.style.top = (window.innerHeight-temp)/2+"px"; SVG_Element.style.left = 0;}
	SVG_Element.style.width = temp+"px"; SVG_Element.style.height = temp+"px";
	SVG_Element.setAttribute("viewBox","0 0 100 100");
	SVG_Element.setAttribute("xmlns","http://www.w3.org/2000/svg");
	document.getElementsByTagName("body")[0].appendChild(SVG_Element);

//Backing Shape
	var shape = document.createElementNS('http://www.w3.org/2000/svg','polygon');
	shape.id = 'backing_oct'; shape.setAttribute("class","menu");
	shape.style.opacity = 0;
	shape.setAttribute("points","33,10 66,10 90,33 90,66 66,90 33,90 10,66 10,33");
	shape.style.fill = "rgb(220,220,220)";
	document.getElementById("MainMenuSVG").appendChild(shape);

	PutTogetherImageBox();

	setTimeout(function(){
		document.getElementById("backing_oct").style.opacity = 1;
	},1000);
}

function HideMainMenu(){
	clearInterval(imageboxTransitioner);
	var contents = document.getElementById('MainMenuSVG').childNodes;
	for(var a = 0; a < contents.length; a++){contents[a].style.opacity = 0;}
	setTimeout(function(){document.getElementsByTagName("body")[0].removeChild(document.getElementById('MainMenuSVG'))},1000);
}





function getData(){
	var array = Object.keys(articles); var outputarray = [];
	for(var a = 0; a < array.length; a++){outputarray[a] = articles[array[a]];}
	return outputarray;
}
function PutTogetherImageBox(){
var data = getData();
//Image Boxes
	var def = document.createElementNS('http://www.w3.org/2000/svg','defs');	
	for(var a = 0; a < data.length; a++){
		var pattern = document.createElementNS('http://www.w3.org/2000/svg','pattern');
			pattern.id = "img_"+a;
			pattern.setAttribute("patternUnits","userSpaceOnUse");
			pattern.setAttribute("x",0); pattern.setAttribute("y",0);
			pattern.setAttribute("height",100); pattern.setAttribute("width",100); 
		var image = document.createElementNS('http://www.w3.org/2000/svg','image');
			image.setAttribute("x",0); image.setAttribute("y",0);
			image.setAttribute("height",100); image.setAttribute("width",100);
			image.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",data[a].url);
			pattern.appendChild(image);
			def.appendChild(pattern);
		var shape = document.createElementNS('http://www.w3.org/2000/svg','polygon');
			shape.id = 'image_oct_image'+a; shape.setAttribute("class","imageoct");
			shape.style.opacity = 0;
			var temp = 2;
			shape.setAttribute("points",""+(33+(temp/2))+","+(10+temp)+" "+(66-(temp/2))+","+(10+temp)+" "+(90-temp)+","+(33+(temp/2))+" "+(90-temp)+","+(66-(temp/2))+" "+(66-(temp/2))+","+(90-temp)+" "+(33+(temp/2))+","+(90-temp)+" "+(10+temp)+","+(66-(temp/2))+" "+(10+temp)+","+(33+(temp/2))+"");
			shape.setAttribute("fill","url(#img_"+a+")");
			document.getElementById("MainMenuSVG").appendChild(shape);
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.id = 'image_oct_headtext'+a; text.setAttribute("class","imageoct");
			text.style.opacity = 0; text.style.fill = data[a].textcolour;
			text.style["font-size"] = 5;
			text.setAttribute("x",15); text.setAttribute("y",50);
			text.innerHTML = data[a].headline;
			document.getElementById("MainMenuSVG").appendChild(text);
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.id = 'image_oct_bodytext'+a; text.setAttribute("class","imageoct");
			text.style.opacity = 0; text.style.fill = data[a].textcolour;
			text.style["font-size"] = 2.5;
			text.setAttribute("x",15); text.setAttribute("y",52);
			text.innerHTML = data[a].text;
			document.getElementById("MainMenuSVG").appendChild(text);

		var shape = document.createElementNS('http://www.w3.org/2000/svg','polygon');
			shape.id = 'image_oct_link'+a; shape.setAttribute("class","imageoct");
			shape.style.opacity = 0;
			var temp = 2;
//			shape.setAttribute("onclick","window.location="+data[a].link+";");
			shape.setAttribute("onclick","console.log('"+data[a].headline+"');");
			shape.setAttribute("points",""+(33+(temp/2))+","+(10+temp)+" "+(66-(temp/2))+","+(10+temp)+" "+(90-temp)+","+(33+(temp/2))+" "+(90-temp)+","+(66-(temp/2))+" "+(66-(temp/2))+","+(90-temp)+" "+(33+(temp/2))+","+(90-temp)+" "+(10+temp)+","+(66-(temp/2))+" "+(10+temp)+","+(33+(temp/2))+"");
			document.getElementById("MainMenuSVG").appendChild(shape);
	}document.getElementById("MainMenuSVG").appendChild(def);

	var imageboxTransitioner_currentImage = 0;
	setTimeout(function(){
		document.getElementById('image_oct_image'+imageboxTransitioner_currentImage).style.opacity = 1;
		document.getElementById('image_oct_headtext'+imageboxTransitioner_currentImage).style.opacity = 1;
		document.getElementById('image_oct_bodytext'+imageboxTransitioner_currentImage).style.opacity = 1;
		document.getElementById('image_oct_link'+imageboxTransitioner_currentImage).style['z-index'] = 1;
		imageboxTransitioner_currentImage++;
	},1000);
	imageboxTransitioner = setInterval(function(){
		for(var a = 0; a < data.length; a++){
			document.getElementById('image_oct_image'+a).style.opacity = 0;
			document.getElementById('image_oct_headtext'+a).style.opacity = 0;
			document.getElementById('image_oct_bodytext'+a).style.opacity = 0;
			document.getElementById('image_oct_link'+a).style['z-index'] = -1;
		}
		document.getElementById('image_oct_image'+imageboxTransitioner_currentImage).style.opacity = 1;
		document.getElementById('image_oct_headtext'+imageboxTransitioner_currentImage).style.opacity = 1;
		document.getElementById('image_oct_bodytext'+imageboxTransitioner_currentImage).style.opacity = 1;
		document.getElementById('image_oct_link'+imageboxTransitioner_currentImage).style['z-index'] = 1;
		imageboxTransitioner_currentImage++; if(imageboxTransitioner_currentImage == data.length){imageboxTransitioner_currentImage = 0;}
	},5000);
}







