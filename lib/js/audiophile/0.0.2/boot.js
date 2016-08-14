var mainOutput = new globalOutputPort();
var osc = new oscillator();
var distBox = new distortion();
var reverbBox = new reverb();
var filterBox = new filter();

var scope = new oscilloscope(document.getElementById('scope'));


osc.setFreq(500);
osc.customWaveType([0,1,0],[0,0,0]);

distBox.setDistortionAmount(1000);
distBox.wetDry(0);
reverbBox.wetDry(0);
filterBox.wetDry(1);

scope.startScope();


osc.connectTo(distBox);
distBox.connectTo(reverbBox);
reverbBox.connectTo(filterBox);
filterBox.connectTo(scope);
filterBox.connectTo(mainOutput);









	function gather(data){
		reverbBox.setReverbType(data[0]);
	}
	reverbBox.getAllReverbTypes(gather);
	
	

setInterval(function(){
	setTimeout(function(){osc.setGain(100);},100);	
	setTimeout(function(){osc.setGain(0);},200);
},1000);








scope.stopScope();
scope.drawFrequencyResponse(filterBox.getFrequencyResponse(100,2000,10));