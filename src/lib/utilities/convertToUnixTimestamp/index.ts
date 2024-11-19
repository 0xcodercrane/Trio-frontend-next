export const convertToUnixTimestamp = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':');
  return date.setHours(Number(hours), Number(minutes)) / 1000;
};
