import Level from "./level.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
    },
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image("tile", "assets/tile.png");
    this.load.image("bg", "assets/bg.jpg");

}

function create() {
    new Level(this);
}