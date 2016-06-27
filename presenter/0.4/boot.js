console.log('Booting...');

drawList.background = new drawlist();
drawList.foreground = new drawlist();
mouseInterface_Selected = new numberlist();

adjustViewportElementToFill();

constantRenderInterval = setInterval(function(){ render(); },1000/refreshesPerSecond);
activeAutoViewportControlInterval = setInterval(function(){ autoControl(); },1000/activeViewportMovementRefreshesPerSecond);
setupMouseInterface();
drawBackground();
render();


createPathTo( {'position':[-0,0], 'zoom':0, 'angle':0},{'type':'none','duration':1} );
createPathTo( {'position':[-400,0], 'zoom':5, 'angle':1},{'type':'cosin','duration':3} );
createPathTo( {'position':[-400,-200], 'zoom':-6, 'angle':-2.5},{'type':'cosin','duration':2} );
createPathTo( {'position':[0,0], 'zoom':10, 'angle':1},{'type':'cosin','duration':6} );
