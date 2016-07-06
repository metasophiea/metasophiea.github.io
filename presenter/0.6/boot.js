console.log('booting..');

drawList.background = new drawlist();
drawList.foreground = new drawlist();
mouseInterface_Selected = new numberlist();
mouseInterface_Hover = -1;

adjustViewportElementToFill();
constantRenderInterval = setInterval(function(){ render(); },1000/refreshesPerSecond);
setupMouseInterface();


drawList.foreground.add( new regularShape_rectangle({ "initialData":{"position":[0,-500],"anchor":[0,0],"width":10,"height":1000,"angle":0}, "styleData":{"R":0,"G":0,"B":0} }) );	
drawList.foreground.add( new regularShape_rectangle({ "initialData":{"position":[200,200],"anchor":[0,0],"width":200,"height":200,"angle":0.1}, "styleData":{"R":100,"G":200,"B":100} }) );	

drawList.foreground.add( new superShape_rectangle({ "initialData":{"position":[500,200],"anchor":[0,0],"width":200,"height":200,"angle":1}, "styleData":{"R":100,"G":200,"B":100} }) );	

