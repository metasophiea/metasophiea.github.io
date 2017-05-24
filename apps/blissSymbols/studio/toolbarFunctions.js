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
                tr.appendChild(td_2);
                tbody.appendChild(tr);
                buttonCount++;
            }}
        }

    //exsisting symbols
        for(var a = 0; a < symbols.length+1; a+=2){
            tr = document.createElement("tr");
            td_1 = document.createElement("td");
            td_2 = document.createElement("td");

            if( buttonCount%2 == 1){buttonCount++;
                if( symbols[a] != null){
                    svg_1 = document.createElement("svg");
                    svg_1.setAttribute("class","button");
                    svg_1.setAttribute("viewBox","0 0 100 100");
                    svg_1.setAttribute("onclick","buttonPress({'type':'drawSymbol','element':'"+symbols[a].construction.type+"'});");
                    for(var b = 0; b < symbols[a].construction.length; b++){
                        drawElement(svg_1, 2,2,1, symbols[a].construction[b],"",a);
                    }
                    td_1.appendChild(svg_1);
                }
                a--;
                tr.appendChild(td_1);
                tbody.appendChild(tr);
            }else{
                if( symbols[a] != null){
                    svg_1 = document.createElement("svg");
                    svg_1.setAttribute("class","button");
                    svg_1.setAttribute("viewBox","0 0 100 100");
                    svg_1.setAttribute("onclick","buttonPress({'type':'drawSymbol','id':'"+symbols[a].id+"'});");
                    for(var b = 0; b < symbols[a].construction.length; b++){
                        drawElement(svg_1, 2,2,1, symbols[a].construction[b],"",a);
                    }
                    td_1.appendChild(svg_1);
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
        case "new": workingDrawing.construction = []; redraw(); break;
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
    output += "\t\"size\":" + JSON.stringify(workingDrawing.size) + "\n";
    output += "}";

    return output;
}