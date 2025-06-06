import { GameObjects, Scene } from 'phaser';
import { GameState } from '../data/GameState';
import { Upgrade } from './Upgrade';
import GridTable from 'phaser3-rex-plugins/templates/ui/gridtable/GridTable';

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
  rod1: { current: 0, max: 10, cost: 10, production: 1, icon: { key: 'gear', frame: 0 } },
  rod2: { current: 0, max: 100, cost: 100, production: 5, icon: { key: 'gear', frame: 1 } },
  rod3: { current: 0, max: 100, cost: 1000, production: 20, icon: { key: 'gear', frame: 2 } },
  rod4: { current: 0, max: 100, cost: 10000, production: 100, icon: { key: 'gear', frame: 3 } },
  rod5: { current: 0, max: 100, cost: 100000, production: 500, icon: { key: 'gear', frame: 4 } },
  fisher1: { current: 0, max: 100, cost: 1000000, production: 2500, icon: { key: 'fisher_icon' } },
};

export class Upgrades extends GameObjects.Group {
  gameState: GameState;
  table: GridTable;

  prevUpgrades: string;

  constructor(scene: Scene, gameState: GameState) {
    super(scene, { runChildUpdate: true });
    this.gameState = gameState;

    // TODO: Size/position based on game size

    const padding = 20;
    this.table = scene.rexUI.add
      .gridTable({
        x: 1000,
        y: 150,
        width: 250,
        height: 500,
        table: {
          cellHeight: 70,
        },
        space: {
          top: padding,
          right: padding / 1.5,
          bottom: padding,
          left: padding,
        },
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x123456),
        slider: {
          track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x222222),
          thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x334499),
          adaptThumbSize: true,
        },
        scroller: {
          dragRate: 0.75,
        },
        mouseWheelScroller: {
          focus: false,
          speed: 0.2,
        },
        createCellContainerCallback: (cell, cellContainer) => {
          if (!cellContainer) {
            const upgrade = cell.item as [UpgradeType, UpgradeData];
            cellContainer = new Upgrade(scene, upgrade);
          }

          cellContainer.update();

          return cellContainer;
        },

        // items: this.gameState.upgrades,
        items: Object.entries(this.gameState.upgrades),
      })
      .setOrigin(0)
      .layout();

    scene.add.existing(this);
  }
}
