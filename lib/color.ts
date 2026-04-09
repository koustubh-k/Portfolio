function sanitizeHex(input: string): string | null {
  const hex = input.trim().replace("#", "");

  if (hex.length === 3 && /^[\da-fA-F]{3}$/.test(hex)) {
    return hex
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }

  if (hex.length === 6 && /^[\da-fA-F]{6}$/.test(hex)) {
    return hex;
  }

  return null;
}

export function hexToRgba(hexColor: string, alpha = 1): string {
  const sanitized = sanitizeHex(hexColor);
  if (!sanitized) {
    return `rgba(127, 90, 240, ${alpha})`;
  }

  const r = Number.parseInt(sanitized.slice(0, 2), 16);
  const g = Number.parseInt(sanitized.slice(2, 4), 16);
  const b = Number.parseInt(sanitized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

