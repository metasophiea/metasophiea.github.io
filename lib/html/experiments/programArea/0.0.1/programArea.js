customElements.define('metasophiea-programarea',
    class extends HTMLElement{

        connectedCallback(){this.build();} 

        constructor(){super();
            var godElement = this.attachShadow({mode: 'open'});
            var masterElement = document.createElement('section');
                godElement.appendChild(masterElement);

            var tableStyling = {
                'height':'800px',
                'resize':'none',
                'padding':'0px',
                'border':'0px',   
                'font-size': '18px'          
            };

            this.build = function(){
                masterElement.style.width = dealWithDimension('width',this); masterElement.style.height = dealWithDimension('height',this);           
                masterElement.appendChild(createInnerspace());
                masterElement.style.overflow = "auto";
            }

            masterElement.keyup = function(that,event){
                // console.log(that);              
                // console.log(that.offsetWidth);


                var result = parseInt(that.offsetWidth) / parseInt( that.style['font-size'].split('px')[0] );

                console.log(result);
            }


            function createInnerspace(){
                var masterWidth = 1000;//parseInt(masterElement.style.width.split('px')[0]);
                var lineNumberColurWidth = 50;

                var table = document.createElement('table');
                    table.style.margin = '0px';
                    table.style.border = '0px';
                    table.style['border-collapse'] = 'collapse';
                var tbody = document.createElement('tbody');
                    tbody.style.border = 'inherit';
                    table.appendChild(tbody);
                var tr = document.createElement('tr');
                    tr.style.border = 'inherit';
                    tbody.appendChild(tr);

                //Numbering
                var td = document.createElement('td');
                    td.style.border = 'inherit';
                    td.style.padding = '0px';
                    tr.appendChild(td);
                var mainTextArea = document.createElement('textarea');
                    mainTextArea = applyStyle(mainTextArea,tableStyling);
                    mainTextArea.style.width = lineNumberColurWidth+'px';
                    mainTextArea.style['background-color'] = '#dddddd';
                    mainTextArea.setAttribute('disabled','true');                 
//                  for(var a = 0; a < 100; a++){ mainTextArea.value += ' '+a + '\n'; }
                    td.appendChild(mainTextArea);

                //Workspace
                var td = document.createElement('td');
                    td.style.border = 'inherit';
                    td.style.padding = '0px';
                    tr.appendChild(td);
                var mainTextArea = document.createElement('textarea');
                    mainTextArea = applyStyle(mainTextArea,tableStyling);
                    //mainTextArea.style.width = (masterWidth-lineNumberColurWidth)+'px';
                    mainTextArea.style['background-color'] = '#cccccc';
                    mainTextArea.setAttribute('onkeyup','this.parentElement.parentElement.parentElement.parentElement.parentElement.keyup(this,event)');
                    td.appendChild(mainTextArea);

                return table;
            }

            function applyStyle(element,styleObject){
                var keys = Object.keys(styleObject);
                for(var a = 0; a < keys.length; a++){ element.style[keys[a]] = styleObject[keys[a]]; }
                return element;
            }

            function dealWithDimension(attribute,that){ var result = '0';
                if(that.hasAttribute(attribute)){result = that.getAttribute(attribute);}
                if(that.style[attribute] != ''){result = that.style[attribute];}
                if(/%/g.test(result)){ result = (parseInt(dealWithDimension(attribute,that.parentElement).split('p')[0]) * parseInt(result.split('%')[0])/100) + 'px'; }
                else if(/[0-9]/g.test(result[result.length-1])){ result = result + 'px'; }

                return result;
            }
        }
    }
); 