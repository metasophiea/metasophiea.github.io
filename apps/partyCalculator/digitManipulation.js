var digitDisplay = new function(){};

digitDisplay.reset = function(){
    digitDisplay.setDigit(0,0);

    for(var a = 1; a < pixelDigit.count; a++){
        digitDisplay.setDigit(a,'');
    }
    digitDisplay.setSymbol();
}

digitDisplay.setNumber = function(number){
    if(number < 0){ digitDisplay.setSymbol('-'); number = Math.abs(number);}else{ digitDisplay.setSymbol(); }
    number = Math.floor(number).toString();
    while(number.length < pixelDigit.count){ number = ' ' + number; }
    for(var a = 0; a < pixelDigit.count; a++){ digitDisplay.setDigit(a,number[ pixelDigit.count-a-1 ],number[ pixelDigit.count-a-1 ]); }
}

digitDisplay.setSymbol = function(symbol=null,colorStyle=0){
    if(colorStyle == ' '){colorStyle = 0;}
    var stamp = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    switch(symbol){
        case '-':
            stamp = [
                [2,2,2,2],
                [2,2,2,2],
                [1,1,1,1],
                [2,2,2,2],
                [2,2,2,2]
            ];
        break;
        case 'l': 
            stamp = [
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,1,1,1]
            ];
        break;
        default:
            stamp = [
                [2,2,2,2],
                [2,2,2,2],
                [0,0,0,0],
                [2,2,2,2],
                [2,2,2,2]
            ];
        break;
    }

    for(var b = 0; b < pixelDigit.height; b++){
        for(var c = 0; c < pixelDigit.width; c++){
            if( stamp[b][c] == 1 ){ document.getElementById('LCD_digitPixel_symbol_'+(c+(b*pixelDigit.width))).setAttribute('class','LCD_digit_lit_'+colorStyle); }
            else if( stamp[b][c] == 2 ){document.getElementById('LCD_digitPixel_symbol_'+(c+(b*pixelDigit.width))).setAttribute('class','LCD_digit_off'); }
            else{ document.getElementById('LCD_digitPixel_symbol_'+(c+(b*pixelDigit.width))).setAttribute('class','LCD_digit_dark_'+colorStyle); }
        }
    }
}

digitDisplay.setDigit = function(digit,value,colorStyle=0){
    if(colorStyle == ' '){colorStyle = 0;}
    var stamp = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    switch(value){
        case 0: case '0':
            stamp = [
                [1,1,1,1],
                [1,0,0,1],
                [1,0,0,1],
                [1,0,0,1],
                [1,1,1,1]
            ];
        break;
        case 1: case '1':
            stamp = [
                [0,1,1,0],
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0],
                [0,1,1,1]
            ];
        break;
        case 2: case '2':
            stamp = [
                [1,1,1,1],
                [0,0,0,1],
                [0,1,1,1],
                [1,0,0,0],
                [1,1,1,1]
            ];
        break;
        case 3: case '3':
            stamp = [
                [1,1,1,1],
                [0,0,0,1],
                [0,1,1,1],
                [0,0,0,1],
                [1,1,1,1]
            ];
        break;
        case 4: case '4':
            stamp = [
                [1,0,0,1],
                [1,0,0,1],
                [0,1,1,1],
                [0,0,0,1],
                [0,0,0,1]
            ];
        break;
        case 5: case '5':
            stamp = [
                [1,1,1,1],
                [1,0,0,0],
                [1,1,1,1],
                [0,0,0,1],
                [1,1,1,0]
            ];
        break;
        case 6: case '6':
            stamp = [
                [1,1,1,1],
                [1,0,0,0],
                [1,1,1,1],
                [1,0,0,1],
                [1,1,1,0]
            ];
        break;
        case 7: case '7':
            stamp = [
                [1,1,1,1],
                [0,0,0,1],
                [0,0,0,1],
                [0,0,1,0],
                [0,1,0,0]
            ];
        break;
        case 8: case '8':
            stamp = [
                [1,1,1,1],
                [1,0,0,1],
                [0,1,1,0],
                [1,0,0,1],
                [1,1,1,0]
            ];
        break;
        case 9: case '9':
            stamp = [
                [1,1,1,1],
                [1,0,0,1],
                [0,1,1,1],
                [0,0,0,1],
                [0,0,0,1]
            ];
        break;

        case 'l': 
            stamp = [
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,1,1,1]
            ];
        break;
        case 'o': 
            stamp = [
                [1,1,1,1],
                [1,0,0,1],
                [1,0,0,1],
                [1,0,0,1],
                [1,1,1,1]
            ];
        break;
        case 'a': 
            stamp = [
                [1,1,1,1],
                [1,0,0,1],
                [1,1,1,1],
                [1,0,0,1],
                [1,0,0,1]
            ];
        break;
        case 'd': 
            stamp = [
                [1,1,1,0],
                [1,0,0,1],
                [1,0,0,1],
                [1,0,0,1],
                [1,1,1,0]
            ];
        break;
        case 'i': 
            stamp = [
                [1,1,1,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [1,1,1,0]
            ];
        break;
        case 'n': 
            stamp = [
                [1,0,0,1],
                [1,1,0,1],
                [1,0,1,1],
                [1,0,0,1],
                [1,0,0,1]
            ];
        break;
        case 'g': 
            stamp = [
                [1,1,1,1],
                [1,0,0,1],
                [1,1,1,1],
                [0,0,0,1],
                [1,1,1,0]
            ];
        break;

        case '-':
            stamp = [
                [0,0,0,0],
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]
            ];
        break;
        case '.':
            stamp = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,1,0]
            ];
        break;

        default:
            stamp = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ];
        break;
    }

    for(var b = 0; b < pixelDigit.height; b++){
        for(var c = 0; c < pixelDigit.width; c++){
            if( stamp[b][c] == 1 ){ document.getElementById('LCD_digitPixel_'+digit+'_'+(c+(b*pixelDigit.width))).setAttribute('class','LCD_digit_lit_'+colorStyle); }
            else{ document.getElementById('LCD_digitPixel_'+digit+'_'+(c+(b*pixelDigit.width))).setAttribute('class','LCD_digit_dark_'+colorStyle); }
        }
    }

}