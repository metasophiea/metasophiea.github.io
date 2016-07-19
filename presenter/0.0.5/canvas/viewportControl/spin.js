function spinAroundPoint(amount,point){
	var OldPoints = getViewportPoint(point);
	view.angle = amount;
	var NewPoints = getViewportPoint(point);

	OldPoints = [getPolarFrom(OldPoints)[0],getPolarFrom(OldPoints)[1]+view.angle];
	NewPoints = [getPolarFrom(NewPoints)[0],getPolarFrom(NewPoints)[1]+view.angle];

	OldPoints = getCartesian(OldPoints);
	NewPoints = getCartesian(NewPoints);

	view.position[0] = view.position[0] + (NewPoints[0]-OldPoints[0]);
	view.position[1] = view.position[1] + (NewPoints[1]-OldPoints[1]);	
}