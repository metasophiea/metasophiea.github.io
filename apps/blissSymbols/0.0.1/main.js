var imageFolderAddress = './images/';

function Go(){
    console.log('Hello');

    for(var a = 0; a < symbols.length; a++){
        document.getElementById('overlist').appendChild( convert_symbolObject_to_image(symbols[a]) );
    }

}

function convert_symbolObject_to_image(symbolObject){
    if( symbolObject.isCharacter ){ var img = new Image(); img.src = imageFolderAddress + symbolObject.madeOf; return img;}

    var outputImage = new Image();

    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");

    for(var a = 0; a < symbolObject.madeOf.length; a++){
        var count = 0;
        var img = new Image();
            img.src = imageFolderAddress + getSymbolById(symbolObject.madeOf[a]).madeOf;
            img.onload = function(){ 
                context.drawImage(this,0,0); count++;
                if( count == symbolObject.madeOf.length ){ outputImage.src = canvas.toDataURL("image/png"); }
            }
    }
    
    return outputImage;
}

function drawToCanvas(img){
    var context = document.getElementById('canvas').getContext("2d");
    context.drawImage(img,0,0); 
}

function getSymbolById(id){
    for(var a = 0; a < symbols.length; a++){
        if(symbols[a].id == id){return symbols[a];}
    }

    return null;
}