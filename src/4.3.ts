type Decoder<A> = (s: string) => A;

const map = <A, B>(f: (a: A) => B, value: Decoder<A>): Decoder<B> => {
    return (s: string) => f(value(s));
};

import { expect } from "chai";
import "mocha";

describe("Decoder functor", () => {

  const decoder: Decoder<number> = (s: string) => s.length;

  it("should return 25", () => {
    const result = map((i: number) => i * i, decoder)("pippo");
    expect(result).to.equal(25);
  });

});
