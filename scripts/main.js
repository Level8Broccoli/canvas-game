import SpriteSheet from './SpriteSheet.js';
import {
  loadImage,
  loadLevel,
  loadKeys
} from "./loaders.js";

function drawBackground(type, x, y, ctx, sprites) {
  sprites.drawTile(type, ctx, x, y);
}

const TILE_SIZE = 32;
const GAME_WIDTH = 24;
const GAME_HEIGHT = 24;
const TILESET_URL = '/assets/tileset.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH * TILE_SIZE;
canvas.height = GAME_HEIGHT * TILE_SIZE;

Promise
  .all([loadImage(TILESET_URL), loadKeys(), loadLevel('1-1')])
  .then(([image, keys, level]) => {
    const sprites = new SpriteSheet(image, TILE_SIZE, TILE_SIZE);
    sprites.define('grass', 2, 11);
    sprites.define('desert', 2, 17);
    sprites.define('water', 20, 5);

    level.background.forEach((row, x) => {
      row.forEach((tileKey, y) => {
        drawBackground(keys[tileKey], x, y, ctx, sprites);
      });
    });

  });
