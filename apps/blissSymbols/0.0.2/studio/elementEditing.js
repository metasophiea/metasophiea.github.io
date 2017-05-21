var currentTool = "diamond";

var selectedElement = null; var lastSelectedElememt = null;
var toolBarWidth = 200; var gridSpacing = 12.5;
var startingPosition = {"x":0,"y":0};
var currentPosition = {"x":0,"y":0};
var selectedElementInitialPosition = {};

//// clicking empty space
    function svgSpaceClick(){ elementSelect(null); }



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

        element.setAttribute("onmousemove","writeElement_mouseMove(event);")
        element.setAttribute("onmouseup","this.removeAttribute('onmousemove');writeElement_stopMouse();");
        element.setAttribute("onmouseout","this.removeAttribute('onmousemove');writeElement_stopMouse();");
    }
    function writeElement_mouseMove(event){
        currentPosition.x = (Math.round(Math.round((event.x-toolBarWidth)/(gridSpacing))/5)*0.5 - 2);
        currentPosition.y = (Math.round(Math.round((event.y)/(gridSpacing))/5)*0.5 - 2);

        var data = {};

        switch(currentTool){
            case "line": data = {"type":"line", "x1":(startingPosition.x+2),"y1":(startingPosition.y+2),"x2":(currentPosition.x+2),"y2":(currentPosition.y+2)}; break;
            case "rectangle": data = {"type":"rectangle", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "diamond": 
                var absMax = Math.abs(currentPosition.x-startingPosition.x) > Math.abs(currentPosition.y-startingPosition.y) ? Math.abs(currentPosition.x-startingPosition.x) : Math.abs(currentPosition.y-startingPosition.y);
                data = {"type":"dimond", "x":(startingPosition.x+2),"y":(startingPosition.y+2),"r":absMax}; 
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

        switch(currentTool){
            case "line": data = {"type":"line", "x1":(startingPosition.x),"y1":(startingPosition.y),"x2":(currentPosition.x),"y2":(currentPosition.y)}; break;
            case "rectangle": data = {"type":"rectangle", "x":(startingPosition.x),"y":(startingPosition.y),"width":(currentPosition.x-startingPosition.x),"height":(currentPosition.y-startingPosition.y)}; break;
            case "diamond": 
                var absMax = Math.abs(currentPosition.x-startingPosition.x) > Math.abs(currentPosition.y-startingPosition.y) ? Math.abs(currentPosition.x-startingPosition.x) : Math.abs(currentPosition.y-startingPosition.y);
                data = {"type":"dimond", "x":(startingPosition.x),"y":(startingPosition.y),"r":absMax}; 
            break;
        }

        workingDrawing.construction.push(data);
        redraw();
    }




//// moving elements ////
    function moveElement_mouseDown(event, that){if(currentTool != "move"){return;}
        elementSelect(that);
        
        var element = document.createElementNS("http://www.w3.org/2000/svg",'rect');
        element.setAttribute("id","movementSurface"); 
        element.setAttribute('x',0); 
        element.setAttribute('y',0);
        element.setAttribute('width',"100%"); 
        element.setAttribute('height',"100%");
        element.setAttribute("style","fill:rgba(0,0,0,0);");
        document.getElementById("surface").appendChild(element);

        element.setAttribute("onmousemove","moveElement_mouseMove(event);")
        element.setAttribute("onmouseup","this.removeAttribute('onmousemove');moveElement_stopMouse();");
        element.setAttribute("onmouseout","this.removeAttribute('onmousemove');moveElement_stopMouse();");

        startingPosition.x = Math.round((event.x-toolBarWidth)/(gridSpacing*10));
        startingPosition.y = Math.round((event.y)/(gridSpacing*10));

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
    }
    function moveElement_stopMouse(){ document.getElementById("surface").innerHTML = null; }

    function moveElement_mouseMove(event){
        if(workingDrawing.construction[selectedElement.getAttribute("partId")].type == "line"){
            workingDrawing.construction[selectedElement.getAttribute("partId")].x1 = selectedElementInitialPosition.x1 - startingPosition.x + Math.round((event.x-toolBarWidth)/(gridSpacing*10));
            workingDrawing.construction[selectedElement.getAttribute("partId")].y1 = selectedElementInitialPosition.y1 - startingPosition.y + Math.round((event.y)/(gridSpacing*10));
            workingDrawing.construction[selectedElement.getAttribute("partId")].x2 = selectedElementInitialPosition.x2 - startingPosition.x + Math.round((event.x-toolBarWidth)/(gridSpacing*10));
            workingDrawing.construction[selectedElement.getAttribute("partId")].y2 = selectedElementInitialPosition.y2 - startingPosition.y + Math.round((event.y)/(gridSpacing*10));
        }
        else{
            workingDrawing.construction[selectedElement.getAttribute("partId")].x = selectedElementInitialPosition.x - startingPosition.x + Math.round((event.x-toolBarWidth)/(gridSpacing*10));
            workingDrawing.construction[selectedElement.getAttribute("partId")].y = selectedElementInitialPosition.y - startingPosition.y + Math.round((event.y)/(gridSpacing*10));
        }
        redraw();
    }

//// selecting an element
    function elementSelect(that){
        if(that == selectedElement){return;}
        lastSelectedElememt = selectedElement; selectedElement = that;

        var parts = getAssociatedElements(selectedElement); for(var a = 0; a < parts.length; a++){ parts[a].setAttribute("class","selectedSymbolLine"); }
        parts = getAssociatedElements(lastSelectedElememt); for(var a = 0; a < parts.length; a++){ parts[a].setAttribute("class","symbolLine"); }

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