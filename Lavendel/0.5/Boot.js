// Boot //
console.log("-> Booting");

ConstantRenderInterval = setInterval(function(){ Render(); },1000/RefreshPerSecond);
//ActiveAutoControlInterval = setInterval(function(){ AutoMovement(); }, 1000/ActiveViewportMovementRefreshPerSecond );
DetectChangeInWindowSize();
DrawBackground();
Render();

//CreateWindowWithID('MainMenu','Main',400,50);