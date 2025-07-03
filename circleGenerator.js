const undoStack = [];
const redoStack = [];
const counter = document.getElementById('counter');

function updateCounter() {
  counter.innerText = `Circles: ${undoStack.length}`;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createCircle(x, y) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.backgroundColor = getRandomColor();
  circle.style.left = `${x}px`; 
  circle.style.top = `${y}px`;
  document.body.appendChild(circle);
  undoStack.push(circle);
  redoStack.length = 0; // Clear redo history
  updateCounter();
}

document.body.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') return;
  createCircle(e.clientX, e.clientY);
});

document.getElementById('resetBtn').addEventListener('click', function() {
  undoStack.forEach(c => c.remove());
  undoStack.length = 0;
  redoStack.length = 0;
  updateCounter();
});

document.getElementById('undoBtn').addEventListener('click', function() {
  if (undoStack.length > 0) {
    const circle = undoStack.pop();
    circle.remove();
    redoStack.push(circle);
    updateCounter();
  }
});

document.getElementById('redoBtn').addEventListener('click', function() {
  if (redoStack.length > 0) {
    const circle = redoStack.pop();
    document.body.appendChild(circle);
    undoStack.push(circle);
    updateCounter();
  }
});

updateCounter();
