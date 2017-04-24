var AudioContext = new window.AudioContext();
var digitCount = 9;
var calculatorValues = [0,0,0,0,0,0,0,0,0];
var calculatorValues_inputNumber = [0,0,0,0,0,0,0,0,0];

var audioMachines = [];
for(var a = 0; a < digitCount; a++){
    audioMachines[a] = new audioMachine(AudioContext);
    audioMachines[a].loadAudio(tracks[a]);
}

function Go(){
    var startX = 70; var startY = 11;
    var thickness = 1; var length = 3; var spacing = 1;

    for(var a = 0; a < 9; a++){
        document.getElementById('LCD_'+a+'_0').setAttribute('height',thickness);
        document.getElementById('LCD_'+a+'_0').setAttribute('width',length);
        document.getElementById('LCD_'+a+'_0').setAttribute('y',startY);
        document.getElementById('LCD_'+a+'_0').setAttribute('x',startX-(a*(length+thickness*2+spacing)));

        document.getElementById('LCD_'+a+'_1').setAttribute('height',length);
        document.getElementById('LCD_'+a+'_1').setAttribute('width',thickness);
        document.getElementById('LCD_'+a+'_1').setAttribute('y',startY+thickness);
        document.getElementById('LCD_'+a+'_1').setAttribute('x',startX-thickness-(a*(length+thickness*2+spacing)));

        document.getElementById('LCD_'+a+'_2').setAttribute('height',length);
        document.getElementById('LCD_'+a+'_2').setAttribute('width',thickness);
        document.getElementById('LCD_'+a+'_2').setAttribute('y',startY+thickness);
        document.getElementById('LCD_'+a+'_2').setAttribute('x',startX+length-(a*(length+thickness*2+spacing)));

        document.getElementById('LCD_'+a+'_3').setAttribute('height',thickness);
        document.getElementById('LCD_'+a+'_3').setAttribute('width',length);
        document.getElementById('LCD_'+a+'_3').setAttribute('y',startY+length+thickness);
        document.getElementById('LCD_'+a+'_3').setAttribute('x',startX-(a*(length+thickness*2+spacing)));

        document.getElementById('LCD_'+a+'_4').setAttribute('height',length);
        document.getElementById('LCD_'+a+'_4').setAttribute('width',thickness);
        document.getElementById('LCD_'+a+'_4').setAttribute('y',startY+length+thickness*2);
        document.getElementById('LCD_'+a+'_4').setAttribute('x',startX-thickness-(a*(length+thickness*2+spacing)));

        document.getElementById('LCD_'+a+'_5').setAttribute('height',length);
        document.getElementById('LCD_'+a+'_5').setAttribute('width',thickness);
        document.getElementById('LCD_'+a+'_5').setAttribute('y',startY+length+thickness*2);
        document.getElementById('LCD_'+a+'_5').setAttribute('x',startX+length-(a*(length+thickness*2+spacing)));

        document.getElementById('LCD_'+a+'_6').setAttribute('height',thickness);
        document.getElementById('LCD_'+a+'_6').setAttribute('width',length);
        document.getElementById('LCD_'+a+'_6').setAttribute('y',startY+length*2+thickness*2);
        document.getElementById('LCD_'+a+'_6').setAttribute('x',startX-(a*(length+thickness*2+spacing)));
    }

    setTimeout(function(){ 
        for(var a = 0; a < 9; a++){ 
            audioMachines[a].go();
        }
        update();
    }, 1000);
}

var calculationAction = null; var equalsPressedLast = true;
function buttonPress(buttonAction){
    switch(buttonAction){
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': 
            if(equalsPressedLast){ calculatorValues = shiftIn(buttonAction,calculatorValues); }
            else{ calculatorValues_inputNumber = shiftIn(buttonAction,calculatorValues_inputNumber); }
        break;

        case '+': case '-':  case '*': case '/': 
            equalsPressedLast = false;
            calculationAction = buttonAction;
        break;

        case 'Cl': 
            calculationAction = null;
            calculatorValues = [0,0,0,0,0,0,0,0,0];
            calculatorValues_inputNumber = [0,0,0,0,0,0,0,0,0];
        break;
        case '=': 
            //perform calculation, and convert into an array
            var ans = 0;
            switch(calculationAction){
                case '+': ans = parseInt(calculatorValues.reverse().join('')) + parseInt(calculatorValues_inputNumber.reverse().join('')); break;
                case '-': ans = parseInt(calculatorValues.reverse().join('')) - parseInt(calculatorValues_inputNumber.reverse().join('')); break;
                case '*': ans = parseInt(calculatorValues.reverse().join('')) * parseInt(calculatorValues_inputNumber.reverse().join('')); break;
                case '/': ans = parseInt(calculatorValues.reverse().join('')) / parseInt(calculatorValues_inputNumber.reverse().join('')); break;
            }
            ans = Math.floor(ans);
            ans = ans.toString();
            while(ans.length < 9){ ans = "0" + ans; }
            ans = ans.split('').reverse();

            //update/clear arrays
            for(var a = 0; a < ans.length; a++){ calculatorValues[a] = ans[a]; }
            calculatorValues_inputNumber.reverse();
            equalsPressedLast = true;
        break;
    }
    update();
}

function shiftIn(value, values){
    for(var a = values.length-1; a > 0; a--){
        values[a] = values[a-1];
    }
    values[0] = value;
    return values;
}

function update(){
    //update LCD and audioMachines
    for(var a = 0; a < 9; a++){ 
        if(equalsPressedLast){setLCD(a,calculatorValues[a]);}
        else{setLCD(a,calculatorValues_inputNumber[a]);}
        audioMachines[a].switchToTrack(calculatorValues[a]);
    }
}

function setLCD(digit,value){
    var segmentArray = [1,1,1,0,1,1,1];
    switch(value){
        case 0: case '0': segmentArray = [1,1,1,0,1,1,1]; break;
        case 1: case '1': segmentArray = [0,0,1,0,0,1,0]; break;
        case 2: case '2': segmentArray = [1,0,1,1,1,0,1]; break;
        case 3: case '3': segmentArray = [1,0,1,1,0,1,1]; break;
        case 4: case '4': segmentArray = [0,1,1,1,0,1,0]; break;
        case 5: case '5': segmentArray = [1,1,0,1,0,1,1]; break;
        case 6: case '6': segmentArray = [1,1,0,1,1,1,1]; break;
        case 7: case '7': segmentArray = [1,0,1,0,0,1,0]; break;
        case 8: case '8': segmentArray = [1,1,1,1,1,1,1]; break;
        case 9: case '9': segmentArray = [1,1,1,1,0,1,0]; break;
    }

    for(var a = 0; a < 7; a++){
        if(segmentArray[a] == 1){ document.getElementById('LCD_'+digit+'_'+a).setAttribute('class','LCD_'+digit+'_lit'); }
        else{ document.getElementById('LCD_'+digit+'_'+a).setAttribute('class','LCD_'+digit+'_dark'); }
    }

}