var mainOutput = new globalOutputPort();
var synth = new baisc_8osc_synth();
var scope = new oscilloscope(document.getElementById('scope')); scope.startScope();








synth.connectTo(mainOutput);synth.connectTo(scope);

synth.wave('sawtooth');

synth.play(110,1000);
synth.play(220,2000);
synth.play(330,3000);
synth.play(440,4000);
synth.play(550,5000);
synth.play(660,6000);
synth.play(770,7000);
synth.play(880,8000);
