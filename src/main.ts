import { Game, Scale, Types } from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { Main } from './scenes/Main';
import { Config } from './util/config';
import { initFps } from './util/stats';

import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

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
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
};

const game = new Game(config);

if (Config.debug) initFps(game);
