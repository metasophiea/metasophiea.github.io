/* - Notes - 
	Polar: {'distance':0,'angle':0}
	Cartesian: {'x':0,'y':0}
*/

var canvasGraphics = new function(){
    var viewportElement; var viewportCanvas;
    var view = {'position':{'x':0,'y':0}, 'angle':0, 'zoom':1};
	var selectedTool = 'viewportControl_pan';
	var renderList = [];

// ~Controls -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    this.attachViewportElement = function(inputElement){
		//set up canvas
        viewportElement = inputElement;
        viewportElement.height = viewportElement.offsetHeight;
        viewportElement.width = viewportElement.offsetWidth;

        console.log("'canvasGraphics' attached to viewportElement with ID '" + viewportElement.id + "'");
        viewportCanvas = viewportElement.getContext('2d');

		canvasGraphics.camera.pan({'x':0,'y':0});
    }

	this.camera = new function(){
		this.pan = function(position){
			var point = {'x':0,'y':0}; var dimensions = getViewportElementDimensions(); point.x = Math.round(dimensions.width/2); point.y = Math.round(dimensions.height/2);
			var oldPoints = convert_RealToVirtual_point(point);
			var difference = {'x':oldPoints.x - position.x,'y':oldPoints.y - position.y};
			view.position.x = view.position.x + difference.x;
			view.position.y = view.position.y + difference.y;
		}
		this.rotate = function(angle){ view.angle = angle; }
		this.zoom = function(index){ if(index <= 0){return;} 
			var point = {'x':0,'y':0}; var dimensions = getViewportElementDimensions(); point.x = Math.round(dimensions.width/2); point.y = Math.round(dimensions.height/2);
			var oldPoints = convert_RealToVirtual_point(point);
			view.zoom = index;
			var newPoints = convert_RealToVirtual_point(point);
			view.position.x = view.position.x + (newPoints.x-oldPoints.x);
			view.position.y = view.position.y + (newPoints.y-oldPoints.y);
		}
	}

// ~Drivers -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
	function getViewportElementDimensions(){ return {'height':viewportElement.height,'width':viewportElement.width};}
	function cloneObject(object){ return JSON.parse(JSON.stringify(object)); }
	function convert_RealToVirtual_length(length){return length/view.zoom;}
	function convert_VirtualToReal_length(length){return length*view.zoom;}
	function convert_VirtualToReal_point(point){
		var polar = cartesianToPolar(point); polar.angle = polar.angle + view.angle;
		var point = polarToCartesian(polar);
		return {'x':convert_VirtualToReal_length(point.x+view.position.x),'y':convert_VirtualToReal_length(point.y+view.position.y)};
	}
	function convert_RealToVirtual_point(point){
		var redCross = {'x':convert_RealToVirtual_length(point.x)-view.position.x, 'y':convert_RealToVirtual_length(point.y)-view.position.y };
		var polar = cartesianToPolar(redCross); polar.angle = polar.angle - view.angle;
		return polarToCartesian(polar);
	}

	function polarToCartesian(polar){ return {'x':(polar.distance*Math.cos(polar.angle)),'y':(polar.distance*Math.sin(polar.angle))}; }
	function cartesianToPolar(point){
		var dis = Math.pow(Math.pow(point.x,2)+Math.pow(point.y,2),0.5); var ang = 0;
		if(point.x === 0 ){
			if(point.y === 0){ang = 0;}
			else if(point.y > 0){ang = 0.5*Math.PI;}
			else{ang = 1.5*Math.PI;}
		}
		else if(point.y === 0 ){
			if(point.x >= 0){ang = 0;}else{ang = Math.PI;}
		}
		else if(point.x >= 0){ ang = Math.atan(point.y/point.x); }
		else{ ang = Math.atan(point.y/point.x) + Math.PI; }
		return {'distance':dis,'angle':ang};
	}

// ~RenderList - -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
	this.render = function(){
		var temp = getViewportElementDimensions();
		viewportCanvas.clearRect(0, 0, temp.width, temp.height);
		for(var a = 0; a < renderList.length; a++){ shape(renderList[a].shapeType,renderList[a].data,renderList[a].style); }
	}
	
	this.renderlist = new function(){
		this.length = function(){return renderList.length;}
		this.pushShape = function(shapeType,data,style){
			var newObject = {'shapeType':shapeType,'data':data,'style':style};
			if(shapeType == 'image'){ newObject.style.imageData = new Image(); newObject.style.imageData.src = style.imageURL; }
			newObject.changeURL = function(newURL){newObject.style.imageData.src = newURL;}
			renderList.push(newObject);
		}
		this.unshiftShape = function(shapeType,data,style){renderList.unshift({'shapeType':shapeType,'data':data,'style':style});}
		this.popShape = function(){renderList.pop();}
		this.shiftShape = function(){renderList.shift();}
		this.plopShape = function(index,shapeType,data,style){renderList.splice(index, 0, {'shapeType':shapeType,'data':data,'style':style});}
		this.unplopShape = function(index,shapeType,data,style){renderList.splice(index, 1);}

		this.getShape = function(index){return renderList[index];}

		function extraImageSteps(){
			
		}
	}

// ~Shapes -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
	function shape(shapeType,data,style){ 
        switch(shapeType){
            case 'rectangle':
				data = cloneObject(data); style = cloneObject(style);
				style.outlineThickness = convert_VirtualToReal_length(style.outlineThickness);
			break;
           	case 'image':
			   	data = cloneObject(data);
			break;
		}

		data.position = convert_VirtualToReal_point(data.position);
		data.height = convert_VirtualToReal_length(data.height); data.width = convert_VirtualToReal_length(data.width);
		basicShape(shapeType,data,style);
	}

    function basicShape(shapeType,data,style){
        viewportCanvas.fillStyle = style.bodyColour;
        if(style.outlineThickness > 0){ viewportCanvas.strokeStyle = style.outlineColour; viewportCanvas.lineWidth = style.outlineThickness; }
        else{viewportCanvas.strokeStyle = "rgba(0,0,0,0)";}

        switch(shapeType){
            case 'rectangle':
                //position.x, position.y, height, width, angle, anchor.x, anchor.y
	            viewportCanvas.save();
	            viewportCanvas.translate(data.position.x,data.position.y);
	            viewportCanvas.rotate(-view.angle-data.angle);
	            viewportCanvas.fillRect(-data.anchor.x*data.width,-data.anchor.y*data.height,data.width,data.height);
	            viewportCanvas.strokeRect(-data.anchor.x*data.width,-data.anchor.y*data.height,data.width,data.height);	
	            viewportCanvas.restore();
            break;
            case 'square':
                //position.x, position.y, size, angle, anchor.x, anchor.y
                this.basicShape('rectangle',{'height':data.size,'width':data.size,'position':{'x':data.position.x,'y':data.position.y},'anchor':{'x':data.anchor.x,'y':data.anchor.y},'angle':data.angle},style);
            break;
            case 'image':
                //imageURL
                //position.x, position.y, height, width, angle, anchor.x, anchor.y
					viewportCanvas.save();
					viewportCanvas.translate(data.position.x,data.position.y);
					viewportCanvas.rotate(-view.angle-data.angle);           
					if(style.imageData.src != ''){viewportCanvas.drawImage(style.imageData,-data.anchor.x*data.width,-data.anchor.y*data.height,data.width,data.height);}
					else{viewportCanvas.fillStyle = "rgb(50,50,50)";viewportCanvas.fillRect(-data.anchor.x*data.width,-data.anchor.y*data.height,data.width,data.height);}
					viewportCanvas.restore();
            break;
            case 'poly':
                //points[].x, points[].y
	            viewportCanvas.beginPath(); 
	            viewportCanvas.moveTo(data.points[0].x,data.points[0].y);
	            for(var a = 1; a < data.points.length; a++){ viewportCanvas.lineTo(data.points[a].x,data.points[a].y); }
	            viewportCanvas.closePath(); viewportCanvas.fill(); viewportCanvas.stroke();
            break;
            case 'character':
                //font, bold, italic
                //character, position.x, position.y, size
                var div = document.createElement("div");
		            div.innerHTML = data.character;
		            div.style.position = 'absolute';
		            div.style.top  = '-9999px';
		            div.style.left = '-9999px';
		            div.style.fontFamily = style.font;
		            div.style.fontWeight = style.bold ? 'bold' : 'normal';
		            div.style['font-style'] = style.italic ? 'italic' : 'normal';
		            div.style.fontSize = data.size + 'pt';
	            document.body.appendChild(div);
	            dimensions = {'height':div.offsetHeight/2,'width':div.offsetWidth/2};
	            document.body.removeChild(div);

	            viewportCanvas.font = '100px ' + style.font;
	            viewportCanvas.textBaseline = 'hanging';
	            if(style.bold){viewportCanvas.font = 'bold ' + viewportCanvas.font;}
	            if(style.italic){viewportCanvas.font = 'italic ' + viewportCanvas.font;}

               	viewportCanvas.save();
	            viewportCanvas.translate(data.position.x,data.position.y);
	            viewportCanvas.rotate(-view.angle-data.angle);
	            viewportCanvas.scale((data.size/100),(data.size/100));
	            viewportCanvas.fillText(data.character,0,0);
	            viewportCanvas.strokeText(data.character,0,0);
	            viewportCanvas.restore();
                return dimensions;
            break;                  
        }
    }
}