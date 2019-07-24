# Gwen Coder

*__WARNING__: Still in development, __not suitable for production__*

### Declarative type-safe data decoding, encoding and run-time assertions for JS

Gwen Coder allows you to declaratively define complex types for both TypeScript during compile-time and JavaScript for run-time checks. This module is primarily aimed at NodeJS backends for creating a type-safe backend service.

## Install

```sh
npm i -S gwen-coder
```

## Usage

### Composing a Transcoder

A Transcoder is an object that represents a type. You can compose your type like this:

```ts
import { Type } from 'gwen-coder'

// compose Person
const Person = Type.struct({
    name: Type.string(),
    email: Type.string(),
    age: Type.nullable(Type.integer()),
    active: Type.boolean(),
    scores: Type.list(Type.number())
    created: Type.dateTime(),
    updated: Type.dateTime()
})
```

### Declaring a Type Alias

```ts
type Person = Type<typeof Person>
```

This is the same as writing:

```ts
interface Person {
    name: string
    email: string
    age: number | null
    active: boolean
    scores: number[]
    created: Date
    updated: Date
}
```

### Type Assertion

You can check if your data conforms to a type at run-time. In the following example,
the data will pass the check and be assigned to `person`.

```ts
const validPerson = {
    name: 'Gwen',
    email: 'gwen@example.com',
    age: null,
    active: true,
    scores: [],
    created: new Date(),
    updated: new Date()
}

const person = await Person.check(validPerson)
```

The following example will fail and an `AssertionError` will be thrown:

```ts
const invalidPerson = {
    name: 'Gwen',
    age: null,          // <-- missing field `email`
    active: 'true',     // <-- not boolean
    scores: [],
    created: new Date(),
    updated: new Date()
}

const person = await Person.check(validPerson) // <-- throws
```

### Decoding and Encoding

Transcoders can be used to transform data from and to JSON supported types for transmission.

```ts
const Person = Type.struct({
    name: Type.string(),
    joined: Type.dateTime()
})
```

The transcoder shown above represents the following types:

```ts
// json encoded type
interface PersonJSON {
    name: string
    joined: string // ISO date-time string
}

const json: PersonJSON = {
    name: 'Gwen',
    joined: '2019-07-24T17:25:48.443Z'
}

// run-time type
interface Person {
    name: string
    joined: Date
    // ^ DateTimeTranscoder automatically de-serializes and serializes dates
}

const person: Person = await Person.decode(personJSON)
const personJSON: PersonJSON = await Person.encode(person)
```

## Transcoder API

A Transcoder interface is defined as follows:

```ts
interface Transcoder<Type, EncodedType> {
  check(data: Type, options?: CheckingOptions): Type | Promise<Type>
  decode(data: EncodedType, options?: DecodingOptions): Type | Promise<Type>
  encode(data: Type, options?: EncodingOptions): EncodedType | Promise<EncodedType>
}
```

Transcoders for JSON supported types are also referred to as Coders.

```ts
type Coder<Type> = Transcoder<Type, Type>
```

### Methods

#### check(data, options?)

_TODO: Improve Section_

Asserts if the data conforms to type.

#### decode(data, options?)

_TODO: Improve Section_

Decodes from json encoded type

#### encode(data, options?)

_TODO: Improve Section_

Encodes to json encoded type

### Default Coding Options

_TODO: Add Section_

## Errors

_TODO: Add Section_

## Built-In Types

Commonly used types are built into the module.

### Primitives

Common JavaScript primitives are included.

```ts
await Type.undefined().check(undefined)

await Type.null().decode(null) // returns null
await Type.null().decode('null') // throws `AssertionError`
await Type.null().decode('null', { coerceNullFromStringOnDecode: true }) // returns 'null'

await Type.boolean().decode(false) // returns false
await Type.boolean().decode(1) // throws `AssertionError`
await Type.boolean().decode('true') // throws `AssertionError`
await Type.boolean().decode(1, { coerceOnDecode: true }) // returns true
await Type.boolean().decode('true', { coerceOnDecode: true }) // returns true

await Type.number().check(42) // returns 42
await Type.number().check('42') // throws `AssertionError`
await Type.number().check('42', { coerceOnDecode: true }) // returns 42

await Type.string().check('hello') // returns 'hello'
await Type.string().check(42) // throws `AssertionError`
await Type.string().check(42, { coerceOnDecode: true }) // returns '42'

// literals can be null, boolean, number or string
await Type.literal('psst.').check('psst.')
await Type.literal('psst.').check('hello') // throws `AssertionError`
```

There is also a special primitive type included: `integer`

```ts
const Integer = Type.integer()
// ^ represents `number` at compile-time
// ^ but validates if the value is an integer at run-time

await Integer.check(1)
await Integer.check(1.5) // throws
```

### DateTime

DateTime is an example of a Transcoded Type

```ts
const DateTime = Type.dateTime()

await DateTime.decode('2019-07-24T17:25:48.443Z') // returns a Date instance
await DateTime.encode(new Date()) // returns '2019-07-24T17:25:48.443Z'
```

### List & Tuple

```ts
const MyList = Type.list(Type.number())

await MyList.check([]) // returns []
await MyList.check([1, 2]) // returns [1, 2]
await MyList.check([1, 'hello']) // throws `AssertionError`

const MyTuple = Type.tuple(Type.number(), Type.string())

await MyTuple.check([1, 'hello']) // returns [1, 'hello']
await MyTuple.check([]) // throws `AssertionError`
await MyTuple.check([1, 2]) // throws `AssertionError`
await MyTuple.check([1, 'hello', 3]) // throws `AssertionError`
```

### Structure

Structures are objects with known keys and values.

```ts
const MyStruct = Type.struct({
    type: Type.literal('users'),
    items: Type.list(Type.struct({
        name: Type.string(),
        age: Type.integer()
    }))
})

await MyStruct.check({ type: 'users', items: [] }) // succeeds
await MyStruct.check({ type: 'users', items: [{ name: 'G', age: 28 }] }) // succeeds
await MyStruct.check({ type: 'users', items: [{ name: 'G' }] }) // throws `AssertionError`
```

### Record

Records are objects with homogeneous keys and values

```ts
const MyRecord = Type.record(Type.String(), Type.number())

await MyRecord.check({}) // returns {}
await MyRecord.check({ first: 1 }) // returns { first: 1 }
await MyRecord.check({ first: 1, second: 2 }) // returns { first: 1, second: 2 }
await MyRecord.check({ first: 1, second: 'second' }) // throws `AssertionError`
```

Records may also contain union types for values such as:

```ts
const MyRecord = Type.record(
    Type.String(),
    Type.anyOf(Type.string(), Type.number(), Type.boolean()))
```

### Union Types

```ts
const MyUnion = Type.anyOf(Type.number(), Type.boolean())

await MyUnion.check(42) // returns 42
await MyUnion.check(true) // returns true
await MyUnion.check('hello') // throws `AssertionError`
```

`optional` and `nullable` union types are also included.

```ts
Type.optional(Type.string()) // same as Type.anyOf(Type.undefined(), Type.string())
Type.nullable(Type.string()) // same as Type.anyOf(Type.null(), Type.string())
```

### Untyped

Untyped values that are inferred as `any` can be written as:

```ts
const Any = Type.any()

// all checks will succeed and return the passed value
await Any.check(1)
await Any.check('hello')
await Any.check(undefined)
```

### Configured Types

_TODO: Add Section_

### Custom Types

If the built-in types aren't sufficient, you can define your own too!

#### Buffer (Example)

_TODO: Add Section_

#### Enum (Example)

_TODO: Add Section_
