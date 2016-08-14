var mainOutput = new globalOutputPort();
var osc = new oscillator();
var distBox = new distortion();
var reverbBox = new reverb();

var scope = new oscilloscope(document.getElementById('scope'));


osc.setFreq(500);
osc.customWaveType([0,1,0],[0,0,0]);

distBox.setDistortionAmount(1000);
distBox.wetDry(1);
reverbBox.wetDry(1);

scope.startScope();


osc.connectTo(distBox);
distBox.connectTo(reverbBox);
reverbBox.connectTo(scope);
reverbBox.connectTo(mainOutput);











setInterval(function(){
	setTimeout(function(){osc.setGain(100);},100);	
	setTimeout(function(){osc.setGain(0);},200);
	reverbBox.getReverbType();
},1000);