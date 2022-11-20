import { buildPinPosY } from '../position-helper';

describe('position-helper', () => {
  test.each<[number, number]>([
    [1, 16],
    [2, 50],
    [3, 70],
    [4, 90],
    [5, 110],
  ])('buildPinPosY', (position, output) => {
    expect(buildPinPosY(position)).toBe(output);
  });
});
