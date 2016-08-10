function present(){console.log('starting presentation');
	removeMouseInterface();
	setupKeyboardInterface();
	removeAllWindows();
	addToKey(32,"automoveScript_forwardStep();");
	addToKey(113,"stopPresentation();");
	addToKey(114,"automoveScript_reverseStep();");
	automoveScript_step = 0; automoveScript_gotoFirst();
}
function stopPresentation(){console.log('quiting presentation');
	setupMouseInterface();
	setupKeyboardInterface();
	automoveScript_gotoFirstInstantly();
}
