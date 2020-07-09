import SpriteSheet from './sprites/SpriteSheet.js';

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  });
}

export function loadLevel(name) {
  return fetch(`/levels/${name}.json`).then(r => r.json());
}

export function loadKeys(url = '/scripts/sprites/sprite-map.json') {
  return fetch(url).then(r => r.json());
}

export function loadSprites(size, url = '/assets/tileset.png') {
  return loadImage(url).then(image => {
    const sprites = new SpriteSheet(image, size, size);
    return sprites;
  });
}
