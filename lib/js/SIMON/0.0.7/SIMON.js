console.log('SIMON Encrypter Version 0.0.7');
var SIMON_16_v0_0_7 = new function(){
	var Z = [
		'11111010001001010110000111001101111101000100101011000011100110'.split(''),
		'10001110111110010011000010110101000111011111001001100001011010'.split(''),
		'10101111011100000011010010011000101000010001111110010110110011'.split(''),
		'11011011101011000110010111100000010010001010011100110100001111'.split(''),
		'11010001111001101011011000100000010111000011001010010011101111'.split('')
		];

	this.test = function(){
		/*
			Methods
			32/64 - 4
			48/72 - 3
			48/96 - 4
			64/96 - 3
			64/128 - 4
			96/96 - 2
			96/144 - 3
			128/128 - 2
			128/192 - 3
			128/256 - 4
		*/
		var method = '128/256';
		var message = ''; for(var a = 0; a < 256; a++){message += String.fromCharCode(a);}
        var key = '1f1e1d1c1b1a191817161514131211100f0e0d0c0b0a09080706050403020100';

		console.log('Test Message: ' + message);
		var encryptedMessage = this.encrypt(method,message,key); console.log('Encrypted Message: ' + encryptedMessage);
		var decryptedMessage = this.decrypt(method,encryptedMessage,key); console.log('Decrypted Message: ' + decryptedMessage);
	}




	this.encrypt = function(method,message,key){
		//check if input is good
			//Check for empties
			if(method.length == 0 || message.length == 0 || key.length == 0){console.error('Bad data entered'); return '';}
			//checking for vaild method
			switch(method){
				case '32/64': case '48/72': case '48/96': case '64/96': case '64/128': case '96/96': case '96/144': case '128/128': case '128/192': case '128/256': break;
				default: console.error('Unknown method: ' + method); return '';
			}
			//checking if key can be used with this method
			var method = method.split('/'); var temp = [];
			if(key.length*4 != method[1]){ console.error("Method option doesn't match key provided"); console.error('Encryption failed'); return ''; }
			key = splitStringIntoChunks(key,2*(method[1]/method[0]));

		//all good, convert message into binary and of appropriate chunks
			message = dataToBIN(message);
			message = splitStringIntoChunks(message,method[0]/2,'0',true);
		//expand key for encryption
			key = generateKey(key); 

		//two by two; encrypt
			var encryptedMessage = []; var temp = [];
			for(var a = 0; a < message.length; a+=2){
				temp = single_encrypt(key,[message[a],message[a+1]]);
				encryptedMessage.push(temp[0]); encryptedMessage.push(temp[1]);
			}

		//convert back to HEX data and ship out
			return BINtoHEX(encryptedMessage.join(''));
	}

	this.decrypt = function(method,message,key){
		//check if input is good
			//Check for empties
			if(method.length == 0 || message.length == 0 || key.length == 0){console.error('Bad data entered'); return '';}
			//checking for vaild method
			switch(method){
				case '32/64': case '48/72': case '48/96': case '64/96': case '64/128': case '96/96': case '96/144': case '128/128': case '128/192': case '128/256': break;
				default: console.error('Unknown method: ' + method); return;
			}
			//checking if key can be used with this method
			var method = method.split('/'); var temp = [];
			if(key.length*4 != method[1]){ console.error("Method option doesn't match key provided"); console.error('Encryption failed'); return; }
			key = splitStringIntoChunks(key,2*(method[1]/method[0]));

		//all good, convert HEX message into binary and of appropriate chunks
			message = HEXtoBIN(message);
			message = splitStringIntoChunks(message,method[0]/2,'0',true);
		//expand key for encryption
			key = generateKey(key);

		//two by two; decrypt
			var decryptedMessage = []; var temp = [];
			for(var a = 0; a < message.length; a+=2){
				temp = single_decrypt(key,[message[a],message[a+1]]);
				decryptedMessage.push(temp[0]); decryptedMessage.push(temp[1]);
			}

		//convert back to regular data and ship out
			return BINtoData(decryptedMessage.join(''));	
	}

	//Key Expander
	function generateKey(key){ var expandedKey = [];
		for(var a = 0; a < key.length; a++){expandedKey.push(HEXtoBIN(key[a]).split(''));}expandedKey = expandedKey.reverse();

		var m = key.length; var n = expandedKey[0].length;
		var T = 0; var j = 0;

		if(n == 16){T = 32; j = 0;}
		else if(n == 24 && m == 3){T = 36; j = 0;}
		else if(n == 24 && m == 4){T = 36; j = 1;}
		else if(n == 32 && m == 3){T = 42; j = 2;}
		else if(n == 32 && m == 4){T = 44; j = 3;}
		else if(n == 48 && m == 2){T = 52; j = 2;}
		else if(n == 48 && m == 3){T = 54; j = 3;}
		else if(n == 64 && m == 2){T = 68; j = 2;}
		else if(n == 64 && m == 3){T = 69; j = 3;}
		else if(n == 64 && m == 4){T = 72; j = 4;}

		var temp = [];
		for(var a = m; a < T; a++){
			temp = rightShift(expandedKey[a-1],3);
			if(m == 4){ temp = XOR(temp,expandedKey[a-3]); }
			temp = XOR(temp,rightShift(temp,1));
			temp = XOR(expandedKey[a-m],temp);
			temp = XOR(temp,[Z[j][(a-m)%62]]);
   			expandedKey[a] = XOR(temp,['0','0'],'1');
		}

		for(var a = 0; a < expandedKey.length; a++){ expandedKey[a] = expandedKey[a].join(''); } 
		return expandedKey;
	}

	//Encrypting/Decrypting single messgae with expanded key provided
	function single_encrypt(key,data){ var expandedKey = []; var expandedData = [];
		for(var a = 0; a < key.length; a++){ expandedKey.push(key[a].split('')); }
		for(var a = 0; a < data.length; a++){ expandedData.push(data[a].split('')); }
		var T = expandedKey.length;

		var temp = [];
		for(var a = 0; a < T; a++){
			temp = expandedData[0];
			expandedData[0] = XOR(XOR(XOR(expandedData[1],(AND(leftShift(expandedData[0],1),leftShift(expandedData[0],8)))),leftShift(expandedData[0],2)),expandedKey[a]);
			expandedData[1] = temp;
		}

		return [expandedData[0].join(''),expandedData[1].join('')];
	}

	function single_decrypt(key,data){ var expandedKey = []; var expandedData = [];
		for(var a = 0; a < key.length; a++){ expandedKey.push(key[a].split('')); }
		for(var a = 0; a < data.length; a++){ expandedData.push(data[a].split('')); }
		var T = expandedKey.length;

		var temp = [];
		for(var a = T-1; a >= 0; a--){
			temp = expandedData[1];
			expandedData[1] = XOR(XOR(XOR(expandedData[0],(AND(leftShift(expandedData[1],1),leftShift(expandedData[1],8)))),leftShift(expandedData[1],2)),expandedKey[a]);
			expandedData[0] = temp;
		}

		return [expandedData[0].join(''),expandedData[1].join('')];
	}

	//String Manipulator
	function splitStringIntoChunks(inputString,chunkSize,tail='',even=false){inputString = inputString.split('');
		var temp = ''; var result = [];
		for(var a = 0; a < inputString.length; a++){
			temp += inputString[a];
			if(temp.length == chunkSize){ result.push(temp); temp = ''; }
		}result.push(temp);

		//pop off last chunk if it's empty
		if(result[result.length-1].length == 0){result.pop();}

		//flesh out last chuck (if requested and necessary)
		if(tail.length == 1 && result[result.length-1].length < chunkSize){
			while(result[result.length-1].length < chunkSize){result[result.length-1] += tail;}
		}

		//flesh out array with extra  (if requested and necessary)
		if(even && result.length%2 == 1){ temp = '';
			for(var a = 0; a < chunkSize; a++){ temp += tail; }
			result.push(temp);
		}

		return result;
	}

	//String-ASCII <-> String-Binary converters
    function dataToBIN(data){data = data.split('');
		var temp = ''; var result = [];
		for(var a = 0; a < data.length; a++){ 
			temp = parseInt(data[a].charCodeAt(0),10).toString(2); 
			if(temp.length > 8){console.error('converted type too big: ' + data[a] + ' -> ' + temp + ' wiping character.'); temp = '0000';}
			while(temp.length < 8){temp = '0' + temp;} //console.log(data[a] +' | '+ temp);
			result.push(temp); temp = ''; 
		}
		return result.join('');
	}
    function BINtoData(BIN){BIN = BIN.split('');
		var temp = ''; var result = [];
		for(var a = 0; a < BIN.length; a++){ temp += BIN[a];
			if(temp.length == 8){ result.push(String.fromCharCode(parseInt(temp,2).toString(10))); temp = ''; }
		}

		return result.join('');
	}

	//String-Hex array <-> String-Binary array converters
	function HEXtoBIN(input){
		var cap_length = input.split('').length*4; var result = [];
		var HEXarray = input.split('');

		var temp = [];
		for(var a = 0; a < HEXarray.length; a++){
			temp = (parseInt(HEXarray[a],16) >> 0).toString(2).split('');
			while(temp.length < 4){temp.unshift("0");}
			for(var b = 0; b < 4; b++){result.push(temp[b]);}
		}

		return result.join('');
	}
	function BINtoHEX(input){ var temp = []; var result = '';
		for(var a = 0; a < input.length; a++){ temp.push(input[a]);
			if(temp.length == 4){ result += parseInt(temp.join(''),2).toString(16); temp = []; }
		}
		return result;
	}

	//Logical Functions on String-Binary array values 
	function leftShift(input,x=1){ var output = [];
	        for(var a = x; a < input.length; a++){output.push(input[a]);}
	        for(var a = 0; a < x; a++){output.push(input[a]);}
	        return output;
    }
    function rightShift(input,x=1){ return leftShift(input,(input.length-x));}
	function XOR(BIN1,BIN2,fill='0'){
		var A = BIN1.slice(); var B = BIN2.slice(); if(BIN1.length < BIN2.length){B = BIN1.slice(); A = BIN2.slice();}
		var result = [];
		A = A.reverse(); B = B.reverse();

		for(var C = B.length; C < A.length; C++){ B.push(fill); }
		for(var C = 0; C < A.length; C++){ result.push(A[C]^B[C]); }

		return result.reverse();
	}

    function AND(BIN1,BIN2){
		var A = BIN1.slice(); var B = BIN2.slice(); if(BIN1.length < BIN2.length){B = BIN1.slice(); A = BIN2.slice();}
		var result = [];
		A = A.reverse(); B = B.reverse();

		for(var C = B.length; C < A.length; C++){ B.push('0'); }
		for(var C = 0; C < A.length; C++){ result.push(A[C]&B[C]); }

		return result.reverse();
	}
}