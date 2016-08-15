var dist = new distortionModule();



var scope = new oscilloscope(document.getElementById('scope')); scope.startScope();
var mainOutput = new globalOutputPort();
var osc = new oscillator();
osc.setFreq(500);
osc.customWaveType([0,1,0],[0,0,0]);

osc.connectTo(dist);
dist.connectTo(mainOutput);dist.connectTo(scope);



dist.AB(0);


setInterval(function(){
	setTimeout(function(){osc.setGain(10);},100);	
	setTimeout(function(){osc.setGain(0);},200);
},1000);
