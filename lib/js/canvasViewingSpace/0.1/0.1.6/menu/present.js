function present(){console.log('starting presentation');
	removeMouseInterface();
	setupKeyboardInterface();
	addToKey(32,"automoveScript_forwardStep();");
	addToKey(113,"stopPresentation();");
	addToKey(114,"automoveScript_reverseStep();");
	automoveScript_goto(0);
}
function stopPresentation(){console.log('quiting presentation');
	setupMouseInterface();
	setupKeyboardInterface();
}
