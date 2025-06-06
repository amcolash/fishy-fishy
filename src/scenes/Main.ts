import { GameObjects, Scene } from 'phaser';
import { GameState } from '../data/GameState';
import { Upgrades } from '../classes/Upgrades';
import { fontStyle } from '../util/fonts';
import { Button } from '../classes/Button';
import { maxAll } from '../util/debug';
import { formatNumber } from '../util/format';
import { Location } from '../classes/Location';

export class Main extends Scene {
  gameState: GameState;
  text: GameObjects.Text;
  prestige: Button;

  constructor() {
    super('Main');
    this.gameState = new GameState();
    this.gameState.updateProduction();
  }

  create() {
    this.input.keyboard?.on('keydown-M', () => maxAll(this.gameState));

    new Location(this, 0, 0, this.gameState);

    this.text = this.add.text(100, 50, '', fontStyle);
    new Upgrades(this, this.gameState);

    this.prestige = new Button(this, 500, 100, '', () => this.gameState.prestige());
    this.prestige.setVisible(false);
  }

  update() {
    this.gameState.update();
    this.text.setText(
      `Fish: ${formatNumber(this.gameState.fish)}\nProduction: ${formatNumber(this.gameState.fishProduction)}\nPrestige: +${this.gameState.prestigeLevel * 100}%`
    );

    if (this.gameState.fish >= this.gameState.getPrestigeCost()) {
      this.prestige.setVisible(true);
      this.prestige.setText(`Prestige: +${this.gameState.getPrestigeBonus() * 100}% production`);
    } else {
      this.prestige.setVisible(false);
    }
  }
}
