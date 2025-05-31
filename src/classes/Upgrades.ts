import { GameObjects, Scene } from 'phaser';
import { GameState } from '../data/GameState';
import { Button } from './Button';

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

export class Upgrades extends GameObjects.Group {
  gameState: GameState;

  constructor(scene: Scene, gameState: GameState) {
    super(scene, { runChildUpdate: true });
    this.gameState = gameState;

    const upgrades = Object.entries(this.gameState.upgrades);
    for (let i = 0; i < upgrades.length; i++) {
      const upgrade = upgrades[i];
      this.add(
        new Button(this.scene, 100, 300 + 70 * i, upgrade[0], () => this.gameState.upgrade(upgrade[0] as Upgrade))
      );
    }

    scene.add.existing(this);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    const children = this.getChildren();
    for (let i = 0; i < children.length; i++) {
      const button = children[i] as Button;
      const upgrade = this.gameState.upgrades[upgradeList[i]];
      const cost = getCost(upgrade);
      const { current, max } = upgrade;
      const production = upgrade.production * (this.gameState.prestigeLevel + 1);
      const maxed = current >= max;
      button.setText(
        `${upgradeList[i]}: ${current}/${max}${maxed ? ' [max]' : ''} - ${maxed ? 'Production:' : `Cost: ${cost} - Production: [+${production}]`} ${current * production}`
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
