var osc = new oscillator();
var mainOutput = new globalOutputPort();
var scope = new oscilloscope(document.getElementById('scope'));
var distortion = new distortion();
var reverb = new reverb();

//osc.connect(distortion);
//distortion.connect(reverb);
	osc.connect(scope);
	osc.connect(mainOutput);

reverb.connect(scope);
reverb.connect(mainOutput);

osc.freq(440);
osc.customWaveType([0,1,0],[0,0,0]);
distortion.setAmount(1000);
scope.startScope();


setTimeout(function(){osc.gain(100);},100);	
setTimeout(function(){osc.gain(0);},200);