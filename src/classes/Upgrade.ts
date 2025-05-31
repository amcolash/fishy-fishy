import { GameObjects } from 'phaser';
import { Button } from './Button';
import { getCost, UpgradeType, UpgradeData } from './Upgrades';
import { GameState } from '../data/GameState';

import { Main } from '../scenes/Main';
import { formatNumber } from '../util/format';

export class Upgrade extends GameObjects.Container {
  gameState: GameState;
  icon: GameObjects.Image;
  button: Button;
  upgrade: [UpgradeType, UpgradeData];

  constructor(scene: Phaser.Scene, x: number, y: number, upgrade: [UpgradeType, UpgradeData]) {
    super(scene);
    this.scene = scene;
    this.scene.add.existing(this);

    this.gameState = (scene as Main).gameState;

    this.setPosition(x, y);

    this.upgrade = upgrade;
    const name = upgrade[0];
    const data = upgrade[1];
    const { icon } = data;

    this.icon = this.scene.add.image(0, 0, icon.key, icon.frame).setScale(2).setOrigin(0, 0.5);
    this.button = new Button(this.scene, 90, 0, upgrade[0], () => this.gameState.upgrade(name)).setOrigin(0, 0.5);

    this.add([this.icon, this.button]);
  }

  preUpdate(): void {
    const upgrade = this.upgrade[1];
    const button = this.button;

    const cost = getCost(upgrade);
    const { current, max } = upgrade;
    const production = upgrade.production * (this.gameState.prestigeLevel + 1);
    const maxed = current >= max;
    button.setText(
      `${current}${maxed ? ' [max]' : ''} - ${maxed ? 'Production:' : `Cost: ${formatNumber(cost)} - Production: [+${formatNumber(production)}]`} ${formatNumber(current * production)}`
    );

    let color = '#00ff00';

    if (upgrade.current >= upgrade.max) {
      color = '#666666';
      button.setDisabled(true);
    } else if (this.gameState.fish < cost) {
      color = '#ff0000';
      button.setDisabled(true);
    } else button.setDisabled(false);

    button.setStyle({ color });
  }
}
