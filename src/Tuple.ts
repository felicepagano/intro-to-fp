type Tuple<A, B> = [A, B];

const map = <A, B, C>(f: (a: A) => C, value: Tuple<A, B>): Tuple<C, B> => [f(value[0]), value[1]];
const map2 = <A, B, C>(f: (a: B) => C, value: Tuple<A, B>): Tuple<A, C> => [value[0], f(value[1])];
const bimap = <L, A, M, B>(fla: Tuple<L, A>, f: (l: L) => M, g: (a: A) => B): Tuple<M, B> => [f(fla[0]), g(fla[1])];

const of = <A>(a: A): Tuple<A, number> => [a, 0];

const concatNumber = (x: number, y: number) => x + y;
const concatString = (x: string, y: string) => x + y;

const ap = <A, C>(fab: Tuple<(a: A) => C, number>, value: Tuple<A, number>): Tuple<C, number> =>
 [fab[0](value[0]), concatNumber(fab[1], value[1])];

const l = (s: string) => s.length;
const double = (i: number) => i * 2;

import { expect } from "chai";
import "mocha";

describe("Tuple functor", () => {

  it("should return [5,2]", () => {
    const result = map2(double, map(l, ["Pippo", 1]));
    expect(result).to.eql([5, 2]);
  });

});

describe("Tuple bifunctor", () => {

  it("bimap(x, identity, identity) = x", () => {
    const result = bimap(["Pippo", 1], (s: string) => s, (i: number) => i);
    expect(result).to.eql(["Pippo", 1]);
  });

  it("should return [5,2]", () => {
    const result = bimap(["Pippo", 1], l, double);
    expect(result).to.eql([5, 2]);
  });

});

describe("Tuple Applicative Functor", () => {

  it("should return [2, 1]", () => {
    const doubleTuple = ap(of(double), [1, 1]);
    expect(doubleTuple).to.eql([2, 1]);
  });

});
