export class GameState {
  fish: number = 10;
  fishProduction: number = 0;
  lastSecond: number = 0;
  upgrades: {
    rod1: number;
    rod2: number;
    rod3: number;
    rod4: number;
    rod5: number;
    fisher1: number;
  };

  constructor() {
    this.upgrades = {
      rod1: 0,
      rod2: 0,
      rod3: 0,
      rod4: 0,
      rod5: 0,
      fisher1: 0,
    };
    this.lastSecond = Date.now();
  }

  update() {
    const now = Date.now();
    if (now - this.lastSecond >= 1000) {
      this.lastSecond = now;

      this.updateProduction();
      this.fish += this.fishProduction;
    }
  }

  updateProduction() {
    this.fishProduction = this.getProduction();
  }

  getProduction(): number {
    return (
      this.upgrades.rod1 * 1 +
      this.upgrades.rod2 * 5 +
      this.upgrades.rod3 * 20 +
      this.upgrades.rod4 * 100 +
      this.upgrades.rod5 * 500 +
      this.upgrades.fisher1 * 2500
    );
  }
}
