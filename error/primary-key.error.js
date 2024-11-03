class PrimaryKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PrimaryKeyError';
  }
}

module.exports = PrimaryKeyError;