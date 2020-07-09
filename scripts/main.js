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
import {
  createPlayerMarker
} from "./entities.js";
import Timer from "./Timer.js";

const env = {
  TILE_SIZE: 32,
  GAME_WIDTH: 12,
  GAME_HEIGHT: 12,
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

  const playerMarker = createPlayerMarker(sprites);
  const playerLayer = createPlayerLayer(playerMarker);
  playerMarker.pos.set(5 * env.TILE_SIZE, 5 * env.TILE_SIZE);
  playerMarker.vel.set(200, -600);
  comp.layers.push(playerLayer);

  const gravity = 30;

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    comp.draw(ctx);
    playerMarker.update(deltaTime);
    playerMarker.vel.y += gravity;
  }

  timer.start();
});
