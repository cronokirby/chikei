// Maybe we'll use the native BigInt one day, but a polyfill is ok for now
import JSBI from 'jsbi';

/**
 * Represents a generic interface over random number generation.
 *
 * This offers a similar interface to JavaScript's standard number generation
 * facilities, with the exception that we can seed the generator. Seeding the generator
 * allows to have reproducable sequences of numbers, since we will always get
 * the same sequence from the same starting seed.
 */
export interface PRNG {
  /**
   * Set the seed of this generator.
   *
   * The behavior of a generator is undefined before a seed is provided!
   *
   * After this seed is set, this generator will output the same sequence of numbers
   * starting from that point. Resetting the seed will cause a repeat of that sequence
   * of numbers.
   *
   * @param seed can be any number
   */
  seedWith(seed: number): void;
  /**
   * Generate the next number in the random sequence
   *
   * @returns a random number in the range [0, 1[
   */
  advance(): number;
}

/**
 * This is a https://en.wikipedia.org/wiki/Linear_congruential_generator
 *
 * The idea is that next = A * past + constant, modulo some factor m. The neat thing
 * about the parameters given here by Knuth is that we do the operations modulo 2^64,
 * which is easy to implement in hardware.
 *
 * LCGs have a few disadvantages, but work ok for our purposes.
 */
class KnuthLCG implements PRNG {
  private static A = JSBI.BigInt('6364136223846793005');
  private static C = JSBI.BigInt('1442695040888963407');

  private _state = JSBI.BigInt(0);

  seedWith(seed: number) {
    this._state = JSBI.BigInt(seed);
  }

  advance() {
    const next = JSBI.asUintN(
      64,
      JSBI.add(JSBI.multiply(KnuthLCG.A, this._state), KnuthLCG.C),
    );
    this._state = next;
    return JSBI.toNumber(next) / 2 ** 64;
  }
}

/**
 * The default random number generator
 *
 * This is the one you should use, basically.
 */
export class DefaultPRNG extends KnuthLCG {}
