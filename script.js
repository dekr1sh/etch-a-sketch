const gridSize = +prompt("Enter grid size: ");
const container = document.querySelector(".grid-container");

function colorGrid() {
  let isMouseDown = false;
  document.addEventListener("mousedown", () => {
    isMouseDown = true;
  });
  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  let items = document.querySelectorAll(".grid-item");
  items.forEach(item => {
    item.addEventListener("mousedown", () => {
      item.style.backgroundColor = "yellow";
    });
    item.addEventListener("mouseover", () => {
      if (isMouseDown) {
        item.style.backgroundColor = "yellow";
      }
    });
  });
}

function createGrid(){
  let item;
  const length = Math.floor(500/gridSize);
  const breadth = length;
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      item = document.createElement("div");
      item.className = "grid-item";
      item.style.width = `${length}px`;
      item.style.height = `${breadth}px`;
      item.style.border = "1px solid black";
      container.appendChild(item);
    }
  }
}

createGrid();
colorGrid();
