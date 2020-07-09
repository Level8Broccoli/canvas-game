import {
  loadLevel,
  loadKeys,
  loadSprites
} from "./loaders.js";
import Compositor from "./Compositor.js";

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

function createBackgroundLayer(background, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = GAME_WIDTH * TILE_SIZE;
  buffer.height = GAME_HEIGHT * TILE_SIZE;

  background.forEach((row, y) => {
    row.forEach((tile, x) => {
      drawBackground(tile, x, y, buffer.getContext('2d'), sprites);
    });
  });

  return function drawBackgroundLayer(ctx) {
    ctx.drawImage(buffer, 0, 0);
  };
}

function createPlayerLayer(sprites, pos) {
  return function drawPlayerLayer(ctx) {
    sprites.drawTile('star', ctx, pos.x, pos.y);
  };
}

Promise.all([
  loadSprites(TILE_SIZE),
  loadKeys(),
  loadLevel('1-1')
]).then(([sprites, map, level]) => {
  const comp = new Compositor();
  sprites.defineAllSprites(map);

  const backgroundLayer = createBackgroundLayer(level.background, sprites);
  comp.layers.push(backgroundLayer);

  const playerPos = {
    x: 2,
    y: 2,
  };
  const playerLayer = createPlayerLayer(sprites, playerPos);
  comp.layers.push(playerLayer);


  function update() {
    comp.draw(ctx);

    playerPos.x += 0.2;
    playerPos.y += 0.2;
    requestAnimationFrame(update);
  }
  update();
});
