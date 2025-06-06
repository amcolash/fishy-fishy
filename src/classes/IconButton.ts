import { GameObjects } from 'phaser';

export class IconButton extends GameObjects.Image {
  disabled: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    callback: () => void,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.setOrigin(0);

    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', callback);
    this.on('pointerover', () => {
      this.setTint(0xaaaaaa);
    });
    this.on('pointerout', () => {
      this.setTint(0xffffff);
    });

    scene.add.existing(this);
  }

  setDisabled(disabled: boolean) {
    if (this.disabled === disabled) return;

    this.disabled = disabled;
    this.setTint(disabled ? 0xaaaaaa : 0xffffff);

    if (disabled) this.removeInteractive();
    else this.setInteractive({ useHandCursor: true });
  }
}
