var mainOutput = new globalOutputPort();
var synth = new baisc_8osc_synth();
var synth2 = new baisc_108osc_synth();

var rev = new reverbModule();
var scope = new oscilloscope(document.getElementById('scope')); scope.startScope();




synth2.connectTo(rev);
rev.connectTo(mainOutput);rev.connectTo(scope);


rev.AB(0);
synth2.wave('triangle');



synth2.play(50,1000);
setTimeout(function(){synth2.play(40,1000);},1000);


/*
synth.connectTo(rev);
rev.connectTo(mainOutput);rev.connectTo(scope);

rev.AB(0.5);
synth.wave('triangle');




var roll = new matrixRoll();
roll.matrix([['3E','3G','4C#'],['3G','3B','4D'],['3D','3F#','3A'],['3A','4C#','4E']]);
roll.connectNoteDataTo(synth);
roll.start();
*/


/*
setTimeout(function(){
	synth.play(noteTodata('3E'),2000);
	synth.play(noteTodata('3G'),2000);
	synth.play(noteTodata('4C#'),2000);
},0);	

setTimeout(function(){
	synth.play(noteTodata('3G'),2000);
	synth.play(noteTodata('3B'),2000);
	synth.play(noteTodata('4D'),2000);
},2000);	

setTimeout(function(){
	synth.play(noteTodata('3D'),2000);
	synth.play(noteTodata('3F#'),2000);
	synth.play(noteTodata('3A'),2000);
},4000);	


setTimeout(function(){
	synth.play(noteTodata('3A'),2000);
	synth.play(noteTodata('4C#'),2000);
	synth.play(noteTodata('4E'),2000);
},6000);
setInterval(function(){
	setTimeout(function(){
		synth.play(noteTodata('3E'),2000);
		synth.play(noteTodata('3G'),2000);
		synth.play(noteTodata('4C#'),2000);
	},0);	

	setTimeout(function(){
		synth.play(noteTodata('3G'),2000);
		synth.play(noteTodata('3B'),2000);
		synth.play(noteTodata('4D'),2000);
	},2000);	
	
	setTimeout(function(){
		synth.play(noteTodata('3D'),2000);
		synth.play(noteTodata('3F#'),2000);
		synth.play(noteTodata('3A'),2000);
	},4000);	
	
	
	setTimeout(function(){
		synth.play(noteTodata('3A'),2000);
		synth.play(noteTodata('4C#'),2000);
		synth.play(noteTodata('4E'),2000);
	},6000);
},8000);
*/