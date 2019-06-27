import {
  NullStrainer,
  NullDecoder,
  NullEncoder,
  NullCoder,
  BooleanStrainer,
  BooleanDecoder,
  BooleanEncoder,
  BooleanCoder,
  NumberStrainer,
  NumberDecoder,
  NumberEncoder,
  NumberCoder,
  StringStrainer,
  StringDecoder,
  StringEncoder,
  StringCoder,
  DateStrainer,
  DateDecoder,
  DateEncoder,
  DateCoder,
  ArrayStrainer,
  ArrayDecoder,
  ArrayEncoder,
  ArrayCoder,
  ObjectStrainer,
  ObjectDecoder,
  ObjectEncoder,
  ObjectCoder
} from './bundled'

export const Strainer = {
  null: NullStrainer,
  boolean: BooleanStrainer,
  number: NumberStrainer,
  string: StringStrainer,
  date: DateStrainer,
  array: ArrayStrainer,
  object: ObjectStrainer,
}

export const Decoder = {
  null: NullDecoder,
  boolean: BooleanDecoder,
  number: NumberDecoder,
  string: StringDecoder,
  date: DateDecoder,
  array: ArrayDecoder,
  object: ObjectDecoder,
}

export const Encoder = {
  null: NullEncoder,
  boolean: BooleanEncoder,
  number: NumberEncoder,
  string: StringEncoder,
  date: DateEncoder,
  array: ArrayEncoder,
  object: ObjectEncoder,
}

export const Coder = {
  null: NullCoder,
  boolean: BooleanCoder,
  number: NumberCoder,
  string: StringCoder,
  date: DateCoder,
  array: ArrayCoder,
  object: ObjectCoder,
}
