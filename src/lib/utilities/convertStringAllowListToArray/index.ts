export const convertStringAllowListToArray = (
  allowList: string | undefined,
  allocation: number,
  isSameAllocation: boolean
) => {
  if (!allowList?.trim()) {
    return undefined;
  }

  const lines = allowList
    ?.trim()
    .split('\n')
    .filter((line) => line.trim());

  const entries: Record<string, { allocation: number }> = {};

  for (const line of lines) {
    const [address, alloc] = line.split(',').map((part) => part.trim());

    if (!address) {
      console.warn('Skipping entry due to missing address:', line);
      continue;
    }

    const parsedAllocation = alloc && !isNaN(Number(alloc)) ? Number(alloc) : 1;
    entries[address] = {
      allocation: isSameAllocation ? allocation : parsedAllocation
    };
  }

  const lists = Object.keys(entries).map((a: string) => ({
    address: a,
    ...entries[a]
  }));

  return lists.length > 0 ? lists : undefined;
};
