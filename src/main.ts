import { Game, Scale, Types } from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { Main } from './scenes/Main';

const config: Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: 1280,
  height: 720,
  parent: 'app',
  backgroundColor: 0x101724,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Scale.CENTER_HORIZONTALLY,
  },
  scene: [Boot, Preloader, Main],
  pixelArt: true,
  roundPixels: true,
  antialias: false,
};

new Game(config);
