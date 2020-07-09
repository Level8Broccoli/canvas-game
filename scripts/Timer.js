export default class Timer {
  constructor(deltaTime = 1 / 60) {
    let accumuluatedTime = 0;
    let lastTime = 0;

    this.updateProxy = (time) => {
      accumuluatedTime += (time - lastTime) / 1000;

      while (accumuluatedTime > deltaTime) {
        this.update(deltaTime);
        accumuluatedTime -= deltaTime;
      }
      lastTime = time;
      this.enqueue();
    };
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }
}
