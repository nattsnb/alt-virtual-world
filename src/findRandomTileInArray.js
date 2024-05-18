export function findRandomTileInArray(array) {
  const randomTileNumber = Math.floor(Math.random() * array.length);
  return array[randomTileNumber];
}
