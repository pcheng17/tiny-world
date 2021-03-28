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
        this.topColor = "#ffffff";
        this.sideColor = "#ffffff";
        this.verts = [
            [this.x, this.y],
            [this.x + this.size, this.y + this.size / 2],
            [this.x, this.y + this.size],
            [this.x - this.size, this.y + this.size / 2],
            [this.x - this.size, this.y + 1.5 * this.size],
            [this.x, this.y + 2 * this.size],
            [this.x + this.size, this.y + 1.5 * this.size]
        ];
    }

    /**
     * Draw the default look of the tile, including the thickness of the tile
     */
    draw() {
        push();
        strokeWeight(1);
        stroke(20);
        beginShape(QUADS);
        fill(this.topColor);
        this.topFace();
        fill(this.sideColor);
        this.leftFace();
        fill(this.sideColor);
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
        strokeWeight(1);
        stroke(20);
        beginShape(QUADS);
        fill(this.topColor);
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
        strokeWeight(1);
        stroke(20);
        beginShape(QUADS);
        fill(this.topColor);
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

class GrassTile extends Tile {
    constructor(ix, iy, size) {
        super(ix, iy, size);
        this.name = "Grass";
        this.topColor = "#63e12a";
        this.sideColor = "#428434";
        this.dirtColor = "#9e5422";
    }

    leftFace() {
        push();
        vertex(this.verts[3][0], this.verts[3][1]);
        vertex(this.verts[4][0], this.verts[4][1] - 0.8 * this.size);
        vertex(this.verts[5][0], this.verts[5][1] - 0.8 * this.size);
        vertex(this.verts[2][0], this.verts[2][1]);
        fill(this.dirtColor);
        vertex(this.verts[4][0], this.verts[4][1] - 0.8 * this.size);
        vertex(this.verts[4][0], this.verts[4][1]);
        vertex(this.verts[5][0], this.verts[5][1]);
        vertex(this.verts[5][0], this.verts[5][1] - 0.8 * this.size);
        pop();
    }

    rightFace() {
        push();
        vertex(this.verts[2][0], this.verts[2][1]);
        vertex(this.verts[5][0], this.verts[5][1] - 0.8 * this.size);
        vertex(this.verts[6][0], this.verts[6][1] - 0.8 * this.size);
        vertex(this.verts[1][0], this.verts[1][1]);
        fill(this.dirtColor);
        vertex(this.verts[5][0], this.verts[5][1] - 0.8 * this.size);
        vertex(this.verts[5][0], this.verts[5][1]);
        vertex(this.verts[6][0], this.verts[6][1]);
        vertex(this.verts[6][0], this.verts[6][1] - 0.8 * this.size);
        pop();
    }
}

class WaterTile extends Tile {
    constructor(ix, iy, size) {
        super(ix, iy, size);
        this.name = "Water";
        this.topColor = "#00b1ff";
        this.sideColor = "#007cad";
    }

    topFace() {
        vertex(this.verts[0][0], this.verts[0][1] + 7);
        vertex(this.verts[1][0], this.verts[1][1] + 7);
        vertex(this.verts[2][0], this.verts[2][1] + 7);
        vertex(this.verts[3][0], this.verts[3][1] + 7);
    }

    leftFace() {
        vertex(this.verts[3][0], this.verts[3][1] + 7);
        vertex(this.verts[4][0], this.verts[4][1]);
        vertex(this.verts[5][0], this.verts[5][1]);
        vertex(this.verts[2][0], this.verts[2][1] + 7);
    }

    rightFace() {
        vertex(this.verts[2][0], this.verts[2][1] + 7);
        vertex(this.verts[5][0], this.verts[5][1]);
        vertex(this.verts[6][0], this.verts[6][1]);
        vertex(this.verts[1][0], this.verts[1][1] + 7);
    }
}