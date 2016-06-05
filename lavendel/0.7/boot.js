// Boot //
console.log("-> Booting");

DrawList.Background = new list();
DrawList.Main = new list();
DrawList.Temp = new list();
lavendel_interface_mouse_setup();

ConstantRenderInterval = setInterval(function(){ Render(); },1000/RefreshPerSecond);
DetectChangeInWindowSize();
DrawBackground();
Render();