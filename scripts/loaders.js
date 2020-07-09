export function loadLevel(name) {
  return fetch(`/levels/${name}.json`).then(r => r.json());
}

export function loadKeys(url = '/scripts/sprites/sprite-map.json') {
  return fetch(url).then(r => r.json());
}
