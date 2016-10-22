var includes = {
	'JS':[
		[
			'http://metasophiea.com/lib/js/browserWork/ded_bowser.js'
		],
		['./lib/js/browserWork/mainSiteRedirector/0.0.1/object.js']
	]
};
//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'http://metasophiea.com/lib/js/getJS/2.5.0/getJS.js';
	temp.setAttribute('onLoad','getJS.get(includes.JS);');
	document.head.appendChild(temp);
