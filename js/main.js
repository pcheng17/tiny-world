// Tiny World

const bgColor = "#e8e5d5";
const grassColor = "#63e12a";
const dirtColor = "#9e5422";
const waterColor = "#00b1ff";
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

    // if (grid.isIsoPosInGrid(ix, iy)) {
    //     if (ixp === null && iyp === null) {
    //         grid.drawHoverTile(ix, iy);
    //     } else if (ixp !== ix || iyp !== iy) {
    //         grid.drawNoHoverTile(ixp, iyp);
    //         grid.drawHoverTile(ix, iy);
    //     }
    //     ixp = ix;
    //     iyp = iy;
    // } else {
    //     if (ixp !== null && iyp !== null && grid.isIsoPosInGrid(ixp, iyp)) {
    //         grid.drawNoHoverTile(ixp, iyp);
    //     }
    //     ixp = null;
    //     iyp = null;
    // }

    // if (ixst !== null && iyst !== null) {
    //     if (grid.isIsoPosInGrid(ixst, iyst)) {
    //         grid.drawHoverTile(ixst, iyst);
    //     }
    // }
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