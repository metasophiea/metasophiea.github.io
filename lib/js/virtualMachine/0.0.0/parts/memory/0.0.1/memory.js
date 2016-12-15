var memory = function(registers,bitLength){
    if(registers < 0 || bitLength < 0){console.error('- memory: defined regester count or bit length below zero'); return;} 
    var data = []; var temp = '';
    var bitLength = bitLength; var registers = registers;

    //constructor
        for(var a = 0; a < registers; a++){ temp = '';
            for(var b = 0; b < bitLength; b++){ temp = temp + '0'; }
            data.push(temp);
        }

    //commands
        this.getData = function(register){
            if(register > registers || register < 0){console.error('- memory.putData: selected register out of bounds'); return;} 
            return bitToDecimal(data[register]);
        }
        this.putData = function(dataIn,register){
            if(register > registers || register < 0){console.error('- memory.putData: selected register out of bounds'); return;}
            if(dataIn >= Math.pow(2,8) || dataIn < 0){console.error('- memory.putData: provided data out of bounds'); return;}
            data[register] = decimalToBit(dataIn);
        }

    //internal functions
        function bitToDecimal(string){
            var result = 0; var multiplier = 1;
            for(var a = string.length-1; a >= 0; a--){ result += string[a]*multiplier; multiplier = multiplier*2; }
            return result;
        }
        function decimalToBit(number){
            var multiplier = Math.pow(2,7); var result = ''; var loopCounter = 0;
            while(number > 0){ if(number-multiplier >= 0){number = number-multiplier; result+='1';} else{result+='0';} multiplier = multiplier/2; loopCounter++; }
            while(loopCounter < bitLength){ result+='0'; loopCounter++; }
            return result;
        }
}