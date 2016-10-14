var SIMON_16_v0_0_5 = new function(){
	var Z = [
		'11111010001001010110000111001101111101000100101011000011100110'.split(''),
		'10001110111110010011000010110101000111011111001001100001011010'.split(''),
		'10101111011100000011010010011000101000010001111110010110110011'.split(''),
		'11011011101011000110010111100000010010001010011100110100001111'.split(''),
		'11010001111001101011011000100000010111000011001010010011101111'.split('')
		];




    this.test = function(){
		var testVectors = [
			{'key':['1918','1110','0908','0100'],'message':['6565', '6877'],'correctEncryptedMessage':['c69b','e9bb']},
			{'key':['121110','0a0908','020100'],'message':['612067','6e696c'],'correctEncryptedMessage':['dae5ac','292cac']},
			{'key':['1a1918','121110','0a0908','020100'],'message':['726963','20646e'],'correctEncryptedMessage':['6e06a5','acf156']},
			{'key':['13121110','0b0a0908','03020100'],'message':['6f722067','6e696c63'],'correctEncryptedMessage':['5ca2e27f','111a8fc8']},
			{'key':['1b1a1918','13121110','0b0a0908','03020100'],'message':['656b696c','20646e75'],'correctEncryptedMessage':['44c8fc20','b9dfa07a']},
			{'key':['0d0c0b0a0908','050403020100'],'message':['2072616c6c69','702065687420'],'correctEncryptedMessage':['602807a462b4','69063d8ff082']},
			{'key':['151413121110','0d0c0b0a0908','050403020100'],'message':['746168742074','73756420666f'],'correctEncryptedMessage':['ecad1c6c451e','3f59c5db1ae9']},
			{'key':['0f0e0d0c0b0a0908','0706050403020100'],'message':['6373656420737265','6c6c657661727420'],'correctEncryptedMessage':['49681b1e1e54fe3f','65aa832af84e0bbc']},
			{'key':['1716151413121110','0f0e0d0c0b0a0908','0706050403020100'],'message':['206572656874206e','6568772065626972'],'correctEncryptedMessage':['c4ac61effcdc0d4f','6c9c8d6e2597b85b']},
			{'key':['1f1e1d1c1b1a1918','1716151413121110','0f0e0d0c0b0a0908','0706050403020100'],'message':['74206e69206d6f6f','6d69732061207369'],'correctEncryptedMessage':['8d2b5579afc8a3a0','3bf72a87efe7b868']}
		];

		var temp;
		for(var a = 0; a < testVectors.length; a++){
			console.log('Key: ' + testVectors[a].key.join(' '));
			console.log('Message: ' + testVectors[a].message.join(' '));
			temp = this.encrypt(testVectors[a].message,testVectors[a].key)
			console.log('Computed Encryption: ' + temp.join(' '));
			console.log('Correct Encrypted Message: ' + testVectors[a].correctEncryptedMessage.join(' '));
			if(0 == (temp[0].localeCompare(testVectors[a].correctEncryptedMessage[0]) & temp[1].localeCompare(testVectors[a].correctEncryptedMessage[1]))){console.log('Encryption succeeded');}else{console.error('Encryption failed');}
			console.log('');
		}
 }


	this.encrypt = function(message,key){
		var bin_message = []; for(var a = 0; a < message.length; a++){bin_message.push(HEXtoBIN(message[a]));}
		var expandedKey = generateKey(key);

		var m = key.length;
		var n = expandedKey[0].length;
		var T = 0; var j = 0;

		if(n == 16){T = 32;}
		else if(n == 24){T = 36;}
		else if(n == 32 && m == 3){T = 42;}
		else if(n == 32 && m == 4){T = 44;}
		else if(n == 48 && m == 2){T = 52;}
		else if(n == 48 && m == 3){T = 54;}
		else if(n == 64 && m == 2){T = 68;}
		else if(n == 64 && m == 3){T = 69;}
		else if(n == 64 && m == 4){T = 72;} T = expandedKey.length;

		var temp = [];
		for(var a = 0; a < T; a++){
			temp = bin_message[0];
			bin_message[0] = XOR(XOR(XOR(bin_message[1],(AND(leftShift(bin_message[0],1),leftShift(bin_message[0],8)))),leftShift(bin_message[0],2)),expandedKey[a]);
			bin_message[1] = temp;
		}

		for(var a = 0; a < bin_message.length; a++){ bin_message[a] = BINtoHEX(bin_message[a]); } return bin_message;
	}

	this.decrypt = function(message,key){
		var bin_message = []; for(var a = 0; a < message.length; a++){bin_message.push(HEXtoBIN(message[a]));}
		var expandedKey = generateKey(key);

		var m = key.length;
		var n = expandedKey[0].length;
		var T = 0; var j = 0;

		if(n == 16){T = 32;}
		else if(n == 24){T = 36;}
		else if(n == 32 && m == 3){T = 42;}
		else if(n == 32 && m == 4){T = 44;}
		else if(n == 48 && m == 2){T = 52;}
		else if(n == 48 && m == 3){T = 54;}
		else if(n == 64 && m == 2){T = 68;}
		else if(n == 64 && m == 3){T = 69;}
		else if(n == 64 && m == 4){T = 72;} T = expandedKey.length;

		var temp = [];
		for(var a = T-1; a >= 0; a--){
			temp = bin_message[1];
			bin_message[1] = XOR(XOR(XOR(bin_message[0],(AND(leftShift(bin_message[1],1),leftShift(bin_message[1],8)))),leftShift(bin_message[1],2)),expandedKey[a]);
			bin_message[0] = temp;
		}

		for(var a = 0; a < bin_message.length; a++){ bin_message[a] = BINtoHEX(bin_message[a]); } return bin_message;
	}






	function generateKey(key){ var expandedKey = [];
		for(var a = 0; a < key.length; a++){expandedKey.push(HEXtoBIN(key[a]));}expandedKey = expandedKey.reverse();

		var m = key.length;
		var n = expandedKey[0].length;
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

		return expandedKey;
	}

	function HEXtoBIN(input){
		var cap_length = input.split('').length*4; var result = [];
		var HEXarray = input.split('');


		var temp = [];
		for(var a = 0; a < HEXarray.length; a++){
			temp = (parseInt(HEXarray[a],16) >> 0).toString(2).split('');
			while(temp.length < 4){temp.unshift("0");}
			for(var b = 0; b < 4; b++){result.push(temp[b]);}
		}

		return result;
	}
	function BINtoHEX(input){ var temp = []; var result = '';
		for(var a = 0; a < input.length; a++){ temp.push(input[a]);
			if(temp.length == 4){ result += parseInt(temp.join(''),2).toString(16); temp = []; }
		}
		return result;
	}

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
