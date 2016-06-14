var imageboxTransitioner; var slideCount; var pauseSlideShow = false;
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

	addTabs();
	PutTogetherImageBox();
	
	setTimeout(function(){
		document.getElementById("backing_oct").style.opacity = 1;
		var contents = document.getElementsByClassName('slideButton'); console.log(contents);
		for(var a = 0; a < contents.length; a++){contents[a].style.opacity = 1;}
	},1000);
}

function HideMainMenu(){
	clearInterval(imageboxTransitioner);
	var contents = document.getElementById('MainMenuSVG').childNodes;
	for(var a = 0; a < contents.length; a++){contents[a].style.opacity = 0;}
	setTimeout(function(){document.getElementsByTagName("body")[0].removeChild(document.getElementById('MainMenuSVG'))},1000);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getData(){
	var array = Object.keys(articles); var outputarray = [];
	for(var a = 0; a < array.length; a++){outputarray[a] = articles[array[a]];}
	return outputarray;
}

function PutTogetherImageBox(){
var data = getData(); slideCount = data.length;
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
			image.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",data[a].image_url);
			pattern.appendChild(image);
			def.appendChild(pattern);
		var shape = document.createElementNS('http://www.w3.org/2000/svg','polygon');
			shape.id = 'image_oct_image'+a; shape.setAttribute("class","imageoct");
			shape.style.opacity = 0;
			var temp = 2;
			shape.setAttribute("points",""+(33+(temp/2))+","+(10+temp)+" "+(66-(temp/2))+","+(10+temp)+" "+(90-temp)+","+(33+(temp/2))+" "+(90-temp)+","+(66-(temp/2))+" "+(66-(temp/2))+","+(90-temp)+" "+(33+(temp/2))+","+(90-temp)+" "+(10+temp)+","+(66-(temp/2))+" "+(10+temp)+","+(33+(temp/2))+"");
			shape.setAttribute("fill","url(#img_"+a+")");
			document.getElementById("MainMenuSVG").appendChild(shape);
		var shape = document.createElementNS('http://www.w3.org/2000/svg','polygon');
			shape.id = 'image_oct_textbacker'+a; shape.setAttribute("class","imageoct");
			shape.style.opacity = 0; shape.style.fill = data[a].backerFill;
			shape.setAttribute("points",""+(90-temp)+","+(43+(temp/2))+" "+(90-temp)+","+(56-(temp/2))+" "+(10+temp)+","+(56-(temp/2))+" "+(10+temp)+","+(43+(temp/2))+"");
			document.getElementById("MainMenuSVG").appendChild(shape);

		var SlightAdjust = 1;
		if(data[a].text_line2 == ""){SlightAdjust = 0;}		
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.id = 'image_oct_headtext'+a; text.setAttribute("class","imageoct");
			text.style.opacity = 0; text.style.fill = data[a].textcolour;
			text.style["font-size"] = 5;
			text.setAttribute("x",15); text.setAttribute("y",50-SlightAdjust);
			text.innerHTML = data[a].headline;
			text.setAttribute("extraData",data[a].link_url);
			document.getElementById("MainMenuSVG").appendChild(text);
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.id = 'image_oct_bodytext1'+a; text.setAttribute("class","imageoct");
			text.style.opacity = 0; text.style.fill = data[a].textcolour;
			text.style["font-size"] = 2.5;
			text.setAttribute("x",15); text.setAttribute("y",52-SlightAdjust);
			text.innerHTML = data[a].text_line1;
			document.getElementById("MainMenuSVG").appendChild(text);
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.id = 'image_oct_bodytext2'+a; text.setAttribute("class","imageoct");
			text.style.opacity = 0; text.style.fill = data[a].textcolour;
			text.style["font-size"] = 2.5;
			text.setAttribute("x",15); text.setAttribute("y",54-SlightAdjust);
			text.innerHTML = data[a].text_line2;
			document.getElementById("MainMenuSVG").appendChild(text);
	}document.getElementById("MainMenuSVG").appendChild(def);

	var shape = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		shape.id = 'image_oct_link'; shape.setAttribute("class","imageoct");
		shape.style.opacity = 0; 
		var temp = 2;
		shape.setAttribute("points",""+(33+(temp/2))+","+(10+temp)+" "+(66-(temp/2))+","+(10+temp)+" "+(90-temp)+","+(33+(temp/2))+" "+(90-temp)+","+(66-(temp/2))+" "+(66-(temp/2))+","+(90-temp)+" "+(33+(temp/2))+","+(90-temp)+" "+(10+temp)+","+(66-(temp/2))+" "+(10+temp)+","+(33+(temp/2))+"");
		document.getElementById("MainMenuSVG").appendChild(shape);
	
	var imageboxTransitioner_currentImage = 0;
	setTimeout(function(){goToSlide(imageboxTransitioner_currentImage++);},1000);
	imageboxTransitioner = setInterval(function(){if(!pauseSlideShow){
		goToSlide(imageboxTransitioner_currentImage++);
		if(imageboxTransitioner_currentImage == data.length){imageboxTransitioner_currentImage = 0;}	
	}},5000);
}

function addTabs(){
	var shape = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		shape.setAttribute("points","11,67 15,71 10,76 6,72");
		shape.style.fill = 'rgb(255,0,0)'; shape.style.opacity = 0; 
		shape.id = 'slideButton_1';
		shape.setAttribute('class','slideButton menu');
		document.getElementById("MainMenuSVG").appendChild(shape);
}

function goToSlide(number){
	for(var a = 0; a < slideCount; a++){
		document.getElementById('image_oct_image'+a).style.opacity = 0;
		document.getElementById('image_oct_headtext'+a).style.opacity = 0;
		document.getElementById('image_oct_bodytext1'+a).style.opacity = 0;
		document.getElementById('image_oct_bodytext2'+a).style.opacity = 0;
		document.getElementById('image_oct_textbacker'+a).style.opacity = 0;
	}
	document.getElementById('image_oct_image'+number).style.opacity = 1;
	document.getElementById('image_oct_headtext'+number).style.opacity = 1;
	document.getElementById('image_oct_bodytext1'+number).style.opacity = 1;
	document.getElementById('image_oct_bodytext2'+number).style.opacity = 1;
	document.getElementById('image_oct_textbacker'+number).style.opacity = 1;
	var temp = document.getElementById('image_oct_headtext'+number).getAttribute('extraData');
		
	document.getElementById('image_oct_link').setAttribute("onclick","window.location='"+temp+"';");	
}
