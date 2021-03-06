var workingDrawing =     
    {
        "id":-1,
        "name":"",
        "description":"",
        "isCharacter":null,
        "construction":[],
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