import { buildPinPosY, buildNodeHeight } from '../size-helper';

describe('size-helper', () => {
  test.each<[number, number]>([
    [0, 16],
    [1, 50],
    [2, 70],
    [3, 90],
    [4, 110],
  ])('buildPinPosY', (position, output) => {
    expect(buildPinPosY(position)).toBe(output);
  });

  test.each<[number, number]>([
    [1, 70],
    [2, 90],
    [3, 110],
    [4, 130],
  ])('buildPinPosY', (position, output) => {
    expect(buildNodeHeight(position)).toBe(output);
  });
});
