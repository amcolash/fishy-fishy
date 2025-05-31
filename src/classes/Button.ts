import { GameObjects, Types } from 'phaser';
import { fontStyle } from '../util/fonts';

const defaultStyle: Types.GameObjects.Text.TextStyle = {
  ...fontStyle,
  color: '#ffffff',
  backgroundColor: '#000000',
  padding: { x: 20, y: 10 },
};

export class Button extends GameObjects.Text {
  disabled: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    callback: () => void,
    style?: Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, text, { ...style, ...defaultStyle });

    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', callback);
    this.on('pointerover', () => {
      this.setStyle({ backgroundColor: '#222222' });
    });
    this.on('pointerout', () => {
      this.setStyle({ backgroundColor: '#000000' });
    });

    scene.add.existing(this);
  }

  setDisabled(disabled: boolean) {
    if (this.disabled === disabled) return;

    this.disabled = disabled;
    this.setStyle({ backgroundColor: disabled ? '#333333' : '#000000' });

    if (disabled) this.removeInteractive();
    else this.setInteractive({ useHandCursor: true });
  }
}
