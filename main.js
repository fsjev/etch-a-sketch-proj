let gridContainer = document.getElementById("container");
let numbers = document.getElementById("numbers");
let body = document.querySelector("body");
let slider = document.getElementById("slider");
let rowSize = slider.value;
let button = document.querySelector("button");
let counter = document.getElementById("counter");
let touchedDivs = gridContainer.getElementsByClassName("touched");


makeGrid(rowSize);



slider.addEventListener("mousedown", () => {

    function mousedown(){
        rowSize = slider.value;
        let gridSize = rowSize ** 2;
        if(rowSize !== "1") numbers.innerHTML = `${rowSize} x ${rowSize}<br>${gridSize} squares`;
        if(rowSize === "1") numbers.innerHTML = `${rowSize} x ${rowSize}<br>${gridSize} square`;
        setCounter(touchedDivs, rowSize);
        makeGrid(rowSize);
    };
    slider.addEventListener("mousemove", mousedown);
    slider.onmouseup = function(){
        slider.removeEventListener("mouseover", mousedown);
    }
    
});

button.addEventListener("click", () => {
    makeGrid(rowSize);
    setCounter(touchedDivs, rowSize);
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
        div.style.cssText = `flex: 1 1 ${flexBasis}%;`;
        div.setAttribute("class", "untouched");
        gridContainer.appendChild(div);

        div.onmousedown = function(e) {
            div.setAttribute("class", "touched");
            setCounter(touchedDivs, rowSize);
            gridContainer.addEventListener('mousemove', onMouseMove);
            
            function onMouseMove(e) {
                let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
                elemBelow.setAttribute("class", "touched");
                
                setCounter(touchedDivs, rowSize);
            };
            
            gridContainer.onmouseup = function() {
                gridContainer.removeEventListener('mousemove', onMouseMove);
            };
        };
    }
}

function setCounter(touchedDivs, rowSize){
    counter.textContent = `${touchedDivs.length} of ${rowSize ** 2} squares etched.`;
}