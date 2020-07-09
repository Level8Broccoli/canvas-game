import {
  loadLevel,
  loadKeys,
  loadSprites
} from "./loaders.js";

function drawBackground(type, x, y, ctx, sprites) {
  sprites.drawTile(type, ctx, x, y);
}

const TILE_SIZE = 32;
const GAME_WIDTH = 24;
const GAME_HEIGHT = 24;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH * TILE_SIZE;
canvas.height = GAME_HEIGHT * TILE_SIZE;

Promise.all([
  loadSprites(TILE_SIZE),
  loadKeys(),
  loadLevel('1-1')
]).then(([sprites, map, level]) => {
  sprites.defineAllSprites(map);
  level.background.forEach((row, y) => {
    row.forEach((tile, x) => {
      drawBackground(tile, x, y, ctx, sprites);
    });
  });
});
