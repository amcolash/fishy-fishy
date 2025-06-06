import { GameObjects } from 'phaser';
import { GameState } from '../data/GameState';

export class Location extends GameObjects.Container {
  background: GameObjects.Rectangle;
  fishers: GameObjects.Image[];
  boat: GameObjects.Image;
  gameState: GameState;

  constructor(scene: Phaser.Scene, x: number, y: number, gameState: GameState) {
    super(scene, x, y);
    scene.add.existing(this);

    this.gameState = gameState;

    this.background = scene.add.rectangle(100, 175, 830, 500, 0x224477).setOrigin(0);
    this.add(this.background);

    this.add(scene.add.rectangle(100, 520, 830, 155, 0x113366).setOrigin(0));

    for (let x = 116; x < 350; x += 32) {
      this.add(scene.add.image(x, 500, 'pier', 0).setFlipX(true));
    }

    this.add(scene.add.image(396, 500, 'pier', 1).setFlipX(true));
    this.add(scene.add.image(428, 500, 'pier', 1).setFlipX(true));

    this.add(scene.add.image(318, 472, 'shack'));

    this.boat = scene.add.image(470, 520, 'boat').setOrigin(0);
    this.add(this.boat);
  }
}
