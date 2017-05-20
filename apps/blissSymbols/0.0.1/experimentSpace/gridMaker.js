var drawBasicShape = new function(){
    var gridSpacing = 10;
    function washIncomingGraphValues(value){
        switch( typeof value){
            case "number": return value*gridSpacing;
            case "string": return value;
            default: break;
        }
    }

    this.line = function(SVGelement, x1,y1,x2,y2, style){
        var element = document.createElementNS("http://www.w3.org/2000/svg",'line');
        element.setAttribute('x1',washIncomingGraphValues(x1)); 
        element.setAttribute('y1',washIncomingGraphValues(y1)); 
        element.setAttribute('x2',washIncomingGraphValues(x2)); 
        element.setAttribute('y2',washIncomingGraphValues(y2));
        element.setAttribute("style",style);
        SVGelement.appendChild(element);
    }

    this.arc = function(SVGelement, x1,y1,x2,y2,x3,y3,x4,y4, style){
        var element = document.createElementNS("http://www.w3.org/2000/svg",'path');
        element.setAttribute('d', 'M ' + washIncomingGraphValues(x1) +' '+ washIncomingGraphValues(y1) + ' C ' + washIncomingGraphValues(x2) +' '+ washIncomingGraphValues(y2) +', '+ washIncomingGraphValues(x3) +' '+ washIncomingGraphValues(y3) +', '+ washIncomingGraphValues(x4) +' '+ washIncomingGraphValues(y4) ); 
        element.setAttribute("style",style);
        SVGelement.appendChild(element);
    }

    this.circle = function(SVGelement, x,y,r, style){
        var element = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        element.setAttribute('cx',washIncomingGraphValues(x)); element.setAttribute('cy',washIncomingGraphValues(y));
        element.setAttribute('r',washIncomingGraphValues(r));
        element.setAttribute("style",style);
        SVGelement.appendChild(element);
    }
}

function produceGrid(){
    var style = 'stroke:rgb(100,100,100);stroke-width:1;';
    for(var a = 0; a < document.getElementById('svgSpace').getBoundingClientRect().width; a+=1){  drawBasicShape.line(document.getElementById('graph'), a,0, a,'100%', style ); }
    for(var a = 0; a < document.getElementById('svgSpace').getBoundingClientRect().height; a+=1){ drawBasicShape.line(document.getElementById('graph'), 0,a, '100%',a, style ); }
}