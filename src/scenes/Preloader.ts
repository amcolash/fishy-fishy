import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {}

  preload() {
    this.load.spritesheet('gear', 'fishing_gear.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    this.scene.start('Main');
  }
}
