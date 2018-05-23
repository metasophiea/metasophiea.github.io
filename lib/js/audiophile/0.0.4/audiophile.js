var repositoryURL ='https://metasophiea.com/lib/js/audiophile/0.0.4/';
var includes = {
	'CSS':[],
	'JS':[
		[
			'https://metasophiea.com/lib/js/math/curve/1.0.0/curve.js',
			repositoryURL+'axioms.js'	
		],
		[				
			repositoryURL+'modules/moduleCasing.js',
			repositoryURL+'modules/gain.js',
			repositoryURL+'modules/reverb.js',	
			repositoryURL+'modules/distortion.js',	
			repositoryURL+'modules/filter.js',								
			
			repositoryURL+'synths/oscillator.js',
			repositoryURL+'synths/basic.js',	
		
			repositoryURL+'tools/oscilloscope.js',
			repositoryURL+'tools/frequencyResponseAnalyser.js',			
			
			repositoryURL+'controllers/clock.js',			
			repositoryURL+'controllers/8x8_matrix.js'
		],
		[repositoryURL+'boot.js']
	]
};

	var _globalAudioContext = new window.AudioContext();

//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'https://metasophiea.com/lib/js/getJS/2.0.1/getJS.js';
	temp.setAttribute('onLoad','getJS.get(includes.JS);');
	document.head.appendChild(temp);
