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

let ixst = null;
let iyst = null;

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

    // if (ixst !== null && iyst !== null) {
    //     if (grid.isIsoPosInGrid(ixst, iyst)) {
    //         grid.drawHoverTile(ixst, iyst);
    //     }
    // }
}

function mouseClicked() {
    [ixst, iyst] = isometricCursorPos();
}


class Grid {
    /**
     * Initialize the data structure for thie  grid, but does not draw
     * @param {Number} [xSize] Resolution of the grid in the x-direction
     * @param {Number} [ySize] Resolution of the grid in the y-direction
     * @param {Number} [tileSize] Size of each grid tile
     * @param {Number} [xOffset] Offset in the x-direction for drawing the grid
     * @param {Number} [yOffset] Offset in the y-direction for drawing the grid
     */
    constructor(xSize, ySize, tileSize, xOffset, yOffset) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.tileSize = tileSize;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.tiles = [];

        for (let i = 0; i < this.xSize; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < this.ySize; j++) {
                this.tiles[i][j] = new Tile(i, j, this.tileSize);
            }
        }
    }

    draw() {
        push();
        translate(this.xOffset, this.yOffset);
        for (let i = 0; i < this.xSize; i++) {
            for (let j = 0; j < this.ySize; j++) {
                this.tiles[i][j].draw();
            }
        }
        pop();
    }

    drawHoverTile(ix, iy) {
        push();
        translate(this.xOffset, this.yOffset);
        this.tiles[ix][iy].drawHover();
        pop();
    }

    drawNoHoverTile(ix, iy) {
        push();
        translate(this.xOffset, this.yOffset);
        this.tiles[ix][iy].drawNoHover();
        pop();
    }

    isIsoPosInGrid(ix, iy) {
        return (0 <= ix && ix < this.xSize && 0 <= iy && iy < this.ySize);
    }
}


class Tile {
    /**
     * Initialize parameters of this tile
     * @param {Number} [ix] Isometric x-coordinate of this tile
     * @param {Number} [iy] Isometric y-coordinate of this tile
     * @param {Number} [size] Size of this tile
     */
    constructor(ix, iy, size) {
        this.ix = ix;
        this.iy = iy;
        this.size = size;
        [this.x, this.y] = isometricToCartesian(ix, iy);
        this.verts = [
            [this.x, this.y],
            [this.x + this.size, this.y + this.size / 2],
            [this.x, this.y + this.size],
            [this.x - this.size, this.y + this.size / 2],
            [this.x - this.size, this.y + 0.7 * this.size],
            [this.x, this.y + 1.2 * this.size],
            [this.x + this.size, this.y + 0.7 * this.size]
        ];
    }

    /**
     * Draw the default look of the tile, including the thickness of the tile
     */
    draw() {
        push();
        fill("#ffffff");
        strokeWeight(1);
        stroke(20);
        beginShape(QUADS);
        this.topFace();
        this.leftFace();
        this.rightFace();
        endShape();
        pop();
    }

    /**
     * Color the top of this tile the default color, used when the cursor is
     * not hovering over this tile
     */
    drawNoHover() {
        push();
        fill("#ffffff");
        strokeWeight(1);
        stroke(20);
        beginShape(QUADS);
        this.topFace();
        endShape();
        pop();
    }

    /**
     * Color the top of this tile a different color, used when the cursor is
     * hovering over this tile
     */
    drawHover() {
        push();
        fill("#d9d9d9");
        strokeWeight(1);
        stroke(20);
        beginShape(QUADS);
        this.topFace();
        endShape();
        pop();
    }

    topFace() {
        vertex(this.verts[0][0], this.verts[0][1]);
        vertex(this.verts[1][0], this.verts[1][1]);
        vertex(this.verts[2][0], this.verts[2][1]);
        vertex(this.verts[3][0], this.verts[3][1]);
    }

    leftFace() {
        vertex(this.verts[3][0], this.verts[3][1]);
        vertex(this.verts[4][0], this.verts[4][1]);
        vertex(this.verts[5][0], this.verts[5][1]);
        vertex(this.verts[2][0], this.verts[2][1]);
    }

    rightFace() {
        vertex(this.verts[2][0], this.verts[2][1]);
        vertex(this.verts[5][0], this.verts[5][1]);
        vertex(this.verts[6][0], this.verts[6][1]);
        vertex(this.verts[1][0], this.verts[1][1]);
    }
}

/**
 * Convert Cartesian coordinates to isometric coordinates
 * @param {Number} [x] Cartesian x-coordinate
 * @param {Number} [y] Cartesian y-coordinate
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
 * Convert isometric coordinates to Cartesian coordinates
 * @param {Number} [ix] Isometric x-coordinate
 * @param {Number} [iy] Isometric y-coordinate
 * @returns Cartesian coordinates
 */
function isometricToCartesian(ix, iy) {
    const xTmp = tileSize * ix;
    const yTmp = tileSize * iy;
    return [xTmp - yTmp, (xTmp + yTmp) / 2.0];
}

/**
 * Get the isometric coordinates of the current cursor position
 * @returns Isometric coordinates of the cursor position
 */
function isometricCursorPos() {
    const [x, y] = cartesianToIsometric(mouseX - xOffset, mouseY - yOffset);
    return [floor(x), floor(y)];
}