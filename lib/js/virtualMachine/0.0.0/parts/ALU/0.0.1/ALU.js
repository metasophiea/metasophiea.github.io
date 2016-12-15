var ALU = function(bitLength){
    if(bitLength < 0){console.error('- ALU: defined bit length below zero'); return;} 
    var bitLength = bitLength;
    
    //commands
        this.run = function(A,B,Command){
            var result = 0;
            switch(command){
                case 'add': result = A + B; break;
                case 'sub': result = A - B; break  
                default: console.error('- ALU.run: unknown command'); break;  
            }
            return result;
        }
}