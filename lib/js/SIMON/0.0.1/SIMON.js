var SIMON_16 = new function(){
    this.test = function(){
        console.log('hello');
        this.generateKey(['1918','1110','0908','0100']);
        var ans = this.encrypt(['6565','6877'],['19a8','1110','f908','0100']);

        console.log(parseInt(ans[0],2).toString(16) +'|'+parseInt(ans[0],2).toString(16));

    }
    this.generateKey = function(key){//console.log(key);
        for(var a = 0; a < key.length; a++){key[a] = HEXtoBIN(key[a]);} //console.log(key);

        var z =  ['11111010001001010110000111001101111101000100101011000011100110','10001110111110010011000010110101000111011111001001100001011010','10101111011100000011010010011000101000010001111110010110110011','11011011101011000110010111100000010010001010011100110100001111','11010001111001101011011000100000010111000011001010010011101111'];
        var T = 32; var wordSize = 16; var keywordNumber = 4; var j = 0;
        
        for(var i = keywordNumber; i < T; i++){/*console.log('-- -- -- -- --');*/
            var temp = rightShift(rightShift(rightShift(key[i-1]))); /*console.log(key[i-1] + ' -> ' + temp);*/
            /*console.log(temp +' XOR '+ key[i-3] + ' = '+ XOR(temp,key[i-3]));*/ temp = XOR(temp,key[i-3]);
            /*console.log(temp + ' -> ' + XOR(temp,rightShift(temp)));*/ temp = XOR(temp,rightShift(temp));
            key[i] = XOR(XOR(XOR(key[i-keywordNumber],temp),z[j][(i-keywordNumber)%62]),3); /*console.log(key[i]);*/
        }


        //console.log(key);
        //console.log(key.length);
        return key;
    }

    this.encrypt = function(text,key){
        for(var a = 0; a < text.length; a++){text[a] = HEXtoBIN(text[a]);}
        key = this.generateKey(key); console.log(key);
        var T = 32;

        for(var i = 0; i < T; i++){
            console.log(text[0] +'|'+ text[1] + '|' + key[i]);
            var temp = text[0];
            text[0] = XOR(XOR(XOR(text[1],(leftShift(text[0])&leftShift_x(text[0],8))),leftShift_x(text[0],2)),key[i])
            text[1] = temp;
        }
        return text;
    }



    function DECtoBIN(dec){return (dec >>> 0).toString(2);}
    function HEXtoBIN(HEX){return (parseInt(HEX,16) >>> 0).toString(2);}
    function rightShift(bin){
        var x = bin.split('');
        while(x.length < 16){x.unshift('0');}
        x.unshift(x[x.length-1]); x.pop();
        x = x.join('');
        return x;
    //    return DECtoBIN(parseInt(x,2)>>1);
    }
    function leftShift(bin){
        var x = bin.split('');
        while(x.length < 16){x.unshift('0');}
        x.push(x[0]); x.shift();
        x = x.join('');
        return x;
    //    return DECtoBIN(parseInt(x,2) << 1);
    }    
    function leftShift_x(bin,x){
        for(var a = 0; a < x; a++){ bin = leftShift(bin); }
        return bin;
    }       

    function XOR(bin_a,bin_b){return DECtoBIN(parseInt(bin_a, 2)^parseInt(bin_b, 2));}

}