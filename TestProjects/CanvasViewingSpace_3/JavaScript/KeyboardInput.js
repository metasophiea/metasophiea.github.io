//F4 - Get current Position, Zoom and Angle
function KeyPress(event){//console.log(event.keyCode + " | " + event.code);

	if(event.code == "F2" && event.shiftKey == true){//Stats
		console.log("-- -- -- \Stats -- -- --");
		console.log("XY         : " + View.Position);
		console.log("Center View: " + ViewportPointsAt(0.5, 0.5) + " Zoom: " + View.Zoom + " Angle: " + View.Angle );
		console.log("Viewing Dimensions: " + ViewportLength(window.innerWidth) + "x" + ViewportLength(window.innerHeight));
		console.log("Frame Rate: " + RefreshPerSecond );
		console.log(" - Background object count: " + BackgroundDrawList.length);
		console.log(" - Real object count: " + DrawList.length);
		console.log(" - Temp object count: " + TempDrawList.length);
		console.log(" - Total object count: " + (BackgroundDrawList.length+DrawList.length+TempDrawList.length));

	}
	else if(event.code == "F2"){ console.log("Center View: " + ViewportPointsAt(0.5, 0.5) + " Zoom: " + View.Zoom + " Angle: " + View.Angle ); }

}
