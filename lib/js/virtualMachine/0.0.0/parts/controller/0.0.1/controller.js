var controller = function(registers,bitLength){
    if(bitLength < 0){console.error('- controller: defined bit length below zero'); return;} 
    //components
        var ALU = function(bitLength){
            if(bitLength < 0){console.error('- ALU: defined bit length below zero'); return;} 
            var bitLength = bitLength;

            //flags
                this.zero = true;
                this.neg = false;
                this.overflow = false;
                this.carry = false;
            //commands
                this.run = function(command,A,B){
                    var result = 0;
                    switch(command){
                        case 0: result = A + B; break; //0 - add A and B
                        case 1: result = A - B; break; //1 - subtract A from B
                        case 2: result = A + 1; break; //2 - add 1 to A 
                        case 3: result = A - 1; break; //3 - subtract 1 to A                  
                        default: console.error('- ALU.run: unknown command'); break;  
                    }

                    this.zero = false;
                    this.neg = false;
                    this.overflow = false;
                    this.carry = false;

                    if(result == 0){this.zero = true;}
                    else if(result < 0){ result = Math.pow(2,8)+result; this.neg = true;}
                    else if(result >= Math.pow(2,8)){ 
                        result = result - Math.pow(2,8); this.overflow = true;
                        switch(command){case 0: case 2: this.carry = true; break;}
                    }      

                    return result;
                }
        }

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
                this.dumpMemory = function(){return data;}
        }

    //construction
        var component_memory = new memory(registers,bitLength);
        var component_ALU = new ALU(bitLength);

    //commands
        this.dumpMemory = function(){ return component_memory.dumpMemory(); }
        this.run = function(command,A,B,C){
            if(A < 0 || B < 0 || C < 0){console.error('- controller.run: selected register below zero'); return;}

            switch(command){
                case 0: case 1: case 2: case 3:
                    component_memory.putData(component_ALU.run(command,component_memory.getData(A),component_memory.getData(B)),C);
                break;
            }            
        }
}