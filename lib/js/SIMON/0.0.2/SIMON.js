var SIMON_16 = new function(){
    this.test = function(){
        console.log('hello');

        var key = ['1918','1110','0908','0100']
        var message = ['6565', '6877'];
        // Ciphertext: c69b e9bb

        var expandedKey = this.generateKey([this.HEXtoBIN(key[0]), this.HEXtoBIN(key[1]), this.HEXtoBIN(key[2]), this.HEXtoBIN(key[3])]);
  
        console.log(message[0] +'|'+ message[1]);
        var crypt = this.encrypt([this.HEXtoBIN(message[0]), this.HEXtoBIN(message[1])],expandedKey);
        console.log(this.BINtoHEX(crypt[0]) +'|'+ this.BINtoHEX(crypt[1]));
        crypt = this.decrypt([this.HEXtoBIN(crypt[0]), this.HEXtoBIN(crypt[1])],expandedKey);
        console.log(this.BINtoHEX(crypt[0]) +'|'+ this.BINtoHEX(crypt[1]));

    }



    this.encrypt = function(BIN_data,BIN_expandedKey){
        for(var a = 0; a < 32; a++){
            var temp = BIN_data[0];
            BIN_data[0] = XOR(XOR(XOR(BIN_data[1],(AND(leftShift(BIN_data[0],1),leftShift(BIN_data[0],8)))),leftShift(BIN_data[0],2)),BIN_expandedKey[a]);
            BIN_data[1] = temp;
        }
        return BIN_data;
    }


    this.decrypt = function(BIN_data,BIN_expandedKey){
        for(var a = 31; a <= 0; a--){
            var temp = BIN_data[0];
            BIN_data[0] = XOR(XOR(XOR(BIN_data[1],(AND(leftShift(BIN_data[0],1),leftShift(BIN_data[0],8)))),BIN_data[0]),BIN_expandedKey[a]);
            BIN_data[1] = temp;
        }
        return BIN_data;
    }


    this.generateKey = function(BIN_Array){
        z = '11111010001001010110000111001101111101000100101011000011100110'.split('');
        for(var i = 4; i < 32; i++){
            var temp = rightShift(BIN_Array[i-1],3);
            temp = XOR(temp,BIN_Array[i-3]);
            temp = XOR(temp,rightShift(temp,1));

            var Z = []; for(var a = 0; a < 16; a++){Z[a] = z[(i-4)%62];}

            BIN_Array[i] = XOR(XOR(XOR(BIN_Array[i-4],temp),Z),['0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','1']);
       }

        return BIN_Array;
    }



    this.HEXtoBIN = function(HEX){
        var temp = (parseInt(HEX,16) >> 0).toString(2).split('');
        while(temp.length < 16){temp.unshift('0');}
        return temp;
    }
    this.BINtoHEX = function(BIN){
        return parseInt(BIN.join(''),2).toString(16);
    }




    function leftShift(input,x){ var newArray = [];
        for(var a = 0; a < input.length; a++){ newArray[a] = input[a]; }
        while(x > 0){ x--;
            var temp = newArray.shift();
            newArray.push(temp);
        }
        return newArray;
    }

    function rightShift(input,x){ var newArray = [];
        for(var a = 0; a < input.length; a++){ newArray[a] = input[a]; }
        while(x > 0){ x--;
            var temp = newArray.pop();
            newArray.unshift(temp);
        }
        return newArray;
    }





    function XOR(BIN1,BIN2){
        var ans = [];
        for(var a = 0; a < BIN1.length; a++){
            ans[a] = (BIN1[a]^BIN2[a]).toString();
        }
        return ans;
    }
    function AND(BIN1,BIN2){
        var ans = [];
        for(var a = 0; a < BIN1.length; a++){
            ans[a] = (BIN1[a]&BIN2[a]).toString();
        }
        return ans;
    }

}