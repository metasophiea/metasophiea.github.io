var cellspace = new function(){
    var div;
    var cellSize = {'height':30,'width':80};
	var cellCount = {'x':20,'y':20};
	var lastSelectedCell = {'x':-1,'y':-1};

    this.cellClick = function(x,y){
		var cellElement = document.getElementById('cell_'+x+'|'+y);
		
		if(lastSelectedCell.x != -1){
			var oldNode = document.getElementById('cell_'+lastSelectedCell.x+'|'+lastSelectedCell.y);
			var data = oldNode.childNodes[0].childNodes[0].value; console.log(oldNode);

			oldNode.innerHTML = data;
			oldNode.setAttribute('onclick','cellspace.cellClick('+lastSelectedCell.x+','+lastSelectedCell.y+')');
		}

		lastSelectedCell.x = x; lastSelectedCell.y = y;

		var data = cellElement.innerHTML; cellElement.innerHTML = '';
		cellElement.removeAttribute('onclick');

		var form = document.createElement('form');
			form.style.width = '100%'; form.style.height = '100%';
		var input = document.createElement('input');	
			input.value = data;
			form.appendChild(input);

			cellElement.appendChild(form);

	}

    this.attachDiv = function(element){
        div = element;

        //create cellspace
        var cellspace = document.createElement('table');
            cellspace.style['border-collapse'] = 'collapse';
			div.appendChild(cellspace);
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
					div.setAttribute('onclick','cellspace.cellClick('+a+','+b+')');
					div.innerHTML = Math.random().toFixed(4);
					
				td.appendChild(div);
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
    }





}