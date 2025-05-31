import { getCost, Upgrade, UpgradeMap } from '../classes/Upgrades';
import { fibonacci } from '../util/util';

const fib = fibonacci(1000);

export class GameState {
  fish: number = 1000000;
  fishProduction: number = 0;
  totalFish: number = 0;
  prestigeLevel: number = 0;

  nextUpdate: number = 0;
  tickMultiplier: number = 50000000;
  upgrades: UpgradeMap;

  constructor() {
    this.upgrades = {
      rod1: { current: 0, max: 10, cost: 10, production: 1 },
      rod2: { current: 0, max: 10, cost: 100, production: 5 },
      rod3: { current: 0, max: 10, cost: 1000, production: 20 },
      rod4: { current: 0, max: 10, cost: 10000, production: 100 },
      rod5: { current: 0, max: 10, cost: 100000, production: 500 },
      fisher1: { current: 0, max: 10, cost: 1000000, production: 2500 },
    };
    this.setNextUpdate();
  }

  setNextUpdate() {
    this.nextUpdate = Date.now() + 1000 / this.tickMultiplier;
  }

  update() {
    const now = Date.now();
    if (now >= this.nextUpdate) {
      this.setNextUpdate();

      this.updateProduction();
      this.fish += this.fishProduction;
      this.totalFish += this.fishProduction;
    }
  }

  updateProduction() {
    this.fishProduction = this.getProduction();
  }

  getProduction(): number {
    let production = 0;
    for (const upgrade of Object.values(this.upgrades)) {
      production += upgrade.current * upgrade.production;
    }
    return production * (this.prestigeLevel + 1);
  }

  upgrade(upgrade: Upgrade) {
    const upgradeData = this.upgrades[upgrade];
    const cost = getCost(upgradeData);
    if (upgradeData.current < upgradeData.max && this.fish >= cost) {
      this.fish -= cost;
      upgradeData.current++;
      this.updateProduction();
    }
  }

  getPrestigeCost(level?: number): number {
    const baseCost = 1000000;
    return fib[level || this.prestigeLevel] * baseCost;
  }

  getPrestigeBonus(): number {
    let bonus = 0;
    let level = this.prestigeLevel;
    let fish = this.fish;

    while (fish >= this.getPrestigeCost(level)) {
      bonus++;
      fish -= this.getPrestigeCost(level);
      level++;
    }

    return bonus;
  }

  prestige() {
    if (this.fish < this.getPrestigeCost()) return;

    this.prestigeLevel += this.getPrestigeBonus();
    this.fish = 10;
    this.totalFish = 0;

    for (const upgrade of Object.values(this.upgrades)) {
      upgrade.current = 0;
    }

    this.updateProduction();
  }
}
