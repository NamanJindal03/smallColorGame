const getRandomColors = function(){
    var ratio = 0.618033988749895;
    
    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 20) + '%)';

    return {
        color,
        oddColor
    }
}
let gameBoard = function(element, row, column){
    this.normalElement = element;
    this.element = document.querySelector(element);
    this.row = row;
    this.column = column;
    this.oddColor = "";
    this.count =0;
    this.init();
    this.bindEvents();
}

gameBoard.prototype.addAdditionalRowAndColumn = function(){
    
    var header = document.createElement("div");
    header.classList.add("header");
    for(let j=0; j<this.column - 1; j++){
        var childBox = document.createElement("div");
        childBox.classList.add("childBox");
        childBox.dataset["cell"]= `${this.row-1}:${j}`;
        header.appendChild(childBox);
    }
    this.element.appendChild(header);
    var count = document.querySelector(`${this.normalElement} span`);
    count.innerHTML=`Score: ${this.count}`;
    var rows = document.querySelectorAll(`${this.normalElement} > div`);
    for(let k=0; k<this.row; k++){
        var childBox = document.createElement("div");
        childBox.classList.add("childBox");
        childBox.dataset["cell"]= `${k}:${this.column-1}`;
        rows[k].appendChild(childBox);
    }
    this.fillInitalColor();
}

gameBoard.prototype.bindEvents = function(){
    this.element.addEventListener('click', (e)=>{
        
        if(e.target.style.backgroundColor == this.oddColor){
            this.count = this.count + 1;
            this.row = this.row +1;
            this.column = this.column+1;
            this.addAdditionalRowAndColumn();
        }
        else{
            this.count = 0;
            this.row = 4;
            this.column = 4;
            this.element.classList.add("shake");
            //this.init();
            
            setTimeout(()=>{
                this.element.classList.remove("shake");
                this.element.innerHTML = "";
                this.init();
            }, 800)
            
        }  
    })
}

gameBoard.prototype.fillInitalColor = function(){
    let allColor = getRandomColors();
    for(let i=0; i<this.row; i++){
        for(let j=0; j<this.column; j++){
            var childBox = document.querySelector(`[data-cell = "${i}:${j}"]`)  
            childBox.style.backgroundColor = allColor.color;        
        }
    }
    let i = Math.floor((Math.random() * this.row));
    let j = Math.floor((Math.random() * this.column));
    document.querySelector(`[data-cell = "${i}:${j}"]`).style.backgroundColor = allColor.oddColor;
    this.oddColor = document.querySelector(`[data-cell = "${i}:${j}"]`).style.backgroundColor;
}

gameBoard.prototype.init = function(){
    
    var div = document.createDocumentFragment("div");
    var span = document.createElement("span");
    span.innerHTML = `Score: ${this.count}`
    div.appendChild(span)
    for(let i=0; i<this.row; i++){
        var header = document.createElement("div");
        header.classList.add("header");
        
        for(let j=0; j<this.column; j++){
            var childBox = document.createElement("div");
            childBox.classList.add("childBox");
            childBox.dataset["cell"]= `${i}:${j}`;
            header.appendChild(childBox);
        }
        div.appendChild(header);
    }
    this.element.appendChild(div);
    this.fillInitalColor();
}

new gameBoard("#board", 4,4);