import { Game, GameObjects, Scene } from 'phaser';
import { GameState } from '../data/GameState';

export class Main extends Scene {
  gameState: GameState;
  text: GameObjects.Text;

  constructor() {
    super('Main');
    this.gameState = new GameState();
    this.gameState.updateProduction();
  }

  create() {
    this.text = this.add.text(100, 100, '', { fontSize: '32px' });
  }

  update() {
    this.gameState.update();
    this.text.setText(`Fish: ${this.gameState.fish}\nProduction: ${this.gameState.fishProduction}`);
  }
}
