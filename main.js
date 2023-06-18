let gridContainer = document.getElementById("container");
let numbers = document.getElementById("numbers");
let body = document.querySelector("body");
let slider = document.getElementById("slider");
let rowSize = slider.value;

makeGrid(rowSize);

slider.addEventListener("mousemove", () => {
    rowSize = slider.value;
    let gridSize = rowSize ** 2;
    if(rowSize !== "1") numbers.innerHTML = `${rowSize} x ${rowSize}<br>${gridSize} squares`;
    if(rowSize === "1") numbers.innerHTML = `${rowSize} x ${rowSize}<br>${gridSize} square`;
    makeGrid(rowSize);
});


function makeGrid(rowSize){
    gridContainer.innerHTML = "";
    let divArray = [];

    for(let i = 0;i < rowSize ** 2;i++){
        let div = document.createElement("div");
        div.setAttribute("class", "touch");
        divArray.push(div);
    }
    
    let flexBasis = 100 / rowSize;

    for(let div of divArray){
        div.style.cssText = `border: 1px solid rgb(255, 255, 255);flex: 1 1 ${flexBasis}%;`;
        div.setAttribute("class", "untouched");
        gridContainer.appendChild(div);

        div.onmousedown = function(e) {
            div.setAttribute("class", "touched");

            gridContainer.addEventListener('mousemove', onMouseMove);
            
            function onMouseMove(e) {
                let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
                elemBelow.setAttribute("class", "touched");
                
            };
            
            gridContainer.onmouseup = function() {
                gridContainer.removeEventListener('mousemove', onMouseMove);
            };
        };
    }
}