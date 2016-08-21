var controller_clock = function(){
	var dataOutputs = [];
	var interval_loop = null; var BPM = 120;
	var pattern = [1]; var pattern_step = 0;
	
	this.power = function(){
		if(interval_loop == null){tick();interval_loop = setInterval(function(){tick();},60000/BPM);}
		else{clearInterval(interval_loop);interval_loop = null;}
	}
	this.BPM = function(a=null){if(a==null){return BPM;} BPM = a; if(interval_loop != null){this.power();this.power();}}
	this.pattern = function(a=null){if(a==null){return pattern;}if(a.length < 1){return;}pattern = a;}
	this.connectDataTo = function(connection){dataOutputs.push(connection);}
	this.disconnectDataTo = function(connection){
		var index = dataOutputs.indexOf(connection);
		dataOutputs.splice(index,1);
	}
	this.listConnections = function(){for(var a = 0; a < dataOutputs.length; a++){console.log(dataOutputs[a]);}}
	
	function tick(){
		if(pattern[pattern_step] == 1){
			for(var a = 0; a < dataOutputs.length; a++){dataOutputs[a].step();}
		}
		pattern_step++; if(pattern_step >= pattern.length){pattern_step = 0;}
	}
}