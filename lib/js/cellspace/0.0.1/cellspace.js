var cellspace = new function(){
	var element;
    var cellSize = {'height':30,'width':80};
	var cellCount = {'x':20,'y':20};
	var lastSelectedCell = {'x':-1,'y':-1};

    this.attachDiv = function(input_element){
		element = input_element;
		element.style.overflow = "scroll";

		element.appendChild(createCellspace(element));
    }

	this.cellSize = function(height=0,width=0){
		if(height == 0 || width == 0){return cellSize;}
		else{
			cellSize = {'height':height,'width':width};
			for(var a = 0; a < cellCount.x; a++){for(var b = 0; b < cellCount.y; b++){
				document.getElementById('cell_'+a+'|'+b).style.height = cellSize.height+'px';
				document.getElementById('cell_'+a+'|'+b).style.width = cellSize.width+'px';				
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
					console.log('cell_'+a+'|'+b);
					temp.push( document.getElementById('cell_'+a+'|'+b).innerHTML );	
				}
				tempCellArray.push(temp);
			}

			cellCount = {'x':x,'y':y};
			document.getElementById('cellspace').innerHTML = '';
			document.getElementById('cellspace').appendChild(createCellspace(element,tempCellArray));
		}
	}

	this.cellData = function(x,y,data=null){
		if(data == null){return document.getElementById('cell_'+x+'|'+y).innerHTML;}
		else{document.getElementById('cell_'+x+'|'+y).innerHTML = data;}
	}
	this.cellColour = function(x,y,colour=null){
		if(colour == null){return document.getElementById('cell_'+x+'|'+y).style['background-color'];}
		else{document.getElementById('cell_'+x+'|'+y).style['background-color'] = colour;}	
	}

    this.cellClick = function(x,y){
		if(lastSelectedCell.x != -1){ toggleCell(document.getElementById('cell_'+lastSelectedCell.x+'|'+lastSelectedCell.y)); }
		lastSelectedCell.x = x; lastSelectedCell.y = y;
		toggleCell(document.getElementById('cell_'+x+'|'+y));
	}

	this.keyPress = function(that,event){
		switch(event.key){
			case "Enter": toggleCell(that.parentElement); lastSelectedCell = {'x':-1,'y':-1}; break;
		}
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
				input.setAttribute('onkeypress','cellspace.keyPress(this,event)');
				input.value = data;
				cellElement.appendChild(input);

				input.focus();
		}
		else if(cellElement.getAttribute('editable') == 'true'){cellElement.setAttribute('editable','false');
			cellElement.innerHTML = cellElement.childNodes[0].value;
			cellElement.setAttribute('onclick','cellspace.cellClick('+( cellElement.id.split('_')[1].split('|')[0] )+','+( cellElement.id.split('_')[1].split('|')[1] )+')');
		}
	}

	function createCellspace(element,cellspaceData=null){
        var master_div = document.createElement('div');
			master_div.id = 'cellspace';
			master_div.style['max-height'] = element.scrollHeight + 'px'; master_div.style['max-width'] = element.scrollWidth + 'px';

        var cellspace = document.createElement('table');
            cellspace.style['border-collapse'] = 'collapse';
			master_div.appendChild(cellspace);
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
					div.setAttribute('onclick','cellspace.cellClick('+a+','+b+')');
					div.setAttribute('editable','false');
					if(cellspaceData == null){div.innerHTML = '';}
					else{if(cellspaceData[a] == null || cellspaceData[a][b] == null){div.innerHTML = '';}else{div.innerHTML = cellspaceData[a][b];}}
				td.appendChild(div);
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}

		return master_div;
	}
}