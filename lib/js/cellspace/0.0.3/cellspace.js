var cellspace = new function(){
	this.newCellspace = function(varName, element){
		var temp = new cellspace(varName);
		temp.attachDiv(element);
		return temp;
	}

	var cellspace = function(varName){
		var dataSpace = [];
		var element; var varName = varName;
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