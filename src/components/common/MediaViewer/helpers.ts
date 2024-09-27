export const getImageDataURL = (svgXml: string) => {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgXml)))}`;
};
