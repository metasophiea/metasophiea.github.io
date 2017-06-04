var siteRedirector = new function(){
    var browserData = {};
    var iframe_element; var URL_start;

    this.redirect = function(data,element){
        browserData = data;
        iframe_element = element; URL_start = 'http://metasophiea.com/mainSite/display/'+data.system+'/'+data.browser+'/';
        findBestVersion(URL_start,data.version,goTo);
    }

    this.getData = function(){
    		var fileData = {'system':'','browser':bowser.name.toLowerCase(),'version':bowser.version};
			fileData.browser = fileData.browser.replace(/\s+/g, '');
			fileData.version = fileData.version.split('.')[0];
			
			if(bowser.hasOwnProperty('likeAndroid')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('android')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('nexusMobile')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('nexusTablet')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('chromeos')){fileData.system = 'desktop';}
			else if(bowser.hasOwnProperty('silk')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('sailfish')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('tizen')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('webos')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('windowsphone')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('windows')){fileData.system = 'desktop';}
			else if(bowser.hasOwnProperty('mac')){fileData.system = 'desktop';}
			else if(bowser.hasOwnProperty('linux')){fileData.system = 'desktop';}
			else if(bowser.hasOwnProperty('edgeVersion')){fileData.system = 'desktop'; }
			else if(bowser.hasOwnProperty('versionIdentifier')){fileData.system = 'unknown';}
			else if(bowser.hasOwnProperty('tablet')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('mobile')){fileData.system = 'mobile';}
			else if(bowser.hasOwnProperty('xbox')){fileData.system = 'mobile';}	
			else{fileData.system = 'unknown';}

			return fileData;
    }

    function findBestVersion(URLstart,version,callback){
        var xhttp = new XMLHttpRequest();
            xhttp.URLstart = URLstart; xhttp.version = version; xhttp.callback = callback;       
        	xhttp.onloadend = function(){
           	    if(this.status == 404){ 
                       if(xhttp.version == 0){goTo(-1);}
                       else{findBestVersion(xhttp.URLstart,xhttp.version-1,xhttp.callback);}
                }
           	    else if(this.status == 200){callback(xhttp.version);}
            }
            xhttp.open('get',URLstart+version+'/index.html',true);
      	  	xhttp.send();
    }

    
    function goTo(version){ 
        if(version < 0){ iframe_element.src = 'http://metasophiea.com/mainSite/display/'+browserData.system+'/compatibility/index.html'; }
        else{iframe_element.src = URL_start + version + '/index.html';}
    }
}