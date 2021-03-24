import { Sub } from 'uuu';
import { updateEffect, Displace, Effect, DisplaceEffectView } from './types';

export default class Ctrl {

  animationId: number | undefined
  effects: Sub<Array<DisplaceEffectView>>
  
  constructor() {

    this.effects = new Sub<Array<DisplaceEffectView>>([]);

  }

  updateStep() {

    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
    }

    this.updateEffects();

    if (this.effects.currentValue.length > 0) {
      this.animationId = window.requestAnimationFrame(this.updateStep.bind(this));
    } else {
      this.animationId = undefined;
    }
  }

  updateEffects() {

    this.effects.mutatePub((_: Array<DisplaceEffectView>) =>
      _.map(_ => ({
        ..._,
        ...updateEffect(_)
      })).filter(_ => _.i < 1 || _.repeat > 0));
    
  }

  add(disp: Displace, effect: Effect) {
    this.effects.mutate((_: Array<DisplaceEffectView>) => 
      _.push({
        ...disp,
        ...effect,
        start: Date.now(),
        i: 0
      }));

    this.updateStep();
  }

  
  
}

