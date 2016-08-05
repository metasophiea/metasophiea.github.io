// Tools Menu //
	//Regarding current working stuff
	var CurserTypes = ['move', 'pencil']; var CurserType = 'move';
	var StyleData = {'R':200, 'G':40, 'B':150, 'A':1, 'Thickness':10, 'Line_R':100, 'Line_G':100, 'Line_B':100, 'Line_A':1, 'Roundness':0.5};
	var InitialData = {};
	var Snap = false;
	var ActionList = [];

	var ToolMenu_Open = false; var ToolMenu_Width = 100; var ToolMenu_Height = 200;

//// Tool Menu //////////////////////////////////////////////////////////
	function DoubleClick(event, data){
		if(!ToolMenu_Open){ ToolMenu_Open = true;
			ChangeCSSCode("Main", "#ToolMenu", "left", event.clientX, "px");
			ChangeCSSCode("Main", "#ToolMenu", "top", event.clientY, "px");
			ChangeCSSCode("Main", "#ToolMenu", "width", ToolMenu_Width, "px");
			ChangeCSSCode("Main", "#ToolMenu", "height", ToolMenu_Height, "px");
			RenderMenu();
			}
		else{ ToolMenu_Open = false;
			ToolMenu_CloseAll();
			ChangeCSSCode("Main", "#ToolMenu", "width", 0, "px");
			ChangeCSSCode("Main", "#ToolMenu", "height", 0, "px");
		}
	}

	var SubMenuHash = {'Tools':false, 'New':false};
	function ToolMenu_OptionPressed(data){
		var Keys = Object.keys(SubMenuHash);
		for( var a = 0; a < Keys.length; a++ ){
			if( Keys[a] == data.getAttribute('id') ){
				if( SubMenuHash[ data.getAttribute('id') ] ){ SubMenuHash[ data.getAttribute('id') ] = false;}
				else{ SubMenuHash[ data.getAttribute('id') ] = true;}
			}else{ SubMenuHash[Keys[a]] = false; }
		}
		RenderMenu();
	}

	function ToolMenu_CloseAll(){
		var Keys = Object.keys(SubMenuHash);
		for( var a = 0; a < Keys.length; a++ ){
			if( SubMenuHash[Keys[a]] ){
				SubMenuHash[Keys[a]] = false;
			}
		}
	}

	function RenderMenu(){
		console.log(SubMenuHash);
		ToolMenu_Width = 100; ToolMenu_Height = 200;

		var Keys = Object.keys(SubMenuHash);
		for( var a = 0; a < Keys.length; a++ ){
			if( SubMenuHash[Keys[a]] ){
				document.getElementById( Keys[a] + "_Submenu" ).style.visibility = "visible";
				ToolMenu_Width = ToolMenu_Width + 105;
			}else{
				document.getElementById( Keys[a] + "_Submenu" ).style.visibility = "hidden";
			}
		}
		ToolMenu_Update();
	}

	function ToolMenu_Update(){
		ChangeCSSCode("Main", "#ToolMenu", "width", ToolMenu_Width, "px");
		ChangeCSSCode("Main", "#ToolMenu", "height", ToolMenu_Height, "px");
	}
