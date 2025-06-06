import { GameObjects } from 'phaser';
import { getCost, UpgradeType, UpgradeData } from './Upgrades';
import { GameState } from '../data/GameState';

import { Main } from '../scenes/Main';
import { formatNumber } from '../util/format';
import { fontStyle } from '../util/fonts';

export class Upgrade extends GameObjects.Container {
  gameState: GameState;
  icon: GameObjects.Image;

  amount: GameObjects.Text;
  cost: GameObjects.Text;
  production: GameObjects.Text;

  background: GameObjects.Rectangle;

  upgrade: [UpgradeType, UpgradeData];

  constructor(scene: Phaser.Scene, upgrade: [UpgradeType, UpgradeData]) {
    super(scene);
    this.scene = scene;
    this.scene.add.existing(this);

    this.gameState = (scene as Main).gameState;

    this.upgrade = upgrade;
    const name = upgrade[0];
    const data = upgrade[1];
    const { icon } = data;

    const iconSize = 32;
    const padding = iconSize * 0.2;

    // TODO: Use rex plugins for better layout

    this.icon = scene.add.image(padding * 2, padding * 2, icon.key, icon.frame).setOrigin(0);
    this.icon.setSize(iconSize, iconSize);

    this.amount = scene.add.text(padding, iconSize, '', { ...fontStyle, fontSize: 16 });
    this.cost = scene.add.text(iconSize + padding * 5, padding, '', { ...fontStyle, fontSize: 24 });
    this.production = scene.add.text(iconSize + padding * 5, padding * 5, '', { ...fontStyle, fontSize: 12 });

    this.background = scene.add
      .rectangle(-padding * 3, 0, 200, iconSize + padding * 3, 0x112233)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.background.on('pointerdown', () => this.gameState.upgrade(name));

    this.add([this.background, this.icon, this.amount, this.cost, this.production]);
  }

  preUpdate(): void {
    const upgrade = this.upgrade[1];

    const cost = getCost(upgrade);
    const { current, max } = upgrade;
    const production = upgrade.production * (this.gameState.prestigeLevel + 1);
    const maxed = current >= max;

    this.amount.setText(formatNumber(current));
    this.production.setText(`[+${formatNumber(production)}]   ${formatNumber(production * current)} / tick`);
    this.cost.setText(formatNumber(cost));

    let color = 0x227733;

    const button = this.background;
    if (upgrade.current >= upgrade.max) {
      color = 0x666666;
      button.setInteractive({ useHandCursor: true });
    } else {
      button.setInteractive(false);
      if (this.gameState.fish < cost) color = 0x773322;
    }

    button.setFillStyle(color);
  }
}
