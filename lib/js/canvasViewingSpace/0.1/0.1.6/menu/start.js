function startMenu(type,point,ID=-1){console.log('attempting to open window of type: ' + type);
	var newWindow;
	switch(type){
		case 'main': if(!doesWindowExist(type)){newWindow = menu_buildMainMenu(point);} break;
		case 'object': if(!doesWindowExist(type+'_'+ID)){newWindow = menu_buildObjectMenu(point,ID);} break;	
		case 'automoveScriptEditor': if(!doesWindowExist(type)){newWindow = menu_automoveScriptEditor(point);} break;		
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

	// Buttons //// //// //// ////
		//Delete Button
		SVG_Element.appendChild(buildMenu_rect("deleteButtonBack",['80%','80%'],"18%","18%"));
		shape = buildMenu_rect("buttonDim",['80%','80%'],"18%","18%");
		code = 'drawList.foreground.removeByID('+ID+');removeWindowWithID(this);';
		shape.setAttribute("onmousedown",code);
		SVG_Element.appendChild(shape);		
		//Exit Button
		SVG_Element.appendChild(buildMenu_rect("exitButtonBack",['5','5'],"20","20"));
		shape = buildMenu_rect("buttonDim",['5','5'],"20","20");
		code = 'removeWindowWithID(this);';
		shape.setAttribute("onmousedown",code);
		SVG_Element.appendChild(shape);
		
		
	// Text //// //// //// ////
		var data = drawList.foreground.getObj(ID).getData()


		//Header Bar
			SVG_Element.appendChild(buildMenu_text("generalText",['30','20'],data.name,"start",'16',"Lucida Console"));
		//Body
			var temp = 45;
			SVG_Element.appendChild(buildMenu_text("generalText",['10',temp],'Position',"start","12","Lucida Console"));
			SVG_Element.appendChild(buildMenu_text("generalText",['60',temp],'X',"start","12","Lucida Console"));
			SVG_Element.appendChild(buildMenu_text("generalText",['120',temp],'Y',"start","12","Lucida Console"));temp+=15;

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
		var updateCode_Numerical = ''+
			'if(event.keyCode == 13){'+
				'var temp = this.childNodes[0].value.toString().split("");'+ 'temp.pop();'+ 'temp = temp.join("");'+
				'if(temp == ""){temp = 0;}'+
				'drawList.foreground.getObj(this.childNodes[0].id.split("-")[0]).set(this.childNodes[0].id.split("-")[1],temp);'+
				'this.childNodes[0].value = parseFloat(temp);'+
			'}'+
			'else{'+
				'var temp = this.childNodes[0].value;'+
				'if(temp == ""){temp = 0;}'+
				'drawList.foreground.getObj(this.childNodes[0].id.split("-")[0]).set(this.childNodes[0].id.split("-")[1],temp);'+
				'this.childNodes[0].value = parseFloat(temp);'+
			'}'+
			'this.childNodes[0].scrollTop = 0;'+
		'';

		var updateCode_Text = ''+
			'if(event.keyCode == 13){'+
				'var temp = this.childNodes[0].value.toString().split("");'+ 'temp.pop();'+ 'temp = temp.join("");'+

				'drawList.foreground.getObj(this.childNodes[0].id.split("-")[0]).set(this.childNodes[0].id.split("-")[1],temp);'+
				'this.childNodes[0].value = temp;'+
			'}'+
			'else{'+
				'var temp = this.childNodes[0].value;'+
				'drawList.foreground.getObj(this.childNodes[0].id.split("-")[0]).set(this.childNodes[0].id.split("-")[1],temp);'+
				'this.childNodes[0].value = temp;'+
			'}'+
			'this.childNodes[0].scrollTop = 0;'+
		'';

		var temp = 31;
		SVG_Element.appendChild( buildMenu_textBox("noCSSText",['72',temp],"30","10",data.initialData.position[0],12,"Lucida Console",ID+"-position_x",updateCode_Numerical) );
		SVG_Element.appendChild( buildMenu_textBox("noCSSText",['132',temp],"30","10",data.initialData.position[1],12,"Lucida Console",ID+"-position_y",updateCode_Numerical) );temp+=15;
		SVG_Element.appendChild( buildMenu_textBox("noCSSText",['50',temp],"70","10",data.initialData.width,12,"Lucida Console",ID+"-width",updateCode_Numerical) );temp+=15;
		SVG_Element.appendChild( buildMenu_textBox("noCSSText",['55',temp],"70","10",data.initialData.height,12,"Lucida Console",ID+"-height",updateCode_Numerical) );temp+=15;
		SVG_Element.appendChild( buildMenu_textBox("noCSSText",['55',temp],"70","10",data.initialData.angle,12,"Lucida Console",ID+"-angle",updateCode_Numerical) );temp+=15;
		switch(data.name){
			case 'Rectangle':
				temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['30',temp],"30","10",data.styleData.R,12,"Lucida Console",ID+"-R",updateCode_Numerical) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['30',temp],"30","10",data.styleData.G,12,"Lucida Console",ID+"-G",updateCode_Numerical) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['30',temp],"30","10",data.styleData.B,12,"Lucida Console",ID+"-B",updateCode_Numerical) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['30',temp],"30","10",data.styleData.A,12,"Lucida Console",ID+"-A",updateCode_Numerical) );temp+=15;
				temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['150',temp],"30","10",data.styleData.lineThickness,12,"Lucida Console",ID+"-lineThickness",updateCode_Numerical) );
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['30',temp],"30","10",data.styleData.line_R,12,"Lucida Console",ID+"-line_R",updateCode_Numerical) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['30',temp],"30","10",data.styleData.line_G,12,"Lucida Console",ID+"-line_G",updateCode_Numerical) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['30',temp],"30","10",data.styleData.line_B,12,"Lucida Console",ID+"-line_B",updateCode_Numerical) );temp+=15;
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['30',temp],"30","10",data.styleData.line_A,12,"Lucida Console",ID+"-line_A",updateCode_Numerical) );temp+=15;
			break;
			case 'Image': 
				SVG_Element.appendChild( buildMenu_textBox("noCSSText",['55',temp],"90","13",data.styleData.URL,12,"Lucida Console",ID+"-URL",updateCode_Text) );temp+=15;
			break;
		}					

	return SVG_Element;
}









function menu_buildMainMenu(point){
	var SVG_Element; var code = '';

// Graphics //// //// //// //// //// //// //// //// //// ////
	//SVG Container
		SVG_Element = buildMenu_SVG('main',1,point,400,225);
		SVG_Element.setAttribute("onload","console.log('loaded');");

	// Plates //// //// //// ////
		//Backing Plate
			SVG_Element.appendChild(buildMenu_rect("backingPlate",[0,0],"100%","100%"));
		//Main Space Plate
			shape = buildMenu_rect("plate",['1%','12%'],"98%","86%");
			code = 'moveWindowWithID(event,this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);

		//Header Bar
			shape = buildMenu_rect("plate",['1%','2%'],"98%","8%");
			code = 'moveWindowWithID(event,this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);

			SVG_Element.appendChild(buildMenu_rect("plate",[8,105],81,111));

	// Buttons //// //// //// ////
		//New File
			var pos = [7,33]; var size = [81,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'New',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'drawList.foreground.removeAll()';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Save File
			var pos = [7,57]; var size = [81,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Save',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'downloadScene(this.parentElement.getElementById("title").value);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Load File
			var pos = [7,81]; var size = [81,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Load',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'uploadScene();';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Exit Button
			SVG_Element.appendChild(buildMenu_rect("exitButtonBack",['1%','2%'],18,18));
			shape = buildMenu_rect("buttonDim",['1%','2%'],18,18);
			code = 'removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);

		//Tool.Drag = Pan Button
			var pos = [12,120]; var size = [70,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Pan',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,70,20);
			code = 'tool.drag = "pan";removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Tool.Drag = Spin Button
			var pos = [12,144]; var size = [70,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Spin',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'tool.drag = "spin";removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Create Rectangle Button
			var pos = [12,168]; var size = [70,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Rect',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'tool.drag = "rectangle";removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Create Image Button
			var pos = [12,192]; var size = [70,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Image',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'tool.drag = "image";removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);


		//Start Presentation Button
			var pos = [92,33]; var size = [225,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Start Presentation',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'present();removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Start Automove Script Editor Button
			var pos = [92,57]; var size = [225,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Automove Script Editor',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'startMenu("automoveScriptEditor",['+point+']);removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);



	// Text //// //// //// ////
		SVG_Element.appendChild(buildMenu_text("generalText",[10,117],'Tool',"start",'12',"Lucida Console"));		

	// Text Box //// //// //// ////
		var updateCode_Text = ''+
			'if(event.keyCode == 13){'+
				'var temp = this.childNodes[0].value.toString().split("");'+ 'temp.pop();'+ 'temp = temp.join("");'+
				'this.childNodes[0].value = temp;'+
			'}'+
			'else{'+
				'var temp = this.childNodes[0].value;'+
				'this.childNodes[0].value = temp;'+
			'}'+
			'this.childNodes[0].scrollTop = 0;'+
		'';
		SVG_Element.appendChild( buildMenu_textBox("headerText",[20,5],375,18,"Scene 1",18,"Lucida Console",'title',updateCode_Text) );
		
	return SVG_Element;
}