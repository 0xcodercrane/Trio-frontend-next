export function stringToLaunchpadSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with '-'
    .replace(/[^a-z0-9_-]/g, '');
}
