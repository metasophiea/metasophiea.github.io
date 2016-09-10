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
			gopher(input.folderAddress,input.filename,nowGet);
			
			function nowGet(address){orders.push([[address]]);orderBaised_includeList([address]);}
		}
		else if(typeof input[0].folderAddress == 'string'){
			var count = 0; var cap = input.length; var list = [];
			gopher(input[count].folderAddress,input[count].filename,nowGet);

			function nowGet(address){
				list.push(address); count++; 
				if(count == cap){orders.push([list]);orderBaised_includeList(list);}
				else{gopher(input[count].folderAddress,input[count].filename,nowGet);}
			}
		}
		else if(typeof input[0][0].folderAddress == 'string'){
			var completeOrder = []; var courseCount = 0;
			convertNextCourse(courseCount);

			function convertNextCourse(courseCount){
				var count = 0; var cap = input[courseCount].length; var list = [];
				gopher(input[courseCount][count].folderAddress,input[courseCount][count].filename,collect);

				function collect(address){list.push(address); count++;
					if(count == cap){completeOrder.push(list); courseCount++;
						if(courseCount == input.length){orders.push(completeOrder);orderBaised_includeList(completeOrder[0]);}else{convertNextCourse(courseCount);}
					}
					else{gopher(input[courseCount][count].folderAddress,input[courseCount][count].filename,collect);}
				}
			}
		}
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
		check(callback,folderAddress,filename);

		function check(callback,folderAddress,filename,currentVersion='0.0.0',previousVersion='0.0.0'){
			xhttp = new XMLHttpRequest();
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

/*
Regular getJS
 single       - 'http://metasophiea.com/lib/js/liveEdit/getJS/2.0.1/getJS.js'
 list         - ['http://metasophiea.com/lib/js/liveEdit/getJS/2.0.1/getJS.js','http://metasophiea.com/lib/js/liveEdit/getJS/2.0.1/getJS.js']
 ordered list - [['http://metasophiea.com/lib/js/liveEdit/getJS/2.0.1/getJS.js'],['http://metasophiea.com/lib/js/liveEdit/getJS/2.0.1/getJS.js]]

getLatest getJS
 single       - {'folderAddress':'http://metasophiea.com/lib/js/liveEdit/getJS/','filename':'getJS.js'}
 list         - [{'folderAddress':'http://metasophiea.com/lib/js/liveEdit/getJS/','filename':'getJS.js'},{'folderAddress':'http://metasophiea.com/lib/js/liveEdit/getJS/','filename':'getJS.js'}]
 ordered list - [[{'folderAddress':'http://metasophiea.com/lib/js/liveEdit/getJS/','filename':'getJS.js'}],[{'folderAddress':'http://metasophiea.com/lib/js/liveEdit/getJS/','filename':'getJS.js'}]]
*/

console.log("- please update getJS to the correct directory -", "color:rgb(202,136,202); font-style:italic;");