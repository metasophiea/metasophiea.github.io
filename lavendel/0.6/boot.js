// Boot //
console.log("-> Booting");

ConstantRenderInterval = setInterval(function(){ Render(); },1000/RefreshPerSecond);
DetectChangeInWindowSize();
DrawBackground();
Render();