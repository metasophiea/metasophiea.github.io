var distortion = function(){
	var node_distortion = _globalAudioContext.createWaveShaper();
	var node_patchMixerBox = new patchMixerBox();	
	var distortionAmount = 0;	var oversample = '2x';
	
		node_distortion.curve = makeDistortionCurve(distortionAmount);
		node_distortion.oversample = oversample;
	
	node_patchMixerBox.directConnect_patchOut(node_distortion); node_distortion.connect(node_patchMixerBox.connect_patchIn());
	
	this.getNode = function(){return node_patchMixerBox.getNode();}
	this.connectTo = function(connection){node_patchMixerBox.connectTo(connection);}
	this.wetDry = function(a){node_patchMixerBox.wetdry(a);}
	
	this.getDistortionAmount = function(){return distortionAmount;}
	this.setDistortionAmount = function(a){distortionAmount = a; node_distortion.curve = makeDistortionCurve(distortionAmount);}
	this.getOversample = function(){return oversample;}
	this.setOversample = function(a){oversample = a; node_distortion.oversample = oversample;}
	






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
	}
}


