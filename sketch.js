let canvas;
let particles = []; 
let amount = 8000;
const minMN = 1; const maxMN = 6;
let m = 1; let n = 5;
let changePattern = false;
let threshold = 0.05;
let scale = 2;


function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-10');  

    for (let i = 0; i < amount; i++){
        particles.push(new Particle());
    }
}

function draw() {
    background("#FFF");

    if (changePattern == true) {
        randomPatterns();
    }
    for (let i = 0; i < particles.length; i++){
        particles[i].move();
        particles[i].show();
    }

}

//Chladni Equation
function chladni(x, y) {
    let L = 1;
    let mValue = document.getElementById('mValue')
    mValue.innerHTML = m;
    let nValue = document.getElementById('nValue')
    nValue.innerHTML = n;

    return cos(n * PI * x / L) * cos(m * PI * y / L) - 
    cos(m * PI * x / L) * cos(n * PI * y / L);
    
}

function randomPatterns() {
    m = (int)(random(minMN, maxMN));
    n = (int)(random(minMN, maxMN));
    if (m == n) m = (int)(random(minMN, maxMN));
    changePattern = false;

    for (let i = 0; i < particles.length; i++) {
        particles[i].vel = p5.Vector.random2D().mult(random(3, 5));
    }
}

function mousePressed() {
    changePattern = true;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    randomPatterns()
    
}