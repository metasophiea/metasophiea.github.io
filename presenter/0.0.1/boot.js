// Boot //
console.log("-> Booting");

DrawList.Background = new drawlist();
DrawList.Main = new drawlist();
DrawList.Temp = new drawlist();
Mouse_Selected = new numberlist();

ConstantRenderInterval = setInterval(function(){ Render(); },1000/RefreshPerSecond);
AdjustCanvasToFill();
DrawBackground();
SetupMouseInterface();