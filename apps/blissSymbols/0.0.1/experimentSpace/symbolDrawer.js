function drawSymbol(SVGelement,x,y,symbolId){
    drawSymbol(SVGelement,x,y,1,getSymbolById(symbolId));

    function getSymbolById(id){
        for(var a = 0; a < symbols.length; a++){ if(symbols[a].id == id){return symbols[a];} }
        return symbols[0];
    }

    function drawSymbol(SVGelement,x,y,scale,symbolData){
        var gridSpacing = 10;
        var symbolStyle = 'stroke:rgb(255,0,0);stroke-width:4;fill:none;stroke-linecap:round;';

        for(var a = 0; a < symbolData.construction.length; a++){
            switch(symbolData.construction[a].type){
                case "shape":  drawSymbol(SVGelement,(symbolData.construction[a].x*scale)+x,(symbolData.construction[a].y*scale)+y,symbolData.construction[a].scale*scale,getSymbolById(symbolData.construction[a].id)); break;
                case "line":   drawLine(SVGelement, (symbolData.construction[a].x1*scale)+x,(symbolData.construction[a].y1*scale)+y,(symbolData.construction[a].x2*scale)+x,(symbolData.construction[a].y2*scale)+y, symbolStyle); break;
                case "circle": drawCircle(SVGelement, (symbolData.construction[a].x*scale)+x,(symbolData.construction[a].y*scale)+y,(symbolData.construction[a].r*scale), symbolStyle); break;
                case "half":   drawHalfCircle(SVGelement, (symbolData.construction[a].x*scale)+x,(symbolData.construction[a].y*scale)+y,symbolData.construction[a].orientation,(symbolData.construction[a].width*scale),(symbolData.construction[a].height*scale), symbolStyle); break;
                case "quart":  drawQuarterCircle(SVGelement, (symbolData.construction[a].x*scale)+x,(symbolData.construction[a].y*scale)+y,symbolData.construction[a].orientation,(symbolData.construction[a].width*scale),(symbolData.construction[a].height*scale), symbolStyle); break;
                //case "arc": drawArc(SVGelement, (symbolData.construction[a].x1*scale)+x,(symbolData.construction[a].y1*scale)+y,(symbolData.construction[a].x2*scale)+x,(symbolData.construction[a].y2*scale)+y,(symbolData.construction[a].x3*scale)+x,(symbolData.construction[a].y3*scale)+y,(symbolData.construction[a].x4*scale)+x,(symbolData.construction[a].y4*scale)+y, symbolStyle); break;
            }
        }
        
        function washIncomingGraphValues(value){
            switch( typeof value){
                case "number": return value*gridSpacing;
                case "string": return value;
                default: break;
            }
        }

        function drawLine(SVGelement, x1,y1,x2,y2, style){
            var element = document.createElementNS("http://www.w3.org/2000/svg",'line');
            element.setAttribute('x1',washIncomingGraphValues(x1)); 
            element.setAttribute('y1',washIncomingGraphValues(y1)); 
            element.setAttribute('x2',washIncomingGraphValues(x2)); 
            element.setAttribute('y2',washIncomingGraphValues(y2));
            element.setAttribute("style",style);
            SVGelement.appendChild(element);
        }

        function drawHalfCircle(SVGelement, x,y,orientation,width,height, style){
            if(orientation < 0){ orientation = 0; } if(orientation > 3){ orientation = orientation%4; }
            var ratio = 0.35;
            var matrix = [
                [
                    [x,                 y],
                    [x+ratio+width,     y],
                    [x+ratio+width,     y+height],
                    [x,                 y+height]
                ],
                [
                    [x,           y],
                    [x,           y-height-ratio],
                    [x+width,     y-height-ratio],
                    [x+width,     y]
                ],
                [
                    [x,                 y],
                    [x-ratio-width,     y],
                    [x-ratio-width,     y-height],
                    [x,                 y-height]
                ],
                [
                    [x,           y],
                    [x,           y+height+ratio],
                    [x-width,     y+height+ratio],
                    [x-width,     y]
                ],
            ][orientation];

            drawArc(SVGelement, matrix[0][0],matrix[0][1],matrix[1][0],matrix[1][1],matrix[2][0],matrix[2][1],matrix[3][0],matrix[3][1], style);
        }
        function drawQuarterCircle(SVGelement, x,y,orientation,width,height, style){
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

            drawArc(SVGelement, matrix[0][0],matrix[0][1],matrix[1][0],matrix[1][1],matrix[2][0],matrix[2][1],matrix[3][0],matrix[3][1], style);
        }

        function drawArc(SVGelement, x1,y1,x2,y2,x3,y3,x4,y4, style){
            var element = document.createElementNS("http://www.w3.org/2000/svg",'path');
            element.setAttribute('d', 'M ' + washIncomingGraphValues(x1) +' '+ washIncomingGraphValues(y1) + ' C ' + washIncomingGraphValues(x2) +' '+ washIncomingGraphValues(y2) +', '+ washIncomingGraphValues(x3) +' '+ washIncomingGraphValues(y3) +', '+ washIncomingGraphValues(x4) +' '+ washIncomingGraphValues(y4) );
            element.setAttribute("style",style);
            SVGelement.appendChild(element);
        }

        function drawCircle(SVGelement, x,y,r, style){
            var element = document.createElementNS("http://www.w3.org/2000/svg",'circle');
            element.setAttribute('cx',washIncomingGraphValues(x)); element.setAttribute('cy',washIncomingGraphValues(y));
            element.setAttribute('r',washIncomingGraphValues(r));
            element.setAttribute("style",style);
            SVGelement.appendChild(element);
        }
    }
}