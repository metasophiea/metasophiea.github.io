var getJS = new function(){
	var orders = [];
	this.get = function(input){
		if(typeof input == 'string'){orders.push([[input]]);orderBaised_includeList([input]);}
		else if(typeof input[0] == 'string'){orders.push([input]);orderBaised_includeList(input);}
		else if(typeof input[0][0] == 'string'){orders.push(input);orderBaised_includeList(input[0]);}
		else{console.log("%cgetJS rejected input"," color:rgb(202,136,202); font-style:italic;");}
	}
 	this.getLatest = function(input){
		if(typeof input.folderAddress == 'string'){
			gopher(input.folderAddress,input.filename,get);
			function get(address){orders.push([[address]]);orderBaised_includeList([address]);}
		}
		else if(typeof input[0].folderAddress == 'string'){
			var count = 0; var cap = input.length; var list = [];
			for(var a = 0; a < cap; a++){ gopher(input[a].folderAddress,input[a].filename,get); }
		
			function get(address){
				count++; list.push(address);
				if(count == cap){orders.push([list]);orderBaised_includeList(list);}
			}
		}
		else if(typeof input[0][0].folderAddress == 'string'){
			var completeOrder = []; var courseCount = 0;
			convertNextCourse(courseCount);

			function convertNextCourse(courseCount){ 
				if(courseCount == input.length){orders.push(completeOrder);orderBaised_includeList(completeOrder[0]);}
				var count = 0; var cap = input[courseCount].length; var list = [];
				for(var a = 0; a < cap; a++){ gopher(input[courseCount][a].folderAddress,input[courseCount][a].filename,get); }	

				function get(address){
					count++; list.push(address);
					if(count == cap){completeOrder.push(list);courseCount++;convertNextCourse(courseCount);}
				}
			}
		}
		else{console.log("%cgetJS rejected input"," color:rgb(202,136,202); font-style:italic;");}  
	}
	this.getManifest = function(URL,callback){
		var xhttp = new XMLHttpRequest();
		xhttp.onloadend = function(){
			if(this.status == 200){
				var manifest = this.responseText.split(String.fromCharCode(10));
				for(var a = 0; a < manifest.length; a++){
					if(manifest[a].length == 0){manifest.splice(a,1); a--;}else{var temp = manifest[a].split(' ');manifest[a] = {'name':temp[0], 'type':temp[1]};}
				}
				callback(manifest);		
			}
			else{console.error('"' + URL + '" contains no manifest file');callback([]);}
		}
		xhttp.open('get',URL+'manifest',true);
		xhttp.send();			
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
					return;																				//eject from search loop
				}
			}
		}}
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
	function gopher(folderAddress,filename,callback){
		var manifest = [];
		//Check for manifest, run gopher if none is found
       		var xhttp = new XMLHttpRequest();
       		xhttp.folderAddress = folderAddress; xhttp.filename = filename; 
        	xhttp.onloadend = function(){
            		if(this.status == 404){
				console.log('%cgetJS - no manifest found for "' + folderAddress + '" starting gopher...', "color:rgb(202,136,202); font-style:italic;");
				check(callback,folderAddress,filename);
			}
            		else if(this.status == 200){
				console.log('%cgetJS - manifest found for "' + folderAddress + '"', "color:rgb(202,136,202); font-style:italic;");
				var manifest = this.response.split(String.fromCharCode(10)); var resultArray = [];
				for(var a = 0; a < manifest.length; a++){
					if(manifest[a].length == 0){
						manifest.splice(a,1); a--;
					}else{
						var temp = manifest[a].split(' ');
						if(temp[1] == 'dir'){
							var temp2 = temp[0].split('.'); var correct = true;
							if(temp2.length == 3){
								for(var b = 0; b < temp2.length; b++){
									temp2[b] = parseInt(temp2[b]);
									if(isNaN(temp2[b])){correct = false;}
								}
							}
							if(correct){resultArray.push(temp[0].split('.'));}		
						}
					}
				}

			//test if lucky
				if(resultArray.length == 1){
					resultArray[0] = resultArray[0].join('.');
					console.log('%cgetJS - latest version: ' + resultArray[0], "color:rgb(202,136,202); font-style:italic;");
					callback(this.folderAddress+resultArray[0]+'/'+xhttp.filename);	
					return;			
				}
			//x.0.0
				var sortArray = [[0,0,0]];
				for(var a = 0; a < resultArray.length; a++){
					if(resultArray[a][0] > sortArray[0][0]){sortArray = [];sortArray.push(resultArray[a]);}
					else if(resultArray[a][0] == sortArray[0][0]){sortArray.push(resultArray[a]);}
				}
				resultArray = sortArray;
				if(resultArray.length == 1){
					resultArray[0] = resultArray[0].join('.');
					console.log('%cgetJS - latest version: ' + resultArray[0], "color:rgb(202,136,202); font-style:italic;");
					callback(this.folderAddress+resultArray[0]+'/'+xhttp.filename);	
					return;			
				}
			//0.x.0	
				var sortArray = [[0,0,0]];
				for(var a = 0; a < resultArray.length; a++){
					if(resultArray[a][1] > sortArray[0][1]){sortArray = [];sortArray.push(resultArray[a]);}
					else if(resultArray[a][1] == sortArray[0][1]){sortArray.push(resultArray[a]);}
				}
				resultArray = sortArray;
				if(resultArray.length == 1){
					resultArray[0] = resultArray[0].join('.');
					console.log('%cgetJS - latest version: ' + resultArray[0], "color:rgb(202,136,202); font-style:italic;");
					callback(this.folderAddress+resultArray[0]+'/'+xhttp.filename);	
					return;			
				}
			//0.0.x
				var sortArray = [[0,0,0]];
				for(var a = 0; a < resultArray.length; a++){
					if(resultArray[a][2] > sortArray[0][2]){sortArray = [];sortArray.push(resultArray[a]);}
					else if(resultArray[a][2] == sortArray[0][2]){sortArray.push(resultArray[a]);}
				}
				resultArray = sortArray;
				if(resultArray.length == 1){
					resultArray[0] = resultArray[0].join('.');
					console.log('%cgetJS - latest version: ' + resultArray[0], "color:rgb(202,136,202); font-style:italic;");
					callback(this.folderAddress+resultArray[0]+'/'+xhttp.filename);	
					return;			
				}
        		}
        	}
        	xhttp.open('get',folderAddress+'manifest',true);
      	  	xhttp.send();

		function check(callback,folderAddress,filename,currentVersion='0.0.0',previousVersion='0.0.0'){
			var xhttp = new XMLHttpRequest();
			xhttp.folderAddress = folderAddress; xhttp.currentVersion = currentVersion; xhttp.previousVersion = previousVersion; xhttp.filename = filename;
			xhttp.onloadend = function(){
				if(this.status == 200){
					var temp = this.currentVersion.split('.'); temp[2] = (parseInt(temp[2])+1).toString();
					manifest.push(this.currentVersion);check(callback,xhttp.folderAddress,xhttp.filename,temp.join('.'),xhttp.currentVersion);
				}
				else if(this.status == 404){
					var temp_prev = this.previousVersion.split('.');
					var temp_cur = this.currentVersion.split('.');
					if( parseInt(temp_cur[0]) == parseInt(temp_prev[0])+1 &&
						parseInt(temp_cur[1]) == parseInt(temp_prev[1]) &&
						parseInt(temp_cur[2]) == parseInt(temp_prev[2])){
							console.log('%cgetJS - gopher search complete', "color:rgb(202,136,202); font-style:italic;");	
							console.log('%cgetJS - latest version: ' + manifest[manifest.length-1], "color:rgb(202,136,202); font-style:italic;");										
							callback(xhttp.folderAddress+manifest[manifest.length-1]+'/'+xhttp.filename);
						}
					else if(temp_prev[1] == temp_cur[1]){
						temp_cur[1] = (parseInt(temp_cur[1])+1).toString();
						temp_cur[2] = '0';
						check(callback,xhttp.folderAddress,xhttp.filename,temp_cur.join('.'),xhttp.currentVersion);				
					}
					else{	temp_cur[0] = (parseInt(temp_cur[0])+1).toString();
						temp_cur[1] = '0';
						temp_cur[2] = '0';
						check(callback,xhttp.folderAddress,xhttp.filename,temp_cur.join('.'),xhttp.currentVersion);
					}
				}
			}
			xhttp.open('get',xhttp.folderAddress+xhttp.currentVersion+'/'+xhttp.filename,true);
			xhttp.send();
		}		
	}
}

console.log('%cgetJS v2.3.0 loaded', "color:rgb(202,136,202); font-style:italic;");
