var repositoryURL ='file:///Users/metasophiea/Software/metasophiea.github.io/lib/js/audiophile/0.0.3/';
var includes = {
	'CSS':[],
	'JS':[
		[
			'https://metasophiea.com/lib/js/math/curve/1.0.0/curve.js',
		],
		[			
			repositoryURL+'modules/basic_oscilloscope.js',

			repositoryURL+'modules/globalOutputPort.js',
			repositoryURL+'modules/oscillator.js',
			repositoryURL+'modules/gainModule.js',
			repositoryURL+'modules/moduleCasing.js',	
			repositoryURL+'modules/distortionModule.js',
			repositoryURL+'modules/reverbModule.js',
			repositoryURL+'modules/basic_8osc_synth.js',
			repositoryURL+'modules/basic_108osc_synth.js',			
			repositoryURL+'modules/performer.js',
			repositoryURL+'modules/matrixRoll.js',		
			
			
			repositoryURL+'modules/conversionTable.js'		
		],
		[repositoryURL+'boot.js']
	]
};

	var _globalAudioContext = new window.AudioContext();

//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'https://metasophiea.com/lib/js/liveEdit/getJS/2.0.1/getJS.js';
	temp.setAttribute('onLoad','getJS.get(includes.JS);');
	document.head.appendChild(temp);
