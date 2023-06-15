const divArray = [];
for(let i = 0;i < 256;i++){
    let div = document.createElement("div");
    divArray.push(div);
}


let gridContainer = document.getElementById("container");

for(let div of divArray){
    div.classList.add("grid-squares");
    gridContainer.appendChild(div)
}