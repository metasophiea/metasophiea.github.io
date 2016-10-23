var canvasGraphics = new function(){
    var element; var canvas;
    var view = {'position':{'x':0,'y':0}, 'angle':0, 'zoom':{'index':0, 'multiplier':1}};

    this.attachElement = function(inputElement){
        element = inputElement;
        element.height = element.offsetHeight;
        element.width = element.offsetWidth;

        console.log("'canvasGraphics' attached to element with ID '" + element.id + "'");
        canvas = element.getContext('2d');
    }

    this.basicShape = function(shapeType,data,style){
        canvas.fillStyle = style.bodyColour;
        if(style.outlineThickness > 0){ canvas.strokeStyle = style.outlineColour; canvas.lineWidth = style.outlineThickness; }
        else{canvas.strokeStyle = "rgba(0,0,0,0)";}

        switch(shapeType){
            case 'rectangle':
                //position.x, position.y, height, width, angle, anchor.x, anchor.y
	            canvas.save();
	            canvas.translate(data.position.x,data.position.y);
	            canvas.rotate(-view.angle-data.angle);
	            canvas.fillRect(-data.anchor.x*data.width,-data.anchor.y*data.height,data.width,data.height);
	            canvas.strokeRect(-data.anchor.x*data.width,-data.anchor.y*data.height,data.width,data.height);	
	            canvas.restore();
            break;
            case 'square':
                //position.x, position.y, size, angle, anchor.x, anchor.y
                this.basicShape('rectangle',{'height':data.size,'width':data.size,'position':{'x':data.position.x,'y':data.position.y},'anchor':{'x':data.anchor.x,'y':data.anchor.y},'angle':data.angle},style);
            break;
            case 'image':
                //imageURL
                //position.x, position.y, height, width, angle, anchor.x, anchor.y
	            var img = new Image(); img.src = style.imageURL;
                img.onload = function(){
	                canvas.save();
	                canvas.translate(data.position.x,data.position.y);
	                canvas.rotate(-view.angle-data.angle);
                
	                if(img.src != ''){canvas.drawImage(img,-data.anchor.x*data.width,-data.anchor.y*data.height,data.width,data.height);}
	                else{canvas.fillStyle = "rgb(50,50,50)";canvas.fillRect(-data.anchor.x*data.width,-data.anchor.y*data.height,data.width,data.height);}
	                canvas.restore();
                }
            break;
            case 'poly':
                //points[].x, points[].y
	            canvas.beginPath(); 
	            canvas.moveTo(data.points[0].x,data.points[0].y);
	            for(var a = 1; a < data.points.length; a++){ canvas.lineTo(data.points[a].x,data.points[a].y); }
	            canvas.closePath(); canvas.fill(); canvas.stroke();
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

	            canvas.font = '100px ' + style.font;
	            canvas.textBaseline = 'hanging';
	            if(style.bold){canvas.font = 'bold ' + canvas.font;}
	            if(style.italic){canvas.font = 'italic ' + canvas.font;}

               	canvas.save();
	            canvas.translate(data.position.x,data.position.y);
	            canvas.rotate(-view.angle-data.angle);
	            canvas.scale((data.size/100),(data.size/100));
	            canvas.fillText(data.character,0,0);
	            canvas.strokeText(data.character,0,0);
	            canvas.restore();
                return dimensions;
            break;                  
        }
    }
}