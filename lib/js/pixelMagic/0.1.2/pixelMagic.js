var includes = {
	'JS':[
		[
			'https://metasophiea.com/lib/js/math/geometry/1.0.0/geometry.js'
		],
		['https://metasophiea.com/lib/js/pixelMagic/0.1.2/object.js']
	]
};
//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'https://metasophiea.com/lib/js/getJS/2.0.1/getJS.js';
	temp.setAttribute('onLoad','getJS.get(includes.JS);');
	document.head.appendChild(temp);
