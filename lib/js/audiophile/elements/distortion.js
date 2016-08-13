var distortion = function(){
	var node = _globalAudioContext.createWaveShaper();
	var amount = 0;
	
	node.curve = makeDistortionCurve(amount);
	node.oversample = '4x';
	
	function makeDistortionCurve(amount) {
		var k = typeof amount === 'number' ? amount : 50,
			n_samples = 44100,
			curve = new Float32Array(n_samples),
			deg = Math.PI / 180,
			i = 0,
			x;
		for ( ; i < n_samples; ++i ) {
			x = i * 2 / n_samples - 1;
			curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
		}
		return curve;
	};
	
	this.getNode = function(){return node;}
	this.setAmount = function(amount){
		amount = amount;
		node.curve = makeDistortionCurve(amount);
	}
	this.connect = function(connection){node.connect(connection.getNode());}
}