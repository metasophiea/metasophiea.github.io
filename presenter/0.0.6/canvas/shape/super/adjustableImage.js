function superShape_adjustableImage(inputData = {}){
// JSON Recieving ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(inputData.hasOwnProperty('initialData')){var initialData = inputData.initialData;}else{var initialData = {};}
	if(inputData.hasOwnProperty('styleData')){var styleData = inputData.styleData;}else{var styleData = {};}
// Values ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ID = -1; var IDcolour; var selected = false; var hovering = false; var lastHover = -1; var Z = 0; 
	var width = 0; var height = 0; var anchor = [0,0];
	var origin = {'point':[0,0],'angle':0}; var axiom = {'point':[0,0],'angle':0};
	var defined = {'point':[0,0],'angle':0};
	var calculated = {'point':[0,0],'angle':0};
	var temp_anchor = anchor; temp_position = defined.point;

	var URL = 'http://metasophiea.com/lib/image/noimageimage.png';

	if(initialData.hasOwnProperty('origin')){origin = initialData.origin;}
	if(initialData.hasOwnProperty('position')){defined.point = initialData.position;}
	if(initialData.hasOwnProperty('width')){width = initialData.width;}
	if(initialData.hasOwnProperty('height')){height = initialData.height;}
	if(initialData.hasOwnProperty('anchor')){anchor = initialData.anchor;}
	if(initialData.hasOwnProperty('angle')){defined.angle = initialData.angle;}
	calculated = {'point':[origin.point[0]+defined.point[0],origin.point[1]+defined.point[1]],'angle':(origin.angle + defined.angle)};
	axiom = {'point':getTopLeftPoint(width,height,calculated.point,anchor,calculated.angle),'angle':calculated.angle};

	if(styleData.hasOwnProperty('URL')){URL = styleData.URL;}

// SubShapes /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var subShapeList = new drawlist();
	subShapeList.add( new regularShape_image({ "initialData":{'origin':axiom,"position":[0,0],"anchor":[0,0],"width":width,"height":height,"angle":0}, "styleData":{'URL':URL} }) );	

	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[0,0],"anchor":[0,0],"width":width,"height":height/10,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	
	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[width,0],"anchor":[1,0],"width":width/10,"height":height,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	
	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[width,height],"anchor":[1,1],"width":width,"height":height/10,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	
	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[0,height],"anchor":[0,1],"width":width/10,"height":height,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	

	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[0,0],"anchor":[0,0],"width":width/10,"height":height/10,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	
	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[width,0],"anchor":[1,0],"width":width/10,"height":height/10,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	
	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[width,height],"anchor":[1,1],"width":width/10,"height":height/10,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	
	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[0,height],"anchor":[0,1],"width":width/10,"height":height/10,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	

	var temp = Math.abs(width); if(Math.abs(height) < temp){temp = Math.abs(height);} temp = temp/3;
	subShapeList.add( new regularShape_rectangle_hover({ "initialData":{'origin':axiom,"position":[width/2,height/2],"anchor":[0.5,0.5],"width":temp,"height":temp,"angle":0}, "styleData":{"R":255,"G":255,"B":255,'A':0} }) );	

	function updateSubShapes(){
		subShapeList.getObj(0).set('URL',URL);
		subShapeList.getObj(0).set('width',width);subShapeList.getObj(0).set('height',height);

		var temp = Math.abs(width); if(Math.abs(height) < temp){temp = Math.abs(height);}
		subShapeList.getObj(1).set('width',width);subShapeList.getObj(1).set('height',temp/10);
		subShapeList.getObj(2).set('width',temp/10);subShapeList.getObj(2).set('height',height);
		subShapeList.getObj(3).set('width',width);subShapeList.getObj(3).set('height',temp/10);
		subShapeList.getObj(4).set('width',temp/10);subShapeList.getObj(4).set('height',height);

		var temp = width; if(height < temp){temp = height;} temp = temp/10;
		subShapeList.getObj(5).set('width',temp);subShapeList.getObj(5).set('height',temp);
		subShapeList.getObj(6).set('width',temp);subShapeList.getObj(6).set('height',temp);
		subShapeList.getObj(7).set('width',temp);subShapeList.getObj(7).set('height',temp);
		subShapeList.getObj(8).set('width',temp);subShapeList.getObj(8).set('height',temp);

		var temp = Math.abs(width); if(Math.abs(height) < temp){temp = Math.abs(height);} temp = temp/3;
		subShapeList.getObj(9).set('width',temp);subShapeList.getObj(9).set('height',temp);

		subShapeList.getObj(1).set('position',[0,0]);
		subShapeList.getObj(2).set('position',[width,0]);
		subShapeList.getObj(3).set('position',[width,height]);
		subShapeList.getObj(4).set('position',[0,height]);
		subShapeList.getObj(5).set('position',[0,0]);
		subShapeList.getObj(6).set('position',[width,0]);
		subShapeList.getObj(7).set('position',[width,height]);
		subShapeList.getObj(8).set('position',[0,height]);
		subShapeList.getObj(9).set('position',[width/2,height/2]);

		if(width < 0 && height < 0){
			subShapeList.getObj(1).set('anchor',[0,1]);
			subShapeList.getObj(2).set('anchor',[0,0]);
			subShapeList.getObj(3).set('anchor',[1,0]);
			subShapeList.getObj(4).set('anchor',[1,1]);	
			subShapeList.getObj(5).set('anchor',[0,0]);
			subShapeList.getObj(6).set('anchor',[1,0]);
			subShapeList.getObj(7).set('anchor',[1,1]);
			subShapeList.getObj(8).set('anchor',[0,1]);	
		}
		else if(width < 0){
			subShapeList.getObj(1).set('anchor',[0,0]);
			subShapeList.getObj(2).set('anchor',[0,0]);
			subShapeList.getObj(3).set('anchor',[1,1]);
			subShapeList.getObj(4).set('anchor',[1,1]);
			subShapeList.getObj(5).set('anchor',[0,1]);
			subShapeList.getObj(6).set('anchor',[1,1]);
			subShapeList.getObj(7).set('anchor',[1,0]);
			subShapeList.getObj(8).set('anchor',[0,0]);		
		}
		else if(height < 0){
			subShapeList.getObj(1).set('anchor',[0,1]);
			subShapeList.getObj(2).set('anchor',[1,0]);
			subShapeList.getObj(3).set('anchor',[1,0]);
			subShapeList.getObj(4).set('anchor',[0,1]);
			subShapeList.getObj(5).set('anchor',[1,0]);
			subShapeList.getObj(6).set('anchor',[0,0]);
			subShapeList.getObj(7).set('anchor',[0,1]);
			subShapeList.getObj(8).set('anchor',[1,1]);
		}
		else{
			subShapeList.getObj(1).set('anchor',[0,0]);
			subShapeList.getObj(2).set('anchor',[1,0]);
			subShapeList.getObj(3).set('anchor',[1,1]);
			subShapeList.getObj(4).set('anchor',[0,1]);	
			subShapeList.getObj(5).set('anchor',[0,0]);
			subShapeList.getObj(6).set('anchor',[1,0]);
			subShapeList.getObj(7).set('anchor',[1,1]);
			subShapeList.getObj(8).set('anchor',[0,1]);
		}
	}

// Methods ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Public
	this.WhatAreYou = function(){return 'superShape_adjustableImage - '+ID;}
	this.getID = function(){return ID;}
	this.shift = function(point){
		defined.point = [defined.point[0]+point[0],defined.point[1]+point[1]];
		updateMath();
	}
	this.set = function(VariableName,newValue){
		switch(VariableName){
			case "ID": ID = newValue; IDcolour = getColourFromID(ID); break;
			case 'Z': Z = newValue; break;
			case 'origin': origin = newValue; break;
			case "position": defined.point = newValue; break;
			case "position_x": defined.point[0] = parseFloat(newValue); break;
			case "position_y": defined.point[1] = parseFloat(newValue); break;
			case "height": height = parseFloat(newValue); break;
			case "width": width = parseFloat(newValue); break;
			case "anchor": anchor = newValue; break;
			case "angle": defined.angle = parseFloat(newValue); break;
			case 'URL': URL = newValue; break;
		}
		updateSubShapes(); updateMath();
	}
	this.pushToFront = function(){drawList.foreground.pushToFront(ID);}
	this.pushToBack = function(){drawList.foreground.pushToBack(ID);}
	this.pushForward = function(){drawList.foreground.pushForward(ID);}
	this.pushBackward = function(){drawList.foreground.pushBackward(ID);}

	this.getData = function(){
		return {
			'type':'superShape_adjustableImage','name':'Image',
			'initialData':{'position':defined.point,'anchor':anchor,'width':width,'height':height,'angle':defined.angle},
			'styleData':{'URL':URL}
		};
	}

	function getSubShape(point){
		subShapeList.render_selectionMatrixOnly(); var temp = getIDFromPoint(point[0],point[1]); render();
		if(temp == -1){return 0;}
		return temp;
	}

	function updateMath(){
		calculated = {'point':[origin.point[0]+defined.point[0],origin.point[1]+defined.point[1]],'angle':(origin.angle + defined.angle)};
		axiom = {'point':getTopLeftPoint(width,height,calculated.point,anchor,calculated.angle),'angle':calculated.angle};
		subShapeList.updateOrigin(axiom);
	}

// Draw //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.draw = function(){ subShapeList.render_withID(ID); }
	this.draw_withID = function(ID){ subShapeList.render_withID(ID); }
	this.draw_selectionMatrixOnly = function(){ subShapeList.render_selectionMatrixOnly_withID(ID); }
	this.draw_selectionMatrixOnly_withID = function(ID){ subShapeList.render_selectionMatrixOnly_withID(ID); }
// Mouse Methods /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.select = function(point){
		if(!selected){ 
			selected = true;
		}
		var temp = getSubShape(point);
		subShapeList.getObj(temp).select();
	}
	this.unselect = function(){
		if(selected){
			selected = false;
			subShapeList.unselectAll();
		}
	}	
	this.mouseover = function(point){
		var temp = getSubShape(point);

		if(temp == -1 && lastHover == -1){}
		else if(temp != -1 && lastHover == -1){mousein(temp,point);lastHover = temp;}
		else if(temp == -1 && lastHover != -1){mouseout(lastHover);lastHover = temp;}
		else if(temp != lastHover){mouseout(lastHover);mousein(temp,point);lastHover = temp;}
		else{mousein(temp,point);}

		function mousein(id,point){
			subShapeList.getObj(id).mouseover(point);
		}
		function mouseout(id){
			subShapeList.getObj(id).mouseout();
		}
	}
	this.mouseout = function(){subShapeList.mouseoutAll();}
	this.mousedown = function(point){}
	this.click = function(x,y){this.pushToFront();}
	this.dragStart = function(){updateMath();
		temp_position = defined.point; temp_anchor = anchor; 
		defined.point = getTopLeftPoint(width,height,calculated.point,anchor,calculated.angle); anchor = [0,0];
	}
	this.drag = function(point){
		if(selected){
			if(lastHover == 0){this.shift(point);}
			else{
				var tempWidth = width; var tempHeight = height;
				switch(lastHover){
					case 1:
						var y_diff = point[1]*Math.cos(calculated.angle) + point[0]*Math.sin(calculated.angle);
						this.shift([y_diff*Math.sin(calculated.angle),y_diff*Math.cos(calculated.angle)]);
						height = height - y_diff;
						if(height < 0){height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 3; subShapeList.getObj(lastHover).mouseover(point);}
					break;
					case 2: 
						width = width + point[0]*Math.cos(calculated.angle) - point[1]*Math.sin(calculated.angle); 
						if(width < 0){width = -width; subShapeList.getObj(lastHover).mouseout(); lastHover = 4; subShapeList.getObj(lastHover).mouseover(point);}
					break;
					case 3: 
						height = height + point[1]*Math.cos(calculated.angle) + point[0]*Math.sin(calculated.angle); 
						if(height < 0){height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 1; subShapeList.getObj(lastHover).mouseover(point);}
					break;
					case 4:
						var x_diff = point[0]*Math.cos(calculated.angle) - point[1]*Math.sin(calculated.angle); 
						this.shift([x_diff*Math.cos(calculated.angle),-x_diff*Math.sin(calculated.angle)]);
						width = width - x_diff; 						
						if(width < 0){width = -width; subShapeList.getObj(lastHover).mouseout(); lastHover = 2; subShapeList.getObj(lastHover).mouseover(point);}
					break;
					case 5:
						this.shift([point[0],point[1]]);

						height = height - (point[1]*Math.cos(calculated.angle) + point[0]*Math.sin(calculated.angle)); 
						width = width - (point[0]*Math.cos(calculated.angle) - point[1]*Math.sin(calculated.angle));

						if(height < 0){height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 8; subShapeList.getObj(lastHover).mouseover(point);}
						else if(width < 0){width = -width; subShapeList.getObj(lastHover).mouseout(); lastHover = 6; subShapeList.getObj(lastHover).mouseover(point);}
						else if(width < 0 && height < 0){width = -width; height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 7; subShapeList.getObj(lastHover).mouseover(point);}
					break;
					case 6: 
						var y_diff = point[1]*Math.cos(calculated.angle) + point[0]*Math.sin(calculated.angle);

						this.shift([y_diff*Math.sin(calculated.angle),y_diff*Math.cos(calculated.angle)]);

						height = height - y_diff; 
						width = width + point[0]*Math.cos(calculated.angle) - point[1]*Math.sin(calculated.angle); 

						if(height < 0){height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 7; subShapeList.getObj(lastHover).mouseover(point);}
						else if(width < 0){width = -width; subShapeList.getObj(lastHover).mouseout(); lastHover = 5; subShapeList.getObj(lastHover).mouseover(point);}
						else if(width < 0 && height < 0){width = -width; height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 8; subShapeList.getObj(lastHover).mouseover(point);}
					break;
					case 7: 
						height = height + point[1]*Math.cos(calculated.angle) + point[0]*Math.sin(calculated.angle);
						width = width + point[0]*Math.cos(calculated.angle) - point[1]*Math.sin(calculated.angle); 

						if(height < 0){height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 6; subShapeList.getObj(lastHover).mouseover(point);}
						else if(width < 0){width = -width; subShapeList.getObj(lastHover).mouseout(); lastHover = 8; subShapeList.getObj(lastHover).mouseover(point);}
						else if(width < 0 && height < 0){width = -width; height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 5; subShapeList.getObj(lastHover).mouseover(point);}
					break;
					case 8:
						var x_diff = point[0]*Math.cos(calculated.angle) - point[1]*Math.sin(calculated.angle); 

						this.shift([x_diff*Math.cos(calculated.angle),-x_diff*Math.sin(calculated.angle)]);

						height = height + point[1]*Math.cos(calculated.angle) + point[0]*Math.sin(calculated.angle); 
						width = width - x_diff; 

						if(height < 0){height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 5; subShapeList.getObj(lastHover).mouseover(point);}
						else if(width < 0){width = -width; subShapeList.getObj(lastHover).mouseout(); lastHover = 7; subShapeList.getObj(lastHover).mouseover(point);}
						else if(width < 0 && height < 0){width = -width; height = -height; subShapeList.getObj(lastHover).mouseout(); lastHover = 6; subShapeList.getObj(lastHover).mouseover(point);}
					break;
					case 9:
						defined.point = temp_position;
						anchor = temp_anchor;
						defined.angle += point[1]/150; updateMath();
					break;
				}
				updateSubShapes();
			}
		}
	}
	this.dragEnd = function(){	
		if(width < 0){width = -width;}

		if(defined.point != temp_position){
			var point = getPolarFrom([width*temp_anchor[0],height*temp_anchor[1]]);
			point[1] += defined.angle; point = getCartesian(point);
			defined.point = [defined.point[0]+point[0],defined.point[1]+point[1]];
		}
		anchor = temp_anchor;
	}
}

