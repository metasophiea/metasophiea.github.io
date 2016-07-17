function startMenu(type,point,ID=-1){
	var newWindow;
	switch(type){
		case 'main': if(!doesWindowExist(type)){newWindow = menu_buildMainMenu(point);} break;
		case 'object': if(!doesWindowExist(type+'_'+ID)){newWindow = menu_buildObjectMenu(point,ID);} break;		
	}

	if(newWindow){containerElement.appendChild(newWindow);}
}

function removeWindowWithID(that){ containerElement.removeChild(that.parentElement); }
function doesWindowExist(type){
	var temp = containerElement.getElementsByTagName('svg');
	for(var a = 0; a < temp.length; a++){
		if(temp[a].id == type){return true;}
	}
	return false;
}





function menu_buildObjectMenu(point,ID){
	var SVG_Element; var code = '';

// Graphics //// //// //// //// //// //// //// //// //// ////
	//SVG Container
		SVG_Element = buildMenu_SVG('object_'+ID,1,point,250,250);
		SVG_Element.setAttribute("onload","console.log('loaded');");

	// Plates //// //// //// ////
		//Backing Plate
			SVG_Element.appendChild(buildMenu_rect("backingPlate",[0,0],"100%","100%"));
		//Main Space Plate
			SVG_Element.appendChild(buildMenu_rect("plate",['2%','12%'],"96%","86%"));

		//Header Bar
			shape = buildMenu_rect("plate",['2%','2%'],"96%","8%");
			code = 'moveWindowWithID(event,this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		
	// Text //// //// //// ////
		var data = drawList.foreground.getObj(ID).getData()


		//Header Bar
			SVG_Element.appendChild(buildMenu_text("generalText",['30','20'],data.name,"start",'16',"Lucida Console"));
		//Body
			var temp = 45;
			SVG_Element.appendChild(buildMenu_text("generalText",['10',temp],'Position',"start","12","Lucida Console"));temp+=15;
			SVG_Element.appendChild(buildMenu_text("generalText",['10',temp],'Width',"start","12","Lucida Console"));temp+=15;
			SVG_Element.appendChild(buildMenu_text("generalText",['10',temp],'Height',"start","12","Lucida Console"));temp+=15;
			SVG_Element.appendChild(buildMenu_text("generalText",['10',temp],'Angle',"start","12","Lucida Console"));temp+=15;
			switch(data.name){
				case 'Rectangle':
					SVG_Element.appendChild(buildMenu_text("generalText",['10',temp],'Fill Colour',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['20',temp],'R',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['20',temp],'G',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['20',temp],'B',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['20',temp],'A',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['10',temp],'Outline Colour',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['80',temp],'Thickness',"start","12","Lucida Console"));
					SVG_Element.appendChild(buildMenu_text("generalText",['20',temp],'R',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['20',temp],'G',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['20',temp],'B',"start","12","Lucida Console"));temp+=15;
					SVG_Element.appendChild(buildMenu_text("generalText",['20',temp],'A',"start","12","Lucida Console"));temp+=15;
				break; 
				case 'Image': 
					SVG_Element.appendChild(buildMenu_text("generalText",['10',temp],'URL',"start","12","Lucida Console"));temp+=15;
				break;
			}

	// Text Box //// //// //// ////
		var updateCode = ''+
			'if(event.keyCode == 13){'+
				'var temp = this.childNodes[0].value.toString().split("");'+ 'temp.pop();'+
				'console.log("drawList.foreground.getObj("+this.childNodes[0].id.split("-")[0]+").set("+this.childNodes[0].id.split("-")[1]+","+temp.join("")+")");'+
				'drawList.foreground.getObj(this.childNodes[0].id.split("-")[0]).set(this.childNodes[0].id.split("-")[1],temp.join(""));'+
			'}'+
			'this.childNodes[0].scrollTop = 0;'+
		'';

		var temp = 31;
		SVG_Element.appendChild( buildMenu_textBox("generalText",['70',temp],"70","10",data.initialData.position,12,"Lucida Console",ID+"-position",updateCode) );temp+=15;
		SVG_Element.appendChild( buildMenu_textBox("generalText",['50',temp],"70","10",data.initialData.width,12,"Lucida Console",ID+"-width",updateCode) );temp+=15;
		SVG_Element.appendChild( buildMenu_textBox("generalText",['55',temp],"70","10",data.initialData.height,12,"Lucida Console",ID+"-height",updateCode) );temp+=15;
		SVG_Element.appendChild( buildMenu_textBox("generalText",['55',temp],"70","10",data.initialData.angle,12,"Lucida Console",ID+"-angle",updateCode) );temp+=15;
		switch(data.name){
			case 'Rectangle':
				temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("generalText",['30',temp],"30","10",data.styleData.R,12,"Lucida Console",ID+"-R",updateCode) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("generalText",['30',temp],"30","10",data.styleData.G,12,"Lucida Console",ID+"-G",updateCode) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("generalText",['30',temp],"30","10",data.styleData.B,12,"Lucida Console",ID+"-B",updateCode) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("generalText",['30',temp],"30","10",data.styleData.A,12,"Lucida Console",ID+"-A",updateCode) );temp+=15;
				temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("generalText",['150',temp],"30","10",data.styleData.lineThickness,12,"Lucida Console",ID+"-lineThickness",updateCode) );
				SVG_Element.appendChild( buildMenu_textBox("generalText",['30',temp],"30","10",data.styleData.line_R,12,"Lucida Console",ID+"-line_R",updateCode) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("generalText",['30',temp],"30","10",data.styleData.line_G,12,"Lucida Console",ID+"-line_G",updateCode) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("generalText",['30',temp],"30","10",data.styleData.line_B,12,"Lucida Console",ID+"-line_B",updateCode) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("generalText",['30',temp],"30","10",data.styleData.line_A,12,"Lucida Console",ID+"-line_A",updateCode) );temp+=15;
			break;
			case 'Image': 
				SVG_Element.appendChild( buildMenu_textBox("generalText",['55',temp],"90","13",data.styleData.URL,12,"Lucida Console",ID+"-URL",updateCode) );temp+=15;
			break;
		}					

	// Buttons //// //// //// ////
		//Exit Button
		SVG_Element.appendChild(buildMenu_rect("exitButtonBack",['5','5'],"20","20"));
		shape = buildMenu_rect("buttonDim",['5','5'],"20","20");
		code = 'removeWindowWithID(this);';
		shape.setAttribute("onmousedown",code);
		SVG_Element.appendChild(shape);

	return SVG_Element;
}









function menu_buildMainMenu(point){
	var SVG_Element; var code = '';

// Graphics //// //// //// //// //// //// //// //// //// ////
	//SVG Container
		SVG_Element = buildMenu_SVG('main',1,point,400,250);
		SVG_Element.setAttribute("onload","console.log('loaded');");

	// Plates //// //// //// ////
		//Backing Plate
			SVG_Element.appendChild(buildMenu_rect("backingPlate",[0,0],"100%","100%"));
		//Main Space Plate
			SVG_Element.appendChild(buildMenu_rect("plate",['1%','12%'],"98%","86%"));

		//Header Bar
			shape = buildMenu_rect("plate",['1%','2%'],"98%","8%");
			code = 'moveWindowWithID(event,this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);

	// Buttons //// //// //// ////
		//Exit Button
		SVG_Element.appendChild(buildMenu_rect("exitButtonBack",['5','5'],"20","20"));
		shape = buildMenu_rect("buttonDim",['5','5'],"20","20");
		code = 'removeWindowWithID(this);';
		shape.setAttribute("onmousedown",code);
		SVG_Element.appendChild(shape);

	return SVG_Element;
}


