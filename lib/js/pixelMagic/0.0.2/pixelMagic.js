var includes = {
	'JS':[
		[
			'http://metasophiea.com/lib/js/math/geometry/1.0.0/geometry.js'
		],
		['./object.js']
	]
};
//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'http://metasophiea.com/lib/js/getJS/2.0.1/getJS.js';
	temp.setAttribute('onLoad','getJS.get(includes.JS);');
	document.head.appendChild(temp);