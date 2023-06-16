let gridContainer = document.getElementById("container");
let numbers = document.getElementById("numbers");

let slider = document.getElementById("slider");


slider.addEventListener

let rowSize = slider.value;
let gridSize = rowSize ** 2;


const divArray = [];
for(let i = 0;i < gridSize;i++){
    let div = document.createElement("div");
    divArray.push(div);
}

numbers.textContent = `${rowSize} x ${rowSize}`;

for(let div of divArray){
    div.classList.add("grid-squares");
    gridContainer.appendChild(div)
}


