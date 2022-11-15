export function buildPinPos(width: number, type: 'input' | 'output') {
  if (type === 'output') {
    return width - 14;
  }

  return 14;
}
