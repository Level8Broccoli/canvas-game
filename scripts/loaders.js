export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  });
}

export function loadLevel(name) {
  return fetch(`/levels/${name}.json`).then(r => r.json());
}

export function loadKeys(url = '/levels/level-key.json') {
  return fetch(url).then(r => r.json());
}
