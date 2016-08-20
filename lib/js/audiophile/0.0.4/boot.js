var con = new controller_8x8_matrix();
var osc = new synth_basic();
var scope = new oscilloscope(document.getElementById('scope')); scope.power();
con.connectDataTo(osc);
osc.connectTo(_globalOutputPort); osc.connectTo(scope);



con.octave(3);
con.BPM(240);
con.duration(1);
con.matrix([
	[1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,1,0,0,0],
	[0,0,0,0,0,0,0,0],
	[1,0,0,0,0,0,0,0],
	[0,0,1,0,0,0,0,0],
	[0,0,0,0,0,0,0,0]]);

con.autoLoop();

