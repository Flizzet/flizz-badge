'use babel';

import FlizzBadgeView from './flizz-badge-view';
import { CompositeDisposable } from 'atom';

export default {

  flizzBadgeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.flizzBadgeView = new FlizzBadgeView(state.flizzBadgeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.flizzBadgeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'flizz-badge:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.flizzBadgeView.destroy();
  },

  serialize() {
    return {
      flizzBadgeViewState: this.flizzBadgeView.serialize()
    };
  },

  toggle() {
    // console.log('FlizzBadge was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );


    const badge = document.createElement('div');
    badge.textContent = 'The FlizzBadge package is Alive!';
    badge.classList.add('message');
    this.element.appendChild(badge);
  }

};
