function CreateShape(type,initialPoint){
	switch(type){
		case "poly":
			RemoveMouseInterface();
			freshObject = DrawList.Background.add( new poly({ "initialData":{"points":[initialPoint,initialPoint,initialPoint,initialPoint]},"styleData":{"R":Math.floor(255*Math.random()),"G":Math.floor(255*Math.random()),"B":Math.floor(255*Math.random())} }));

			ViewportElement.setAttributeNS(null,"onmousemove","Create_Poly(event);");
			ViewportElement.setAttributeNS(null,"onmouseout","SetupMouseInterface();");
			ViewportElement.setAttributeNS(null,"onmouseup","SetupMouseInterface(); setTimeout(function(){Mouse_Selected.setID("+freshObject+");},1);");
		break;
	}
}

function Create_Poly(event){
	var moveingpoint = ViewportPointsAt(event.layerX/window.innerWidth,event.layerY/window.innerHeight);
	var originalPoint = DrawList.Background.getObj(freshObject).getPoints()[0];

	var workingobject = DrawList.Background.getObj(freshObject);
	workingobject.setPoint(1,[moveingpoint[0],originalPoint[1]]);
	workingobject.setPoint(2,[moveingpoint[0],moveingpoint[1]]);
	workingobject.setPoint(3,[originalPoint[0],moveingpoint[1]]);
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./canvas/elementmanagement/create.js loaded"); BootCount++;