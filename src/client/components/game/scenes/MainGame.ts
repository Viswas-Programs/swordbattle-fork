/* eslint-disable max-len */
import Phaser from 'phaser';
import Ws from '../classes/Ws';
import getServerUrl from '../helpers/getServerUrl';
// eslint-disable-next-line no-unused-vars

export default class MainGame extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  ws: Ws;
  connectingText: Phaser.GameObjects.Text;
  constructor() {
    super('maingame');
  }

   preload() {
    this.background = this.add.image(0, 0, 'title').setOrigin(0).setScrollFactor(0, 0).setScale(1);
    
    this.connectingText = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Connecting...', { fontSize: '64px', color: '#fff', fontFamily:'Hind Madurai, Arial' }).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setScale(1);
  
    this.tweens.add({
      targets: this.connectingText,
      alpha: 0,
      duration: 1000,
      ease: 'Linear',
      yoyo: true,
      repeat: -1
    });
    
  }

   create() {

    this.ws = new Ws(getServerUrl());

    this.ws.on('connect_error', (reason: string) => {
      this.events.emit('crash', reason);
    });


   }

  update() {
  }
}