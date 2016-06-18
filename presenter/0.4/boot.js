console.log('Booting...');

drawList.background = new drawlist();
drawList.main = new drawlist();

adjustViewportElementToFill();

constantRenderInterval = setInterval(function(){ render(); },1000/refreshesPerSecond);
activeAutoViewportControlInterval = setInterval(function(){ autoControl(); },1000/activeViewportMovementRefreshesPerSecond);
drawBackground();
render();

createPathTo( {'position':[-0,0], 'zoom':0, 'angle':0},{'type':'cosin','duration':1} );