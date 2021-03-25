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
