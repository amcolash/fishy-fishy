import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {}

  preload() {
    this.load.spritesheet('gear', 'fishing_gear.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('pier', 'pier.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('water', 'water.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('boat', 'boat.png');
    this.load.image('shack', 'shack.png');
    this.load.image('fisher_icon', 'fisher_icon.png');
  }

  create() {
    this.scene.start('Main');
  }
}
