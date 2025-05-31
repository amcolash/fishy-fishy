import { GameObjects, Scene } from 'phaser';
import { GameState } from '../data/GameState';
import { Upgrade } from './Upgrade';

export const upgradeList = ['rod1', 'rod2', 'rod3', 'rod4', 'rod5', 'fisher1'] as const;
export type UpgradeType = (typeof upgradeList)[number];
export type UpgradeData = {
  current: number;
  max: number;
  cost: number;
  production: number;
  icon: { key: string; frame?: string | number };
};
export type UpgradeMap = {
  [K in UpgradeType]: UpgradeData;
};

export function getCost(upgrade: UpgradeData): number {
  if (upgrade.current === 0) return upgrade.cost;
  return Math.floor(upgrade.cost * Math.pow(1.1, upgrade.current));
}

export const defaultUpgrades: UpgradeMap = {
  rod1: { current: 0, max: 100, cost: 10, production: 1, icon: { key: 'gear', frame: 0 } },
  rod2: { current: 0, max: 100, cost: 100, production: 5, icon: { key: 'gear', frame: 1 } },
  rod3: { current: 0, max: 100, cost: 1000, production: 20, icon: { key: 'gear', frame: 2 } },
  rod4: { current: 0, max: 100, cost: 10000, production: 100, icon: { key: 'gear', frame: 3 } },
  rod5: { current: 0, max: 100, cost: 100000, production: 500, icon: { key: 'gear', frame: 4 } },
  fisher1: { current: 0, max: 100, cost: 1000000, production: 2500, icon: { key: 'fisher_icon' } },
};

export class Upgrades extends GameObjects.Group {
  gameState: GameState;
  upgradeUI: Upgrade[] = [];

  constructor(scene: Scene, gameState: GameState) {
    super(scene, { runChildUpdate: true });
    this.gameState = gameState;

    const upgrades = Object.entries(this.gameState.upgrades) as [UpgradeType, UpgradeData][];
    for (let i = 0; i < upgrades.length; i++) {
      const upgrade = upgrades[i];
      this.upgradeUI.push(new Upgrade(scene, 100, 250 + i * 75, upgrade));
    }

    scene.add.existing(this);
  }
}
