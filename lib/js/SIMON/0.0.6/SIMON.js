console.log('SIMON Encrypter Version 0.0.6');
var SIMON_16_v0_0_6 = new function(){
	var Z = [
		'11111010001001010110000111001101111101000100101011000011100110'.split(''),
		'10001110111110010011000010110101000111011111001001100001011010'.split(''),
		'10101111011100000011010010011000101000010001111110010110110011'.split(''),
		'11011011101011000110010111100000010010001010011100110100001111'.split(''),
		'11010001111001101011011000100000010111000011001010010011101111'.split('')
		];




    this.test = function(){

	}


	this.encrypt = function(message,key){
		var bin_message = []; for(var a = 0; a < message.length; a++){bin_message.push(HEXtoBIN(message[a]));}
		var expandedKey = generateKey(key);

		var m = key.length; var n = expandedKey[0].length;
		var T = expandedKey.length;

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

		var m = key.length; var n = expandedKey[0].length;
		var T = expandedKey.length;

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
