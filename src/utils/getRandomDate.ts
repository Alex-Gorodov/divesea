export function getRandomDate(): Date {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1).getTime();
  const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0).getTime();
  let randomTimestamp = startOfYear + Math.random() * (endOfYear - startOfYear);
  let randomDate = new Date(randomTimestamp);
  
  while (randomDate.getTime() > currentDate.getTime()) {
    randomTimestamp = startOfYear + Math.random() * (endOfYear - startOfYear);
    randomDate = new Date(randomTimestamp);
  }

  return randomDate;
}
