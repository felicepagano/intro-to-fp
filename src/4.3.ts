type Decoder<A> = (s: string) => A;
type Reader<E, A> = (e: E) => A;

const map = <A, B>(f: (a: A) => B, value: Decoder<A>): Decoder<B> => (s: string) => f(value(s));

const map2 = <E, A, B>(f: (a: A) => B, value: Reader<E, A>): Reader<E, B> => (e: E): B => f(value(e));

import { expect } from "chai";
import "mocha";

describe("Decoder functor", () => {

  const decoder: Decoder<number> = (s: string) => s.length;
  const reader: Reader<string, number> = (s: string) => s.length;
  const Ff = (i: number) => i * i;

  it("should return 25 for map", () => {
    const result = map(Ff, decoder)("pippo");
    expect(result).to.equal(25);
  });

  it("should return 25 for map2", () => {
    const result = map2(Ff, decoder)("pippo");
    expect(result).to.equal(25);
  });

});
