function ShowSite(){
    var secondBody = document.createElement('section');
        secondBody.id = 'secondBody';
        secondBody.setAttribute("onclick","HideSite();");
        secondBody.style.position = 'absolute';
        secondBody.style.width = '100%';
        document.body.appendChild(secondBody);

    var sectionContainer = document.createElement('section');
        sectionContainer.style.margin = 'auto';
        sectionContainer.style.padding = '25px';
        sectionContainer.style['background'] = '#fafafc';
        sectionContainer.style['max-width'] = '850px';

        secondBody.appendChild(sectionContainer);

    var count = 0;
    var timeout = setInterval(function(){
        var section = document.createElement('section');
            section.style.opacity = 0;
            section.appendChild(makePannel(articles[count]));
            sectionContainer.appendChild(section);
            fadeIn(section,2);

        if(count == articles.length-1){clearInterval(timeout);}
        count++;
    },100);

}
function HideSite(){
    var elements = document.getElementById('secondBody').childNodes;

    var count = 0;
    var timeout = setInterval(function(){
        fadeOut(elements[count],2);
        if(count == elements.length-1){clearInterval(timeout);}
        count++;
    },100);
    
    setTimeout(function(){document.getElementById('secondBody').parentNode.removeChild(document.getElementById('secondBody')); SquareClick();},3000);
}

function makePannel(data){
    var section = document.createElement('section');
        section.style['background-image'] = 'url('+data.image_url+')';
        section.style['background-position'] = 'center'; 
        section.style.padding = '90px 60px';
        section.style.margin = '10px';
        //section.setAttribute("onclick","window.location.href = '"+data.link_url+"';");
        section.setAttribute("onclick","goToURL('"+data.link_url+"');");      
    var strip = document.createElement('section');
        strip.style['background-color'] = data.backerFill;
        strip.style.padding = '10px';
        section.appendChild(strip);

    var heading = document.createElement('h1');
        heading.setAttribute('class','articleHeading');
        heading.style.color = data.textcolour;
        heading.innerHTML = data.headline;
        strip.appendChild(heading);
    for(var a = 0; a < data.text.length; a++){
        var p = document.createElement('p');
            p.setAttribute('class','articleBody');
            p.style.color = data.textcolour;
            p.innerHTML = data.text[a];
            strip.appendChild(p);      
    }

    return section;
}

function fadeIn(element,duration){
    var resolution = 30;
    var opacity = 0; var opacity_step = 1/(resolution*duration); element.style.opacity = opacity;
    var interval = setInterval(function(){
        opacity += opacity_step;
        element.style.opacity = opacity;
        if(opacity >= 1){element.style.opacity = 1; clearInterval(interval);}
    },1000/resolution);
}

function fadeOut(element,duration){
    var resolution = 30;
    var opacity = 1; var opacity_step = 1/(resolution*duration); element.style.opacity = opacity;
    var interval = setInterval(function(){
        opacity -= opacity_step;
        element.style.opacity = opacity;
        if(opacity <= 0){element.style.opacity = 0; clearInterval(interval);}
    },1000/resolution);
}

function goToURL(URL){
    location.replace(URL);
}