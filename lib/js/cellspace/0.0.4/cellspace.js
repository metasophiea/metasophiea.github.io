for(var a = 0; a < document.getElementsByClassName('cellspace').length; a++){
    var element = document.getElementsByClassName('cellspace')[a];

//element methods
    element.hello = function(){return this.cellspace.hello();}
    element.build = function(){this.cellspace.build(this);}
    element.cellClick = function(that){this.cellspace.cellClick(that);}
    element.keyPress = function(that,event){this.cellspace.keyPress(that,event);}
    element.blur = function(that,event){this.cellspace.blur(that);} 

    element.getAddressFromIndex = function(index){return this.cellspace.getAddressFromIndex(index);}
    element.getIndexFromAddress = function(x,y){return this.cellspace.getIndexFromAddress(x,y);}

    element.setAllData = function(data){return this.cellspace.setAllData(data);}
    element.getData = function(x,y){return this.cellspace.getData(x,y);}
    element.setData = function(x,y,data){this.cellspace.setData(x,y,data);}

    element.getCellSize = function(){return this.cellspace.getCellSize();}
    element.setCellSize = function(width,height){this.cellspace.setCellSize(width,height);}

    element.getCellCount = function(){return this.cellspace.getCellCount();}
    element.setCellCount = function(x,y){this.cellspace.setCellCount(x,y);}

    element.getCellStyle = function(x,y,attribute,value){return this.cellspace.getCellStyle(x,y,attribute);}   
    element.setCellStyle = function(x,y,attribute,value){this.cellspace.setCellStyle(x,y,attribute,value);}
    element.setAllCellStyle = function(attribute,value){this.cellspace.setAllCellStyle(attribute,value);}

    element.getTableStyle = function(attribute){return this.childNodes[0].style[attribute];}
    element.setTableStyle = function(attribute,value){this.childNodes[0].style[attribute] = value;}

//element engine
    element.cellspace = new function(){
		var dataSpace = []; var masterElement;
		var cellSize = {'height':30,'width':80};
		var cellCount = {'x':20,'y':20};
        var lastSelectedCell;

    //api interaction -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- //
        this.hello = function(){return "hello";}
        this.build = function(element){
            masterElement = element;
            masterElement.style.overflow = "auto";
            masterElement.appendChild(createCellspace(dataSpace));
        }   
        this.blur = function(cellElement){
            if(lastSelectedCell != null){toggleCell(lastSelectedCell);}
            lastSelectedCell = cellElement;
        }

        this.getAddressFromIndex = function(index){ if(index < 0 || index >= cellCount.x*cellCount.y){return -1;}
            var result = {'x':0,'y':0};
            while(index > cellCount.x-1){ index = index - cellCount.x; result.y++; } result.x = index;
            return result;
        }
        this.getIndexFromAddress = function(x,y){ if(x >= cellCount.x || y >= cellCount.y){return -1;} return y*cellCount.x + x; }

        this.getData = function(x,y){ return dataSpace[y][x]; }
        this.setData = function(x,y,data){ dataSpace[y][x] = data; var element = getCellFromAddress(x,y); if( element.getAttribute('editable') == 'false'){element.innerHTML = data;} }
        this.setAllData = function(data){ for(var a = 0; a < cellCount.y; a++){for(var b = 0; b < cellCount.x; b++){ this.setData(a,b,data); } } }

        this.getCellSize = function(){return cellSize;}
        this.setCellSize = function(width,height){ cellSize = {'height':height,'width':width}; for(var a = 0; a < cellCount.y; a++){for(var b = 0; b < cellCount.x; b++){ getCellFromAddress(b,a).style.width = cellSize.width+'px'; getCellFromAddress(b,a).style.height = cellSize.height+'px'; } } }

        this.getCellCount = function(){return cellCount;}
        this.setCellCount = function(x,y){ cellCount = {'x':x,'y':y}; masterElement.innerHTML = ''; masterElement.appendChild(createCellspace(dataSpace)); }

        this.getCellStyle = function(x,y,attribute){ return getCellFromAddress(x,y).style[attribute]; }
        this.setCellStyle = function(x,y,attribute,value){ getCellFromAddress(x,y).style[attribute] = value; }
        this.setAllCellStyle = function(attribute,value){for(var a = 0; a < cellCount.y; a++){for(var b = 0; b < cellCount.x; b++){ this.setCellStyle(a,b,attribute,value); } } }      

    //mouse and keyboard interaction -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- //
        this.cellClick = function(cellElement){
            if(lastSelectedCell != null){toggleCell(lastSelectedCell);}
            lastSelectedCell = cellElement;
            toggleCell(cellElement);
        }

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
					input.setAttribute('onkeyup','this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.keyPress(this,event)');
                    input.setAttribute('onblur','this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.blur(this)');
					input.value = data;
					cellElement.appendChild(input);

					input.focus();
			}
			else if(cellElement.getAttribute('editable') == 'true'){cellElement.setAttribute('editable','false');
				cellElement.innerHTML = cellElement.childNodes[0].value;
				cellElement.setAttribute('onclick','this.parentElement.parentElement.parentElement.parentElement.parentElement.cellClick(this)');					
			}
		}

        this.keyPress = function(that,event){
            var address = that.parentElement.id.split('-')[1].split('_'); dataSpace[address[1]][address[0]] = that.value;
            if(event.key == 'Enter'){toggleCell(that.parentElement);lastSelectedCell = null;}
        }

    //internal functions -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- //
        function getCellFromAddress(x,y){ return masterElement.querySelectorAll('#cell-'+x+'_'+y)[0]; }
        function createCellspace(cellspaceData=null){
			//Set up actual data holder
            var temp = []; var resultArray = [];
            for(var a = 0; a < cellCount.y; a++){ 
                temp = [];
                for(var b = 0; b < cellCount.x; b++){
                    if(cellspaceData == undefined || cellspaceData[a] == null || cellspaceData[a][b] == null){temp.push('');}
                    else{temp.push(cellspaceData[a][b]);}
                }
                resultArray.push(temp);
            }
            
            dataSpace = resultArray;

			//Cell space
			var table = document.createElement('table');
				table.style.margin = 'auto';
                table.style.border = '1px solid #888888';
				table.style['border-collapse'] = 'collapse';
			var tbody = document.createElement('tbody');
                tbody.style.border = 'inherit';
                table.appendChild(tbody);

			var tr, td, div;
			for(var a = 0; a < cellCount.y; a++){
				tr = document.createElement('tr');
                    tr.style.border = 'inherit';
				for(var b = 0; b < cellCount.x; b++){
					td = document.createElement('td');
                        td.style.border = 'inherit';
						td.style.padding = '0px';

					div = document.createElement('div');
						div.style.height = cellSize.height+'px'; div.style.width = cellSize.width+'px';
						div.style.overflow = 'hidden';
						div.id = 'cell-'+b+'_'+a;
						div.style['user-select'] = 'none';
                        div.setAttribute('class','cell');
						div.setAttribute('onclick','this.parentElement.parentElement.parentElement.parentElement.parentElement.cellClick(this)');
						div.setAttribute('editable','false');
						div.innerHTML = dataSpace[a][b];
					td.appendChild(div);
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}

            return table;
        }
    }





    element.build();
}