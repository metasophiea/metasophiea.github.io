function updateMusic(){
    var digits = Math.floor(Math.abs(value)).toString();
    while(digits.length < pixelDigit.count){ digits = '0' + digits; }
    digits = digits.split('').reverse().join('');

    for(var a = 0; a < pixelDigit.count; a++){
        audioMachine.switchToTrack(a,digits[a]);
    }
}