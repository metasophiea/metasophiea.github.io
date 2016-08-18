var dist = new distortionModule();
var rev = new reverbModule();
var gain = new gainModule();

var synth = new baisc_8osc_synth();



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











synth.connectTo(gain);
gain.connectTo(mainOutput);gain.connectTo(scope);
synth.play(440,1000);
synth.play(880,2000);
synth.play(220,3000);

/*
setInterval(function(){
	setTimeout(function(){osc.gain(1);},100);	
	setTimeout(function(){osc.gain(0);},200);
},1000);
*/
