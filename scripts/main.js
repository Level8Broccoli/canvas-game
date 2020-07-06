import SpriteSheet from './SpriteSheet.js';
import {
  loadImage,
  loadLevel
} from "./loaders.js";

function drawBackground(background, ctx, sprites) {
  background.ranges.forEach(({
    start: [x1, y1],
    end: [x2, y2]
  }) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, ctx, x, y);
      }
    }
  });
}

const TILE_SIZE = 32;
const GAME_WIDTH = 24;
const GAME_HEIGHT = 24;
const TILESET_URL = '/assets/tileset.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH * TILE_SIZE;
canvas.height = GAME_HEIGHT * TILE_SIZE;

loadImage(TILESET_URL)
  .then(image => {
    const sprites = new SpriteSheet(image, TILE_SIZE, TILE_SIZE);
    sprites.define('grass', 2, 11);
    sprites.define('desert', 2, 17);
    sprites.define('water', 20, 5);

    loadLevel('1-1').then(level => {
      level.backgrounds.forEach(background => {
        drawBackground(background, ctx, sprites);
      });
    });
  });
