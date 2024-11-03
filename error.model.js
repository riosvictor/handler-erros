class Result {
  static ok(value) { return new Ok(value); }
  static err(value) { return new Err(value); }
}

class Ok {
  constructor(value) { this.value = value; }
  isOk() { return true; }
  isErr() { return false; }
  map(fn) { return Result.ok(fn(this.value)); }
}

class Err {
  constructor(value) { this.value = value; }
  isOk() { return false; }
  isErr() { return true; }
  map(fn) { return this; }
}

module.exports = {
  Result,
  Ok,
  Err
};