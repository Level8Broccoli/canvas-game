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

  const backgroundBuffer = document.createElement('canvas');
  backgroundBuffer.width = GAME_WIDTH * TILE_SIZE;
  backgroundBuffer.height = GAME_HEIGHT * TILE_SIZE;

  level.background.forEach((row, y) => {
    row.forEach((tile, x) => {
      drawBackground(tile, x, y, backgroundBuffer.getContext('2d'), sprites);
    });
  });

  const playerPos = {
    x: 2,
    y: 2,
  };

  function update() {
    ctx.drawImage(backgroundBuffer, 0, 0);
    sprites.drawTile('star', ctx, playerPos.x, playerPos.y);
    playerPos.x += 0.2;
    playerPos.y += 0.2;
    requestAnimationFrame(update);
  }
  update();

});
