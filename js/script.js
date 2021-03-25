// Tiny World

const bgColor = "#e8e5d5"
let fontSize = 12;
const gameWidth = 1600;
const gameHeight = 1000;
const xOffset = gameWidth / 2;
const yOffset = gameHeight / 4;
let tileSize = 50;
let tSizeSqInv = 1.0 / (tileSize ** 2);
let tiles = [];
boardSize = 10;

var gxp = null;
var gyp = null;

class Tile {
    constructor(ix, iy, size) {
        this.ix = ix;
        this.iy = iy;
        this.size = size;
        [this.x, this.y] = isometricToCartesian(ix, iy);
        this.canvasBuffer = 5;
        this.canvas = createGraphics(
            2 * (this.size + this.canvasBuffer),
            2 * this.size + 2 * this.canvasBuffer
        );
    }

    sketch() {
        this.canvas.clear();
        this.canvas.push();
        this.canvas.translate(this.canvasBuffer, this.canvasBuffer);
        this.canvas.beginShape(QUADS);
        this.canvas.fill("#ffffff");
        this.canvas.strokeWeight(1);
        this.canvas.stroke(20);
        // Top face
        this.canvas.vertex(this.size, 0);
        this.canvas.vertex(2 * this.size, this.size / 2);
        this.canvas.vertex(this.size, this.size);
        this.canvas.vertex(0, this.size / 2);
        // Left face
        this.canvas.vertex(0, this.size / 2);
        this.canvas.vertex(0, this.size * 0.70);
        this.canvas.vertex(this.size, this.size * 1.20);
        this.canvas.vertex(this.size, this.size);
        // Right face
        this.canvas.vertex(this.size, this.size);
        this.canvas.vertex(this.size, this.size * 1.20);
        this.canvas.vertex(2 * this.size, this.size * 0.70);
        this.canvas.vertex(2 * this.size, this.size / 2);
        this.canvas.endShape();
        this.canvas.pop();
    }

    draw() {
        this.sketch();
        image(this.canvas, this.x - this.size + xOffset - this.canvasBuffer, this.y + yOffset - this.canvasBuffer);
    }

    sketchBlack() {
        this.canvas.clear();
        this.canvas.push();
        this.canvas.translate(this.canvasBuffer, this.canvasBuffer);
        this.canvas.beginShape();
        this.canvas.fill("#d9d9d9");
        this.canvas.strokeWeight(1);
        this.canvas.stroke(20);
        this.canvas.vertex(this.size, 0);
        this.canvas.vertex(2 * this.size, this.size / 2);
        this.canvas.vertex(this.size, this.size);
        this.canvas.vertex(0, this.size / 2);
        this.canvas.vertex(this.size, 0);
        this.canvas.endShape();
        this.canvas.pop();
        image(this.canvas, this.x - this.size + xOffset - this.canvasBuffer, this.y + yOffset - this.canvasBuffer);
    }
}

function setup() {
    createCanvas(gameWidth, gameHeight)
    background(bgColor);

    for (var i = 0; i < boardSize; i++) {
        tiles[i] = [];
        for (var j = 0; j < boardSize; j++) {
            tiles[i][j] = new Tile(i, j, tileSize);
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
            console.log("Mouse over draw");
            tiles[gx][gy].sketchBlack();
        } else if (gxp !== gx || gyp !== gy) {
            console.log("Mouse over draw, reset previous");
            for (var i = gxp; i < boardSize; i++) {
                for (var j = gyp; j < boardSize; j++) {
                    tiles[i][j].draw();
                }
            }
            // tiles[gxp][gyp].draw();
            tiles[gx][gy].sketchBlack();
        } else {
            console.log("No updates");
        }
        gxp = gx;
        gyp = gy;
    } else {
        if (gxp !== null && gyp !== null && 0 <= gxp && gxp < boardSize && 0 <= gyp && gyp < boardSize) {
            console.log("Reset previous");
            for (var i = gxp; i < boardSize; i++) {
                for (var j = gyp; j < boardSize; j++) {
                    tiles[i][j].draw();
                }
            }
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