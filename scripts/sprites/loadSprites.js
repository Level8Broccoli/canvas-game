import SpriteSheet from './SpriteSheet.js';

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  });
}

export function loadSprites(size, url = '/assets/tileset.png') {
  return loadImage(url).then(image => {
    const sprites = new SpriteSheet(image, size, size);
    return sprites;
  });
}
