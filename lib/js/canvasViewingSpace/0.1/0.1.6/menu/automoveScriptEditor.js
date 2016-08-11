function menu_automoveScriptEditor(point){
	var SVG_Element; var code = '';

// Graphics //// //// //// //// //// //// //// //// //// ////
	//SVG Container
		SVG_Element = buildMenu_SVG('automoveScriptEditor',1,point,400,225);
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
			SVG_Element.appendChild(buildMenu_text("generalText",['25','19'],'Automove Script Editor',"start",'16',"Lucida Console"));

	// Buttons //// //// //// ////
		//Exit Button
			SVG_Element.appendChild(buildMenu_rect("exitButtonBack",['1%','2%'],18,18));
			shape = buildMenu_rect("buttonDim",['1%','2%'],18,18);
			code = 'removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Get Here
			var pos = [7,30]; var size = [50,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Here',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = ''+
				'var temp = getPositionHere();'+
				'document.getElementById("menu_automoveScriptEditor_hereReadout_1").innerHTML = "Position: X: " + Math.round(temp.position[0]*1000000)/1000000 + " Y: " + Math.round(temp.position[1]*1000000)/1000000;'+
				'document.getElementById("menu_automoveScriptEditor_hereReadout_2").innerHTML = "Zoom: " + temp.zoom + " | Angle: " + Math.round(temp.angle*1000000)/1000000; '+
			'';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
		//Add Here
			var pos = [7,53]; var size = [50,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Add',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = ''+
				'automoveScript_push(getPositionHere());'+
			'';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);



		//Edit Element
			var pos = [7,110]; var size = [75,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Edit',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'startMenu("automoveScriptElementEditor",['+(point[0]+10)+','+(point[1]+10)+'],0,parseInt(document.getElementById("menu_automoveScriptEditor_scriptelementReadout_elementNumber").innerHTML));';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);

		//Replace Element
			var pos = [7,133]; var size = [75,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Replace',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = 'automoveScript_replace(parseInt(document.getElementById("menu_automoveScriptEditor_scriptelementReadout_elementNumber").innerHTML),{"position":getPositionHere()});';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);	

		//Plop in Element
			var pos = [7,156]; var size = [75,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Plop in',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = ''+
				'automoveScript_inject(parseInt(document.getElementById("menu_automoveScriptEditor_scriptelementReadout_elementNumber").innerHTML),{"position":getPositionHere(),"details":{"type":"cosin","duration":3}});'+
			'';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);	

		//Remove Element
			var pos = [7,179]; var size = [75,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Remove',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			code = ''+
				'var number = parseInt(document.getElementById("menu_automoveScriptEditor_scriptelementReadout_elementNumber").innerHTML);'+
				'automoveScript_remove(number);'+

				'if(number > automoveScript_getlength()-1){number--;}'+
				'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_elementNumber").innerHTML = number;'+
				'number = automoveScript_get(number);'+
				'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_1").innerHTML = "Position: X: " + Math.round(number.position.position[0]*1000000)/1000000 + " Y: " + Math.round(number.position.position[1]*1000000)/1000000;'+
				'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_2").innerHTML = "Zoom: " + number.position.zoom + " | Angle: " + Math.round(number.position.angle*1000000)/1000000; '+	
			'';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);	

		//Move between elements
			//<
				var pos = [7,93]; var size = [15,15];
				SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
				SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+12],'<',"start","16","Lucida Console"));
				shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
				code = ''+
					'var elementnumber = document.getElementById("menu_automoveScriptEditor_scriptelementReadout_elementNumber");'+
					'var number = parseInt(elementnumber.innerHTML);'+
					'if(number > 0){number--; elementnumber.innerHTML = number;}'+
					'number = automoveScript_get(parseInt(number));'+
					'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_1").innerHTML = "Position: X: " + Math.round(number.position.position[0]*1000000)/1000000 + " Y: " + Math.round(number.position.position[1]*1000000)/1000000;'+
					'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_2").innerHTML = "Zoom: " + number.position.zoom + " | Angle: " + Math.round(number.position.angle*1000000)/1000000; '+
					'if(parseInt(elementnumber.innerHTML) == 0){document.getElementById("menu_automoveScriptEditor_scriptelementReadout_3").innerHTML = "No transition for initial location";}'+
					'else{document.getElementById("menu_automoveScriptEditor_scriptelementReadout_3").innerHTML = "Duration: " + number.details.duration +" | Type: "+ number.details.type;}'+
				'';
				shape.setAttribute("onmousedown",code);
				SVG_Element.appendChild(shape);	
			//>	
				var pos = [35,93]; var size = [15,15];
				SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
				SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+12],'>',"start","16","Lucida Console"));
				shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
				code = ''+
					'var elementnumber = document.getElementById("menu_automoveScriptEditor_scriptelementReadout_elementNumber");'+
					'var number = parseInt(elementnumber.innerHTML);'+
					'if(number < automoveScript_getlength()-1){number++; elementnumber.innerHTML = number;}'+
					'number = automoveScript_get(parseInt(number));'+
					'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_1").innerHTML = "Position: X: " + Math.round(number.position.position[0]*1000000)/1000000 + " Y: " + Math.round(number.position.position[1]*1000000)/1000000;'+
					'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_2").innerHTML = "Zoom: " + number.position.zoom + " | Angle: " + Math.round(number.position.angle*1000000)/1000000; '+	
					'if(parseInt(elementnumber.innerHTML) == 0){document.getElementById("menu_automoveScriptEditor_scriptelementReadout_3").innerHTML = "No transition for initial location";}'+
					'else{document.getElementById("menu_automoveScriptEditor_scriptelementReadout_3").innerHTML = "Duration: " + number.details.duration +" | Type: "+ number.details.type;}'+
				'';
				shape.setAttribute("onmousedown",code);
				SVG_Element.appendChild(shape);	




	// Text //// //// //// ////
		//Here readout
			SVG_Element.appendChild(buildMenu_text("generalText",[65,47],'Position: X: n/a Y: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_hereReadout_1'));
			SVG_Element.appendChild(buildMenu_text("generalText",[65,63],'Zoom: n/a | Angle: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_hereReadout_2'));
		//Selected element readout	
			SVG_Element.appendChild(buildMenu_text("generalText",[7,90],'Element',"start",'12',"Lucida Console"));		
			SVG_Element.appendChild(buildMenu_text("generalText",[25,105],'0',"start",'12',"Lucida Console",'menu_automoveScriptEditor_scriptelementReadout_elementNumber'));

			SVG_Element.appendChild(buildMenu_text("generalText",[85,90],'- Destination -',"start",'12',"Lucida Console"));				
			SVG_Element.appendChild(buildMenu_text("generalText",[95,106],'Position: X: n/a Y: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_scriptelementReadout_1'));
			SVG_Element.appendChild(buildMenu_text("generalText",[95,122],'Zoom: n/a | Angle: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_scriptelementReadout_2'));
			SVG_Element.appendChild(buildMenu_text("generalText",[85,138],'- Transition -',"start",'12',"Lucida Console"));				
			SVG_Element.appendChild(buildMenu_text("generalText",[95,154],'Duration: n/a | Type: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_scriptelementReadout_3'));

			
	return SVG_Element;
}