console.log('booting..');

drawList.background = new drawlist();
drawList.foreground = new drawlist();
drawList.temp = new drawlist();

mouseInterface_Selected = new numberlist();
mouseInterface_Hover = -1;

adjustViewportElementToFill();
constantRenderInterval = setInterval(function(){ render(); },1000/refreshesPerSecond);
activeAutoViewportControlInterval = setInterval(function(){ autoControl(); },1000/activeViewportMovementRefreshesPerSecond);
setupMouseInterface(); setupKeyboardInterface();









drawList.background.add( new regularShape_rectangle({ "initialData":{"position":[0,-500],"anchor":[0,0],"width":10,"height":1000,"angle":0}, "styleData":{"R":0,"G":0,"B":0} }) );	
drawList.background.add( new regularShape_rectangle({ "initialData":{"position":[-500,0],"anchor":[0,0],"width":1000,"height":10,"angle":0}, "styleData":{"R":0,"G":0,"B":0} }) );	

drawList.foreground.add( new superShape_adjustableRectangle({ "initialData":{"position":[0,0],"anchor":[0.5,0.5],"width":200,"height":200,"angle":0.5}, "styleData":{"R":200,"G":100,"B":100} }) );	
drawList.foreground.add( new superShape_adjustableImage({ "initialData":{"position":[0,-100],"anchor":[0.5,0.5],"width":200,"height":200,"angle":0.5} }) );	

automoveScript_push({'position':[0,0], 'zoom':5, 'angle':1},{'type':'cosin','duration':3});
automoveScript_push({'position':[-50,0], 'zoom':-2, 'angle':1});
automoveScript_push({'position':[0,0], 'zoom':0, 'angle':0},{'type':'cosin','duration':3});