export function convertStringToInt(str) {
  const float = parseFloat(str);
  return isNaN(float) ? undefined : Math.round(float);
}