var imageFolderAddress = 'http://metasophiea.com/apps/blissSymbols/testImages/';
var symbolSize = {"height":100,"width":100};

function Go(){
    console.log('Hello');

    for(var a = 0; a < symbols.length; a++){
        document.getElementById('overlist').appendChild( produceImage( symbols[a] ) );
    }

}

function produceImage(symbolObject){
    var outputImage = new Image();
    if( symbolObject.isCharacter ){ outputImage.src = imageFolderAddress + symbolObject.madeOf; return outputImage;}

    var canvas = document.createElement('canvas'); canvas.width = '100'; canvas.height = '100';
    var context = canvas.getContext("2d");
    for(var a = 0; a < symbolObject.madeOf.length; a++){
        var count = 0;
        var img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.src = imageFolderAddress + getSymbolById(symbolObject.madeOf[a].id).madeOf;
            img.subSymbol = symbolObject.madeOf[a];
            img.onload = function(){
                var width = symbolSize.width*this.subSymbol.size.width;
                var height = symbolSize.height*this.subSymbol.size.height;

                context.save();
                context.translate((symbolSize.width*0.5) + this.subSymbol.position.x,(symbolSize.height*0.5) + this.subSymbol.position.y);
                context.rotate(this.subSymbol.angle);
                context.drawImage(this,-0.5*width,-0.5*height,width,height);
                context.restore();

                count++;
                if( count == symbolObject.madeOf.length ){ outputImage.src = canvas.toDataURL("image/png"); }
            }
    }

    return outputImage;
}

function getSymbolById(id){
    for(var a = 0; a < symbols.length; a++){ if(symbols[a].id == id){return symbols[a];} }
    return null;
}