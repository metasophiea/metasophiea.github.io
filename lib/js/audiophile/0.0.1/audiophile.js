var repositoryURL ='file:///Users/metasophiea/Software/metasophiea.github.io/lib/js/audiophile/0.0.1/';
var includes = {
	'CSS':[],
	'JS':[
		[
			repositoryURL+'elements/globalOutputPort.js',
					
			repositoryURL+'elements/oscillator.js',
			repositoryURL+'elements/oscilloscope.js',
				
			repositoryURL+'elements/distortion.js',
			repositoryURL+'elements/reverb.js'			
		],
		[repositoryURL+'boot.js']
	]
};

	var _globalAudioContext = new window.AudioContext();

//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'https://metasophiea.com/lib/js/liveEdit/getJS.js';
	temp.setAttribute('onLoad','getJS(includes.JS);');
	document.head.appendChild(temp);