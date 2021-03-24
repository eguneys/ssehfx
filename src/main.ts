import { vinit } from 'hhh';
import Api from './api';
import Ctrl from './ctrl';
import View from './view';

export default function app(element: Element) {

  let ctrl = new Ctrl();
  let view = new View(ctrl);
  
  let recons = vinit();
  let $_ = recons(view.vApp());
  
  element.appendChild($_);

  return new Api(ctrl);
}
