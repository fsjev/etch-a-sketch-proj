// Initialize global Variables
let gridContainer = document.getElementById("container");
let numbers = document.getElementById("numbers");
let body = document.querySelector("body");
let slider = document.getElementById("slider");
let rowSize = slider.value;
let button = document.querySelector("button");
let counter = document.getElementById("counter");
let touchedDivs = gridContainer.getElementsByClassName("touched");

// Make grid on page load
makeGrid(rowSize);

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

// Run code when button is clicked
button.addEventListener("click", () => {
    makeGrid(rowSize);
    setCounter(touchedDivs, rowSize);
});
// define makeGrid function
function makeGrid(rowSize){
// remove inner elements from gridContainer
    gridContainer.innerHTML = "";
    let divArray = [];
// for loop to create a given amount of divs to populate grid
    for(let i = 0;i < rowSize ** 2;i++){
        let div = document.createElement("div");
// add class attribute to divs
        div.setAttribute("class", "touch");
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
        div.onmousedown = function(e) {
            div.setAttribute("class", "touched");
            setCounter(touchedDivs, rowSize);
            gridContainer.addEventListener('mousemove', onMouseMove);
            
// Run code when mouse focuses on div and moves inside gridContainer
            function onMouseMove(e) {
// identify element under mouse and store it in variable
                let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
                elemBelow.setAttribute("class", "touched");
                
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