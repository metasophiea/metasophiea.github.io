var audioMachine = function(audioContext){
	var mainOutput = AudioContext.destination;
    var buffers = []; 
    var source;
    var performingTrack = 0, nextTrack = null;

    this.loadAudio = function(list){
        for(var a = 0; a < list.length; a++){
            var request = new XMLHttpRequest();
                request.open('GET', list[a], true);
                request.responseType = 'arraybuffer';
                request.number = a;
                request.address = list[a];
                request.onload = function() {
                    var number = this.number;
                    AudioContext.decodeAudioData(this.response, function(data) {
                        buffers[number] = data;
                    }, function(e){"Error with decoding audio data" + e.err});
                }
                request.send();
        }
    }

    this.switchToTrack = function(number){ nextTrack = parseInt(number); }
    this.go = function(){
        performingTrack = 0, nextTrack = 0;
        return play(playbackManager);
    }
    this.stop = function(){ nextTrack = null; }

    function playbackManager(){
        if(nextTrack == null){return;}
        performingTrack = nextTrack;
        play(playbackManager);
    }

    function play(callback=null){
        if(buffers[performingTrack] == null){return false;}
        source = AudioContext.createBufferSource();
        source.buffer = buffers[performingTrack];
        source.onended = callback;
        source.connect(mainOutput);
        source.start(0);
        return true;
    }

}