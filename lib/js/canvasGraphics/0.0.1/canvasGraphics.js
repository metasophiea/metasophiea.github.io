var includes = {
	'JS':[
		[
            './0.0.1/main.js'
        ],
		['']
	]
};
//get getJS.js script, and then load the files with it
	var temp = document.createElement('script');
	temp.type = 'text/javascript'; 
	temp.src = 'http://metasophiea.com/lib/js/getJS/2.5.0/getJS.js';
	temp.setAttribute('onLoad','getJS.get(includes.JS);');
	document.head.appendChild(temp);