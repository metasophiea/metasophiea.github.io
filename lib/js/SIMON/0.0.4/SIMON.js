var SIMON_16_v0_0_4 = new function(){
    this.test = function(){
        var key = ['1918','1110','0908','0100'];
        var message = ['6565', '6877'];
        // Ciphertext: c69b e9bb

        console.log(message);
        var encryptedMessage = this.encrypt(message,key); console.log(encryptedMessage);
        var decryptedMessage = this.decrypt(encryptedMessage,key); console.log(decryptedMessage);
    }





    this.encrypt = function(message,key){
        var expandedKey = generateKey(key);
        for(var a = 0; a < message.length; a++){
            message[a] = (parseInt(message[a],16) >> 0).toString(2).split('');
            while(message[a].length < 16){message[a].unshift('0');}
        }

        var temp = [];
        for(var a = 0; a < expandedKey.length; a++){
            temp = message[0];
            message[0] = XOR(XOR(XOR(message[1],(AND(leftShift(message[0],1),leftShift(message[0],8)))),leftShift(message[0],2)),expandedKey[a]);
            message[1] = temp;
        }

        for(var a = 0; a < message.length; a++){ message[a] = parseInt(message[a].join(''),2).toString(16); } return message;
    }

    this.decrypt = function(message,key){
        var expandedKey = generateKey(key); 
        for(var a = 0; a < message.length; a++){
            message[a] = (parseInt(message[a],16) >> 0).toString(2).split('');
            while(message[a].length < 16){message[a].unshift('0');}
        }

        var temp = [];
        for(var a = expandedKey.length-1; a >= 0; a--){
            temp = message[1];
            message[1] = XOR(XOR(XOR(message[0],(AND(leftShift(message[1],1),leftShift(message[1],8)))),leftShift(message[1],2)),expandedKey[a]);
            message[0] = temp;
        }

        for(var a = 0; a < message.length; a++){ message[a] = parseInt(message[a].join(''),2).toString(16); } return message;   
    }


    function generateKey(key){ var expandedKey = [];
        for(var a = 0; a < key.length; a++){
            expandedKey[a] = (parseInt(key[a],16) >> 0).toString(2).split('');
            while(expandedKey[a].length < 16){expandedKey[a].unshift("0");}
        }expandedKey = expandedKey.reverse();

        var z = '11111010001001010110000111001101111101000100101011000011100110'.split(''); var temp = '';
        for(var a = key.length; a < 32; a++){
            temp = rightShift(expandedKey[a-1],3);
            if(key.length == 4){ temp = XOR(temp,expandedKey[a-3]); }
            temp = XOR(temp,rightShift(temp,1));
            temp = XOR(expandedKey[a-4],temp);
            temp = XOR(temp,['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0',z[(a-4)%62]]);
            expandedKey[a] = XOR(temp,['1','1','1','1','1','1','1','1','1','1','1','1','1','1','0','0']);
        }
        return expandedKey;
    }

    function leftShift(input,x){ var output = [];
        for(var a = x; a < input.length; a++){output.push(input[a]);}
        for(var a = 0; a < x; a++){output.push(input[a]);}
        return output;
    }
    function rightShift(input,x){ return leftShift(input,(input.length-x));}
    function XOR(BIN1,BIN2){ if(BIN1.length != BIN2.length){console.error('inputs incompatable lengths'); return [];}
        var ans = []; for(var a = 0; a < BIN1.length; a++){ ans[a] = (BIN1[a]^BIN2[a]).toString(); } return ans;   
    }
    function AND(BIN1,BIN2){ if(BIN1.length != BIN2.length){console.error('inputs incompatable lengths'); return [];}
        var ans = []; for(var a = 0; a < BIN1.length; a++){ ans[a] = (BIN1[a]&BIN2[a]).toString(); } return ans;  
    }
}