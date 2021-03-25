// Tiny Traffic

const bgColor = "#e8e5d5"
let fontSize = 12;
const gameWidth = 1600;
const gameHeight = 1000;
const xOffset = gameWidth / 2;
const yOffset = gameHeight / 4;
let tileSize = 30;
let tSizeSqInv = 1.0 / (tileSize ** 2);
let tiles = [];
boardSize = 20;

var gxp = null;
var gyp = null;

class Tile {
    constructor(ix, iy) {
        this.ix = ix;
        this.iy = iy;
        [this.x, this.y] = isometricToCartesian(ix, iy);
        this.canvasBuffer = 10;
        this.canvas = createGraphics(2 * tileSize + this.canvasBuffer, tileSize + this.canvasBuffer);
    }

    sketch() {
        this.canvas.push();
        this.canvas.translate(this.canvasBuffer / 2, this.canvasBuffer / 2);
        this.canvas.beginShape();
        this.canvas.clear();
        this.canvas.fill("#ffffff");
        this.canvas.strokeWeight(1.5);
        this.canvas.stroke(20);
        this.canvas.vertex(tileSize, 0);
        this.canvas.vertex(2 * tileSize, tileSize / 2);
        this.canvas.vertex(tileSize, tileSize);
        this.canvas.vertex(0, tileSize / 2);
        this.canvas.vertex(tileSize, 0);
        // this.canvas.fill(0);
        // this.canvas.text(this.ix + "," + this.iy, this.x - tileSize / 4, this.y + tileSize / 2 + fontSize / 2);
        this.canvas.endShape();
        this.canvas.pop();
    }

    draw() {
        this.sketch();
        image(this.canvas, this.x - tileSize + xOffset - this.canvasBuffer / 2, this.y + yOffset - this.canvasBuffer / 2);
    }

    sketchBlack() {
        this.canvas.push();
        this.canvas.translate(this.canvasBuffer / 2, this.canvasBuffer / 2);
        this.canvas.beginShape();
        this.canvas.clear();
        this.canvas.fill("#000000");
        this.canvas.strokeWeight(1.5);
        this.canvas.stroke(20);
        this.canvas.vertex(tileSize, 0);
        this.canvas.vertex(2 * tileSize, tileSize / 2);
        this.canvas.vertex(tileSize, tileSize);
        this.canvas.vertex(0, tileSize / 2);
        this.canvas.vertex(tileSize, 0);
        // this.canvas.fill(0);
        // this.canvas.text(this.ix + "," + this.iy, this.x - tileSize / 4, this.y + tileSize / 2 + fontSize / 2);
        this.canvas.endShape();
        this.canvas.pop();
        image(this.canvas, this.x - tileSize + xOffset - this.canvasBuffer / 2, this.y + yOffset - this.canvasBuffer / 2);
    }
}

function setup() {
    createCanvas(gameWidth, gameHeight)
    background(bgColor);

    for (var i = 0; i < boardSize; i++) {
        // let iOffset = boardSize * i;
        tiles[i] = [];
        for (var j = 0; j < boardSize; j++) {
            // const idx = iOffset + j;
            tiles[i][j] = new Tile(i, j);
            tiles[i][j].draw();
        }
    }
}

function draw() {
    push();
    fill(bgColor);
    noStroke();
    rect(0, 0, 55, 55);
    pop();

    push();
    textSize(fontSize);
    const [gx, gy] = cursorPosInGame();
    text("x = ".concat(gx), 5, 15);
    text("y = ".concat(gy), 5, 15 + fontSize);
    pop();

    if (0 <= gx && gx < boardSize && 0 <= gy && gy < boardSize) {
        if (gxp === null && gyp === null) {
            tiles[gx][gy].sketchBlack();
        } else {
            tiles[gxp][gyp].draw();
            tiles[gx][gy].sketchBlack();
        }
        gxp = gx;
        gyp = gy;
    } else {
        if (gxp !== null && gyp !== null && 0 <= gxp && gxp < boardSize && 0 <= gyp && gyp < boardSize) {
            tiles[gxp][gyp].draw();
        }
        gxp = null;
        gyp = null;
    }
}

// Convert cartesian coordinates to isometric coordinates
function cartesianToIsometric(x, y) {
    const xTmp = tileSize * x / 2.0;
    const yTmp = tileSize * y;
    return [
        tSizeSqInv * (xTmp + yTmp),
        tSizeSqInv * (-xTmp + yTmp)
    ];
}

function isometricToCartesian(ix, iy) {
    const xTmp = tileSize * ix;
    const yTmp = tileSize * iy;
    return [xTmp - yTmp, (xTmp + yTmp) / 2.0];
}

function cursorPosInGame() {
    const [x, y] = cartesianToIsometric(mouseX - xOffset, mouseY - yOffset);
    return [floor(x), floor(y)];
}

function tile(x, y) {
    this.x = x;
    this.y = y;
    var [sx, sy] = isometricToCartesian(x, y);

    //debug purpose
    let t = 0;

    this.display = function () {
        var [gx, gy] = cursorPosInGame();
        if (gx == this.x & gy == this.y) {
            fill(155);
            strokeWeight(2);
            t = t + 0.1;
            bounce = 2 * sin(t) + 2;
            beginShape();
            vertex(sx, sy + bounce)
            vertex(sx + tileSize, sy + tileSize / 2 + bounce)
            vertex(sx, sy + tileSize + bounce)
            vertex(sx - tileSize, sy + tileSize / 2 + bounce)
            vertex(sx, sy + bounce)
            endShape();
            fill(0)
            // text(this.x + "," + this.y, sx - tileSize / 4, sy + tileSize / 2 + fontSize / 2 + bounce);
            this.color = 0;
        } else {
            fill(120);
            strokeWeight(1.5);
            stroke(20);
            beginShape();
            vertex(sx, sy)
            vertex(sx + tileSize, sy + tileSize / 2)
            vertex(sx, sy + tileSize)
            vertex(sx - tileSize, sy + tileSize / 2)
            vertex(sx, sy)
            endShape();
            fill(0)
            // text(this.x + "," + this.y, sx - tileSize / 4, sy + tileSize / 2 + fontSize / 2);
        }
    }
}
