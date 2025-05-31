import { getCost, Upgrade } from '../classes/Upgrades';
import { GameState } from '../data/GameState';

export function maxAll(gameState: GameState) {
  const upgrades = Object.entries(gameState.upgrades).reverse();
  for (const upgrade of upgrades) {
    while (getCost(upgrade[1]) <= gameState.fish && upgrade[1].current < upgrade[1].max) {
      gameState.upgrade(upgrade[0] as Upgrade);
    }
  }
}
