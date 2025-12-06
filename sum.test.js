const sum = require('./sum');

test('adds numbers correctly', () => {
  expect(sum(2, 3)).toBe(5);
});