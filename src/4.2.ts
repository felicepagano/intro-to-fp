type Tuple<A, B> = [A, B]

const map = <A, B, C>(f: (a: A) => C, value: Tuple<A, B>): Tuple<C, B> => [f(value[0]), value[1]];
const map2 = <A, B, C>(f: (a: B) => C, value: Tuple<A, B>): Tuple<A, C> => [value[0], f(value[1])];

const double = (i: number) => i*2;
const l = (s: String)=>s.length;

import { expect } from 'chai';
import 'mocha';

describe('Tuple functor', () => {

  it('should return [5,2]', () => {
    const result = map2(double, map(l, ["Pippo", 1]))
    expect(result).to.eql([5,2]);
  });

});