import * as Benchmark from 'benchmark'
import { Type as t } from '../src'

// tests from `io-ts` by @gcanti
// https://github.com/gcanti/io-ts/blob/master/perf/index.ts

/*
version: 1.0.0-beta.3
space-object (good) x 20,846 ops/sec ±0.47% (82 runs sampled)
space-object (bad) x 15,286 ops/sec ±6.12% (74 runs sampled)
*/

const suite = new Benchmark.Suite()

const Vector = t.tuple(t.number(), t.number(), t.number())

const Asteroid = t.struct({
  type: t.literal('asteroid'),
  location: Vector,
  mass: t.number()
})

const Planet = t.struct({
  type: t.literal('planet'),
  location: Vector,
  mass: t.number(),
  population: t.number(),
  habitable: t.boolean()
})

const Rank = t.anyOf(
  t.literal('captain'),
  t.literal('first mate'),
  t.literal('officer'),
  t.literal('ensign')
)

const CrewMember = t.struct({
  name: t.string(),
  age: t.number(),
  rank: Rank,
  home: Planet
})

const Ship = t.struct({
  type: t.literal('ship'),
  location: Vector,
  mass: t.number(),
  name: t.string(),
  crew: t.list(CrewMember)
})

const T = t.anyOf(Asteroid, Planet, Ship)

suite
  .add('space-object (good)', {
    defer: true,
    fn: function (deferred: any) {
      (async () => {
        await T.decode({
          type: 'ship' as const,
          location: [1, 2, 3],
          mass: 4,
          name: 'foo',
          crew: [
            {
              name: 'bar',
              age: 44,
              rank: 'captain' as const,
              home: {
                type: 'planet',
                location: [5, 6, 7],
                mass: 8,
                population: 1000,
                habitable: true
              }
            }
          ]
        })
      })()
      .then(() => deferred.resolve())
    }
  })
  .add('space-object (bad)', {
    defer: true,
    fn: function (deferred: any) {
      (async () => {
        try {
          await T.decode({
            type: 'ship',
            location: [1, 2, 3],
            mass: 4,
            name: 'foo',
            crew: [
              {
                name: 'bar',
                age: 44,
                rank: 'captain',
                home: {
                  type: 'planet',
                  location: [5, 6, 7],
                  mass: 8,
                  population: 'a' as any,
                  habitable: true
                }
              }
            ]
          })

        } catch (err) {
          // do nothing
        }
      })()
      .then(() => deferred.resolve())
    }
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
