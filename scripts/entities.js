import Entity from "./Entity.js";

export function createPlayerMarker(sprites) {
  const playerMarker = new Entity();
  playerMarker.update = function updateMario(deltaTime) {
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
  };
  playerMarker.draw = function drawPlayerMarker(ctx) {
    sprites.draw('star', ctx, this.pos.x, this.pos.y);
  };
  return playerMarker;
}
