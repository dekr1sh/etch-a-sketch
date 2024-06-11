const grid = document.querySelector(".grid");
const gridSizeSlider = document.querySelector("#gridSizeSlider");
const gridSizeValue = document.querySelector("#gridSizeValue");
const colorPicker = document.querySelector("#colorPicker");

const colorModeBtn = document.querySelector("#colorModeBtn");
const rainbowModeBtn = document.querySelector("#rainbowModeBtn");
const shadowModeBtn = document.querySelector("#shadowModeBtn");
const eraseModeBtn = document.querySelector("#eraseModeBtn");
const clearBtn = document.querySelector("#clearBtn"); 

const modeButtons = [colorModeBtn, rainbowModeBtn, shadowModeBtn, eraseModeBtn];

let currentMode = 'color';
colorModeBtn.classList.add('active');
let currentColor = colorPicker.value;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode, activeButton) {
  currentMode = newMode;
  modeButtons.forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
}

function getRainbowColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function applyColor(item) {
  switch (currentMode) {
    case 'color':
      item.style.backgroundColor = currentColor;
      item.style.opacity = 1;
      item.style.border = "";
      break;
    case 'rainbow':
      item.style.backgroundColor = getRainbowColor();
      item.style.opacity = 1;
      item.style.border = "";
      break;
    case 'shadow':
      let currentOpacity = +item.style.opacity || 0;
      item.style.backgroundColor = "black";
      item.style.opacity = Math.min(currentOpacity + 0.1, 1);
      item.style.border = "";
      break;
    case 'erase':
      item.style.backgroundColor = "";
      item.style.opacity = 1;
      item.style.border = "1px solid #ddd"
      break;
  }
}

function colorGrid() {
  let isMouseDown = false;

  document.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  let items = document.querySelectorAll(".gridItem");
  items.forEach(item => {
    item.addEventListener("mousedown", () => applyColor(item));
    item.addEventListener("mouseover", () => {
      if (isMouseDown) {
        applyColor(item);
      }
    });
  });
}

function createGrid(size) {
  grid.innerHTML = ''; 
  const itemSize = 500 / size; 

  for (let i = 0; i < size * size; i++) {
    let item = document.createElement("div");
    item.className = "gridItem";
    item.style.width = `${itemSize}px`;
    item.style.height = `${itemSize}px`;
    grid.appendChild(item);
  }
  colorGrid(); 
}

function clearGrid() {
  let items = document.querySelectorAll(".gridItem");
  items.forEach(item => {
    item.style.backgroundColor = "";
    item.style.opacity = 1;
    item.style.border = "1px solid #ddd";
  });
}

gridSizeSlider.addEventListener("input", () => {
  const newSize = gridSizeSlider.value;
  gridSizeValue.textContent = `${newSize} x ${newSize}`;
  createGrid(newSize);
});

colorPicker.addEventListener("input", () => {
  setCurrentColor(colorPicker.value);
});

colorModeBtn.addEventListener("click", () => setCurrentMode('color', colorModeBtn));
rainbowModeBtn.addEventListener("click", () => setCurrentMode('rainbow', rainbowModeBtn));
shadowModeBtn.addEventListener("click", () => setCurrentMode('shadow', shadowModeBtn));
eraseModeBtn.addEventListener("click", () => setCurrentMode('erase', eraseModeBtn));
clearBtn.addEventListener("click", clearGrid); 

createGrid(gridSizeSlider.value);
