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
import Entity from "./Entity.js";

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

  const playerMarker = new Entity();
  playerMarker.pos.set(2, 2);
  playerMarker.vel.set(.2, -.1);
  playerMarker.update = function updateMario() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };
  playerMarker.draw = function drawPlayerMarker(ctx) {
    sprites.drawTile('star', ctx, this.pos.x, this.pos.y);
  };

  const gravity = 0.05;

  const playerLayer = createPlayerLayer(playerMarker);
  comp.layers.push(playerLayer);


  function update() {
    comp.draw(ctx);
    playerMarker.update();

    playerMarker.vel.y += gravity;
    requestAnimationFrame(update);
  }
  update();
});
