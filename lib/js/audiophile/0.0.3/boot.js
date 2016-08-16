var dist = new distortionModule();
var gain = new gainModule();



var scope = new oscilloscope(document.getElementById('scope')); scope.startScope();
var mainOutput = new globalOutputPort();
var osc = new oscillator();
osc.set('freq',500);
osc.set('waveData',{'sin':[0,1,0],'cos':[0,0,0]});

osc.connectTo(dist);
dist.connectTo(gain);
gain.connectTo(mainOutput);gain.connectTo(scope);
gain.setGain(0.5);


dist.AB(1);
dist.set('distortionAmount',10);

setInterval(function(){
	setTimeout(function(){osc.set('gain',1);},100);	
	setTimeout(function(){osc.set('gain',0);},200);
},1000);
