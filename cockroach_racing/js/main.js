const size = 500;
const count = 11;

const points = [];

for(let i=0; i<count; ++i) {
    points.push({
        x: 0,
        y: i,
    });
}

let pg ;
let winNo = null;
function preload() {

}

function timeIt()
{
    if(winNo != null)
        return;
        
    var bugNo = getRandomInt(count);
    points[bugNo].x++;
    console.log(bugNo);

    if(points[bugNo].x == 190)
        winNo = bugNo; 
}

function setup() {
    createCanvas(size, size);

    pg = createGraphics(size, size);

    setInterval(timeIt, 10)
}

const color = 'white';
function draw() {
    clear();
    //stroke('white')
    fill(0, 0, 0);
    //rect(0, 0, size, size);

    for(let i=0; i<count; ++i) {
        const p = points[i];

        ellipse(p.x * size / 200, p.y * size / 20 + 20, 10);
        text(i+1, p.x * size / 200 - 30, p.y * size / 20 + 20 + 5);
    }

    if(winNo != null)
    {
        const p = points[winNo];
        ellipse(p.x * size / 200, p.y * size / 20 + 20, 15);
    }
}

function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
}

function mouseClicked() {
 

    // prevent default
    return false;
}


function mouseMoved() {


    // prevent default
    return false;
}

