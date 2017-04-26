var value = 0; var secondValue = 0;
var action = null; var equalsPressedLast = true;

function calculatorInput(data){
    switch(data){
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': 
            if(equalsPressedLast){ value = value*10 + parseInt(data); }
            else{ secondValue = secondValue*10 + parseInt(data); }
        break; 
        case '+': case '-':  case '*': case '/': 
            equalsPressedLast = false;
            action = data;
            secondValue = 0;
            
        break;
        case 'Backspace':
            if(equalsPressedLast){ value = Math.floor(value/10); }
            else{ secondValue = Math.floor(secondValue/10); }
        break;
        case 'C': 
            action = null;
            value = 0;
            secondValue = 0;
            equalsPressedLast = true;
        break;
        case '=': case 'Enter':
            equalsPressedLast = true;
            switch(action){
                case '+': value = value + secondValue; break;
                case '-': value = value - secondValue; break;
                case '*': value = value * secondValue; break;
                case '/': value = value / secondValue; break;
            }
        break;
    }

    if(equalsPressedLast){ digitDisplay.setNumber(value); }
    else{ digitDisplay.setNumber(secondValue); }
    updateMusic();
}