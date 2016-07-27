function AdjustDomain(){
	var data = properAddress(WhatIsThis());
	var currentAddress = {'origin':window.location.href,'pathname':window.location.pathname};

	//Gather main address
	currentAddress.origin = currentAddress.origin.split('/');
	while(currentAddress.origin.length > 0){ if(currentAddress.origin.pop() == 'main'){break;} }
	currentAddress.origin = currentAddress.origin.join('/');

	//Gather sub address
	currentAddress.pathname = currentAddress.pathname.split('/');
	while(currentAddress.pathname.length > 0){ if(currentAddress.pathname.shift() == 'main'){break;} }

	//compare current address with proper one, changing is necessary
	for(var a = 0; a < data.length; a++){
		if(data[a] != currentAddress.pathname[a]){
			GoToProperAddress(currentAddress,data);
			break;
		}
	}
	return;



	function GoToProperAddress(currentAddress,data){
		window.location.href = currentAddress.origin+'/'+data.join('/')+'/index.html';
	}
	function properAddress(data){
		var result = ['main'];
		switch(data.os.name){
			case 'Linux': case 'Windows': result.push('desktop'); break;
			case 'Android': result.push('mobile'); break;
			default: result.push('compatibility'); return result; break;
		}
		result.push(data.browser.name); result.push(data.browser.version.split('.')[0]);
		return result;
	}
	function WhatIsThis(){
		var data = getData();
		var temp = ''; 
		var results = {'os':{'name':'unknown','version':'unknown'},'browser':{'name':'unknown','version':'unknown'}};

		//OS
		for(var a = 0; a < data[0][1].length; a++){
			if((temp = data[0][1][a].match('Linux ')) != null){results.os = takeThis(temp[0],data[0][1][a]);break;}
			else if((temp = data[0][1][a].match('Windows ')) != null){results.os = takeThis(temp[0],data[0][1][a]);break;}
			else if((temp = data[0][1][a].match('Android ')) != null){results.os = takeThis(temp[0],data[0][1][a]);break;}
		}

		//Browser	
		for(var a = 0; a < data.length; a++){
			if(data[a].length == 1){
				if((temp = data[a][0].match('Chrome/')) != null){results.browser = takeThis(temp[0],data[a][0]);break;}
				else if((temp = data[a][0].match('Firefox/')) != null){results.browser = takeThis(temp[0],data[a][0]);break;}
				else if((temp = data[a][0].match('Safari/')) != null){results.browser = takeThis(temp[0],data[a][0]);break;}
			}
		}
		return results;
		
		function takeThis(name,data){ return {'name':name.slice(0,name.length-1),'version':data.slice(name.length,data.length)}; }
		function getData(){var data = navigator.userAgent;
			var outputArray = []; var tempArray = []; var temp = '';
			for(var a = 0; a < data.length; a++){
				if(data[a] == ' '){
					if(data[a+1] == '('){
						while(data[a] != ')'){a++; temp = temp + data[a];}
					}
					else{outputArray.push(temp.split('('));temp = '';}
				}
				else{temp = temp + data[a];}
			}
 			outputArray.push(temp.split('('));temp = '';

 			for(var a = 0; a < outputArray.length; a++){
				if(outputArray[a].length == 2){
					for(var b = 0; b < outputArray[a][1].length; b++){
						if(outputArray[a][1][b] == ';' || outputArray[a][1][b] == ')'){tempArray.push(temp);temp = '';b++;}
						else{temp = temp + outputArray[a][1][b];}
					}
					outputArray[a][1] = tempArray; tempArray = [];
				}
			}
			return outputArray;
		}
	}
}

AdjustDomain();
