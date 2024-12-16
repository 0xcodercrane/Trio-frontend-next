export const generateSlug = (str: string) => {
  return str
    .trim() // trim spaces
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[^a-z0-9_-]+/g, '-') // Replace invalid characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading or trailing hyphens
    .replace(/--+/g, '-'); // Replace multiple consecutive hyphens with a single one
};
