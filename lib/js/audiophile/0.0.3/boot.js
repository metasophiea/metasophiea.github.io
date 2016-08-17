var dist = new distortionModule();
var rev = new reverbModule();
var gain = new gainModule();



var scope = new oscilloscope(document.getElementById('scope')); scope.startScope();
var mainOutput = new globalOutputPort();
var osc = new oscillator();
osc.freq(500);
osc.waveShape({'sin':[0,1,0],'cos':[0,0,0]});

osc.connectTo(dist);
dist.connectTo(rev);
rev.connectTo(gain);
gain.connectTo(mainOutput);gain.connectTo(scope);
gain.gain(0.5);


dist.AB(1);
dist.amount(10000);
rev.AB(1);


setInterval(function(){
	setTimeout(function(){osc.gain(1);},100);	
	setTimeout(function(){osc.gain(0);},200);
},1000);

