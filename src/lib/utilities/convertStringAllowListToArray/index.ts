export const convertStringAllowListToArray = (allowList: string | undefined) => {
  return allowList
    ? allowList
        .trim()
        .split('\n')
        .flatMap((line) => line.split(',').map((part) => part.trim()))
        .filter((address) => address)
    : [];
};
