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
                if (random() > 0.5) {
                    this.tiles[i][j] = new GrassTile(i, j, this.tileSize);
                } else {
                    this.tiles[i][j] = new WaterTile(i, j, this.tileSize);
                }
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
