//Gets the current value of the rule you select////////////////////////////////////////////////////////////////////////////////////////
  function GetCSSCode(SheetName, SelectorText, Rule){
    for(var a = 0; a < document.styleSheets.length; a++){
      if(document.styleSheets[a].title == SheetName){
        for(var b = 0; b < document.styleSheets[a].cssRules.length; b++){
          if(document.styleSheets[a].cssRules[b].selectorText == SelectorText){
            return document.styleSheets[a].cssRules[b].style[Rule];
          }
        }
      }
    }
  }
  
//Sets the current value of the rule you've selected, to the 'Newvalue' ('type' isn't optional, but can be left as; "")////////////////
// - 'NewValue' and 'Type' are converted to strings anyway, it's just a handy way of inserting values that will always be of the same type,
// - eg, 10px. Where 'px' is placed in the 'Type'
// - - Note, this becomes useless when adding values like 'rgb(0,0,0)'
  function ChangeCSSCode(SheetName, SelectorText, Rule, NewValue, Type){
    for(var a = 0; a < document.styleSheets.length; a++){
      if(document.styleSheets[a].title == SheetName){
        for(var b = 0; b < document.styleSheets[a].cssRules.length; b++){
          if(document.styleSheets[a].cssRules[b].selectorText == SelectorText){
            document.styleSheets[a].cssRules[b].style[Rule] = NewValue + Type;
          }
        }
      }
    }
  }
