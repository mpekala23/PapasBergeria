export function distance(
  pos1: { x: number; y: number },
  pos2: { x: number; y: number }
): number {
  return Math.sqrt(
    (pos1.x - pos2.x) * (pos1.x - pos2.x) +
      (pos1.y - pos2.y) * (pos1.y - pos2.y)
  );
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getAngleBetween(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  return Math.atan2(b.x - a.x, a.y - b.y) - Math.PI / 2;
}
