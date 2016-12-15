var machine = function(registers,bitLength){
    //components
        var controller = function(registers,bitLength){
            if(bitLength < 0){console.error('- controller: defined bit length below zero'); return;} 
            //components
                var ALU = function(bitLength){
                    if(bitLength < 0){console.error('- ALU: defined bit length below zero'); return;} 
                    var bitLength = bitLength;

                    //flags
                        this.zero = true;
                    //commands
                        this.run = function(command,A,B){
                            var result = 0;
                            switch(command){
                                case 0: result = A + 1; break; //2 - add 1 to A 
                                case 1: result = A - 1; break; //3 - subtract 1 to A                  
                                default: console.error('- ALU.run: unknown command'); break;  
                            }

                            this.zero = false;

                            if(result == 0){this.zero = true;}
                            else if(result < 0){ result = Math.pow(2,8)+result; }
                            else if(result >= Math.pow(2,8)){ result = result - Math.pow(2,8); this.overflow = true; }      

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
                this.getData = function(register){return component_memory.getData(register);}
                this.dumpMemory = function(){ return component_memory.dumpMemory(); }
                this.run = function(command,A,B,C){
                    if(A < 0 || B < 0 || C < 0){console.error('- controller.run: selected register below zero'); return;}
                    component_memory.putData(component_ALU.run(command,component_memory.getData(A),component_memory.getData(B)),C);     
                }
        }

        //construction
            var memorySize = registers; var bitLength = bitLength;
            var program = []; var programCounter = 0; var lastProgramCounterPosition = programCounter;
            var pointer = 0;
            var component_controller = new controller(memorySize,bitLength);

            this.compileProgram = function(input){
                var result = [];
                for(var a = 0; a < input.length; a++){
                    switch(input[a]){
                        case '>': result.push(0); break;
                        case '<': result.push(1); break;
                        case '+': result.push(2); break;
                        case '-': result.push(3); break;
                        case '[': result.push(4); break;
                        case ']': result.push(5); break;
                    }
                }

                return result.join('');
            }

            this.loadProgram = function(newProgram){program = newProgram.split(''); for(var a = 0; a < program.length; a++){program[a] = parseInt(program[a]);}}
            this.step = function(){
                switch(program[programCounter]){
                    case 0: pointer++; if(pointer >= memorySize){pointer = 0;} break;
                    case 1: pointer--; if(pointer < 0){pointer = memorySize-1;} break;
                    case 2: component_controller.run(0,pointer,0,pointer); break;
                    case 3: component_controller.run(1,pointer,0,pointer); break;
                    case 4: if(component_controller.getData(pointer) == 0){ programCounter = findMatchingClosingBraceFromHere(); } break;
                    case 5: if(component_controller.getData(pointer) != 0){ programCounter = findMatchingOpeningBraceFromHere(); } break;
                }
             
                lastProgramCounterPosition = programCounter; programCounter++; var loopingBack = false;
                if(programCounter >= program.length){programCounter = 0; loopingBack = true;}

                this.liveDataCallback({
                    'programCounter':programCounter,
                    'pointer':pointer,
                    'currentOpperationCompleted':program[lastProgramCounterPosition],
                    'loopback':loopingBack,
                    'dataHere':component_controller.getData(pointer)
                });
            }

            this.liveDataCallback = function(){};

            function findMatchingClosingBraceFromHere(){
                var stack = 0; var a = programCounter;
                while(a < program.length){a++;
                    if(program[a] == 4){stack++;}
                    else if(program[a] == 5 && stack == 0){break;}
                    else if(program[a] == 5){{stack--;}}
                }
                return a;
            }

            function findMatchingOpeningBraceFromHere(){
                var stack = 0; var a = programCounter;
                while(a > 0){a--;
                    if(program[a] == 5){stack++;}
                    else if(program[a] == 4 && stack == 0){break;}          
                    else if(program[a] == 4){{stack--;}}  
                }
                return a;
            }
}