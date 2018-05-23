var availableElements = [
    {"title":"Dot"                 , "name":"dot",                  "amount":1, "example":{"type":"dot", "x":2,"y":2}},
    {"title":"Line"                , "name":"line",                 "amount":1, "example":{"type":"line", "x1":0,"y1":4,"x2":4,"y2":0}},
    {"title":"Rectangle"           , "name":"rectangle",            "amount":1, "example":{"type":"rectangle", "x":0,"y":0,"width":4,"height":4}},
    {"title":"Diamond"             , "name":"diamond",              "amount":1, "example":{"type":"diamond", "x":2,"y":2,"r":2}},
    {"title":"Circle"              , "name":"circle",               "amount":1, "example":{"type":"circle", "x":2,"y":2,"r":2}},
    {"title":"Half-Circle"         , "name":"halfCircle",           "amount":1, "example":{"type":"halfCircle", "x":1,"y":0,"orientation":0,"width":2,"height":4}},
    {"title":"Quarter Circle"      , "name":"quarterCircle",        "amount":1, "example":{"type":"quarterCircle", "x":0,"y":0,"orientation":3,"width":4,"height":4}},
    {"title":"Right Angle Triangle", "name":"rightAngleTriangle",   "amount":1, "example":{"type":"rightAngleTriangle", "x":0,"y":0,"width":4,"height":4}},
    {"title":"Isosceles Triangle"  , "name":"isoscelesTriangle",    "amount":1, "example":{"type":"isoscelesTriangle", "x":0,"y":0,"orientation":0,"width":4,"height":4}},
    {"title":"Letter/Number Symbol", "name":"letterNumberSymbol",   "amount":0, "example":null}
    //  subshapes
];

function drawElement(SVGelement, x,y, scale,data,symbolClass,partId,onClickAction=""){
    var gridSpacing = 12.5;

    switch(data.type){
        case "dot":                 drawDot(SVGelement, (data.x*scale)+x,(data.y*scale)+y, symbolClass,partId,onClickAction); break;
        case "line":                drawLine(SVGelement, (data.x1*scale)+x,(data.y1*scale)+y,(data.x2*scale)+x,(data.y2*scale)+y, symbolClass,partId,onClickAction); break;
        case "rectangle":           drawRectangle(SVGelement, (data.x*scale)+x,(data.y*scale)+y,(data.width*scale),(data.height*scale), symbolClass,partId,onClickAction); break;
        case "diamond":             drawDiamond(SVGelement, (data.x*scale)+x,(data.y*scale)+y,(data.r*scale), symbolClass,partId,onClickAction); break;
        case "circle":              drawCircle(SVGelement, (data.x*scale)+x,(data.y*scale)+y,(data.r*scale), symbolClass,partId,onClickAction); break;
        case "halfCircle":          drawHalfCircle(SVGelement, (data.x*scale)+x,(data.y*scale)+y,data.orientation,(data.width*scale),(data.height*scale), symbolClass,partId,onClickAction); break;
        case "quarterCircle":       drawQuarterCircle(SVGelement, (data.x*scale)+x,(data.y*scale)+y,data.orientation,(data.width*scale),(data.height*scale), symbolClass,partId,onClickAction); break;
        case "rightAngleTriangle":  drawRightAngleTriangle(SVGelement, (data.x*scale)+x,(data.y*scale)+y,(data.width*scale),(data.height*scale), symbolClass,partId,onClickAction); break;
        case "isoscelesTriangle":   drawIsoscelesTriangle(SVGelement, (data.x*scale)+x,(data.y*scale)+y,data.orientation,(data.width*scale),(data.height*scale), symbolClass,partId,onClickAction); break;
        case "letterNumberSymbol":  break;
        case "shape":               drawSymbol(SVGelement, data.id, (data.x*scale)+x,(data.y*scale)+y,data.scale*scale,symbolClass,partId,onClickAction); break;
        default: break;
    }

    //drawing functions
        function drawDot(SVGelement, x,y, symbolClass,partId,onClickAction=""){
            var element = document.createElementNS("https://www.w3.org/2000/svg",'line');
            element.setAttribute("partId",partId);
            element.setAttribute('x1',x*gridSpacing); 
            element.setAttribute('y1',y*gridSpacing); 
            element.setAttribute('x2',x*gridSpacing); 
            element.setAttribute('y2',y*gridSpacing);
            element.setAttribute("class",symbolClass);
            element.setAttribute("onclick",onClickAction);
            SVGelement.appendChild(element);
        } 

        function drawLine(SVGelement, x1,y1,x2,y2, symbolClass,partId,onClickAction=""){
            var element = document.createElementNS("https://www.w3.org/2000/svg",'line');
            element.setAttribute("partId",partId);
            element.setAttribute('x1',x1*gridSpacing); 
            element.setAttribute('y1',y1*gridSpacing); 
            element.setAttribute('x2',x2*gridSpacing); 
            element.setAttribute('y2',y2*gridSpacing);
            element.setAttribute("class",symbolClass);
            element.setAttribute("onclick",onClickAction);
            SVGelement.appendChild(element);
        }

        function drawRectangle(SVGelement, x,y,width,height, symbolClass,partId,onClickAction=""){
            if(width < 0){ x = x + width; width = -width; }
            if(height < 0){ y = y + height; height = -height; }

            var element = document.createElementNS("https://www.w3.org/2000/svg",'rect');
            element.setAttribute("partId",partId);
            element.setAttribute('x',x*gridSpacing); 
            element.setAttribute('y',y*gridSpacing);
            element.setAttribute('width',width*gridSpacing); 
            element.setAttribute('height',height*gridSpacing);
            element.setAttribute("rx","0.25");
            element.setAttribute("ry","0.25");
            element.setAttribute("class",symbolClass);
            element.setAttribute("onclick",onClickAction);
            SVGelement.appendChild(element);
        }

        function drawDiamond(VGelement, x,y,r, symbolClass,partId,onClickAction=""){
            r = Math.abs(r);

            var sideLength = Math.sqrt( gridSpacing*gridSpacing*2 )*r;
            var element = document.createElementNS("https://www.w3.org/2000/svg",'rect');
            element.setAttribute("partId",partId);
            element.setAttribute('x',x*gridSpacing);
            element.setAttribute('y',y*gridSpacing);
            element.setAttribute('width',sideLength); 
            element.setAttribute('height',sideLength);
            element.setAttribute("rx","0.25");
            element.setAttribute("ry","0.25");
            element.setAttribute("transform","translate(0 -"+r*gridSpacing+") rotate(45 "+x*gridSpacing+" "+y*gridSpacing+")");
            element.setAttribute("class",symbolClass);
            element.setAttribute("onclick",onClickAction);
            SVGelement.appendChild(element);
        }

        function drawCircle(SVGelement, x,y,r, symbolClass,partId,onClickAction=""){
            var element = document.createElementNS("https://www.w3.org/2000/svg",'circle');
            element.setAttribute("partId",partId);
            element.setAttribute("cx",x*gridSpacing); 
            element.setAttribute("cy",y*gridSpacing);
            element.setAttribute("r",r*gridSpacing);
            element.setAttribute("class",symbolClass);
            element.setAttribute("onclick",onClickAction);
            SVGelement.appendChild(element);
        }

        function drawArc(SVGelement, x1,y1,x2,y2,x3,y3,x4,y4, symbolClass,partId,onClickAction=""){
            var element = document.createElementNS("https://www.w3.org/2000/svg",'path');
            element.setAttribute("partId",partId);
            element.setAttribute('d', 'M ' + x1*gridSpacing +' '+ y1*gridSpacing + ' C ' + x2*gridSpacing +' '+ y2*gridSpacing +', '+ x3*gridSpacing +' '+ y3*gridSpacing +', '+ x4*gridSpacing +' '+ y4*gridSpacing );
            element.setAttribute("class",symbolClass);
            element.setAttribute("onclick",onClickAction);
            SVGelement.appendChild(element);
        }

        function drawHalfCircle(SVGelement, x,y,orientation,width,height, symbolClass,partId,onClickAction=""){
            if(orientation < 0){ orientation = 0; } if(orientation > 3){ orientation = orientation%4; }
            var widthCurve = 0.33; var heightCurve = 0.03;
            
            var matrix = [
                [
                    [x,                                 y],
                    [x+widthCurve*width+width,          y+heightCurve*height],
                    [x+widthCurve*width+width,          y+height-heightCurve*height],
                    [x,                                 y+height]
                ],
                [
                    [x,                             y+height],
                    [x+heightCurve*width,           y-widthCurve*height],
                    [x+width-heightCurve*width,     y-widthCurve*height],
                    [x+width,                       y+height]
                ],
                [
                    [x+width,                     y],
                    [x-widthCurve*width,          y+heightCurve*height],
                    [x-widthCurve*width,          y+height+heightCurve*height],
                    [x+width,                     y+height]
                ],
                [
                    [x+width,                       y],
                    [x+width-heightCurve*width,     y+height+widthCurve*height],
                    [x+heightCurve*width,           y+height+widthCurve*height],
                    [x,                             y]
                ],
            ][orientation];

            drawArc(SVGelement, matrix[0][0],matrix[0][1],matrix[1][0],matrix[1][1],matrix[2][0],matrix[2][1],matrix[3][0],matrix[3][1], symbolClass,partId,onClickAction);
        }

        function drawQuarterCircle(SVGelement, x,y,orientation,width,height, symbolClass,partId,onClickAction=""){
            if(orientation < 0){ orientation = 0; } if(orientation > 3){ orientation = orientation%4; }
            var ratio = 0.4;
            var matrix = [
                [
                    [1,    0],
                    [ratio, 0],
                    [0,    ratio],
                    [0,    1]
                ],
                [
                    [0,     0],
                    [0,     (1-ratio)],
                    [ratio,  1],
                    [1,     1]
                ],
                [
                    [0,    1],
                    [(1-ratio), 1],
                    [1,    (1-ratio)],
                    [1,    0]
                ],
                [
                    [0,    0],
                    [(1-ratio), 0],
                    [1,    ratio],
                    [1,    1]
                ]
            ][orientation];

            for(var a = 0; a < matrix.length; a++){
                matrix[a][0] = matrix[a][0]*width + x;
                matrix[a][1] = matrix[a][1]*height + y;
            }

            drawArc(SVGelement, matrix[0][0],matrix[0][1],matrix[1][0],matrix[1][1],matrix[2][0],matrix[2][1],matrix[3][0],matrix[3][1], symbolClass,partId,onClickAction);
        }

        function drawRightAngleTriangle(SVGelement, x,y,width,height, symbolClass,partId,onClickAction=""){
            var points = { 
                    "x1":x,         "y1":y, 
                    "x2":x,         "y2":(y+height), 
                    "x3":(x+width), "y3":(y+height)
                };

            drawLine(SVGelement, points.x1,points.y1,points.x2,points.y2, symbolClass,partId,onClickAction);
            drawLine(SVGelement, points.x2,points.y2,points.x3,points.y3, symbolClass,partId,onClickAction);
            drawLine(SVGelement, points.x3,points.y3,points.x1,points.y1, symbolClass,partId,onClickAction);
        }

        function drawIsoscelesTriangle(SVGelement, x,y,orientation,width,height, symbolClass,partId,onClickAction=""){
            if(orientation < 0){ orientation = 0; } if(orientation > 1){ orientation = orientation%2; }
            var points = [
                { 
                    "x1":(x+width/2),         "y1":y, 
                    "x2":x,         "y2":(y+height), 
                    "x3":(x+width), "y3":(y+height)
                },
                { 
                    "x1":x,         "y1":y, 
                    "x2":x,         "y2":(y+height), 
                    "x3":(x+width), "y3":(y+height/2)
                }
            ][orientation];

            drawLine(SVGelement, points.x1,points.y1,points.x2,points.y2, symbolClass,partId,onClickAction);
            drawLine(SVGelement, points.x2,points.y2,points.x3,points.y3, symbolClass,partId,onClickAction);
            drawLine(SVGelement, points.x3,points.y3,points.x1,points.y1, symbolClass,partId,onClickAction);
        }

        function drawSymbol(SVGelement, id,x,y,scale, symbolClass,partId,onClickAction){
            var symbol = getSymbolById(id); 
            for(var a = 0; a < symbol.construction.length; a++){ drawElement(SVGelement, x,y,scale, symbol.construction[a],symbolClass,partId,onClickAction); }
        }
}

function getSymbolById(id){
    for(var a = 0; a < symbols.length; a++){ if(symbols[a].id == id){return symbols[a];} }
    return null;
}