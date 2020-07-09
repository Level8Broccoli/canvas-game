import {
  loadLevel
} from "./loaders.js";
import {
  loadSprites
} from "./sprites/loadSprites.js";
import {
  createBackgroundLayer,
  createPlayerLayer
} from './layers.js';
import Compositor from "./Compositor.js";

const env = {
  TILE_SIZE: 32,
  GAME_WIDTH: 24,
  GAME_HEIGHT: 24,
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = env.GAME_WIDTH * env.TILE_SIZE;
canvas.height = env.GAME_HEIGHT * env.TILE_SIZE;

Promise.all([
  loadSprites(env.TILE_SIZE),
  loadLevel()
]).then(([sprites, level]) => {
  const comp = new Compositor();

  const backgroundLayer = createBackgroundLayer(level.background, sprites, env);
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
