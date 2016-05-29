function ImageMenu(ID,X,Y,data){
// Vars and Functions //// //// //// //// //// //// //// ////
	var SVG_Element; var shape; var code;
	
// Graphics //// //// //// //// //// //// //// //// //// ////
//SVG Container
	SVG_Element = MakeWindow_SVG(ID,1,X,Y,200,165);
	SVG_Element.setAttribute("onload","console.log('loaded');");

// Plates //// //// //// ////
//Backing Plate
	SVG_Element.appendChild(MakeWindow_Rect("BackingPlate",0,0,"100%","100%"));

//Header Bar
	shape = MakeWindow_Rect("Plate","5","5","190","20");
	code = 'MoveWindowWithID(event,this);';
	shape.setAttribute("onmousedown",code);
	SVG_Element.appendChild(shape);

//Main Space Plate
	SVG_Element.appendChild(MakeWindow_Rect("Plate","5","30","190","130"));

//Plates
	SVG_Element.appendChild(MakeWindow_Rect("textBackground","10","90","180","40"));	

// Text //// //// //// ////
	SVG_Element.appendChild(MakeWindow_Text("generalText","30","20","Image - "+ID,"start","16px","Lucida Console"));
	SVG_Element.appendChild(MakeWindow_Text("generalText","10","45","Center X: ","start","12px","Lucida Console"));
	SVG_Element.appendChild(MakeWindow_TextBox("generalText","75","32","30","12",data.Center[0],"12px","Lucida Console",ID+"_CenterX"));
	SVG_Element.appendChild(MakeWindow_Text("generalText","110","45","Y: ","start","12px","Lucida Console"));
	SVG_Element.appendChild(MakeWindow_TextBox("generalText","125","32","30","12",data.Center[1],"12px","Lucida Console",ID+"_CenterY"));

	SVG_Element.appendChild(MakeWindow_Text("generalText","10","58","Width:","start","12px","Lucida Console"));
	SVG_Element.appendChild(MakeWindow_TextBox("generalText","55","45","30","12",data.Width,"12px","Lucida Console",ID+"_Width"));
	SVG_Element.appendChild(MakeWindow_Text("generalText","100","58","Height:","start","12px","Lucida Console"));
	SVG_Element.appendChild(MakeWindow_TextBox("generalText","150","45","30","12",data.Height,"12px","Lucida Console",ID+"_Height"));

	SVG_Element.appendChild(MakeWindow_Text("generalText","10","71","Angle:","start","12px","Lucida Console"));
	SVG_Element.appendChild(MakeWindow_TextBox("generalText","55","59","130","12",data.Angle,"12px","Lucida Console",ID+"_Angle"));

	SVG_Element.appendChild(MakeWindow_Text("generalText","10","84","URL:","start","12px","Lucida Console"));	
	SVG_Element.appendChild(MakeWindow_TextBox("generalText","15","95","170","30",data.URL,"12px","Lucida Console",ID+"_URL"));	

// Buttons //// //// //// ////
//Update
	SVG_Element.appendChild(MakeWindow_Rect("UpdateButtonBack","10","135","60","20"));
	SVG_Element.appendChild(MakeWindow_Text("generalText","19","149","update","start","12px","Lucida Console"));
	shape = MakeWindow_Rect("ButtonGlow","10","135","60","20");	
	code = 'var newData = ' + JSON.stringify(data) + ';'
		+'var temp = ContainerElement.getElementsByTagName("textarea");'
		+'for(var a = 0; a < temp.length; a++){'
			+'if(temp[a].id == "'+ID+'_URL"){newData.URL = temp[a].value;}'
			+'if(temp[a].id == "'+ID+'_CenterX"){newData.Center[0] = temp[a].value;}'
			+'if(temp[a].id == "'+ID+'_CenterY"){newData.Center[1] = temp[a].value;}'
			+'if(temp[a].id == "'+ID+'_Width"){newData.Width = temp[a].value;}'
			+'if(temp[a].id == "'+ID+'_Height"){newData.Height = temp[a].value;}'
			+'if(temp[a].id == "'+ID+'_Angle"){newData.Angle = temp[a].value;}'
		+'}'
		+'GetObjectFromID('+ID+').Set(newData.URL ,"URL");'
		+'GetObjectFromID('+ID+').Set(newData.Center,"Center");'
		+'GetObjectFromID('+ID+').Set(newData.Width,"Width");'
		+'GetObjectFromID('+ID+').Set(newData.Height,"Height");'
		+'GetObjectFromID('+ID+').Set(newData.Angle,"Angle");'
		+'';
	shape.setAttribute("onmousedown",code);
	SVG_Element.appendChild(shape);
//Exit Button
	SVG_Element.appendChild(MakeWindow_Rect("ExitButtonBack","5","5","20","20"));
	shape = MakeWindow_Rect("ButtonDim","5","5","20","20");
	code = 'DeleteWindowWithID(this);';
	shape.setAttribute("onmousedown",code);
	SVG_Element.appendChild(shape);

	return SVG_Element;


}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Menu/window/imagemenu.js loaded"); BootCount++;