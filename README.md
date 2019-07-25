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

__undefined__

```ts
const Undefined = Type.undefined()

// succeeds
const result: undefined = await Undefined.assert(undefined)
const result: undefined = await Undefined.decode(undefined)
const result: undefined = await Undefined.encode(undefined)

// fails
await Undefined.assert(42) // throws `AssertionError`
```

__null__

```ts
const Null = Type.null()

// succeeds
const result: null = await Null.decode(null)
const result: null = await Null.decode('null', {
    coerceNullFromStringOnDecode: true
})

// fails
await Null.assert(42) // throws `AssertionError`
await Null.decode('null') // throws `DecodingError`
```

__boolean__

```ts
const Boolean = Type.boolean()

// succeeds
const result: true = await Boolean.decode(true)
const result: true = await Boolean.decode('true', {
    coerceOnDecode: true
})

const result: true = await Boolean.decode(1, {
    coerceOnDecode: true
})

// fails
await Boolean.assert(42) // throws `AssertionError`
```

__number__

```ts
const Number = Type.number()

// succeeds
const result: number = await Number.assert(42)
const result: number = await Number.decode(42)
const result: number = await Number.decode('42', {
    coerceOnDecode: true
})

// fails
await Number.assert('42') // throws `AssertionError`
await Number.decode('42') // throws `DecodingError`
```

__string__

```ts
const String = Type.string()

// succeeds
const result: string = await String.assert('hello')
const result: string = await String.decode('42')
const result: string = await String.decode(42, {
    coerceOnDecode: true
})

// fails
await String.assert(42) // throws `AssertionError`
await String.decode(42) // throws `DecodingError`
```

__literal__

```ts
const Literal = Type.literal('psst.')

// succeeds
const result: 'psst.' = await Literal.assert('psst.')

// fails
await Literal.assert('hello') // throws `AssertionError`
await Literal.decode(42) // throws `DecodingError`
```

__integer__

There is also a special coder included for `integer`

```ts
const Integer = Type.integer()
// ^ represents `number` at compile-time
// ^ but validates if the value is an integer at run-time

// succeeds
await Integer.assert(1) === 1

// fails
await Integer.assert(1.5) // throws `AssertionError`
```

### Date-Time

Date-Time is a built-in transcoded type

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
await MyTuple.assert([1, 'hello']) // returns [1, 'hello']

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

Instead of passing assertion, decoding and encoding options on each call, you
can configure trasncoders with default values.

```ts
const Person = Type.configured(Type.struct(
    name: Type.string(),
    age: Type.number()

), {
    coerceOnDecode: true
})
```

For configured types, options passed in api calls will be ignored.

```ts
// succeeds
await Person.decode({ name: 'G', age: 18 }) // returns { name: 'G', age: 18 }
await Person.decode({ name: 'G', age: '18' }) // returns { name: 'G', age: 18 }
await Person.decode({ name: 2, age: '18' }) // returns { name: '2', age: 18 }

// also succeeds
await Person.decode({ name: 2, age: '18' }, { coerceOnDecode: false })
                                            // ^ option ignored
```

To change the options of a configured type, you can do this:

```ts
Person.setCodingOptions({ coerceOnDecode: false })

// fails
await Person.decode({ name: 2, age: '18' }) // throws `DecodingError`
```

## Custom Types

If the built-in types aren't sufficient, you can define your own too!

### Buffer (Example)

_TODO: Add Section_

### Enum (Example)

_TODO: Add Section_
