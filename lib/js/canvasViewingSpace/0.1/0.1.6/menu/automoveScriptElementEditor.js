function menu_automoveScriptElementEditor(point,number){
	var SVG_Element; var code = ''; var data = automoveScript_get(number);

// Graphics //// //// //// //// //// //// //// //// //// ////
	//SVG Container
		SVG_Element = buildMenu_SVG('automoveScriptElementEditor',1,point,200,200);

  	// Plates //// //// //// ////
		//Backing Plate
			SVG_Element.appendChild(buildMenu_rect("backingPlate",[0,0],"100%","100%"));      
		//Main Space Plate
			shape = buildMenu_rect("plate",['2%','12%'],"96%","86%");
			code = 'moveWindowWithID(event,this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
        //Header Bar
			shape = buildMenu_rect("plate",['2%','2%'],"96%","8%");
			code = 'moveWindowWithID(event,this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);
			SVG_Element.appendChild(buildMenu_text("generalText",['25','18'],'Script Element Editor',"start",'16',"Lucida Console"));

	// Buttons //// //// //// ////
		//Exit Button
			SVG_Element.appendChild(buildMenu_rect("exitButtonBack",['2%','2%'],16,16));
			shape = buildMenu_rect("buttonDim",['2%','2%'],16,16);
			code = 'removeWindowWithID(this);';
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);

   		//Apply 
			var pos = [7,80]; var size = [60,20];
			SVG_Element.appendChild(buildMenu_rect("standardButtonBack",pos,size[0],size[1]));
			SVG_Element.appendChild(buildMenu_text("generalText",[pos[0]+3,pos[1]+16],'Apply',"start","16","Lucida Console"));
			shape = buildMenu_rect("buttonDim",pos,size[0],size[1]);
			if(number != 0){
				code = ''+              
       	        'var newdata = {"position":{"position":[parseInt(document.getElementById("automoveScriptElementEditor-position_x").value),parseInt(document.getElementById("automoveScriptElementEditor-position_y").value)], "zoom":parseInt(document.getElementById("automoveScriptElementEditor-position_zoom").value), "angle":parseInt(document.getElementById("automoveScriptElementEditor-position_angle").value)},"details":{"type":document.getElementById("automoveScriptElementEditor-details_type").value,"duration":parseInt(document.getElementById("automoveScriptElementEditor-details_duration").value)}}; '+

	            'if(isNaN(newdata.position.position[0])){newdata.position.position[0] = 0;}'+
   	            'if(isNaN(newdata.position.position[1])){newdata.position.position[1] = 0;}'+
   	            'if(isNaN(newdata.position.zoom)){newdata.position.zoom = 0;}'+
   	            'if(isNaN(newdata.position.angle)){newdata.position.angle = 0;}'+
				'if(isNaN(newdata.details.duration)){newdata.details.duration = 0;}'+

                'switch(newdata.details.type){'+
					'case "none": case "linear": case "sin": case "cos": case "cosin":'+
						'automoveScript_replace('+number+',newdata);'+
						'removeWindowWithID(this);'+
					'break;'+
					'default:'+
						'document.getElementById("automoveScriptElementEditor-errorReadout_1").innerHTML = "unknown movement type \\"" + newdata.details.type +"\\"";'+
						'document.getElementById("automoveScriptElementEditor-errorReadout_2").innerHTML = "available: none, linear, sin, cos, cosin";'+                   
                '}'+
            '';
			}
			else{
				code = ''+              
       	        'var newdata = {"position":{"position":[parseInt(document.getElementById("automoveScriptElementEditor-position_x").value),parseInt(document.getElementById("automoveScriptElementEditor-position_y").value)], "zoom":parseInt(document.getElementById("automoveScriptElementEditor-position_zoom").value), "angle":parseInt(document.getElementById("automoveScriptElementEditor-position_angle").value)},"details":{"type":"'+data.details.type+'","duration":'+data.details.duration+'}}; '+

	            'if(isNaN(newdata.position.position[0])){newdata.position.position[0] = 0;}'+
   	            'if(isNaN(newdata.position.position[1])){newdata.position.position[1] = 0;}'+
   	            'if(isNaN(newdata.position.zoom)){newdata.position.zoom = 0;}'+
   	            'if(isNaN(newdata.position.angle)){newdata.position.angle = 0;}'+
				'if(isNaN(newdata.details.duration)){newdata.details.duration = 0;}'+

                'switch(newdata.details.type){'+
					'case "none": case "linear": case "sin": case "cos": case "cosin":'+
						'automoveScript_replace('+number+',newdata);'+
						'removeWindowWithID(this);'+
					'break;'+
					'default:'+
						'document.getElementById("automoveScriptElementEditor-errorReadout_1").innerHTML = "unknown movement type \\"" + newdata.details.type +"\\"";'+
						'document.getElementById("automoveScriptElementEditor-errorReadout_2").innerHTML = "available: none, linear, sin, cos, cosin";'+                   
                '}'+
            '';			
			}
			shape.setAttribute("onmousedown",code);
			SVG_Element.appendChild(shape);         


    //Options
        //Position
	    	SVG_Element.appendChild(buildMenu_text("generalText",[10,45],'Position X: ',"start","12","Lucida Console"));
	    	SVG_Element.appendChild(buildMenu_textBox("noCSSText",[66,33],"30","12",data.position.position[0],12,"Lucida Console","automoveScriptElementEditor-position_x") );
 	    	SVG_Element.appendChild(buildMenu_text("generalText",[99,45],'Y: ',"start","12","Lucida Console"));           
   	    	SVG_Element.appendChild(buildMenu_textBox("noCSSText",[113,33],"30","12",data.position.position[1],12,"Lucida Console","automoveScriptElementEditor-position_y") );       
        //Angle
	    	SVG_Element.appendChild(buildMenu_text("generalText",[10,60],'Angle: ',"start","12","Lucida Console"));
	    	SVG_Element.appendChild(buildMenu_textBox("noCSSText",[45,48],"30","12",data.position.angle,12,"Lucida Console","automoveScriptElementEditor-position_angle") );
        //Zoom
	    	SVG_Element.appendChild(buildMenu_text("generalText",[78,60],'Zoom: ',"start","12","Lucida Console"));
	    	SVG_Element.appendChild(buildMenu_textBox("noCSSText",[113,48],"30","12",data.position.angle,12,"Lucida Console","automoveScriptElementEditor-position_zoom") );   

	if(number != 0){
        //Duration
	    	SVG_Element.appendChild(buildMenu_text("generalText",[10,75],'Duration: ',"start",12,"Lucida Console"));
	    	SVG_Element.appendChild(buildMenu_textBox("noCSSText",[58,63],"30","12",data.details.duration,12,"Lucida Console","automoveScriptElementEditor-details_duration") );  
        //Type                 
	    	SVG_Element.appendChild(buildMenu_text("generalText",[90,75],'Type: ',"start",12,"Lucida Console"));
	    	SVG_Element.appendChild(buildMenu_textBox("noCSSText",[118,63],"30","12",data.details.type,12,"Lucida Console","automoveScriptElementEditor-details_type") );            
	}

    //Text
 		SVG_Element.appendChild(buildMenu_text("errorText",[20,110],'',"start","12","Lucida Console","automoveScriptElementEditor-errorReadout_1"));  
 		SVG_Element.appendChild(buildMenu_text("errorText",[10,120],'',"start","12","Lucida Console","automoveScriptElementEditor-errorReadout_2"));       
    return SVG_Element;
}