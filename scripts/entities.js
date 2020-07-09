import Entity from "./Entity.js";

export function createPlayerMarker(sprites) {
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
  return playerMarker;
}
