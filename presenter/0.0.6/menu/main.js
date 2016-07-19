function menu_startMenu(point, type, ID=-1){
	console.log(type +' '+ ID);

	var NewElement;
	switch(type){
		case 'main': NewElement = menu_buildMainMenu(point); break;
		case 'object': NewElement = menu_buildObjectMenu(point,ID); break;		
	}

	containerElement.appendChild(NewElement);

}

function menu_buildMainMenu(point){
// Graphics //// //// //// //// //// //// //// //// //// ////
	//SVG Container
		SVG_Element = buildMenu_SVG(ID,1,X,Y,400,250);
		SVG_Element.setAttribute("onload","console.log('loaded');");
// Plates //// //// //// ////
	//Backing Plate
		SVG_Element.appendChild(buildMenu_rect("BackingPlate",0,0,"100%","100%"));







}
function menu_buildObjectMenu(point,ID){}