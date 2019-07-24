# Gwen Coder

*__WARNING__: Still in development, __not suitable for production__*

### Declarative type-safe data decoding, encoding and run-time assertions for JS

Gwen Coder allows you to declaratively compose complex types for both TypeScript for compile-time and JavaScript for run-time assertions. This module is primarily aimed at NodeJS for creating type-safe backend services.


## Install

```sh
npm i -S gwen-coder
```


## Usage

### Composing Types

A transcoder is an object that represents a type. You can compose your type like this:

```ts
import { Type } from 'gwen-coder'

// compose transcoder
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

### Type Aliases

Types can be inferred from composed transcoders.

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

### Type Assertions

You can assert your data conforms to a type at run-time. In the following example, the data will pass the check and be assigned to `person`.

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

const person = await Person.assert(validPerson)
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

const person = await Person.assert(invalidPerson) // <-- throws
```

### Decoding and Encoding

transcoders can be used to transform data to and from JSON supported types for transmission.

```ts
const Person = Type.struct({
    name: Type.string(),
    joined: Type.dateTime()
})
```

The transcoder shown above represents the following types:

```ts
// serialized type
interface PersonEncoded {
    name: string
    joined: string // ISO date-time string
}

const json: PersonEncoded = {
    name: 'Gwen',
    joined: '2019-07-24T17:25:48.443Z'
}

// de-serialized type
interface Person {
    name: string
    joined: Date // Date instance
}

const person: Person = await Person.decode(json)
const personJSON: PersonJSON = await Person.encode(person)
```


## Transcoder API

A transcoder interface is defined as follows:

```ts
interface Transcoder<Type, EncodedType> {
  assert(data: Type, options?: CheckingOptions): Type | Promise<Type>
  decode(data: EncodedType, options?: DecodingOptions): Type | Promise<Type>
  encode(data: Type, options?: EncodingOptions): EncodedType | Promise<EncodedType>
}
```

Symmetric transcoders are also referred to as Coders.

```ts
type Coder<Type> = Transcoder<Type, Type>
```

### Methods & Options

__assert(data, options?)__

_TODO: Improve Section_

Asserts data conforms to type.

__decode(data, options?)__

_TODO: Improve Section_

Decodes from json encoded type

__encode(data, options?)__

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
await Type.undefined().assert(undefined)

await Type.null().decode(null) === null
await Type.null().decode('null') // throws `AssertionError`
await Type.null().decode('null', { coerceNullFromStringOnDecode: true }) === null

await Type.boolean().decode(false) === false
await Type.boolean().decode(1) // throws `AssertionError`
await Type.boolean().decode('true') // throws `AssertionError`
await Type.boolean().decode(1, { coerceOnDecode: true }) === true
await Type.boolean().decode('true', { coerceOnDecode: true }) === true

await Type.number().assert(42) === 42
await Type.number().assert('42') // throws `AssertionError`
await Type.number().assert('42', { coerceOnDecode: true }) === 42

await Type.string().assert('hello') === 'hello'
await Type.string().assert(42) // throws `AssertionError`
await Type.string().assert(42, { coerceOnDecode: true }) === '42'

// literals can be null, boolean, number or string
await Type.literal('psst.').assert('psst.') === 'psst.'
await Type.literal('psst.').assert('hello') // throws `AssertionError`
```

There is also a special primitive type included: `integer`

```ts
const Integer = Type.integer()
// ^ represents `number` at compile-time
// ^ but validates if the value is an integer at run-time

await Integer.assert(1) === 1
await Integer.assert(1.5) // throws
```

### DateTime

DateTime is an example of a Transcoded Type

```ts
const DateTime = Type.dateTime()

// the following returns a Date instance
await DateTime.decode('2019-07-24T17:25:48.443Z')

// the following returns '2019-07-24T17:25:48.443Z'
await DateTime.encode(new Date())
```

### List & Tuple

Lists and Tuples are array objects.

```ts
const MyList = Type.list(Type.number())

// succeeds
await MyList.assert([]) // returns []
await MyList.assert([1, 2]) // returns [1, 2]

// fails
await MyList.assert([1, 'hello']) // throws `AssertionError`
```

```ts
const MyTuple = Type.tuple(Type.number(), Type.string())

// succeeds
await MyTuple.assert([1, 'hello'])      // returns [1, 'hello']

// fails
await MyTuple.assert([]) // throws `AssertionError`
await MyTuple.assert([1, 2]) // throws `AssertionError`
await MyTuple.assert([1, 'hello', 3]) // throws `AssertionError`
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

// succeeds
await MyStruct.assert({ type: 'users', items: [] })
await MyStruct.assert({ type: 'users', items: [{ name: 'G', age: 28 }] })

// fails
await MyStruct.assert({ type: 'users', items: [{ name: 'G' }] }) // throws `AssertionError`
```

### Record

Records are objects with homogeneous keys and values.

```ts
const MyRecord = Type.record(Type.String(), Type.number())

// succeeds
await MyRecord.assert({}) // returns {}
await MyRecord.assert({ first: 1 }) // returns { first: 1 }
await MyRecord.assert({ first: 1, second: 2 }) // returns { first: 1, second: 2 }

// fails
await MyRecord.assert({ first: 1, second: 'second' }) // throws `AssertionError`
```

Records may also contain union types for values such as:

```ts
const MyRecord = Type.record(
    Type.String(),
    Type.anyOf(Type.string(), Type.number(), Type.boolean()))
```

### Union Types

Union types are a union of two or more types.

```ts
const MyUnion = Type.anyOf(Type.number(), Type.boolean())

// succeeds
await MyUnion.assert(42) // returns 42
await MyUnion.assert(true) // returns true

// fails
await MyUnion.assert('hello') // throws `AssertionError`
```

`optional` and `nullable` union types are also included.

```ts
// the following is shorthand for Type.anyOf(Type.undefined(), Type.string())
Type.optional(Type.string())

// the following is shorthand for Type.anyOf(Type.null(), Type.string())
Type.nullable(Type.string())
```

### Untyped

Untyped values inferred as `any` can be written as:

```ts
const Any = Type.any()

// all checks will succeed and return the passed value
await Any.assert(1)
await Any.assert('hello')
await Any.assert(undefined)
```

## Configured Types

_TODO: Add Section_

## Custom Types

If the built-in types aren't sufficient, you can define your own too!

### Buffer (Example)

_TODO: Add Section_

### Enum (Example)

_TODO: Add Section_
