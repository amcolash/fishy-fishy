import { GameObjects, Scene } from 'phaser';
import { GameState } from '../data/GameState';
import { Button } from './Button';
import { formatNumber } from '../util/format';

export const upgradeList = ['rod1', 'rod2', 'rod3', 'rod4', 'rod5', 'fisher1'] as const;
export type Upgrade = (typeof upgradeList)[number];
export type UpgradeData = {
  current: number;
  max: number;
  cost: number;
  production: number;
};
export type UpgradeMap = {
  [K in Upgrade]: UpgradeData;
};

export function getCost(upgrade: UpgradeData): number {
  if (upgrade.current === 0) return upgrade.cost;
  return Math.floor(upgrade.cost * Math.pow(1.1, upgrade.current));
}

export const defaultUpgrades: UpgradeMap = {
  rod1: { current: 0, max: 100, cost: 10, production: 1 },
  rod2: { current: 0, max: 100, cost: 100, production: 5 },
  rod3: { current: 0, max: 100, cost: 1000, production: 20 },
  rod4: { current: 0, max: 100, cost: 10000, production: 100 },
  rod5: { current: 0, max: 100, cost: 100000, production: 500 },
  fisher1: { current: 0, max: 100, cost: 1000000, production: 2500 },
};

export class Upgrades extends GameObjects.Group {
  gameState: GameState;
  buttons: Button[] = [];

  constructor(scene: Scene, gameState: GameState) {
    super(scene, { runChildUpdate: true });
    this.gameState = gameState;

    const upgrades = Object.entries(this.gameState.upgrades);
    for (let i = 0; i < upgrades.length; i++) {
      const upgrade = upgrades[i];

      this.add(
        this.scene.add
          .image(180, 220 + 85 * i, i === 5 ? 'fisher_icon' : 'gear', i)
          .setScale(2)
          .setOrigin(0, 0.5)
      );

      const button = new Button(this.scene, 270, 220 + 85 * i, upgrade[0], () =>
        this.gameState.upgrade(upgrade[0] as Upgrade)
      ).setOrigin(0, 0.5);
      this.buttons.push(button);
      this.add(button);
    }

    scene.add.existing(this);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons[i] as Button;
      const upgrade = this.gameState.upgrades[upgradeList[i]];
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
}
