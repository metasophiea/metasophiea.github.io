console.log('booting..');

drawList.background = new drawlist();
drawList.foreground = new drawlist();
mouseInterface_Selected = new numberlist();
mouseInterface_Hover = -1;

adjustViewportElementToFill();
constantRenderInterval = setInterval(function(){ render(); },1000/refreshesPerSecond);
setupMouseInterface();

//drawList.foreground.add( new rectangleObject({ "initialData":{"position":[100,100],"anchor":[0,0],"width":200,"height":200,"angle":0.1}, "styleData":{"R":100,"G":200,"B":100} }) );	
//drawList.foreground.add( new rectangleObject({ "initialData":{"position":[200,100],"anchor":[0,0],"width":200,"height":200,"angle":0.1}, "styleData":{"R":100,"G":200,"B":100} }) );	
//drawList.foreground.add( new rectangleObject({ "initialData":{"position":[200,200],"anchor":[0,0],"width":200,"height":200,"angle":0.1}, "styleData":{"R":100,"G":200,"B":100} }) );	


drawList.foreground.add( new super_rectangleObject({ "initialData":{"position":[200,200],"anchor":[0.5,0.5],"width":200,"height":300,"angle":0.1}, "styleData":{"R":100,"G":200,"B":200} }) );	
drawList.foreground.add( new adjustable_rectangleObject({ "initialData":{"position":[600,200],"anchor":[0.5,0.5],"width":200,"height":300,"angle":0.1}, "styleData":{"R":100,"G":200,"B":200} }) );	





		