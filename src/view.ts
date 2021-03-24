import { h, vh, vmap, VProp } from 'hhh';
import { nt } from 'nefs';
import * as u from 'uuu';
import { i2, DisplaceEffectView } from './types';
import Ctrl from './ctrl';

export function styleTransform(pos: [number, number]) {
  return (elm: Node) => {
    (elm as HTMLElement).style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
  };
}

export default class View {

  ctrl: Ctrl
  bBounds: u.Sub<ClientRect | undefined>


  constructor(ctrl: Ctrl) {
    this.ctrl = ctrl;
    this.bBounds = new u.Sub<ClientRect | undefined>(undefined);
  }

  vPiece(props: DisplaceEffectView, parentProps: VProp) {

    let v$piece = vh('piece', props, {
      element: ({ orig, dest, i, fPosToTranslate }) =>
        styleTransform(i2(fPosToTranslate(orig),
                          fPosToTranslate(dest),
                          i)),
      klassList: ({ piece }: { piece: nt.Piece }) => [nt.longRole[piece.role], nt.longColor[piece.color]]
    }, [], parentProps);

    return v$piece;
  }

  vEffect(props: VProp, parentProps: VProp) {
    return this.vPiece(props, parentProps)
  }

  vApp() {

    let v$effects = 
      vmap([], 
           this.vEffect.bind(this), {
             fPosToTranslate: (_: nt.Pos) => _ 
           });

    this.bBounds.sub((bounds) => {
      let fPosToTranslate = bounds? u.ffPosToTranslateAbs(bounds): (_: nt.Pos) => _;
      v$effects.updateProp({
        fPosToTranslate
      });
    });

    this.ctrl.effects.sub(_ => 
      v$effects.update(_));

    return vh('div.effects', {}, {
      resize: (bounds) => this.bBounds.pub(bounds)
    }, [
      v$effects
    ]);
  }
  
}
