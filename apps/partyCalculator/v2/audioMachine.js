var audioMachine = new function(){
    var AudioContext = new window.AudioContext();
	var mainOutput = AudioContext.destination;

    //tracks and buffers
        var trackCount = 9; var bufferCount = 10;
        var buffers = new Array(); for(var a = 0; a < trackCount; a++){ buffers[a] = new Array(); }

    //performance tracking
        var sources = [];
        var performingTracks = [], nextTracks = [];

    //audio loading and registering
        this.loadAudio = function(track,list){
            for(var a = 0; a < list.length; a++){
                var request = new XMLHttpRequest();
                    request.open('GET', list[a], true);
                    request.responseType = 'arraybuffer';
                    request.number = a;
                    request.track = track;
                    request.address = list[a];
                    request.onload = function() {
                        var number = this.number;
                        var track = this.track;
                        AudioContext.decodeAudioData(this.response, function(data) {
                            buffers[track][number] = data;
                            audioMachine.registerLoadedTrack(track,number);
                        }, function(e){"Error with decoding audio data" + e.err});
                    }
                    request.send();
            }
        }

        var trackLog = []; var finishedLog = 0;
        for(var a = 0; a < trackCount; a++){ trackLog[a] = 0; }
        this.registerLoadedTrack = function(track,buffer){
            trackLog[track]++;
            for(var a = 0; a < trackCount; a++){
                if(trackLog[a] == bufferCount){
                    onTrackLoadedCallback(a);
                    trackLog[a] = 0; finishedLog++;
                }
            }
            
            if(finishedLog == trackCount){ onCompleteLoadedCallback(); }
        }

        var onTrackLoadedCallback = function(track){};
        this.setOnTrackLoadedCallback = function(callback=null){ onTrackLoadedCallback = callback; }

        var onCompleteLoadedCallback = function(){}
        this.setOnCompleteLoadedCallback = function(callback=null){ onCompleteLoadedCallback = callback; }

    //performance
        var onLoopCallback = function(){};
        this.setLoopCallback = function(callback=null){
            onLoopCallback = callback;
        }

        this.switchToTrack = function(track,number){ nextTracks[track] = parseInt(number); }
        this.go = function(){
            for(var a = 0; a < trackCount; a++){
                performingTracks[a] = 0;
                nextTracks[a] = 0;
            }
            play(playbackManager);
        }

        function playbackManager(){
            var complexity = 0;
            for(var a = 0; a < performingTracks.length; a++){ 
                performingTracks[a] = nextTracks[a];
                if(performingTracks[a] != 0){complexity++;}
            }

            onLoopCallback(complexity);
            play(playbackManager);
        }

        function play(callback=null){
            for(var a = 0; a < trackCount-1; a++){
                    sources[a] = AudioContext.createBufferSource();
                    sources[a].buffer = buffers[a][performingTracks[a]];
                    sources[a].connect(mainOutput);
                    sources[a].start(0);
            }

            sources[(trackCount-1)] = AudioContext.createBufferSource();
            sources[(trackCount-1)].buffer = buffers[(trackCount-1)][performingTracks[(trackCount-1)]];
            sources[(trackCount-1)].onended = callback;
            sources[(trackCount-1)].connect(mainOutput);
            sources[(trackCount-1)].start(0);
        }
}