var machine = new function(){
    /*
        >   62 -> 0 increment the data pointer (to point to the next cell to the right).
        <   60 -> 1 decrement the data pointer (to point to the next cell to the left).
        +   43 -> 2 increment (increase by one) the byte at the data pointer.
        -   45 -> 3 decrement (decrease by one) the byte at the data pointer.
        [   91 -> 4 if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ']' command.
        ]   93 -> 5 if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching '[' command.

        /   47
    */
    var programCounter = 0; var program = ''; 
    var executionPaused = false; var executionIntervalID; var loopProgram = false;
    var executeDelay = 100;

    this.attachMemoryDisplay = function(element){ memory.attachMemoryDisplayDiv(element); }
    this.togglePause = function(){if(executionPaused){executionPaused = false;}else{executionPaused = true;}}
    this.toggleLoop = function(){if(loopProgram){loopProgram = false;}else{loopProgram = true;}} 
    this.stopExecution = function(){if(executionIntervalID != null){console.log('-- Program terminated --');clearInterval(executionIntervalID);executionPaused = false;}}
    this.reset = function(){this.stopExecution(); programCounter = 0; loopProgram = false; program = ''; memory.clear();}
    this.step = function(){
        executeCommand(program[programCounter]); programCounter++;
        if(programCounter >= program.length){if(loopProgram){programCounter = 0; console.log('/run:> program restarted'); }else{console.log('-- End of program --'); clearInterval(executionIntervalID); executionPaused = false;}}
    }
    this.executeDelay = function(a=null){if(a == null){return executeDelay;}else{executeDelay = a;}}

    this.compile = function(text){
        var resultProgram = [];
        for(var a = 0; a < text.length; a++){
            if(text[a].charCodeAt(0) == 47){ while(text[a].charCodeAt(0) != 10){a++; if(a > text.length){break;}} }
            else{
                switch(text[a].charCodeAt(0)){
                    case 62: resultProgram.push(0); break;
                    case 60: resultProgram.push(1); break;
                    case 43: resultProgram.push(2); break;
                    case 45: resultProgram.push(3); break;
                    case 91: resultProgram.push(4); break;
                    case 93: resultProgram.push(5); break;
                }
            }
        }
        return resultProgram.join('');
    }

    this.loadProgram = function(input){programCounter = 0; program = input.split(''); for(var a = 0; a < program.length; a++){ program[a] = parseInt(program[a]); }}
    this.runProgram = function(input){
        if(executionIntervalID == null){programCounter = 0;}

        executionIntervalID = setInterval(function(){
            if(!executionPaused){
                executeCommand(program[programCounter]); programCounter++;
                if(programCounter >= program.length){if(loopProgram){programCounter = 0; console.log('/run:> program restarted'); }else{console.log('-- End of program --'); clearInterval(executionIntervalID); executionPaused = false;}}
            }
        },executeDelay);
    }

    function executeCommand(command){
        switch(command){
            case 0: memory.incriemntPointer(); console.log('/run:> incriment pointer'); break;
            case 1: memory.decriemntPointer(); console.log('/run:> decriment pointer'); break;
            case 2: memory.incriemntCurrentByte(); console.log('/run:> incriment current byte'); break;
            case 3: memory.decriemntCurrentByte(); console.log('/run:> decriment current byte'); break;
            case 4: console.log('/run:> test for hop forward | ');
                if(memory.getByte() == 0){ console.log('/run:> -> perform hop forward');
                    var stack = 0; var a = 0;
                    for(a = programCounter+1; a < program.length; a++){
                        if(program[a] == 4){stack++;}
                        else if(program[a] == 5 && stack == 0){break;}          
                        else if(program[a] == 5){{stack--;}}
                    }     
                    programCounter = a; console.log('/run:> -> landed on ' + programCounter);
                }else{console.log('/run:> -> do not perform hop forward');}
            break;
            case 5: console.log('/run:> test for hop back');
                if(memory.getByte() != 0){ console.log('/run:> -> perform hop back');
                    var stack = 0; var a = 0;
                    for(a = programCounter-1; a > 0; a--){
                        if(program[a] == 5){stack++;}
                        else if(program[a] == 4 && stack == 0){break;}          
                        else if(program[a] == 4){{stack--;}}  
                    }
                    programCounter = a; console.log('/run:> -> landed on ' + programCounter);
                }else{console.log('/run:> -> do not perform hop back');} 
            break;
        }
    }

    this.test = function(){
        memory.incriemntPointer();
        memory.decriemntCurrentByte();
    }

    this.cellClick = function(x,y){memory.cellClick(x,y);}
    this.keyPress = function(that,event){memory.keyPress(that,event);}

    var memory = new function(){
        var pointer = 0; 
        var memorysize = {'x':32,'y':8}; 

        this.attachMemoryDisplayDiv = function(input_element){
            cellspace.attachDiv(input_element);
            cellspace.cellSize(20,30);
            cellspace.cellCount(memorysize.x,memorysize.y);
            cellspace.setAllCells("00");

            highlightCell();
        }

        this.incriemntPointer = function(){ dehighlightCell(); pointer++; if(pointer >= memorysize.x*memorysize.y){pointer = 0;} highlightCell(); }
        this.decriemntPointer = function(){ dehighlightCell(); pointer--; if(pointer < 0){pointer = memorysize.x*memorysize.y-1;} highlightCell(); }
        this.incriemntCurrentByte = function(){var temp = getByte()+1; if(temp >= 256){temp = 0;} setByte(temp); }
        this.decriemntCurrentByte = function(){var temp = getByte()-1; if(temp < 0){temp = 255;} setByte(temp); } 
        this.getByte = function(){return getByte(pointer);}
        this.cellClick = function(x,y){cellspace.cellClick(x,y);} 
        this.keyPress = function(that,event){cellspace.keyPress(that,event);}
        this.dumpMemory = function(){return cellspace.dumpMemory();}
        this.clear = function(){dehighlightCell(); pointer = 0; highlightCell(); cellspace.setAllCells("00");}

        function getByte(){
            var address = cellspace.addressFromIndex(pointer);
            var byte = cellspace.cellData(address.y,address.x);
            return parseInt(byte,16);
        }

        function setByte(data){
            var address = cellspace.addressFromIndex(pointer);
            var temp = data.toString(16); if(temp.length == 1){temp = "0"+temp;}
            cellspace.cellData(address.y,address.x,temp);
        }

        function highlightCell(){
            var address = cellspace.addressFromIndex(pointer);
            cellspace.cellColour(address.y,address.x,"#ddbbdd");
        } 

        function dehighlightCell(){
            var address = cellspace.addressFromIndex(pointer);
            cellspace.cellColour(address.y,address.x,"#ffffff");         
        }     


        var cellspace = new function(){
            var dataSpace = [];
            var element; var varName = "machine";
            var cellSize = {'height':30,'width':80};
            var cellCount = {'x':20,'y':20};
            var lastSelectedCell = {'x':-1,'y':-1};

            this.attachDiv = function(input_element){
                element = input_element;
                element.style.overflow = "auto";	

                element.appendChild(createCellspace(element));
            }

            this.cellSize = function(height=0,width=0){
                if(height == 0 || width == 0){return cellSize;}
                else{
                    cellSize = {'height':height,'width':width};
                    for(var a = 0; a < cellCount.x; a++){for(var b = 0; b < cellCount.y; b++){
                        getCellElement(a,b).style.height = cellSize.height+'px';
                        getCellElement(a,b).style.width = cellSize.width+'px';				
                    }}
                }
            }
            this.cellCount = function(x=0,y=0){
                if(x == 0 || y == 0){return cellCount;}
                else{
                    var tempCellArray = []; var temp = [];
                    for(var a = 0; a < cellCount.y; a++){
                        temp = [];
                        for(var b = 0; b < cellCount.x; b++){
                            temp.push( getCellElement(a,b).innerHTML );	
                        }
                        tempCellArray.push(temp);
                    }

                    cellCount = {'x':x,'y':y};
                    element.innerHTML = '';
                    element.appendChild(createCellspace(element,tempCellArray));
                }
            }

            this.disactivateCurrentFocus = function(){
                if(lastSelectedCell.x != -1){ toggleCell(getCellElement(lastSelectedCell.x,lastSelectedCell.y)); }
                lastSelectedCell = {'x':-1,'y':-1};
            }
            this.setAllCells = function(data){
                for(var a = 0; a < cellCount.y; a++){for(var b = 0; b < cellCount.x; b++){this.cellData(a,b,data);}}
            }

            this.cellData = function(x,y,data=null){
                if(data == null){return dataSpace[x][y];}
                else{dataSpace[x][y] = data; getCellElement(x,y).innerHTML = data;}
            }
            this.cellColour = function(x,y,colour=null){
                if(colour == null){return getCellElement(x,y).style['background-color'];}
                else{getCellElement(x,y).style['background-color'] = colour;}	
            }

            this.cellClick = function(x,y){
                if(lastSelectedCell.x != -1){ toggleCell(getCellElement(lastSelectedCell.x,lastSelectedCell.y)); }
                lastSelectedCell.x = x; lastSelectedCell.y = y;
                toggleCell(getCellElement(x,y));
            }

            this.keyPress = function(that,event){
                var inputVal = that.value;;
                switch(event.key){
                    case "Enter": 
                        dataSpace[that.parentElement.id.split('_')[1].split('|')[0]][that.parentElement.id.split('_')[1].split('|')[1]] = inputVal;
                        toggleCell(that.parentElement); 
                        lastSelectedCell = {'x':-1,'y':-1};
                    break;
                    default:
                        inputVal = inputVal + event.key; 
                        dataSpace[that.parentElement.id.split('_')[1].split('|')[0]][that.parentElement.id.split('_')[1].split('|')[1]] = inputVal;
                    break;
                }
            }

            this.addressFromIndex = function(a){
                var temp = a; var space = cellspace.cellCount(); var result = {y: 0, x: 0};

                while(temp >= space.x){ temp = temp - space.x; result.y++; } result.x = temp;

                if(result.y >= space.y || result.x >= space.x){return {y: 0, x: 0};}
                else{return result;}
            }
            this.indexFromAddress = function(x,y){ var space = cellspace.cellCount(); var ans = y*space.x + x; if(ans >= space.x*space.y){ans = 0;} return ans; }

            this.dumpMemory = function(){return dataSpace;}

            function getCellElement(x,y){ return element.children[0].children[0].children[x].children[y].children[0]; }

            function toggleCell(cellElement){
                if(cellElement.getAttribute('editable') == 'false'){cellElement.setAttribute('editable','true');
                    var data = cellElement.innerHTML;
                        cellElement.innerHTML = '';
                        cellElement.removeAttribute('onclick');

                    var input = document.createElement('input');	
                        input.style.width = '100%'; input.style.height = '100%';
                        input.style.border = '0px'; input.style.padding = '0px';
                        input.style['font-size'] = window.getComputedStyle(cellElement, null).getPropertyValue('font-size');
                        input.style['font-family'] = window.getComputedStyle(cellElement, null).getPropertyValue('font-family');
                        input.setAttribute('onkeypress',varName+'.keyPress(this,event)');
                        input.value = data;
                        cellElement.appendChild(input);

                        input.focus();
                }
                else if(cellElement.getAttribute('editable') == 'true'){cellElement.setAttribute('editable','false');
                    cellElement.innerHTML = cellElement.childNodes[0].value;
                    cellElement.setAttribute('onclick',varName+'.cellClick('+( cellElement.id.split('_')[1].split('|')[0] )+','+( cellElement.id.split('_')[1].split('|')[1] )+')');
                }
            }

            function createCellspace(element,cellspaceData=null){
                //Set up actual data holder

                    var temp = []; var resultArray = [];
                    for(var a = 0; a < cellCount.y; a++){ 
                        temp = [];
                        for(var b = 0; b < cellCount.x; b++){
                            if(cellspaceData == undefined || cellspaceData[a] == null || cellspaceData[a][b] == null){temp.push(0);}
                            else{temp.push(cellspaceData[a][b]);}
                        }
                        resultArray.push(temp);
                    }
                
                dataSpace = resultArray;

                //Cell space
                var cellspace = document.createElement('table');
                    cellspace.style.margin = 'auto';
                    cellspace.style['border-collapse'] = 'collapse';
                var tbody = document.createElement('tbody');
                    cellspace.appendChild(tbody);

                var tr, td, div;
                for(var a = 0; a < cellCount.y; a++){
                    tr = document.createElement('tr');
                        tr.style.border = '1px solid #888888';
                    for(var b = 0; b < cellCount.x; b++){
                        td = document.createElement('td');
                            td.style.border = '1px solid #888888';
                            td.style.padding = '0px';
                        div = document.createElement('div');
                            div.style.height = cellSize.height+'px'; div.style.width = cellSize.width+'px';
                            div.style.overflow = 'hidden';
                            div.id = 'cell_'+a+'|'+b;
                            div.style['user-select'] = 'none';
                            div.setAttribute('onclick',varName+'.cellClick('+a+','+b+')');
                            div.setAttribute('editable','false');
                            div.innerHTML = dataSpace[a][b];
                        td.appendChild(div);
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }

                return cellspace;
            }
        }
    }
}