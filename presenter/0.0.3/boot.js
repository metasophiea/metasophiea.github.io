// Boot //
console.log("-> Booting");

DrawList.Background = new drawlist();
DrawList.Main = new drawlist();
DrawList.Temp = new drawlist();
Mouse_Selected = new numberlist();

ConstantRenderInterval = setInterval(function(){ Render(); },1000/RefreshPerSecond);
ActiveAutoControlInterval = setInterval(function(){ AutoControl(); },1000/ActiveViewportMovementRefreshPerSecond);
AdjustCanvasToFill();
DrawBackground();
SetupMouseInterface();
Render();

CreatePathTo( {'position':[0,0], 'zoom':-5, 'angle':0.2},{'type':'none','duration':2} );