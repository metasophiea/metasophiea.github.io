function render(){
	//clear for next render
		var temp = getViewportElementDimensions();
		viewport.clearRect(0, 0, temp[0], temp[1]);
		selectionMatrix.clearRect(0, 0, temp[0], temp[1]);

	//render
		temp = Object.keys(drawList);
		for(var a = 0; a < temp.length; a++){ drawList[temp[a]].render(); }
}