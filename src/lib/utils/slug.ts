export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function generateJobSlug(title: string, city: string | null): string {
  const base = slugify(`${title}-${city ?? "uk"}`)
  const suffix = Math.random().toString(36).slice(2, 7)
  return `${base}-${suffix}`
}
