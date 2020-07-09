export function loadLevel(name = '1-1') {
  return fetch(`/levels/${name}.json`).then(r => r.json());
}
