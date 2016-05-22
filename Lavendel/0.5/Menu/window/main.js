function MainMenu(ID,X,Y){
// Vars and Functions //// //// //// //// //// //// //// ////
	var SVG_Element; var shape; var code;
	
// Graphics //// //// //// //// //// //// //// //// //// ////
//SVG Container
	SVG_Element = MakeWindow_SVG(ID,1,X,Y,400,250);
	SVG_Element.setAttribute("onload","console.log('loaded');");

// Plates //// //// //// ////
//Backing Plate
	SVG_Element.appendChild(MakeWindow_Rect("BackingPlate",0,0,"100%","100%"));

//Main Space Plate
	SVG_Element.appendChild(MakeWindow_Rect("Plate","1%","12%","98%","86%"));

//Header Bar
	shape = MakeWindow_Rect("Plate","1%","2%","98%","8%");
	code = 'MoveWindowWithID(event,this);';
	shape.setAttribute("onmousedown",code);
	SVG_Element.appendChild(shape);
//Plates
	SVG_Element.appendChild(MakeWindow_Rect("Plate","2%","14%","20%","82%"));
	SVG_Element.appendChild(MakeWindow_Rect("Plate","3%","15%","18%","7%"));

// Text //// //// //// ////
	SVG_Element.appendChild(MakeWindow_Text("generalText","8%","8.5%","Main Menu","start","16px","Lucida Console"));
	SVG_Element.appendChild(MakeWindow_Text("generalText","4%","20%","Live Data","start","12px","Lucida Console"));
	SVG_Element.appendChild(MakeWindow_Text("generalText","4%","27%","View","start","12px","Lucida Console","ViewFeed"));

// Buttons //// //// //// ////
//Exit Button
	SVG_Element.appendChild(MakeWindow_Rect("ExitButtonBack","5","5","20","20"));
	shape = MakeWindow_Rect("ButtonDim","5","5","20","20");
	code = 'DeleteWindowWithID(this);';
	shape.setAttribute("onmousedown",code);
	SVG_Element.appendChild(shape);

	return SVG_Element;
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Menu/window/main.js loaded"); BootCount++;