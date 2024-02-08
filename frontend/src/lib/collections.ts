export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex: number;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function removeDuplicateID<T extends { id: any }>(array: T[]) {
  return array.filter(
    (value, index) =>
      index === array.findIndex((otherValue) => otherValue.id === value.id),
  );
}
