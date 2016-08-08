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


	// Text //// //// //// ////
		SVG_Element.appendChild(buildMenu_text("generalText",[65,47],'Position: X: n/a Y: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_hereReadout_1'));
		SVG_Element.appendChild(buildMenu_text("generalText",[65,63],'Zoom: n/a | Angle: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_hereReadout_2'));
			
		SVG_Element.appendChild(buildMenu_text("generalText",[65,87],'Position: X: n/a Y: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_scriptelementReadout_1'));
		SVG_Element.appendChild(buildMenu_text("generalText",[65,103],'Zoom: n/a | Angle: n/a',"start",'12',"Lucida Console",'menu_automoveScriptEditor_scriptelementReadout_2'));
			
	// Text Box //// //// //// ////	
		var updateCode = ''+
			'if(event.keyCode == 13){var temp = this.childNodes[0].value.toString().split("");'+ 'temp.pop();'+ 'temp = temp.join("");}'+
			'else{var temp = this.childNodes[0].value;}'+

			'if(temp == ""){temp = 0;} if(temp > automoveScript_getlength()-1){temp = automoveScript_getlength()-1;}'+
			'this.childNodes[0].value = parseInt(temp);'+
			'temp = automoveScript_get(parseInt(temp));'+
			'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_1").innerHTML = "Position: X: " + Math.round(temp.position.position[0]*1000000)/1000000 + " Y: " + Math.round(temp.position.position[1]*1000000)/1000000;'+
			'document.getElementById("menu_automoveScriptEditor_scriptelementReadout_2").innerHTML = "Zoom: " + temp.position.zoom + " | Angle: " + Math.round(temp.position.angle*1000000)/1000000; '+
			'this.childNodes[0].scrollTop = 0;'+
		'';
		SVG_Element.appendChild( buildMenu_textBox("generalText",[7,80],20,18,"0",15,"Lucida Console",'scriptelementSelector',updateCode) );

	return SVG_Element;
}