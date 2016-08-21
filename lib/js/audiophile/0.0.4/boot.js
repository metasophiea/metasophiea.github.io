var clock = new controller_clock();
var con = []; 
for(var a = 0; a < 2; a++){ 
	con.push(new controller_8x8_matrix());
}
var osc = new synth_basic();
var dis = new effect_distortion();
var rev = new effect_reverb();
var fil = new effect_filter();
var scope = new tool_frequencyResponseAnalyser(document.getElementById('scope')); scope.power();





for(var a = 0; a < 2; a++){
	clock.connectDataTo(con[a]);
	con[a].connectDataTo(osc);
}

osc.connectAudioTo(rev);
rev.connectAudioTo(dis);
dis.connectAudioTo(fil);
fil.connectAudioTo(_globalOutputPort);

scope.connectToFilter(fil);




con[0].octave(3);
con[0].duration(300);
con[0].matrix([
	[1,0,0,0,0,0,0,0],
	[0,0,0,0,1,0,0,0],
	[1,0,0,0,0,0,0,0],
	[0,0,0,0,0,1,0,0],
	[1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,0],
	[1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,1]]);

con[1].octave(5);
con[1].duration(300);
con[1].matrix([
	[1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,1,0,0,0],
	[0,0,0,0,0,0,0,0],
	[1,0,0,0,0,0,0,0],
	[0,0,1,0,0,0,0,0],
	[0,0,0,0,0,0,0,0]]);



clock.power();
clock.BPM(240);

osc.customWaveShape({'sin':[0,0,1,0,0,0,1,0],'cos':[0,1,1,1,0,0,0,0]});
rev.AB(0.75);

