var workingDrawing =     
    {
        "id":-1,
        "name":"",
        "description":"",
        "isCharacter":null,
        "construction":[
            // {"type":"diamond","x":-0.5,"y":0.5,"r":0.5},
            // {"type":"shape","id":"2","x":1,"y":1,"scale":0.75},
            // {"type":"rectangle","x":0,"y":-1,"width":1,"height":1},
            // {"type":"circle","x":1.5,"y":-0.5,"r":0.5},
            // {"type":"quarterCircle","x":2,"y":-1,"orientation":3,"width":1,"height":2},
            // {"type":"halfCircle","x":3,"y":0,"orientation":0,"width":2,"height":-1},
            // {"type":"halfCircle","x":3,"y":0,"orientation":3,"width":2,"height":-1},
            // {"type":"rightAngleTriangle","x":-1,"y":2,"width":1.5,"height":4},
            // {"type":"isoscelesTriangle","x":0,"y":2,"orientation":1,"width":1,"height":1.5},
            // {"type":"shape","id":"7","x":3.5,"y":4.5,"scale":0.5}
        ],
        "size":{"width":0,"height":0}
    };

function redraw(highlight=-1){
    document.getElementById("symbolDrawingArea").innerHTML = null;

    var lineStyle;
    for(var a = 0; a < workingDrawing.construction.length; a++){
        lineStyle = "symbolLine";
        if(highlight == a && highlight != -1){ lineStyle = "selectedSymbolLine"; }
        drawElement(document.getElementById("symbolDrawingArea"), 2,2,1, workingDrawing.construction[a],lineStyle,a,"selectElement(event,this)");
    }

}