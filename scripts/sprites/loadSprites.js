import SpriteSheet from './SpriteSheet.js';

function loadTileset(url = '/assets/tileset.png') {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  });
}

function loadKeys(url = '/scripts/sprites/sprite-map.json') {
  return fetch(url).then(r => r.json());
}

export function loadSprites(size, ) {
  return Promise.all([loadTileset(), loadKeys()])
    .then(([image, map]) => {
      const sprites = new SpriteSheet(image, size, size);
      sprites.defineAllSprites(map);
      return sprites;
    });
}
