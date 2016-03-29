function ChangeOneThingInJSONObject(Object, Thing, NewValue){
	Object[Thing] = NewValue; return Object;
}

function GetListPosition_FromID(ID, DrawList){
	for(var a = 0; a < DrawList.length; a++){
		if( DrawList[a].ID == ID){ return a; }
	}
	return -1;
}
