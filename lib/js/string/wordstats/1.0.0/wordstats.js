function countWords(text){
	var array = text.split('\n'); var array_2 = []; var temp = [];
	for(var a = 0; a < array.length; a++){
		temp = array[a].split(' ');
		for(var b = 0; b < temp.length; b++){
			array_2.push(temp[b]);
		}
	}

	array = array_2; var result = 0;
	for(var a = 0; a < array.length; a++){
		if(array[a].length != 0){result++;}
	}

	return result;
}

function createWordFrequency(text,limit=-1){
//Takes text and returns a sorted array of the frequency that words appear, limiting the array to 'limit' items
//if 'limit' is omitted, function will return all items
	//Split string up into individual words, then clean off anything that isn't a alphabetical character
		var array = text.split('\n'); var array_2 = []; var temp = [];
		for(var a = 0; a < array.length; a++){
			temp = array[a].split(' ');
			for(var b = 0; b < temp.length; b++){
				array_2.push(temp[b]);
			}
		}array = cleanWords(array_2);

	//Create a JSON count-up of items that appear in the array
		var result = {};
		for(var a = 0; a < array.length; a++){
			if(result.hasOwnProperty(array[a].toLowerCase())){result[array[a].toLowerCase()]++;}
			else{result[array[a].toLowerCase()] = 1;}
		}
		if(limit == -1){limit = Object.keys(result).length;}return sortJSON(result,limit);

	function cleanWords(array){
		//removes anything that isn't a alphabetical character from each string in the array
			var array_2 = [];
			for(var a = 0; a < array.length; a++){ 
				array[a] = array[a].replace(/[^a-z]/gi,''); if(array[a] != ''){array_2.push(array[a]);}
			}
			return array_2;
	}
	function sortJSON(JSONinput,limit){
		//Takes JSON of items with a value, then sorts by that value
			if(Object.keys(JSONinput).length < limit){limit = Object.keys(JSONinput).length;} var array = [];
			for(var a = 0; a < limit; a++){
				var champ = JSON.parse('{"'+Object.keys(JSONinput)[0]+'":'+JSONinput[Object.keys(JSONinput)[0]]+'}'); var temp = {}; 
				for(var b = 1; b < Object.keys(JSONinput).length; b++){
					temp = JSON.parse('{"'+Object.keys(JSONinput)[b]+'":'+JSONinput[Object.keys(JSONinput)[b]]+'}');
					if(temp[Object.keys(temp)[0]] > champ[Object.keys(champ)[0]]){champ = temp;}
				}
				array.push(champ);
				delete JSONinput[Object.keys(champ)[0]];
			}
			return array;
	}
}