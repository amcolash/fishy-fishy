import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  init() {}

  preload() {}

  create() {
    this.scene.start('Preloader');
  }
}
