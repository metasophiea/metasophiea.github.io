var memory = function(registers,bitLength){
    if(registers < 0 || bitLength < 0){console.error('- memory: defined regester count or bit length below zero'); return;} 
    var data = []; 
    var bitLength = bitLength; var registers = registers;

    //constructor
        for(var a = 0; a < registers; a++){ data.push(0); }

    //commands
        this.getData = function(register){
            if(register >= registers || register < 0){console.error('- memory.putData: selected register out of bounds'); return;} 
            return data[register];
        }
        this.putData = function(dataIn,register){
            if(register >= registers || register < 0){console.error('- memory.putData: selected register out of bounds'); return;}
            if(dataIn >= Math.pow(2,8) || dataIn < 0){console.error('- memory.putData: provided data out of bounds'); return;}
            data[register] = dataIn;
        }
}