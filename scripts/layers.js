function drawBackground(type, x, y, ctx, sprites) {
  sprites.drawTile(type, ctx, x, y);
}

export function createBackgroundLayer(background, sprites, env) {
  const buffer = document.createElement('canvas');
  buffer.width = env.GAME_WIDTH * env.TILE_SIZE;
  buffer.height = env.GAME_HEIGHT * env.TILE_SIZE;

  background.forEach((row, y) => {
    row.forEach((tile, x) => {
      drawBackground(tile, x, y, buffer.getContext('2d'), sprites);
    });
  });

  return function drawBackgroundLayer(ctx) {
    ctx.drawImage(buffer, 0, 0);
  };
}

export function createPlayerLayer(sprites, pos) {
  return function drawPlayerLayer(ctx) {
    sprites.drawTile('star', ctx, pos.x, pos.y);
  };
}
