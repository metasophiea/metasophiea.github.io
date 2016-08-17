var repositoryURL ='http://metasophiea.com/lib/js/audiophile/0.0.3/';
var includes = {
	'CSS':[],
	'JS':[
		[
			'http://metasophiea.com/lib/js/math/.curve/1.0.0/curve.js',
		],
		[			
			repositoryURL+'modules/basic_oscilloscope.js',

			repositoryURL+'modules/globalOutputPort.js',
			repositoryURL+'modules/oscillator.js',
			repositoryURL+'modules/gainModule.js',
			repositoryURL+'modules/moduleCasing.js',	
			repositoryURL+'modules/distortionModule.js',
			repositoryURL+'modules/reverbModule.js',
		],
		[repositoryURL+'boot.js']
	]
};

	var _globalAudioContext = new window.AudioContext();

//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'http://metasophiea.com/lib/js/liveEdit/getJS.js';
	temp.setAttribute('onLoad','getJS(includes.JS);');
	document.head.appendChild(temp);
