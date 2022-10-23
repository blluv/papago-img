export function extractFileExtension(name: string) {
  const s = name.split(".");
  if (s.length === 0) return "";

  return s[s.length - 1];
}
