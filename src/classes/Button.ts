import { GameObjects } from 'phaser';

const defaultStyle = {
  fontSize: '32px',
  color: '#ffffff',
  backgroundColor: '#000000',
};

export class Button extends GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: GameObjects.TextStyle,
    callback: () => void
  ) {
    super(scene, x, y, text, { ...style, ...defaultStyle });

    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', callback);

    scene.add.existing(this);
  }
}
