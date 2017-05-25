var currentTool = {"name":"none","extraData":{}};

var selectedElement = null; var lastSelectedElememt = null;
var toolBarWidth = 200; var gridSpacing = 12.5; var gridWidthCount = 8;
var startingPosition = {"x":0,"y":0};
var currentPosition = {"x":0,"y":0};
var selectedElementInitialPosition = {};
var previousAction = null;

//// clicking empty space
    function svgSpaceClick(){ elementSelect(null); }

//// keyboard input ////
    function keyDownHandler(event){

        if(selectedElement != null){
            switch(event.code){
                case "Backspace": case "Delete": 
                    var obj = workingDrawing.construction.splice(selectedElement.getAttribute("partId"), 1)[0];
                    previousAction = {"type":"delete","object":obj};
                    elementSelect(null);
                break;
                case "Space":
                    if( workingDrawing.construction[selectedElement.getAttribute("partId")].hasOwnProperty("orientation") ){
                        workingDrawing.construction[selectedElement.getAttribute("partId")].orientation++;
                        if(workingDrawing.construction[selectedElement.getAttribute("partId")].orientation > 3){workingDrawing.construction[selectedElement.getAttribute("partId")].orientation = 0;}
                        previousAction = {"type":"rotate","partId":selectedElement.getAttribute("partId")};
                    }
                break;
                case "ArrowUp":
                    if(workingDrawing.construction[selectedElement.getAttribute("partId")].type == "line"){
                        workingDrawing.construction[selectedElement.getAttribute("partId")].y1 -= 0.5;
                        workingDrawing.construction[selectedElement.getAttribute("partId")].y2 -= 0.5;
                    }
                    else{ workingDrawing.construction[selectedElement.getAttribute("partId")].y -= 0.5; }
                    previousAction = {"type":"arrowMove","direction":"up","partId":selectedElement.getAttribute("partId")};
                break;
                case "ArrowDown":
                    if(workingDrawing.construction[selectedElement.getAttribute("partId")].type == "line"){
                        workingDrawing.construction[selectedElement.getAttribute("partId")].y1 += 0.5;
                        workingDrawing.construction[selectedElement.getAttribute("partId")].y2 += 0.5;
                    }
                    else{ workingDrawing.construction[selectedElement.getAttribute("partId")].y += 0.5; }
                    previousAction = {"type":"arrowMove","direction":"down","partId":selectedElement.getAttribute("partId")};
                break;
                case "ArrowLeft":
                    if(workingDrawing.construction[selectedElement.getAttribute("partId")].type == "line"){
                        workingDrawing.construction[selectedElement.getAttribute("partId")].x1 -= 0.5;
                        workingDrawing.construction[selectedElement.getAttribute("partId")].x2 -= 0.5;
                    }
                    else{ workingDrawing.construction[selectedElement.getAttribute("partId")].x -= 0.5; }
                    previousAction = {"type":"arrowMove","direction":"left","partId":selectedElement.getAttribute("partId")};
                break;
                case "ArrowRight":
                    if(workingDrawing.construction[selectedElement.getAttribute("partId")].type == "line"){
                        workingDrawing.construction[selectedElement.getAttribute("partId")].x1 += 0.5;
                        workingDrawing.construction[selectedElement.getAttribute("partId")].x2 += 0.5;
                    }
                    else{ workingDrawing.construction[selectedElement.getAttribute("partId")].x += 0.5; }
                    previousAction = {"type":"arrowMove","direction":"right","partId":selectedElement.getAttribute("partId")};
                break;
            }
        }

        if(event.key == "z" && event.ctrlKey == true){
            if(previousAction != null){
                switch(previousAction.type){
                    case "delete": workingDrawing.construction.push(previousAction.object); redraw(); break;
                    case "rotate": 
                        if( workingDrawing.construction[previousAction.partId].hasOwnProperty("orientation") ){
                            workingDrawing.construction[previousAction.partId].orientation--;
                            if(workingDrawing.construction[previousAction.partId].orientation < 0){workingDrawing.construction[previousAction.partId].orientation = 3;}
                        }
                    break;
                    case "arrowMove": 
                        switch(previousAction.direction){
                            case "up": 
                                if(workingDrawing.construction[previousAction.partId].type == "line"){
                                    workingDrawing.construction[previousAction.partId].y1 += 0.5;
                                    workingDrawing.construction[previousAction.partId].y2 += 0.5;
                                }
                                else{ workingDrawing.construction[previousAction.partId].y += 0.5; }
                            break;
                            case "down": 
                                if(workingDrawing.construction[previousAction.partId].type == "line"){
                                    workingDrawing.construction[previousAction.partId].y1 -= 0.5;
                                    workingDrawing.construction[previousAction.partId].y2 -= 0.5;
                                }
                                else{ workingDrawing.construction[previousAction.partId].y -= 0.5; }
                            break;
                            case "left": 
                                if(workingDrawing.construction[previousAction.partId].type == "line"){
                                    workingDrawing.construction[previousAction.partId].x1 += 0.5;
                                    workingDrawing.construction[previousAction.partId].x2 += 0.5;
                                }
                                else{ workingDrawing.construction[previousAction.partId].x += 0.5; }
                            break;
                            case "right": 
                                if(workingDrawing.construction[previousAction.partId].type == "line"){
                                    workingDrawing.construction[previousAction.partId].x1 -= 0.5;
                                    workingDrawing.construction[previousAction.partId].x2 -= 0.5;
                                }
                                else{ workingDrawing.construction[previousAction.partId].x -= 0.5; }
                            break;
                        }
                    break;
                    case "move": 
                        if(workingDrawing.construction[previousAction.partId].type == "line"){
                            workingDrawing.construction[previousAction.partId].x1 = previousAction.start.x1;
                            workingDrawing.construction[previousAction.partId].y1 = previousAction.start.y1;       
                            workingDrawing.construction[previousAction.partId].x2 = previousAction.start.x2;
                            workingDrawing.construction[previousAction.partId].y2 = previousAction.start.y2;     
                        }
                        else{
                            workingDrawing.construction[previousAction.partId].x = previousAction.start.x;
                            workingDrawing.construction[previousAction.partId].y = previousAction.start.y;
                        }
                    break;
                }
                previousAction = null;
            }
        }

        redraw( selectedElement == null ? null : selectedElement.getAttribute("partId")  );
    }

//// writing elements ////
    function writeElement_mouseDown(that){
        elementSelect(null);
        startingPosition.x = parseFloat(that.getAttribute("x")); 
        startingPosition.y = parseFloat(that.getAttribute("y"));

        var element = document.createElementNS("http://www.w3.org/2000/svg",'rect');
        element.setAttribute("id","movementSurface"); 
        element.setAttribute('x',0); 
        element.setAttribute('y',0);
        element.setAttribute('width',"100%"); 
        element.setAttribute('height',"100%");
        element.setAttribute("style","fill:rgba(0,0,0,0);");
        document.getElementById("surface").appendChild(element);

        element.setAttribute("onmousemove","writeElement_mouseMove(this,event);")
        element.setAttribute("onmouseup","this.removeAttribute('onmousemove');writeElement_stopMouse();");
        element.setAttribute("onmouseout","this.removeAttribute('onmousemove');writeElement_stopMouse();");
    }
    function writeElement_mouseMove(that,event){
        var xFactor = (event.x-toolBarWidth)/(that.getBoundingClientRect().width);
        var yFactor = (event.y)/(that.getBoundingClientRect().width);
        currentPosition.x = Math.round((gridWidthCount*xFactor)*2)/2 -2;
        currentPosition.y = Math.round((gridWidthCount*yFactor)*2)/2 -2; 

        switch(currentTool.name){
            case "line": data = {"type":"line", "x1":(startingPosition.x+2),"y1":(startingPosition.y+2),"x2":(currentPosition.x+2),"y2":(currentPosition.y+2)}; break;
            case "rectangle": data = {"type":"rectangle", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "diamond": 
                var xAbs = Math.abs(Math.abs(currentPosition.x) - Math.abs(startingPosition.x)); 
                var yAbs = Math.abs(Math.abs(currentPosition.y) - Math.abs(startingPosition.y));
                var absMax = xAbs > yAbs ? xAbs : yAbs; 
                data = {"type":"dimond", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"r":absMax}; 
            break;
            case "circle": 
                var xAbs = Math.abs(Math.abs(currentPosition.x) - Math.abs(startingPosition.x)); 
                var yAbs = Math.abs(Math.abs(currentPosition.y) - Math.abs(startingPosition.y));
                var absMax = xAbs > yAbs ? xAbs : yAbs; 
                data = {"type":"circle", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"r":absMax};
            break;
            case "halfCircle": data = {"type":"halfCircle", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"orientation":0,"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "quarterCircle": data = {"type":"quarterCircle", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"orientation":3,"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "rightAngleTriangle": data = {"type":"rightAngleTriangle", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "isoscelesTriangle": data = {"type":"isoscelesTriangle", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"orientation":0,"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "shape": 
                var xAbs = Math.abs(Math.abs(currentPosition.x) - Math.abs(startingPosition.x)); 
                var yAbs = Math.abs(Math.abs(currentPosition.y) - Math.abs(startingPosition.y));
                var absMax = xAbs > yAbs ? xAbs : yAbs; 
                data = {"type":"shape","id":currentTool.extraData.id, "x":(startingPosition.x+2),"y":(startingPosition.y+2), "scale":absMax/2};
            break;
        }
        
        document.getElementById("tempDrawPlane").innerHTML = null; 
        drawElement(document.getElementById("tempDrawPlane"), 0,0, 1,data,"newElementLine",0);
    }
    function writeElement_stopMouse(){
        document.getElementById("surface").innerHTML = null;
        document.getElementById("tempDrawPlane").innerHTML = null;
        if( startingPosition.x == currentPosition.x && startingPosition.y == currentPosition.y ){return;}

        var data = {};

        switch(currentTool.name){
            case "line": data = {"type":"line", "x1":(startingPosition.x),"y1":(startingPosition.y),"x2":(currentPosition.x),"y2":(currentPosition.y)}; break;
            case "rectangle": data = {"type":"rectangle", "x":(startingPosition.x),"y":(startingPosition.y),"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "diamond": 
                var xAbs = Math.abs(Math.abs(currentPosition.x) - Math.abs(startingPosition.x)); 
                var yAbs = Math.abs(Math.abs(currentPosition.y) - Math.abs(startingPosition.y));
                var absMax = xAbs > yAbs ? xAbs : yAbs; 
                data = {"type":"dimond", "x":(startingPosition.x),"y":(startingPosition.y),"r":absMax}; 
            break;
            case "circle": 
                var xAbs = Math.abs(Math.abs(currentPosition.x) - Math.abs(startingPosition.x)); 
                var yAbs = Math.abs(Math.abs(currentPosition.y) - Math.abs(startingPosition.y));
                var absMax = xAbs > yAbs ? xAbs : yAbs; 
                data = {"type":"circle", "x":(startingPosition.x),"y":(startingPosition.y),"r":absMax};
            break;
            case "halfCircle": data = {"type":"halfCircle", "x":(startingPosition.x),"y":(startingPosition.y),"orientation":0,"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "quarterCircle": data = {"type":"quarterCircle", "x":(startingPosition.x),"y":(startingPosition.y),"orientation":3,"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "rightAngleTriangle": data = {"type":"rightAngleTriangle", "x":(startingPosition.x),"y":(startingPosition.y),"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "isoscelesTriangle": data = {"type":"isoscelesTriangle", "x":(startingPosition.x),"y":(startingPosition.y),"orientation":0,"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "shape": 
                var xAbs = Math.abs(Math.abs(currentPosition.x) - Math.abs(startingPosition.x)); 
                var yAbs = Math.abs(Math.abs(currentPosition.y) - Math.abs(startingPosition.y));
                var absMax = xAbs > yAbs ? xAbs : yAbs; 
                data = {"type":"shape","id":currentTool.extraData.id, "x":(startingPosition.x),"y":(startingPosition.y), "scale":absMax/2};
            break;
        }

        workingDrawing.construction.push(data);
        redraw();
    }


//// selecting elements ////
    function selectElement(event,that){
        elementSelect(that);
    }

    function elementSelect(that){
        if(that == selectedElement){return;}
        lastSelectedElememt = selectedElement; selectedElement = that;

        var parts = getAssociatedElements(selectedElement); for(var a = 0; a < parts.length; a++){ 
            parts[a].setAttribute("class","selectedSymbolLine");
            parts[a].setAttribute("onmousedown","moveElement_mouseDown(event,this);");
        }
        parts = getAssociatedElements(lastSelectedElememt); for(var a = 0; a < parts.length; a++){ 
            parts[a].setAttribute("class","symbolLine");
            parts[a].removeAttribute("onmousedown");
        }

        if(selectedElement == null){redraw();}

        function getAssociatedElements(selectedElement){
            if(selectedElement == null){return [];}
            if(selectedElement.parentElement == null){return [];}

            var array = selectedElement.parentElement.childNodes;
            var outputArray = [];
            for(var a = 0; a < array.length; a++){
                if( array[a].getAttribute("partId") == selectedElement.getAttribute("partId") ){ outputArray.push(array[a]); }
            }
            return outputArray;
        }
    }

//// moving elements ////
    function moveElement_mouseDown(event, that){
        var element = document.createElementNS("http://www.w3.org/2000/svg",'rect');
        element.setAttribute("id","movementSurface"); 
        element.setAttribute('x',0); 
        element.setAttribute('y',0);
        element.setAttribute('width',"100%"); 
        element.setAttribute('height',"100%");
        element.setAttribute("style","fill:rgba(0,0,0,0);");
        document.getElementById("surface").appendChild(element);

        element.setAttribute("onmousemove","moveElement_mouseMove(this,event);")
        element.setAttribute("onmouseup","this.removeAttribute('onmousemove');moveElement_stopMouse();");
        element.setAttribute("onmouseout","this.removeAttribute('onmousemove');moveElement_stopMouse();");

        var xFactor = (event.x-toolBarWidth)/(element.getBoundingClientRect().width);
        var yFactor = (event.y)/(element.getBoundingClientRect().width);
        startingPosition.x = Math.round((gridWidthCount*xFactor)*2)/2 -2;
        startingPosition.y = Math.round((gridWidthCount*yFactor)*2)/2 -2;

        if(workingDrawing.construction[selectedElement.getAttribute("partId")].type == "line"){
            selectedElementInitialPosition.x1 = workingDrawing.construction[selectedElement.getAttribute("partId")].x1;
            selectedElementInitialPosition.y1 = workingDrawing.construction[selectedElement.getAttribute("partId")].y1;       
            selectedElementInitialPosition.x2 = workingDrawing.construction[selectedElement.getAttribute("partId")].x2;
            selectedElementInitialPosition.y2 = workingDrawing.construction[selectedElement.getAttribute("partId")].y2;     
        }
        else{
            selectedElementInitialPosition.x = workingDrawing.construction[selectedElement.getAttribute("partId")].x;
            selectedElementInitialPosition.y = workingDrawing.construction[selectedElement.getAttribute("partId")].y;
        }

        previousAction = {"type":"move","partId":selectedElement.getAttribute("partId"),"start":selectedElementInitialPosition};
    }
    function moveElement_stopMouse(){ document.getElementById("surface").innerHTML = null; }

    function moveElement_mouseMove(that,event){
        var xFactor = (event.x-toolBarWidth)/(that.getBoundingClientRect().width);
        var yFactor = (event.y)/(that.getBoundingClientRect().width);
        currentPosition.x = Math.round((gridWidthCount*xFactor)*2)/2 -2;
        currentPosition.y = Math.round((gridWidthCount*yFactor)*2)/2 -2;

        if(workingDrawing.construction[selectedElement.getAttribute("partId")].type == "line"){
            workingDrawing.construction[selectedElement.getAttribute("partId")].x1 = selectedElementInitialPosition.x1 + currentPosition.x - startingPosition.x;
            workingDrawing.construction[selectedElement.getAttribute("partId")].y1 = selectedElementInitialPosition.y1 + currentPosition.y - startingPosition.y;
            workingDrawing.construction[selectedElement.getAttribute("partId")].x2 = selectedElementInitialPosition.x2 + currentPosition.x - startingPosition.x;
            workingDrawing.construction[selectedElement.getAttribute("partId")].y2 = selectedElementInitialPosition.y2 + currentPosition.y - startingPosition.y;
        }
        else{
            workingDrawing.construction[selectedElement.getAttribute("partId")].x = selectedElementInitialPosition.x + currentPosition.x - startingPosition.x;
            workingDrawing.construction[selectedElement.getAttribute("partId")].y = selectedElementInitialPosition.y + currentPosition.y - startingPosition.y;
        }
        redraw(selectedElement.getAttribute("partId"));
    }