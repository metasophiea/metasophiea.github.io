var pixelMatrix = new function(){
	var canvasElement; var canvas; var offset = {'x':0,'y':0}; var canvasSize; 
	var dimentions; var pixelSize = 3; var pixelArray = [];
	var autoRender_ID;

	this.info = function(){
		console.log('canvas: ' + canvasElement.width + 'x' + canvasElement.height);		
		console.log('dimentions: ' + dimentions.width + 'x' + dimentions.height);
		console.log('pixels per pixel: ' + pixelSize);
		console.log('offset: x:' + offset.x + ' y:' + offset.y);		
	}
	this.matrix = function(){return pixelArray;}
	this.pixelSize = function(a=null){
		if(a==null){return pixelSize;} pixelSize = a;

		dimentions = {'width':Math.floor(canvasElement.width/pixelSize),'height':Math.floor(canvasElement.height/pixelSize)};
		offset.x = Math.floor((canvasElement.width-dimentions.width*pixelSize)/2);
		offset.y = Math.floor((canvasElement.height-dimentions.height*pixelSize)/2);		

		this.createPixelArray();
	}
	this.screenDimentions = function(a=null){if(a==null){return dimentions;}
		if( Math.floor(canvasElement.width/a.width) > Math.floor(canvasElement.height/a.height) ){pixelSize = Math.floor(canvasElement.width/a.width);}
		else{pixelSize = Math.floor(canvasElement.height/a.height);}

		dimentions = {'width':Math.floor(a.width),'height':Math.floor(a.height)};

		offset.x = Math.floor((canvasElement.width-dimentions.width*pixelSize)/2);
		offset.y = Math.floor((canvasElement.height-dimentions.height*pixelSize)/2);

		this.createPixelArray();
	}

	this.createPixelArray = function(){
		pixelArray = [];
		for(var a = 0; a < dimentions.height; a++){
			pixelArray[a] = new Array(dimentions.width);
		}

		for(var y = 0; y < pixelArray.length; y++){for(x = 0; x < pixelArray[y].length; x++){
			pixelArray[y][x] = '00ff00';
		}}
	}

	this.attachCanvas = function(newCanvasElement){	
		canvasElement = newCanvasElement;
		canvas = canvasElement.getContext("2d");
		canvasSize = {'x':canvasElement.width,'y':canvasElement.height};
		this.screenDimentions({'width':200,'height':200});
		this.setAllPixels('000000');

//		canvasElement.onmousemove = function(event){
//			console.log(positionToPixel({'x':(event.offsetX-offset.x),'y':(event.offsetY-offset.y)}));
//		}
	}

	function positionToPixel(point){var ans = {'x':Math.floor(point.x/pixelSize),'y':Math.floor(point.y/pixelSize)};
		if(ans.x < 0 || ans.y < 0 || ans.x > dimentions.width || ans.y > dimentions.height){return;}
		return ans;
	}

//rendering	
	this.render = function(){
		canvas.clearRect(0,0,canvasElement.width,canvasElement.height);
		for(var y = 0; y < pixelArray.length; y++){for(x = 0; x < pixelArray[y].length; x++){
			canvas.fillStyle = '#' + pixelArray[y][x];
			canvas.fillRect(offset.x+(pixelSize*x),offset.y+(pixelSize*y),pixelSize,pixelSize);
		}}		
	}	
	this.autoRender = function(input=null){
		if(input == null){
			if(autoRender_ID){console.log('rendering at 10 fps');}
			else{console.log('autorender off');}
			return;
		}
		else if(input && !autoRender_ID){
			autoRender_ID = setInterval(function(){
				canvas.clearRect(0,0,canvasElement.width,canvasElement.height);
				for(var y = 0; y < dimentions.height; y++){for(x = 0; x < dimentions.width; x++){
					canvas.fillStyle = '#' + pixelArray[y][x];
					canvas.fillRect(offset.x+pixelSize*x,offset.y+pixelSize*y,pixelSize,pixelSize);
				}}	
			},101);
			return;
		}
		else{clearInterval(autoRender_ID);autoRender_ID=undefined;return;}
	}
	
	
//Basic Functions	
	this.setPixel = function(point,colour){
		if(point.y < 0 || point.y >= dimentions.height){return;}
		else if(point.x < 0 || point.x >= dimentions.width){return;}
		pixelArray[point.y][point.x] = colour;
	}
	this.setAllPixels = function(colour){
		for(var y = 0; y < dimentions.height; y++){for(var x = 0; x < dimentions.width; x++){
			this.setPixel({'x':x,'y':y},colour);
		}}
	}
	this.randomPixelColour = function(){
		for(var y = 0; y < dimentions.height; y++){for(var x = 0; x < dimentions.width; x++){
			this.setPixel({'x':x,'y':y}, Math.floor(Math.random()*256).toString(16)+Math.floor(Math.random()*256).toString(16)+Math.floor(Math.random()*256).toString(16) );
		}}		
	}
	
//Shapes
	this.drawLine = function(point_a,point_b,colour){
		point_a = {'x':Math.round(point_a.x),'y':Math.round(point_a.y)}; point_b = {'x':Math.round(point_b.x),'y':Math.round(point_b.y)};		

		var length = {'x':Math.abs(point_b.x-point_a.x), 'y':Math.abs(point_b.y-point_a.y)};
		var sign = {'x':Math.sign(point_b.x-point_a.x), 'y':Math.sign(point_b.y-point_a.y)};
		if(length.x >= length.y){ var array = new Array(length.x);
			for(var a = 0; a < array.length; a++){array[a] = {'x':point_a.x+sign.x*a,'y':point_a.y + Math.round((length.y/length.x)*sign.y*a)};}
			array[array.length] = point_b;
		}else{ var array = new Array(length.y);
			for(var a = 0; a < array.length; a++){array[a] = {'x':point_a.x + Math.round((length.x/length.y)*sign.x*a),'y':point_a.y+sign.y*a};}
			array[array.length] = point_b;
		}

		//print
		for(var a = 0; a < array.length; a++){ this.setPixel({'x':array[a].x,'y':array[a].y},colour);}
	}
	this.drawPoly = function(points,colour){
		for(var a = 0; a < points.length-1; a++){
			this.drawLine(points[a],points[a+1],colour);
		}
		this.drawLine(points[points.length-1],points[0],colour);
	}
	this.drawSquare = function(point,angle,size,colour){
		var angledSize = Math.pow((Math.pow(size,2)+Math.pow(size,2)),0.5);
		var points = []; var temp;
		for(var a = 0; a < 4; a++){
			temp = Math.geometry.polarToCartesian([angledSize,Math.PI*(0.25+0.5*a)+angle]);
			points[a] = {'x':temp[0]+point.x,'y':temp[1]+point.y};
		}

		this.drawPoly(points,colour);
	}
	this.drawRectangle = function(point,size,colour){	
		for(var y = point.y; y < point.y+size.height; y++){for(var x = point.x; x < point.x+size.width; x++){	
			this.setPixel({'x':x,'y':y},colour);
		}}	
	}	


	
	
//Lettering
	this.drawString = function(point,string,colour){
		var array = string.split('');
		var dis = 0;
		for(var a = 0; a < array.length; a++){
			dis += pixelMatrix.drawCharacter({'x':dis+point.x,'y':point.y},array[a],colour).width+1;
		}
	}
	this.drawCharacter = function(point,character,colour){
		var stamp = []; var size = {'width':0,'height':0};
		switch(character){
		//symbols
	 		case ' ':	
			stamp = [[0,0,0,0,0],
					 [0,0,0,0,0],
					 [0,0,0,0,0],					 
					 [0,0,0,0,0],					 
					 [0,0,0,0,0]];			
			break;	
	 		case '.':	
			stamp = [[0],
					 [0],
					 [0],					 
					 [0],					 
					 [1]];			
			break;	
		//numbers
	 		case '0':	
			stamp = [[1,1,1,1,0],
					 [1,1,0,0,1],
					 [1,0,1,0,1],					 
					 [1,0,0,1,1],					 
					 [0,1,1,1,1]];			
			break;	
			case '1':
			stamp = [[1,1,1,0,0],
					 [0,0,1,0,0],
					 [0,0,1,0,0],					 
					 [0,0,1,0,0],					 
					 [1,1,1,1,1]];
			break;
			case '2':
			stamp = [[0,1,1,1,0],
					 [1,0,0,0,1],
					 [0,0,1,1,0],					 
					 [1,1,0,0,0],					 
					 [1,1,1,1,1]];
			break;	
			case '3':
			stamp = [[1,1,1,1,0],
					 [0,0,0,0,1],
					 [0,1,1,1,0],					 
					 [0,0,0,0,1],					 
					 [1,1,1,1,0]];
			break;	
			case '4':
			stamp = [[1,0,0,0,1],
					 [1,0,0,0,1],
					 [0,1,1,1,1],					 
					 [0,0,0,0,1],					 
					 [0,0,0,0,1]];
			break;				
			case '5':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,0],
					 [1,1,1,1,1],					 
					 [0,0,0,0,1],					 
					 [1,1,1,1,0]];
			break;	
			case '6':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,0],
					 [1,1,1,1,1],					 
					 [1,0,0,0,1],					 
					 [0,1,1,1,1]];
			break;	
			case '7':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,1],
					 [0,0,0,1,0],					 
					 [0,0,1,0,0],					 
					 [0,0,1,0,0]];
			break;	
			case '8':
			stamp = [[0,1,1,1,0],
					 [1,0,0,0,1],
					 [0,1,1,1,0],					 
					 [1,0,0,0,1],					 
					 [0,1,1,1,0]];
			break;
			case '9':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,1],
					 [1,1,1,1,1],					 
					 [0,0,0,0,1],					 
					 [1,1,1,1,1]];
			break;
		//Capital Letters
			case 'A':
			stamp = [[1,1,0,0,0],
					 [1,0,1,0,0],
					 [1,0,0,1,0],					 
					 [1,1,1,1,1],					 
					 [1,0,0,0,1]];
			break;
			case 'B':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,1],
					 [1,1,1,1,1],					 
					 [1,0,0,0,1],					 
					 [1,1,1,1,0]];
			break;			
			case 'C':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,0],
					 [1,0,0,0,0],					 
					 [1,0,0,0,0],					 
					 [1,1,1,1,1]];
			break;			
			case 'D':
			stamp = [[1,1,1,1,0],
					 [1,0,0,0,1],
					 [1,0,0,0,1],					 
					 [1,0,0,0,1],					 
					 [1,1,1,1,0]];
			break;				
			case 'E':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,0],
					 [1,1,1,1,0],					 
					 [1,0,0,0,0],					 
					 [1,1,1,1,1]];
			break;				
			case 'F':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,0],
					 [1,1,1,1,0],					 
					 [1,0,0,0,0],					 
					 [1,0,0,0,0]];
			break;				
			case 'G':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,0],
					 [1,0,0,1,1],					 
					 [1,0,0,0,1],					 
					 [1,1,1,1,0]];
			break;				
			case 'H':
			stamp = [[1,0,0,0,1],
					 [1,0,0,0,1],
					 [1,1,1,1,1],					 
					 [1,0,0,0,1],					 
					 [1,0,0,0,1]];
			break;					
			case 'I':
			stamp = [[1,1,1,1,1],
					 [0,0,1,0,0],
					 [0,0,1,0,0],					 
					 [0,0,1,0,0],					 
					 [1,1,1,1,1]];
			break;	
			case 'J':
			stamp = [[1,1,1,1,1],
					 [0,0,1,0,0],
					 [0,0,1,0,0],					 
					 [0,0,1,0,0],					 
					 [1,1,0,0,0]];
			break;				
			case 'K':
			stamp = [[1,0,0,1,1],
					 [1,0,1,0,0],
					 [1,1,0,0,0],					 
					 [1,0,1,0,0],					 
					 [1,0,0,1,1]];
			break;			
			case 'L':
			stamp = [[1,0,0,0,0],
					 [1,0,0,0,0],
					 [1,0,0,0,0],					 
					 [1,0,0,0,0],					 
					 [1,1,1,1,1]];
			break;				
			case 'M':
			stamp = [[1,1,1,1,1],
					 [1,0,1,0,1],
					 [1,0,1,0,1],					 
					 [1,0,1,0,1],					 
					 [1,0,1,0,1]];
			break;			
			case 'N':
			stamp = [[1,0,0,0,1],
					 [1,1,0,0,1],
					 [1,0,1,0,1],					 
					 [1,0,0,1,1],					 
					 [1,0,0,0,1]];
			break;			
	 		case 'O':	
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,1],
					 [1,0,0,0,1],					 
					 [1,0,0,0,1],					 
					 [1,1,1,1,1]];			
			break;			
			case 'P':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,1],
					 [1,1,1,1,0],					 
					 [1,0,0,0,0],					 
					 [1,0,0,0,0]];
			break;		
	 		case 'Q':	
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,1],
					 [1,0,1,0,1],					 
					 [1,0,0,1,0],					 
					 [1,1,1,0,1]];			
			break;			
			case 'R':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,1],
					 [1,1,1,1,0],					 
					 [1,0,0,0,1],					 
					 [1,0,0,0,1]];
			break;				
			case 'S':
			stamp = [[1,1,1,1,1],
					 [1,0,0,0,0],
					 [1,1,1,1,0],					 
					 [0,0,0,0,1],					 
					 [1,1,1,1,1]];
			break;				
			case 'T':
			stamp = [[1,1,1,1,1],
					 [0,0,1,0,0],
					 [0,0,1,0,0],					 
					 [0,0,1,0,0],					 
					 [0,0,1,0,0]];
			break;				
	 		case 'U':	
			stamp = [[1,0,0,0,1],
					 [1,0,0,0,1],
					 [1,0,0,0,1],					 
					 [1,0,0,0,1],					 
					 [1,1,1,1,1]];			
			break;				
	 		case 'V':	
			stamp = [[1,0,0,0,1],
					 [1,0,0,0,1],
					 [1,0,0,0,1],					 
					 [0,1,0,1,0],					 
					 [0,0,1,0,0]];			
			break;						
			case 'W':
			stamp = [[1,0,1,0,1],
					 [1,0,1,0,1],
					 [1,0,1,0,1],					 
					 [1,0,1,0,1],					 
					 [1,1,1,1,1]];
			break;				
			case 'X':
			stamp = [[1,0,0,0,1],
					 [0,1,0,1,0],
					 [0,0,1,0,0],					 
					 [0,1,0,1,0],					 
					 [1,0,0,0,1]];
			break;			
			case 'Y':
			stamp = [[1,0,0,0,1],
					 [0,1,0,1,0],
					 [0,0,1,0,0],					 
					 [0,0,1,0,0],					 
					 [0,0,1,0,0]];
			break;			
			case 'Z':
			stamp = [[1,1,1,1,1],
					 [0,0,0,1,0],
					 [0,0,1,0,0],					 
					 [0,1,0,0,0],					 
					 [1,1,1,1,1]];
			break;	
		//Lower Case Letters
			case 'a':
			stamp = [[0,0,0,0,0],
					 [0,0,0,0,0],
					 [0,1,1,1,1],					 
					 [1,0,0,0,1],					 
					 [0,1,1,0,1]];
			break;
			case 'b':
			stamp = [[1,0,0,0],
					 [1,0,0,0],
					 [1,1,1,0],					 
					 [1,0,0,1],					 
					 [1,1,1,0]];
			break;			
			case 'c':
			stamp = [[0,0,0,0],
					 [0,1,1,1],
					 [1,0,0,0],					 
					 [1,0,0,0],					 
					 [0,1,1,1]];
			break;			
			case 'd':
			stamp = [[0,0,0,1],
					 [0,0,0,1],
					 [0,1,1,1],					 
					 [1,0,0,1],					 
					 [0,1,1,1]];
			break;				
			case 'e':
			stamp = [[0,0,0,0],
					 [0,1,1,0],
					 [1,1,1,1],					 
					 [1,0,0,0,0],					 
					 [0,1,1,0]];
			break;				
			case 'f':
			stamp = [[0,1,1,1],
					 [1,0,0,0],
					 [1,1,1,0],					 
					 [1,0,0,0],					 
					 [1,0,0,0]];
			break;				
			case 'g':
			stamp = [[0,1,1,0],
					 [1,0,0,1],
					 [0,1,1,1],					 
					 [0,0,0,1],					 
					 [0,1,1,0]];
			break;				
			case 'h':
			stamp = [[1,0,0,0],
					 [1,0,0,0],
					 [1,1,1,0],					 
					 [1,0,0,1],					 
					 [1,0,0,1]];
			break;					
			case 'i':
			stamp = [[0,1,0],
					 [0,0,0],
					 [1,1,0],					 
					 [0,1,0],					 
					 [1,1,1]];
			break;	
			case 'j':
			stamp = [[0,1,0],
					 [0,0,0],
					 [0,1,0],					 
					 [0,1,0],					 
					 [1,0,0]];
			break;				
			case 'k':
			stamp = [[1,0,0,],
					 [1,0,1,],
					 [1,1,0,],					 
					 [1,0,1,],					 
					 [1,0,1,]];
			break;			
			case 'l':
			stamp = [[1],
					 [1],
					 [1],					 
					 [1],					 
					 [1]];
			break;				
			case 'm':
			stamp = [[0,0,0,0,0],
					 [0,0,0,0,0],
					 [1,1,1,1,0],					 
					 [1,0,1,0,1],					 
					 [1,0,1,0,1]];
			break;			
			case 'n':
			stamp = [[0,0,0,0],
					 [0,0,0,0],
					 [1,1,1,0],					 
					 [1,0,0,1],					 
					 [1,0,0,1]];
			break;			
	 		case 'o':	
			stamp = [[0,0,0,0],
					 [0,1,1,0],
					 [1,0,0,1],					 
					 [1,0,0,1],					 
					 [0,1,1,0]];			
			break;			
			case 'p':
			stamp = [[0,0,0,0],
					 [1,1,1,0],
					 [1,0,0,1],					 
					 [1,1,1,0],					 
					 [1,0,0,0]];
			break;		
	 		case 'q':	
			stamp = [[0,0,0,0],
					 [0,1,1,1],
					 [1,0,0,1],					 
					 [0,1,1,1],					 
					 [0,0,0,1]];			
			break;			
			case 'r':
			stamp = [[0,0,0],
					 [0,0,0],
					 [0,1,1],					 
					 [1,0,0],					 
					 [1,0,0]];
			break;				
			case 's':
			stamp = [[0,0,0],
					 [0,1,1],
					 [1,1,0],					 
					 [0,0,1],					 
					 [1,1,0]];
			break;				
			case 't':
			stamp = [[0,1,0],
					 [1,1,1],
					 [0,1,0],					 
					 [0,1,0],					 
					 [0,1,0]];
			break;				
	 		case 'u':	
			stamp = [[0,0,0,0],
					 [0,0,0,0],
					 [1,0,0,1],					 
					 [1,0,0,1],					 
					 [1,1,1,1]];			
			break;				
	 		case 'v':	
			stamp = [[0,0,0],
					 [0,0,0],
					 [1,0,1],					 
					 [1,0,1],					 
					 [0,1,0]];			
			break;						
			case 'w':
			stamp = [[0,0,0,0,0],
					 [0,0,0,0,0],
					 [1,0,1,0,1],					 
					 [1,0,1,0,1],					 
					 [1,1,1,1,0]];
			break;				
			case 'x':
			stamp = [[0,0,0],
					 [0,0,0],
					 [1,0,1],					 
					 [0,1,0],					 
					 [1,0,1]];
			break;			
			case 'y':
			stamp = [[0,0,0],
					 [1,0,1],
					 [1,0,1],					 
					 [0,1,0],					 
					 [0,1,0]];
			break;			
			case 'z':
			stamp = [[0,0,0,0,0],
					 [1,1,1,1,0],
					 [0,0,1,0,0],					 
					 [0,1,0,0,0],					 
					 [1,1,1,1,0]];
			break;	
			default: 
			stamp = [[1,1,1,1,1],
					 [1,1,1,1,1],
					 [1,1,1,1,1],					 
					 [1,1,1,1,1],					 
					 [1,1,1,1,1]];			
			break;
		}
	
		//stamping
 		size = {'width':stamp[0].length,'height':stamp.length}	
		for(var y = 0; y < size.height; y++){
			for(var x = 0; x < size.width; x++){	
				if(stamp[y][x]){
					this.setPixel({'x':x+point.x,'y':y+point.y},colour);
				}
			}
		}	

	return size;
	}
}