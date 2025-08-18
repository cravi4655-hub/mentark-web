export function objectToFormData(obj: Record<string, any>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      value.forEach((item) => fd.append(key, String(item)));
    } else if (value !== undefined && value !== null) {
      fd.set(key, String(value));
    }
  }
  return fd;
}
