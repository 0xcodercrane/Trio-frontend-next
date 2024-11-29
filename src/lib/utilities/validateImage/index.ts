export const validateImage = async (
  requiredWidth: number,
  requiredHeight: number,
  file: File | null,
  fieldName: string,
  maxSizeMB: number
): Promise<string | undefined> => {
  const maxFileSizeBytes = maxSizeMB * 1024 * 1024;

  // Check if file is provided
  if (!file) {
    return `${fieldName} is required.`;
  }

  // Check if file size is valid
  if (!file.size || !file) {
    return `${fieldName} cannot be empty.`;
  }

  if (file.size > maxFileSizeBytes) {
    return `${fieldName} must be smaller than ${maxSizeMB} MB.`;
  }

  // Validate image dimensions
  const isValidDimensions = await new Promise<boolean>((resolve) => {
    const img = document.createElement('img');
    img.onload = () => {
      const { width, height } = img;

      // Allow a margin of ±200 pixels for width and height
      const withinMargin = Math.abs(width - requiredWidth) <= 200 && Math.abs(height - requiredHeight) <= 200;
      resolve(withinMargin);
    };
    img.onerror = () => resolve(false);
    img.src = URL.createObjectURL(file);
  });

  if (!isValidDimensions) {
    return `${fieldName} must have a resolution of approximately ${requiredWidth}x${requiredHeight}.`;
  }

  // Return undefined if all validations pass
  return undefined;
};
