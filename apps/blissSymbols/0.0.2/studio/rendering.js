var workingDrawing =     
    {
        "id":-1,
        "name":"",
        "isCharacter":null,
        "construction":[
            {"type":"line", "x1":0,"y1":4,"x2":4,"y2":0},
            {"type":"rectangle", "x":0,"y":0,"width":1,"height":1},
            // {"type":"dimond", "x":4,"y":0,"r":2},
            // {"type":"circle", "x":0,"y":0,"r":2},
            // {"type":"halfCircle", "x":2,"y":1,"orientation":0,"width":1,"height":2},
            // {"type":"halfCircle", "x":2,"y":1,"orientation":1,"width":2,"height":1},
            // {"type":"quarterCircle", "x":3,"y":3,"orientation":2,"width":1,"height":1},
            // {"type":"rightAngleTriangle", "x":2,"y":5,"width":2,"height":1},
            // {"type":"isoscelesTriangle", "x":0,"y":4,"orientation":0,"width":2,"height":2},
            // {"type":"isoscelesTriangle", "x":0,"y":3,"orientation":1,"width":2,"height":2},
            {"type":"shape","id":8, "x":0,"y":0, "scale":1}
        ],
        "size":{"width":0,"height":0}
    };

function redraw(highlight=-1){
    document.getElementById("symbolDrawingArea").innerHTML = null;

    var lineStyle;
    for(var a = 0; a < workingDrawing.construction.length; a++){
        lineStyle = "symbolLine";
        if(highlight == a && highlight != -1){ lineStyle = "selectedSymbolLine"; }
        drawElement(document.getElementById("symbolDrawingArea"), 2,2,1, workingDrawing.construction[a],lineStyle,a);
    }
}