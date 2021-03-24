function Go(){
    digitDisplay.setSymbol('l',10);
    digitDisplay.setDigit(8,'o');
    digitDisplay.setDigit(7,'a');
    digitDisplay.setDigit(6,'d');
    digitDisplay.setDigit(5,'i');
    digitDisplay.setDigit(4,'n');
    digitDisplay.setDigit(3,'g');
    digitDisplay.setDigit(2,'.');
    digitDisplay.setDigit(1,'.');
    digitDisplay.setDigit(0,'.');

    for(var a = 0; a < pixelDigit.count; a++){ audioMachine.loadAudio(a,tracks[a]); }

    audioMachine.setOnTrackLoadedCallback( function(track){ 
        digitDisplay.setDigit((pixelDigit.count-track-1),'loading...'[track+1],track+1);
    });
    audioMachine.setOnCompleteLoadedCallback( function(){ digitDisplay.reset(); audioMachine.go(); allowInput = true; } );
    audioMachine.setLoopCallback(     
        function(complexity){
            setTimeout(function(){ document.getElementById('progressBar_pixel_0').setAttribute('class','progressBar_pixel progressBar_pixel_lit'); randomColoursBasedOnComplexity(complexity); }, (0) );  
            setTimeout(function(){ document.getElementById('progressBar_pixel_1').setAttribute('class','progressBar_pixel progressBar_pixel_lit'); randomColoursBasedOnComplexity(complexity); }, (1000) );  
            setTimeout(function(){ document.getElementById('progressBar_pixel_2').setAttribute('class','progressBar_pixel progressBar_pixel_lit'); randomColoursBasedOnComplexity(complexity); }, (2000) );  
            setTimeout(function(){ document.getElementById('progressBar_pixel_3').setAttribute('class','progressBar_pixel progressBar_pixel_lit'); randomColoursBasedOnComplexity(complexity); }, (3000) );  
            setTimeout(function(){ document.getElementById('progressBar_pixel_4').setAttribute('class','progressBar_pixel progressBar_pixel_lit'); randomColoursBasedOnComplexity(complexity); }, (4000) );  
            setTimeout(function(){ document.getElementById('progressBar_pixel_5').setAttribute('class','progressBar_pixel progressBar_pixel_lit'); randomColoursBasedOnComplexity(complexity); }, (5000) );  
            setTimeout(function(){ document.getElementById('progressBar_pixel_6').setAttribute('class','progressBar_pixel progressBar_pixel_lit'); randomColoursBasedOnComplexity(complexity); }, (6000) );  
            setTimeout(function(){ document.getElementById('progressBar_pixel_7').setAttribute('class','progressBar_pixel progressBar_pixel_lit'); randomColoursBasedOnComplexity(complexity); }, (7000) );  

            setTimeout(function(){ 
                document.getElementById('progressBar_pixel_0').setAttribute('class','progressBar_pixel progressBar_pixel_dark');
                document.getElementById('progressBar_pixel_1').setAttribute('class','progressBar_pixel progressBar_pixel_dark');
                document.getElementById('progressBar_pixel_2').setAttribute('class','progressBar_pixel progressBar_pixel_dark');
                document.getElementById('progressBar_pixel_3').setAttribute('class','progressBar_pixel progressBar_pixel_dark');
                document.getElementById('progressBar_pixel_4').setAttribute('class','progressBar_pixel progressBar_pixel_dark');
                document.getElementById('progressBar_pixel_5').setAttribute('class','progressBar_pixel progressBar_pixel_dark');
                document.getElementById('progressBar_pixel_6').setAttribute('class','progressBar_pixel progressBar_pixel_dark');
                document.getElementById('progressBar_pixel_7').setAttribute('class','progressBar_pixel progressBar_pixel_dark');
            }, (8000) );  

        } 
    );

    resize();
    checkAudioContextIsActive();
}

function resize(){
    if( (window.innerHeight/window.innerWidth ) < 1.3 ){
        document.getElementById("wrongWayOverlay").style.height = '100%';
    }
    else{document.getElementById("wrongWayOverlay").style.height = '0%';}
}

function checkAudioContextIsActive(){
    if(audioMachine.audioContext.state != "running"){
        document.getElementById("activateAudioContextOverlay").style.height = '100%';
    }
    else{document.getElementById("activateAudioContextOverlay").style.height = '0%';}
}