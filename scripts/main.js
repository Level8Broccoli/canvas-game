import SpriteSheet from './sprites/SpriteSheet.js';
import {
  loadImage,
  loadLevel,
  loadKeys
} from "./loaders.js";

function drawBackground(type, x, y, ctx, sprites) {
  sprites.drawTile(type, ctx, x, y);
}

function loadSprites() {
  return loadImage(TILESET_URL).then(image => {
    const sprites = new SpriteSheet(image, TILE_SIZE, TILE_SIZE);
    return sprites;
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

Promise.all([
  loadSprites(),
  loadKeys(),
  loadLevel('1-1')
]).then(([sprites, keys, level]) => {

  sprites.defineSprites(keys);


  level.background.forEach((row, y) => {
    row.forEach((tile, x) => {
      drawBackground(tile, x, y, ctx, sprites);
    });
  });
});
