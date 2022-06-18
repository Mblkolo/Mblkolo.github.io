const size = 500;
const count = 1000;

const points = [];
const g = 1.32471795724474602596;
const a1 = 1.0/g;
const a2 = 1.0/(g*g);

for(let i=0; i<count; ++i) {
    const x = (0.5+a1*i) %1;
    const y = (0.5+a2*i) %1;
    points.push({
        x: Math.random(),
        y: Math.random(),
        cx: x,
        cy: y,
        vx: 0,
        vy: 0
    });
}

let pg 
function preload() {

}

function timeIt()
{
    const x = Math.random();
    const y = Math.random();
    ellipse(x * size, y * size, 5, 5);
    bump(x, y, 50);
}

function setup() {
    createCanvas(size, size);

    pg = createGraphics(size, size);
    //pg.ellipse(200, 200, 300, 300);
    pg.fill(255, 255, 255);

    pg.beginShape();
    for(let t = 0; t<2 * Math.PI; t+=0.1)
    {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t) ;
        pg.vertex(x*size/35 + size/2, -y*size/35 + size/2);
        pg.endShape(CLOSE);
    }



    pg.loadPixels();
    for(let i=0; i<count; ++i) {  
        const p = points[i];
        p.color = pg.pixels[(Math.ceil(p.cy*size) * size * 4 + Math.ceil(p.cx*size) * 4)] == 255
            ? 'red'
            : 'white';
    }


    setInterval(timeIt, 5000)
}

const color = 'white';
function draw() {
    //clear();
    //stroke('white')
    fill('rgba(1, 1, 1, 0.01)');
    rect(0, 0, size, size);

    //image(pg, 0, 0)

    for(let i=0; i<count; ++i) {
        const p = points[i];
        p.vx += (p.cx - p.x) / 1000;
        p.vy += (p.cy - p.y) / 1000;

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        stroke(p.color);
        point(p.x * size, p.y * size);
    }
    
}

function mouseClicked() {
    const x = mouseX/size;
    const y = mouseY/size;
    bump(x, y, 100);

    // prevent default
    return false;
}


function mouseMoved() {
    //ellipse(mouseX, mouseY, 5, 5);
    const x = mouseX/size;
    const y = mouseY/size;
    bump(x, y, 1);

    // prevent default
    return false;
}

function bump(x, y, multiply) {

    //const power = Math.random() * 0.005 + 0.005;
    const power = -0.00005 * multiply;
    //const power = Math.random() * 0.01  - 0.005;

    for(let i=0; i<count; ++i) {
        const p = points[i];
        const dx = (x - p.x);
        const dy = (y - p.y);
        const dist = dx*dx + dy*dy;
        p.vx += power * dx / (dist + 0.01);
        p.vy += power * dy / (dist + 0.01);
    }
}
