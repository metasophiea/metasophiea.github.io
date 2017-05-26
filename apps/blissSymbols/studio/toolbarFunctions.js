function populateElementSelectionBox(){
    var buttonCount = 0
    var tbody, tr, td_1, td_2, svg_1, svg_2;
    tbody = document.createElement("tbody");

    //elements
        for(var a = 0; a < availableElements.length; a+=2){
            tr = document.createElement("tr");
            td_1 = document.createElement("td");
            td_2 = document.createElement("td");

            if( availableElements[a] != null ){if( availableElements[a].example != null ){
                svg_1 = document.createElement("svg");
                svg_1.setAttribute("class","button");
                svg_1.setAttribute("viewBox","0 0 100 100");
                svg_1.setAttribute("onclick","buttonPress({'type':'drawElement','element':'"+availableElements[a].name+"'});");
                drawElement(svg_1, 2,2,1, availableElements[a].example,"",0);
                td_1.appendChild(svg_1);
                td_1.setAttribute("title",availableElements[a].title);
                tr.appendChild(td_1);
                buttonCount++;
            }}
            if( availableElements[a+1] != null ){if( availableElements[a+1].example != null ){
                svg_2 = document.createElement("svg");
                svg_2.setAttribute("class","button");
                svg_2.setAttribute("viewBox","0 0 100 100");
                svg_2.setAttribute("onclick","buttonPress({'type':'drawElement','element':'"+availableElements[a+1].name+"'});");
                drawElement(svg_2, 2,2,1, availableElements[a+1].example,"",0);
                td_2.appendChild(svg_2);
                td_2.setAttribute("title",availableElements[a+1].title);
                tr.appendChild(td_2);
                tbody.appendChild(tr);
                buttonCount++;
            }}
        }

    //exsisting symbols
        for(var a = 0; a < symbols.length+1; a+=2){

            if( buttonCount%2 == 1){buttonCount++;
                if( symbols[a] != null){
                    svg_2 = document.createElement("svg");
                    svg_2.setAttribute("class","button");
                    svg_2.setAttribute("viewBox","0 0 100 100");
                    svg_2.setAttribute("onclick","buttonPress({'type':'drawSymbol','id':'"+symbols[a].id+"'});");
                    for(var b = 0; b < symbols[a].construction.length; b++){
                        drawElement(svg_2, 2,2,1, symbols[a].construction[b],"",a);
                    }
                    td_2.appendChild(svg_2);
                    td_2.setAttribute("title",symbols[a].name);
                }
                a--;
                tr.appendChild(td_2);
                tbody.appendChild(tr);
            }else{
                tr = document.createElement("tr");
                td_1 = document.createElement("td");
                td_2 = document.createElement("td");

                if( symbols[a] != null){ 
                    svg_1 = document.createElement("svg");
                    svg_1.setAttribute("class","button");
                    svg_1.setAttribute("viewBox","0 0 100 100");
                    svg_1.setAttribute("onclick","buttonPress({'type':'drawSymbol','id':'"+symbols[a].id+"'});");
                    for(var b = 0; b < symbols[a].construction.length; b++){
                        drawElement(svg_1, 2,2,1, symbols[a].construction[b],"",a);
                    }
                    td_1.appendChild(svg_1);
                    td_1.setAttribute("title",symbols[a].name);
                }
                if( symbols[a+1] != null){ 
                    svg_2 = document.createElement("svg");
                    svg_2.setAttribute("class","button");
                    svg_2.setAttribute("viewBox","0 0 100 100");
                    svg_2.setAttribute("onclick","buttonPress({'type':'drawSymbol','id':'"+symbols[a+1].id+"'});");
                    for(var b = 0; b < symbols[a+1].construction.length; b++){
                        drawElement(svg_2, 2,2,1, symbols[a+1].construction[b],"",a);
                    }
                    td_2.appendChild(svg_2);
                    td_2.setAttribute("title",symbols[a+1].name);
                }

                tr.appendChild(td_1);
                tr.appendChild(td_2);
                tbody.appendChild(tr);
            }

        }
        document.getElementById("elementSelectionBox_table").innerHTML = tbody.innerHTML;

}

function buttonPress(data){
    switch(data.type){
        case "new": 
            workingDrawing.construction = []; 
            document.getElementById("details_code").value = "";
            document.getElementById("details_name").value = "";
            document.getElementById("details_description").value = "";
            document.getElementById("details_character").checked = false;
            redraw(); 
        break;
        case "viewCode": 
            if( document.getElementById("codeViewer").style.visibility == "visible" ){
                document.getElementById("viewCodeButton").style["background-color"] = "";
                document.getElementById("codeViewer").style.opacity = 0;
                document.getElementById("codeViewer").style.visibility = "hidden";

                workingDrawing = JSON.parse(document.getElementById("codeViewer").value);

                if(workingDrawing.id == -1){document.getElementById("details_code").value = "";}
                else{document.getElementById("details_code").value = workingDrawing.id;}
                document.getElementById("details_name").value = workingDrawing.name;
                document.getElementById("details_description").value = workingDrawing.description;
                document.getElementById("details_character").checked = workingDrawing.isCharacter;

                redraw();
            }
            else{
                document.getElementById("viewCodeButton").style["background-color"] = "rgb(255,230,255)";
                document.getElementById("codeViewer").style.opacity = 1;
                document.getElementById("codeViewer").style.visibility = "visible";

                document.getElementById("codeViewer").value = printWorkingDrawing();
            }   
        break;
        case "drawElement": currentTool = {"name":data.element,"extraData":{}}; break;
        case "drawSymbol": currentTool = {"name":"shape","extraData":{"id":data.id}}; break;
    }
}

function printWorkingDrawing(){
    var output = "{" + "\n";
    output += "\t" + "\"id\":" + (document.getElementById("details_code").value == "" ? -1 : document.getElementById("details_code").value) + "," + "\n";
    output += "\t" + "\"name\":\"" + document.getElementById("details_name").value + "\"," + "\n";
    output += "\t" + "\"description\":\"" + document.getElementById("details_description").value + "\"," + "\n";
    output += "\t" + "\"isCharacter\":" + document.getElementById("details_character").checked + "," + "\n";
    output += "\t" + "\"construction\":[" + "\n";

    for(var a = 0; a < workingDrawing.construction.length; a++){
        output += "\t\t" + JSON.stringify(workingDrawing.construction[a]);
        if( a < workingDrawing.construction.length-1 ){ output += ",";}
        output += "\n";
    }

    output += "\t],\n";

    var symbolExtent = getExtentOfSymbol();
    output += "\t\"size\":{\"width\":"+symbolExtent.width+",\"height\":"+symbolExtent.height+"}\n";
    output += "}";

    return output;
}

function getExtentOfSymbol(data=null,scale=1,x=0,y=0){
    var results = [];

    if(data == null){
        var r;
        for(var a = 0; a < workingDrawing.construction.length; a++){ 
            r = getExtentOfSymbol(workingDrawing.construction[a]); 
            if(r.length != undefined){ for(var b = 0; b < r.length; b++){ results.push(r[b]); } }
            else{ results.push(r); }
        }
    }else if( data.type == "shape" ){
        var symbol = getSymbolById(data.id); 
        var subResults = [];
        for(var a = 0; a < symbol.construction.length; a++){  subResults.push( {"top":data.y,"bottom":data.y+symbol.size.height*data.scale,"left":data.x,"right":data.x+symbol.size.width*data.scale} ); }
        return subResults;
    }else{
        var d = {"top":x,"bottom":x,"left":y,"right":y};
        switch(data.type){
            case "dot": 
                d.top += data.y; d.bottom += data.y;
                d.left += data.x; d.right += data.x;
            break;
            case "line": 
                if(data.x1 < data.x2){ d.left += data.x1*scale; d.right += data.x2*scale; }else{ d.left += data.x2*scale; d.right += data.x1*scale; }
                if(data.y1 < data.y2){ d.top += data.y1*scale; d.bottom += data.y2*scale; }else{ d.top += data.y2*scale; d.bottom += data.y1*scale; }
            break;
            case "rectangle": case "halfCircle": case "quarterCircle": case "rightAngleTriangle": case "isoscelesTriangle":
                if(data.width > 0){ d.left += data.x; d.right += data.x+data.width*scale; }else{ d.left += data.x+data.width*scale; d.right += data.x; }
                if(data.height > 0){ d.top += data.y; d.bottom += data.y+data.height*scale; }else{ d.top += data.y+data.height*scale; d.bottom += data.y; }
            break;
            case "diamond": case "circle":
                d.left += data.x-data.r*scale; d.right += data.x+data.r*scale;
                d.top += data.y-data.r*scale; d.bottom += data.y+data.r*scale;
            break;
        }

        return d;
    }

    var ans = {"top":10,"bottom":0,"left":10,"right":0};
    for(var a = 0; a < results.length; a++){
        if( results[a].top < ans.top ){ ans.top = results[a].top; }
        if( results[a].left < ans.left ){ ans.left = results[a].left; }
        if( results[a].bottom > ans.bottom ){ ans.bottom = results[a].bottom; }
        if( results[a].right > ans.right ){ ans.right = results[a].right; }
    }

    return {"width":ans.right-ans.left, "height":ans.bottom-ans.top};
}