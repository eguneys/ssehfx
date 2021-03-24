import { Displace, Effect } from './types';
import Ctrl from './ctrl';

export default class Api {

  ctrl: Ctrl
  
  constructor(ctrl: Ctrl) {
    this.ctrl = ctrl;
  }

  displace(d: Displace, effect: Effect) {
    this.ctrl.add(d, effect);
  }
  
}
