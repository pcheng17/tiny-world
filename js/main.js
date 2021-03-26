// Tiny World

const bgColor = "#e8e5d5"
let fontSize = 12;
const gameWidth = 1600;
const gameHeight = 1000;
const xOffset = gameWidth / 2;
const yOffset = gameHeight / 4;
let tileSize = 50;
let tSizeSqInv = 1.0 / (tileSize ** 2);
xBoardSize = 10;
yBoardSize = 10;

// I currently use these to save the previous cursor position
// in isometric coordinates.
let ixp = null;
let iyp = null;

let grid;

function setup() {
    createCanvas(gameWidth, gameHeight)
    background(bgColor);
    grid = new Grid(xBoardSize, yBoardSize, tileSize, xOffset, yOffset);
    grid.draw();
}

function draw() {
    push();
    fill(bgColor);
    noStroke();
    rect(0, 0, 55, 55);
    pop();

    const [ix, iy] = isometricCursorPos();

    push();
    textSize(fontSize);
    text("x = ".concat(ix), 5, 15);
    text("y = ".concat(iy), 5, 15 + fontSize);
    pop();

    if (grid.isIsoPosInGrid(ix, iy)) {
        if (ixp === null && iyp === null) {
            grid.drawHoverTile(ix, iy);
        } else if (ixp !== ix || iyp !== iy) {
            grid.drawNoHoverTile(ixp, iyp);
            grid.drawHoverTile(ix, iy);
        }
        ixp = ix;
        iyp = iy;
    } else {
        if (ixp !== null && iyp !== null && grid.isIsoPosInGrid(ixp, iyp)) {
            grid.drawNoHoverTile(ixp, iyp);
        }
        ixp = null;
        iyp = null;
    }
}

class Grid {
    /**
     * constructor Initialize the data structure for thie  grid, but does not draw
     * @param {Number} xSize Resolution of the grid in the x-direction
     * @param {Number} ySize Resolution of the grid in the y-direction
     * @param {Number} tileSize Size of each grid tile
     * @param {Number} xOffset Offset in the x-direction for drawing the grid
     * @param {Number} yOffset Offset in the y-direction for drawing the grid
     */
    constructor(xSize, ySize, tileSize, xOffset, yOffset) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.tileSize = tileSize;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.tiles = [];

        for (var i = 0; i < this.xSize; i++) {
            this.tiles[i] = [];
            for (var j = 0; j < this.ySize; j++) {
                this.tiles[i][j] = new Tile(i, j, this.tileSize);
            }
        }
    }

    draw() {
        for (var i = 0; i < this.xSize; i++) {
            for (var j = 0; j < this.ySize; j++) {
                this.tiles[i][j].draw();
            }
        }
    }

    drawHoverTile(ix, iy) {
        this.tiles[ix][iy].drawHover();

    }

    drawNoHoverTile(ix, iy) {
        this.tiles[ix][iy].drawNoHover();

    }

    isIsoPosInGrid(ix, iy) {
        return (0 <= ix && ix < this.xSize && 0 <= iy && iy < this.ySize);
    }
}


class Tile {
    /**
     * constructor Initialize parameters of this tile
     * @param {Number} ix Isometric x-coordinate of this tile
     * @param {Number} iy Isometric y-coordinate of this tile
     * @param {Number} size Size of this tile
     */
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

    /**
     * draw Draw the default look of the tile, including the thickness of the tile
     */
    draw() {
        this.canvas.clear();
        this.canvas.push();
        this.canvas.translate(this.canvasBuffer, this.canvasBuffer);
        this.canvas.fill("#ffffff");
        this.canvas.strokeWeight(1);
        this.canvas.stroke(20);
        this.canvas.beginShape(QUADS);
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
        // Draw this canvas
        image(this.canvas,
            this.x - this.size + xOffset - this.canvasBuffer,
            this.y + yOffset - this.canvasBuffer);
    }

    /**
     * drawNoHover Color the top of this tile the default color, used when the cursor is not
     *             hovering over this tile
     */
    drawNoHover() {
        this.canvas.clear();
        this.canvas.push();
        this.canvas.translate(this.canvasBuffer, this.canvasBuffer);
        this.canvas.fill("#ffffff");
        this.canvas.strokeWeight(1);
        this.canvas.stroke(20);
        this.canvas.beginShape(QUADS);
        // Top face - only updating the color
        this.canvas.vertex(this.size, 0);
        this.canvas.vertex(2 * this.size, this.size / 2);
        this.canvas.vertex(this.size, this.size);
        this.canvas.vertex(0, this.size / 2);
        this.canvas.endShape();
        this.canvas.pop();
        // Draw this canvas
        image(this.canvas,
            this.x - this.size + xOffset - this.canvasBuffer,
            this.y + yOffset - this.canvasBuffer);
    }

    /**
     * drawHover Color the top of this tile a different color, used when the cursor is
     *           hovering over this tile
     */
    drawHover() {
        this.canvas.clear();
        this.canvas.push();
        this.canvas.translate(this.canvasBuffer, this.canvasBuffer);
        this.canvas.fill("#d9d9d9");
        this.canvas.strokeWeight(1);
        this.canvas.stroke(20);
        this.canvas.beginShape(QUADS);
        // Top face - only updating the color
        this.canvas.vertex(this.size, 0);
        this.canvas.vertex(2 * this.size, this.size / 2);
        this.canvas.vertex(this.size, this.size);
        this.canvas.vertex(0, this.size / 2);
        this.canvas.endShape();
        this.canvas.pop();
        // Draw this canvas
        image(this.canvas,
            this.x - this.size + xOffset - this.canvasBuffer,
            this.y + yOffset - this.canvasBuffer);
    }
}

/**
 * cartesianToIsometric Convert Cartesian coordinates to isometric coordinates
 * @param {Number} x Cartesian x-coordinate
 * @param {Number} y Cartesian y-coordinate
 * @returns Isometric coordinates
 */
function cartesianToIsometric(x, y) {
    const xTmp = tileSize * x / 2.0;
    const yTmp = tileSize * y;
    return [
        tSizeSqInv * (xTmp + yTmp),
        tSizeSqInv * (-xTmp + yTmp)
    ];
}

/**
 * isometricToCartesian Convert isometric coordinates to Cartesian coordinates
 * @param {Number} ix Isometric x-coordinate
 * @param {Number} iy Isometric y-coordinate
 * @returns Cartesian coordinates
 */
function isometricToCartesian(ix, iy) {
    const xTmp = tileSize * ix;
    const yTmp = tileSize * iy;
    return [xTmp - yTmp, (xTmp + yTmp) / 2.0];
}

/**
 * isometricCursorPos Get the isometric coordinates of the current cursor position
 * @returns Isometric coordinates of the cursor position
 */
function isometricCursorPos() {
    const [x, y] = cartesianToIsometric(mouseX - xOffset, mouseY - yOffset);
    return [floor(x), floor(y)];
}