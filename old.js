let cols, rows;
let size = 1;
let m = 1; let n = 5;
let threshold = 0.05;

function setup() {
  createCanvas(400, 400);
  cols = width/size;
  rows = height/size;
}

function draw() {
  background(220);
  noStroke();

  //Chladni Pattern
  for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = map(i, 0, cols, -1, 1);
        let y = map(j, 0, cols, -1, 1);
        let values = chladni(x,y);
        if (abs(values) < threshold) {
          fill(0);
        } else fill(255);
        rect(i*size, j*size, size, size);
      }
  }
  noLoop();
}

//Chladni Equation
function chladni(x, y) {
  let L = 1;
  return cos(n * PI * x / L) * cos(m * PI * y / L) - 
  cos(m * PI * x / L) * cos(n * PI * y / L);
}

//Particles