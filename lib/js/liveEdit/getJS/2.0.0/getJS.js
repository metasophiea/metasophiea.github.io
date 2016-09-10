var getJS = new function(){
	var orders = [];
	this.get = function(input){
		if(typeof input == 'string'){orders.push([[input]]);orderBaised_includeList([input]);}
		else if(typeof input[0] == 'string'){orders.push([input]);orderBaised_includeList(input);}
		else if(typeof input[0][0] == 'string'){orders.push(input);orderBaised_includeList(input[0]);}
		else{console.log("%cgetJS rejected input"," color:rgb(202,136,202); font-style:italic;");}
	}
	this.list = function(){
		var scripts = document.getElementsByTagName('script'); var result = [];
		for(var a = 0; a < scripts.length; a++){
			var temp = scripts[a].id.split('|');
			if(temp [0] == 'getJS'){result.push(temp[1]);}
		}
		return result;
	}
	this.remove = function(URL){
		var scripts = document.getElementsByTagName('script');
		for(var a = 0; a < scripts.length; a++){
			var temp = scripts[a].id.split('|');
			if(temp[0] == 'getJS' && temp[1] == URL){ document.head.removeChild(document.getElementById(temp[0]+'|'+temp[1])); return; }
		}
	}
	this.register = function(ID){
		for(var a = 0; a < orders.length; a++){	for(var b = 0; b < orders[a][0].length; b++){	//Passes through all top courses
			if(orders[a][0][b] == ID.split('|')[1]){											//found matching URL
				orders[a][0].splice(b,1);														//remove that URL from the course
				if(orders[a][0].length === 0){														//course is empty
					orders[a].shift();																//remove course
					if(orders[a].length === 0){orders.splice(a,1);}										//if order is empty; remove order
					else{orderBaised_includeList(orders[a][0]);}										//or begin the next course
					return;																				//eject search loop
				}
			}
		}}
	}

	function printOrders(){
		console.log('-- -- -- -- --');
		for(var a = 0; a < orders.length; a++){
			console.log('\t- Order ' + a);
			for(var b = 0; b < orders[a].length; b++){
				console.log('\t\t-- Course ' + b);		
				for(var c = 0; c < orders[a][b].length; c++){ console.log('\t\t Dish: '+orders[a][b][c]); }
				console.log('\t\t-- -- -- --');				
			}		
			console.log('\t-');
		}
		console.log('-- -- -- -- --');
	}
	function checkFor(URL){
		var scripts = document.getElementsByTagName('script');
		for(var a = 0; a < scripts.length; a++){ if(scripts[a].id == 'getJS|'+URL){return true;} }
		return false;
	}
	function orderBaised_includeList(list){ for(var a = 0; a < list.length; a++){orderBaised_include(list[a]);} }
	function orderBaised_include(URL){if(checkFor(URL)){console.log("%cgetJS did not load: "+URL+" as it was already present"," color:rgb(202,136,202); font-style:italic;");getJS.register('getJS|'+URL);return;}
		var temp = document.createElement("script");
		temp.setAttribute('onLoad','getJS.register(this.id);console.log("%cgetJS successfully loaded: '+URL+'", "color:rgb(202,136,202); font-style:italic;");this.removeAttribute("onload");');
		temp.type = "text/javascript"; temp.src = URL; temp.id = 'getJS|'+URL;
		document.head.appendChild(temp);
	}
}

console.log("%c- please update to the correct directory -", "color:rgb(202,50,50); font-style:italic;");