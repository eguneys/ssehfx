import { nt } from 'nefs';
import easing from './easing';

export type Displace = {
  piece: nt.Piece,
  orig: nt.Pos,
  dest: nt.Pos
}

export type EffectOptions = {
  wait: number,
  repeat: number,
  duration: number,
}

export type Effect = EffectOptions & {
  start: number,
  i: number
}

export type EffectView<A> = A & Effect


export function updateEffect(v: Effect): Effect {
  let start = v.i < 1 ? v.start : Date.now(),
  i = v.i < 1 ? easing.easeInOutCubic(timeElapsedI(v.start, v.duration)): 0,
  repeat = v.i < 1 ? v.repeat : v.repeat - 1;

  return {
    ...v,
    start,
    i,
    repeat
  }
}

export type DisplaceEffectView = EffectView<Displace>

function timeElapsedI(start: number, duration: number) {
  return Math.min(1, (Date.now() - start) / duration);
}

export function i1(a: number,
                   b: number,
                   i: number): number {
  return a + (b - a) * i;
}

export function i2(a: [number, number],
                b: [number, number],
                i: number): [number, number] {
  return [i1(a[0], b[0], i), i1(a[1], b[1], i)];
}
