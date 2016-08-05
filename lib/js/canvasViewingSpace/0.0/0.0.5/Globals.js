	var ContainerElement;
	var ContainerElement_Dimensions = [0,0];

//Canvas'es
	var ViewportElement; var Viewport;
	var SelectionMatrixElement; var SelectionMatrix;

//Viewport Control
	var View = { "Position":[0,0], "Angle":0, "Zoom":{"Index":0,"Value":1} };
	var ZoomHash = {	"-16":0.1, "-15":0.11, "-14":0.13, "-13":0.15, "-12":0.17, "-11":0.2, "-10":0.22, "-9":0.26, 
				"-8":0.3, "-7":0.33, "-6":0.38, "-5":0.43, "-4":0.5, "-3":0.65, "-2":0.75, "-1":0.875, 
				"0":1, 
				"1":1.25, "2":1.25, "3":1.4, "4":1.5, "5":1.68, "6":1.8, "7":2.1, "8":2.5, 
				"9":2.8, "10":3.1, "11":3.5, "12":4, "13":4.2, "14":4.5, "15":5.7, "16":6.5 };
//Render
	var RefreshPerSecond = 30; var ConstantRenderInterval;
	var DrawList = {"Background":[],"Main":[],"Temp":[],"BackgroundIndex":[],"MainIndex":[],"TempIndex":[]};
//Tool
	var ClickTimeoutTime = 500; var ClickTimeout_ID;
	var Tool = {"Click":"Pan", "DoubleClick":"MainUI", "Wheel":"Zoom"};
	var UI_Open = {"Main":false};

//Auto Movement
	var ActiveViewportMovementRefreshPerSecond = RefreshPerSecond; var ActiveAutoControlInterval;
	var ActiveViewportMovementScript = {"Position":[], "Angle":[], "Zoom":[] };		


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
console.log("-> ./Globals.js loaded");