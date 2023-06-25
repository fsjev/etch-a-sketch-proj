// Initialize global Variables
let gridContainer = document.getElementById("container");
let numbers = document.getElementById("numbers");
let body = document.querySelector("body");
let slider = document.getElementById("slider");
let rowSize = slider.value;
let clearbtn = document.querySelector(".clear");
let eraserbtn = document.querySelector(".eraser");
let etchbtn = document.querySelector(".etch");
let counter = document.getElementById("counter");
let touchedDivs = gridContainer.getElementsByClassName("touched");
let etchMode = true;
let eraserMode = false;

// Make grid and show default mode on page load
makeGrid(rowSize);
styleModeBtn(etchMode);

// Run code when mouse focuses on slider thumb
slider.addEventListener("mousedown", () => {

// define mousedown function
    function mousedown(){
        rowSize = slider.value;
        let gridSize = rowSize ** 2;
        if(rowSize !== "1") numbers.innerHTML = `${rowSize} x ${rowSize}<br>${gridSize} squares`;
        if(rowSize === "1") numbers.innerHTML = `${rowSize} x ${rowSize}<br>${gridSize} square`;
        setCounter(touchedDivs, rowSize);
        makeGrid(rowSize);
    };
// Run mousedown function when slider thumb is moved
    slider.addEventListener("mousemove", mousedown);
// Remove event when slider thumb is released
    slider.onmouseup = function(){
        slider.removeEventListener("mouseover", mousedown);
    }
    
});

// Run code when clear etch button is clicked
clearbtn.addEventListener("click", () => {
    makeGrid(rowSize);
    setCounter(touchedDivs, rowSize);
});
// Run code when etch button is clicked
etchbtn.addEventListener("click", () => {
    etchMode = true;
    eraserMode = false;
    styleModeBtn(etchMode);
});
// Run code when eraser button is clicked
eraserbtn.addEventListener("click", () => {
    eraserMode = true;
    etchMode = false;
    styleModeBtn(eraserMode);
});
// define makeGrid function
function makeGrid(rowSize){
// remove inner elements from gridContainer
    gridContainer.innerHTML = "";
    let divArray = [];

// for loop to create a given amount of divs to populate grid
    for(let i = 0;i < rowSize ** 2;i++){
        let div = document.createElement("div");
// have array store divs
        divArray.push(div);
    }
// find appropriate flex basis value for each row size and store in variable
    let flexBasis = 100 / rowSize;

// iterate through divArray
    for(let div of divArray){
// declare flex values for each div in divArray
        div.style.cssText = `flex: 1 1 ${flexBasis}%;`;
// assign class of untouched for each div in divArray
        div.setAttribute("class", "untouched");
// push divs to gridContainer
        gridContainer.appendChild(div);
// Run code when mouse focuses on div inside gridContainer
        div.onmousedown = function() {
            div.ondragstart = () => {
                return false
            };
            if(etchMode) div.setAttribute("class", "touched");
            if(eraserMode) div.setAttribute("class", "untouched");
            
            setCounter(touchedDivs, rowSize);
            gridContainer.addEventListener('mousemove', onMouseMove);
            
// Run code when mouse focuses on div and moves inside gridContainer
            function onMouseMove(e) {
// identify element under mouse and store it in variable
                let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
                if(etchMode) elemBelow.setAttribute("class", "touched");
                if(eraserMode) elemBelow.setAttribute("class", "untouched");
                setCounter(touchedDivs, rowSize);
            };
// Run code when mouse unfocuses
            gridContainer.onmouseup = function() {
                gridContainer.removeEventListener('mousemove', onMouseMove);
            };
        };
    }
}

// define setCounter function
function setCounter(touchedDivs, rowSize){
    counter.textContent = `${touchedDivs.length} of ${rowSize ** 2} squares etched.`;
}


function styleModeBtn(boolean){
    if(boolean === etchMode){
        etchbtn.setAttribute("class", "active")
        eraserbtn.removeAttribute("class", "active")
    }else{
        eraserbtn.setAttribute("class", "active")
        etchbtn.removeAttribute("class", "active")
    }
}